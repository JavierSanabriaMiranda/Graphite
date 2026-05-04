use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager, Runtime};

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
pub async fn save_attachment<R: Runtime>(
    app: AppHandle<R>,
    id: String,       // UUID generated on front
    extension: String, // ex: "png", "pdf"
    data: Vec<u8>     // The binary data of the file
) -> Result<String, String> {
    let mut path = get_attachments_dir(&app).map_err(|e| format!("{:?}", e))?;
    
    // The file name will be the ID to avoid collisions
    let file_name = format!("{}.{}", id, extension);
    path.push(&file_name);

    fs::write(&path, data).map_err(|e| e.to_string())?;

    // We return the absolute path so the frontend can store it in SQLite
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

/// Converts a local path into a URL compatible with the frontend (Asset Protocol)
/// This is necessary to display local images in Tauri's UI
#[tauri::command]
pub fn get_attachment_url(file_path: String) -> String {
    // Tauri uses a special protocol (asset://) to load local files securely
    format!("https://asset.localhost/{}", file_path)
}