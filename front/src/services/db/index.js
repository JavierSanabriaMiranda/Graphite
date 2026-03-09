import Database from '@tauri-apps/plugin-sql';
import setupScript from './setup.sql?raw';
import { getWelcomeNote } from './welcomeContent';
import i18next from 'i18next';

let db = null;

/**
 * Connects to db and executes setup script
 */
export const initializeDB = async () => {
    try {
        if (!db) {
            // Stores in system AppData automatically
            db = await Database.load("sqlite:graphite.db");

            await db.execute("PRAGMA foreign_keys = ON;");

            var tableExists = await db.select(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='USERS'"
            );

            // Execute setup script
            if (tableExists.length === 0) {
                console.log("Executing setup script...");
                const queries = setupScript
                    .split(';')
                    .filter(query => query.trim() !== '');

                for (const query of queries) {
                    await db.execute(query);
                }
                console.log("Database correctly initialized");

                console.log("Database created. Seeding initial data...");

                // 1. Insertar Usuario por defecto
                await db.execute("INSERT INTO USERS (username) VALUES ($1)", ["User"]);

                // 2. Insertar Workspace inicial
                await db.execute("INSERT INTO WORKSPACES (owner_id, name) VALUES (1, $1)", ["Personal"]);

                // 3. Obtener contenido traducido
                const lang = i18next.language.split('-')[0]; // Obtiene 'es' o 'en'
                const welcome = getWelcomeNote(lang);

                // 4. Insertar Nota de Bienvenida
                await db.execute(
                    "INSERT INTO NOTES (workspace_id, title, content, note_path) VALUES ($1, $2, $3, $4)",
                    [1, welcome.title, welcome.body, "/" + welcome.title]
                );

                console.log("Seed data inserted correctly 🚀");
            }
        }
        return db;
    } catch (error) {
        console.error("Error while initializing DB:", error);
        throw error;
    }
};

/**
 * @returns db connection
 */
export const getDB = async () => {
    if (!db) {
        db = await Database.load("sqlite:graphite.db");
    }
    return db;
};