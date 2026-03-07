// Command definition example
#[tauri::command]
fn process_text(texto: String) -> String {
    let respuesta = format!("Rust dice: {}", texto.to_uppercase().chars().rev().collect::<String>());

    return respuesta;
}

fn main() {
    tauri::Builder::default()
        // Register command
        .invoke_handler(tauri::generate_handler![process_text])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}