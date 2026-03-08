#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // Plugin for opening URLs
        .plugin(tauri_plugin_opener::init())
        // Plugin for SQLite
        .plugin(tauri_plugin_sql::Builder::default().build())
        // For personal commands
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
