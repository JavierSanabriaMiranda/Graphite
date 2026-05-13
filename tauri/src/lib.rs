mod commands;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            #[cfg(desktop)]
            {
                use tauri_plugin_fs::FsExt;
                // Allows read/write access to the attachments directory in AppData for the attachments commands
                let app_data = app.path().app_data_dir().unwrap();
                let attachments_path = app_data.join("attachments");
                app.fs_scope().allow_directory(&attachments_path, true)?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // Import commands from the secure_data and attachments modules
            commands::secure_data::save_secure_data, 
            commands::secure_data::load_secure_data,
            commands::secure_data::clear_secure_data,
            commands::attachments::save_attachment,
            commands::attachments::delete_attachment_file,
            commands::attachments::get_asset_url,
            commands::attachments::download_attachment,
            commands::attachments::clear_all_attachments,
            commands::attachments::calculate_attachment_checksum,
            commands::attachments::upload_to_azure,
            commands::attachments::download_from_azure,
            commands::attachments::get_app_attachments_dir,
            commands::attachments::get_file_base64,
            commands::export::export_pdf_silently,
            commands::export::get_app_resource_base64
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}