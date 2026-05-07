use headless_chrome::{Browser, LaunchOptions};
use std::fs;
use std::env;
use tauri::{AppHandle, Manager};
use base64::{Engine as _, engine::general_purpose};

#[tauri::command]
pub async fn get_app_resource_base64(handle: AppHandle, name: String) -> Result<String, String> {
    // Get route to resources folder
    let resource_path = handle
        .path()
        .resolve(format!("resources/fonts/{}", name), tauri::path::BaseDirectory::Resource)
        .map_err(|e| format!("Couldn't resolve resource path: {}", e))?;

    // Read bytes from file
    let file_bytes = fs::read(resource_path)
        .map_err(|e| format!("Couldn't read file from font: {}", e))?;

    // Turn into base_64
    let b64 = general_purpose::STANDARD.encode(file_bytes);

    Ok(b64)
}

#[tauri::command]
pub async fn export_pdf_silently(html: String, path: String) -> Result<(), String> {
    // Create temp file
    let mut temp_path = env::temp_dir();
    temp_path.push(format!("graphite_export_{}.html", uuid::Uuid::new_v4())); // Necesitas la crate uuid o usa un timestamp
    
    fs::write(&temp_path, html).map_err(|e| format!("Failed to write temp file: {}", e))?;

    let file_url = format!("file://{}", temp_path.to_str().ok_or("Invalid temp path")?);

    // Launch headless browser
    let browser = Browser::new(
        LaunchOptions::default_builder()
            .headless(true)
            .build()
            .map_err(|e| e.to_string())?
    ).map_err(|e| e.to_string())?;

    let tab = browser.new_tab().map_err(|e| e.to_string())?;

    // Navigate to file url
    tab.navigate_to(&file_url).map_err(|e| e.to_string())?;
    tab.wait_until_navigated().map_err(|e| e.to_string())?;

    // Generate pdf
    let pdf_data = tab.print_to_pdf(None).map_err(|e| e.to_string())?;

    // Save pdf on selected path
    fs::write(&path, pdf_data).map_err(|e| format!("Failed to save PDF: {}", e))?;

    // Clean temp files
    let _ = fs::remove_file(temp_path);

    Ok(())
}