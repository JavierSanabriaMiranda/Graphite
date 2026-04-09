// Avoid Windows cmd to open on release mode
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // Call run() function on lib.rs
    graphite_lib::run(); 
}
