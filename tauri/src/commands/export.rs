use headless_chrome::{Browser, LaunchOptions};
use std::fs;
use std::env;
use std::path::PathBuf;

#[tauri::command]
pub async fn export_pdf_silently(html: String, path: String) -> Result<(), String> {
    // 1. Crear un archivo HTML temporal
    // Esto evita el error ERR_ABORTED por URLs demasiado largas
    let mut temp_path = env::temp_dir();
    temp_path.push(format!("graphite_export_{}.html", uuid::Uuid::new_v4())); // Necesitas la crate uuid o usa un timestamp
    
    fs::write(&temp_path, html).map_err(|e| format!("Failed to write temp file: {}", e))?;

    // Convertimos la ruta del archivo a una URL válida (file://...)
    let file_url = format!("file://{}", temp_path.to_str().ok_or("Invalid temp path")?);

    // 2. Iniciar el navegador headless
    let browser = Browser::new(
        LaunchOptions::default_builder()
            .headless(true)
            .build()
            .map_err(|e| e.to_string())?
    ).map_err(|e| e.to_string())?;

    let tab = browser.new_tab().map_err(|e| e.to_string())?;

    // 3. Navegar a la ruta del ARCHIVO, no al string de datos
    tab.navigate_to(&file_url).map_err(|e| e.to_string())?;
    tab.wait_until_navigated().map_err(|e| e.to_string())?;

    // 4. Generar el PDF
    let pdf_data = tab.print_to_pdf(None).map_err(|e| e.to_string())?;

    // 5. Guardar el PDF final en la ruta elegida por el usuario
    fs::write(&path, pdf_data).map_err(|e| format!("Failed to save PDF: {}", e))?;

    // 6. Limpieza: Borrar el archivo HTML temporal
    let _ = fs::remove_file(temp_path);

    Ok(())
}