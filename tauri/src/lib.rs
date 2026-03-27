use argon2::{Argon2, Algorithm, Version, Params};
use machine_uid;
use aes_gcm::{Aes256Gcm, Key, Nonce, KeyInit, aead::Aead};
use rand::{Rng, thread_rng};
use serde::{Serialize, Deserialize};
use std::fs;
use std::sync::OnceLock; // Para el cache de la clave
use tauri::Manager; // ¡VITAL! Sin esto .path() no existe

// Cache para que Argon2 solo se ejecute una vez por sesión
static MASTER_KEY_CACHE: OnceLock<Vec<u8>> = OnceLock::new();

#[derive(Serialize, Deserialize)]
pub struct VaultData {
    pub token: String,
    pub dek: Vec<u8>,
}

// Genera una clave maestra de 32 bytes basada en hardware (con cache)
fn get_hardware_master_key() -> Vec<u8> {
    MASTER_KEY_CACHE.get_or_init(|| {
        println!("Graphite: Derivando clave de hardware...");
        let hw_id = machine_uid::get().unwrap_or_else(|_| "fallback-id-generico".to_string());
        let app_salt = b"graphite-pro-salt-2026"; 

        let params = Params::new(64 * 1024, 3, 1, Some(32))
            .expect("Error configurando parámetros de Argon2");
        
        let argon2 = Argon2::new(
            Algorithm::Argon2id,
            Version::V0x13,
            params,
        );

        let mut output_key = [0u8; 32];
        argon2.hash_password_into(hw_id.as_bytes(), app_salt, &mut output_key)
            .expect("Error al derivar la clave de hardware");
        
        println!("Graphite: Terminada derivación de hardware...");

        output_key.to_vec()
    }).clone()
}

#[tauri::command]
async fn save_secure_data(app_handle: tauri::AppHandle, token: String, dek: Vec<u8>) -> Result<(), String> {
    let key_bytes = get_hardware_master_key();
    let key = Key::<Aes256Gcm>::from_slice(&key_bytes);
    let cipher = Aes256Gcm::new(key);
    
    // r#gen() escapa la palabra reservada 'gen' en nuevas ediciones de Rust
    let iv: [u8; 12] = thread_rng().r#gen(); 
    let nonce = Nonce::from_slice(&iv);

    let data = VaultData { token, dek };
    let json = serde_json::to_string(&data).map_err(|e| e.to_string())?;
    
    let ciphertext = cipher.encrypt(nonce, json.as_bytes())
        .map_err(|e| format!("Encryption error: {}", e))?;

    let mut final_blob = iv.to_vec();
    final_blob.extend_from_slice(&ciphertext);

    // Gracias a 'use tauri::Manager', esto ahora funciona
    let path = app_handle.path().app_data_dir().unwrap().join("vault.bin");
    fs::create_dir_all(path.parent().unwrap()).map_err(|e| e.to_string())?;
    fs::write(path, final_blob).map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
async fn load_secure_data(app_handle: tauri::AppHandle) -> Result<Option<VaultData>, String> {
    let path = app_handle.path().app_data_dir().unwrap().join("vault.bin");
    if !path.exists() { return Ok(None); }

    let file_content = fs::read(path).map_err(|e| e.to_string())?;
    if file_content.len() < 12 { return Err("Corrupted file".to_string()); }

    let (iv, ciphertext) = file_content.split_at(12);
    let nonce = Nonce::from_slice(iv);

    let key_bytes = get_hardware_master_key();
    let key = Key::<Aes256Gcm>::from_slice(&key_bytes);
    let cipher = Aes256Gcm::new(key);

    let plaintext = cipher.decrypt(nonce, ciphertext)
        .map_err(|e| format!("Decryption error: {}", e))?;

    let data: VaultData = serde_json::from_slice(&plaintext).map_err(|e| e.to_string())?;
    Ok(Some(data))
}

#[tauri::command]
async fn clear_secure_data(app_handle: tauri::AppHandle) -> Result<(), String> {
    let path = app_handle.path().app_data_dir().unwrap().join("vault.bin");
    if path.exists() {
        fs::remove_file(path).map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            save_secure_data, 
            load_secure_data,
            clear_secure_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}