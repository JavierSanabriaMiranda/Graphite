use argon2::{Argon2, Algorithm, Version, Params};
use machine_uid;

// Generates a 32 bytes master key based on PC hardware
fn get_hardware_master_key() -> Vec<u8> {
    // Get unique machine ID (Motherboard/Disk)
    let hw_id = machine_uid::get().unwrap_or_else(|_| "fallback-id-generico".to_string());
    
    // Internal application salt 
    let app_salt = b"graphite-pro-salt-2026"; 

    // Configure Argon2id params (64MB RAM, 3 iterations)
    let params = Params::new(64 * 1024, 3, 1, Some(32))
        .expect("Error configurando parámetros de Argon2");
    
    let argon2 = Argon2::new(
        Algorithm::Argon2id,
        Version::V0x13,
        params,
    );

    let mut output_key = [0u8; 32];
    
    // Get key: pass HW_ID as "password" and our salt
    argon2.hash_password_into(hw_id.as_bytes(), app_salt, &mut output_key)
        .expect("Error al derivar la clave de hardware");

    output_key.to_vec()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // Plugin for opening URLs
        .plugin(tauri_plugin_opener::init())
        // Plugin for SQLite
        .plugin(tauri_plugin_sql::Builder::default().build())
        // Stronghold plugin for keeping secrets safe
        .plugin(tauri_plugin_stronghold::Builder::new(|_password| {
            // Ignore front password and use hardware for stronghold masterkey
            get_hardware_master_key()
        }).build())
        // For personal commands
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}