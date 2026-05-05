use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager, Runtime};
use base64::Engine;

#[derive(Debug, serde::Serialize)]
pub enum FileError {
    StoragePathError,
    WriteError,
}

impl From<std::io::Error> for FileError {
    fn from(_: std::io::Error) -> Self {
        FileError::WriteError
    }
}

/// Gets the route to the attachment files on AppData
fn get_attachments_dir<R: Runtime>(app: &AppHandle<R>) -> Result<PathBuf, FileError> {
    let mut path = app.path().app_data_dir().map_err(|_| FileError::StoragePathError)?;
    path.push("attachments");
    
    if !path.exists() {
        fs::create_dir_all(&path).map_err(|_| FileError::WriteError)?;
    }
    
    Ok(path)
}

/// Saves an attachment file to disk and returns its absolute path for database storage. 
#[tauri::command]
pub async fn save_attachment(
    handle: AppHandle,
    id: String,
    extension: String,
    data: Vec<u8>
) -> Result<String, String> {
    // Get the appdata directory
    let mut path = handle.path().app_data_dir().map_err(|e| e.to_string())?;
    
    // Creates the attachments directory if it doesn't exist
    path.push("attachments");
    fs::create_dir_all(&path).map_err(|e| e.to_string())?;
    
    // File name
    let file_name = format!("{}.{}", id, extension);
    path.push(file_name);

    // Save bytes
    fs::write(&path, data).map_err(|e| e.to_string())?;

    // Return the absolute path as a string for database storage
    Ok(path.to_string_lossy().to_string())
}

/// Deletes an attachment file from the disk
#[tauri::command]
pub async fn delete_attachment_file<R: Runtime>(
    app: AppHandle<R>,
    file_path: String
) -> Result<(), String> {
    let path = PathBuf::from(file_path);
    
    // Security check: Ensure the path is within the attachments directory to prevent unauthorized file access
    let attachments_dir = get_attachments_dir(&app).map_err(|e| format!("{:?}", e))?;
    if !path.starts_with(attachments_dir) {
        return Err("Unauthorized path".to_string());
    }

    if path.exists() {
        fs::remove_file(path).map_err(|e| e.to_string())?;
    }
    
    Ok(())
}

/// Deletes the entire attachments directory and all its contents.
/// Typically called during logout or a factory reset to clear local data.
#[tauri::command]
pub async fn clear_all_attachments<R: Runtime>(app: AppHandle<R>) -> Result<(), String> {
    // We get the path manually to avoid the automatic creation logic of get_attachments_dir
    let mut path = app.path().app_data_dir().map_err(|_| "Could not find AppData directory".to_string())?;
    path.push("attachments");

    // If the directory exists, we delete it and everything inside
    if path.exists() {
        fs::remove_dir_all(&path).map_err(|e| e.to_string())?;
        println!("Cleanup: Attachments directory successfully cleared.");
    }
    
    Ok(())
}

/// Copies an attachment from the app's internal storage to the user's system Downloads folder
#[tauri::command]
pub async fn download_attachment<R: Runtime>(
    app: AppHandle<R>,
    source_path: String,
    file_name: String,
) -> Result<(), String> {
    let source = PathBuf::from(&source_path);

    // Security check: Ensure we are only copying from our allowed directory
    let attachments_dir = get_attachments_dir(&app).map_err(|e| format!("{:?}", e))?;
    if !source.starts_with(attachments_dir) {
        return Err("Unauthorized path".to_string());
    }

    if !source.exists() {
        return Err("Source file does not exist".to_string());
    }

    // Get the user's system Downloads directory
    let download_dir = app
        .path()
        .download_dir()
        .map_err(|_| "Could not find Downloads directory".to_string())?;

    // Initial destination path
    let mut destination = download_dir.join(&file_name);

    // Logic to handle duplicate filenames by appending a counter (e.g., "filename (1).ext")
    if destination.exists() {
        let path_obj = PathBuf::from(&file_name);
        let stem = path_obj.file_stem().and_then(|s| s.to_str()).unwrap_or("file");
        let extension = path_obj.extension().and_then(|s| s.to_str()).unwrap_or("");
        
        let mut counter = 1;
        while destination.exists() {
            let new_filename = if extension.is_empty() {
                format!("{} ({})", stem, counter)
            } else {
                format!("{} ({}).{}", stem, counter, extension)
            };
            destination = download_dir.join(new_filename);
            counter += 1;
        }
    }

    // Copy the file from internal storage to the unique Downloads path
    fs::copy(&source, &destination).map_err(|e| format!("Failed to copy file: {}", e))?;

    Ok(())
}

/// Converts a file path to a valid asset URL that can be used in the webview
/// For files on disk accessible via the asset protocol, we need to properly handle the path
#[tauri::command]
pub fn get_asset_url(handle: AppHandle, file_path: String) -> Result<String, String> {
    let path = PathBuf::from(&file_path);
    
    // Security check: ensure the file is within the attachments directory
    let app_data = handle.path().app_data_dir().map_err(|e| e.to_string())?;
    let attachments_dir = app_data.join("attachments");
    
    if !path.starts_with(&attachments_dir) {
        return Err("File path is outside attachments directory".to_string());
    }
    
    if !path.exists() {
        return Err(format!("File not found: {}", file_path));
    }
    
    // For Tauri v2, read the file and encode it as a data URI
    // This ensures compatibility across all platforms
    let content = fs::read(&path)
        .map_err(|e| format!("Failed to read file: {}", e))?;
    
    // Determine MIME type based on file extension
    let mime_type = get_mime_type(&path);
    
    // Encode content as base64 for the data URI
    let base64_content = base64::engine::general_purpose::STANDARD.encode(&content);
    
    let data_uri = format!("data:{};base64,{}", mime_type, base64_content);
    Ok(data_uri)
}

/// Helper function to determine MIME type from file extension
fn get_mime_type(path: &PathBuf) -> String {
    match path.extension().and_then(|ext| ext.to_str()) {
        Some("png") => "image/png".to_string(),
        Some("jpg") | Some("jpeg") => "image/jpeg".to_string(),
        Some("gif") => "image/gif".to_string(),
        Some("webp") => "image/webp".to_string(),
        Some("svg") => "image/svg+xml".to_string(),
        Some("pdf") => "application/pdf".to_string(),
        Some("txt") => "text/plain".to_string(),
        _ => "application/octet-stream".to_string(),
    }
}