import Database from '@tauri-apps/plugin-sql';
import setupScript from './setup.sql?raw';

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

            const tableExists = await db.select(
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
            }
        }
        return db;
    } catch (error) {
        console.error("Error while initializing DB:", error);
        throw error;
    }
};
