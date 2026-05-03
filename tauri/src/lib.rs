mod commands;

use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            // Import commands from the secure_data and attachments modules
            commands::secure_data::save_secure_data, 
            commands::secure_data::load_secure_data,
            commands::secure_data::clear_secure_data,
            commands::attachments::save_attachment,
            commands::attachments::delete_attachment_file,
            commands::attachments::get_attachment_url
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}