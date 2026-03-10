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
            db = await Database.load("sqlite:graphite.db");

            await db.execute("PRAGMA foreign_keys = ON;");

            const tableExists = await db.select(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='USERS'"
            );

            if (tableExists.length === 0) {
                console.log("Executing setup script...");

                const queries = setupScript
                    .split(/;(?=(?:[^']*'[^']*')*[^']*$)(?!(?:[^]*BEGIN[^]*?END)*[^]*?END)/gi)
                    .filter(query => query.trim() !== '');

                for (const query of queries) {
                    await db.execute(query);
                }

                console.log("Database created. Seeding initial data...");

                const userUuid = crypto.randomUUID();
                const workspaceUuid = crypto.randomUUID();
                const noteUuid = crypto.randomUUID();
                const subnoteUuid = crypto.randomUUID();

                await db.execute(
                    "INSERT INTO USERS (user_id, username, email) VALUES ($1, $2, $3)",
                    [userUuid, "User", "local@graphite.app"]
                );

                await db.execute(
                    "INSERT INTO WORKSPACES (workspace_id, owner_id, name) VALUES ($1, $2, $3)",
                    [workspaceUuid, userUuid, "Personal"]
                );

                const lang = i18next.language?.split('-')[0] || 'en';
                const localizedContent = getWelcomeNote(lang);
                const welcome = localizedContent.welcome_note;
                const subnote = localizedContent.subnote;

                await db.execute(
                    `INSERT INTO NOTES (note_id, workspace_id, title, content, note_path, icon, is_dirty) 
                     VALUES ($1, $2, $3, $4, $5, $6, 0)`,
                    [
                        noteUuid,
                        workspaceUuid,
                        welcome.title,
                        welcome.body,
                        "/" + welcome.title,
                        welcome.icon
                    ]
                );

                await db.execute(
                    `INSERT INTO NOTES (note_id, parent_id, workspace_id, title, content, note_path, icon, is_dirty) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, 0)`,
                    [
                        subnoteUuid,
                        noteUuid,
                        workspaceUuid,
                        subnote.title,
                        subnote.body,
                        "/" + welcome.title + "/" + subnote.title,
                        subnote.icon
                    ]
                );

                console.log("Database correctly initialized and seeded 🚀");
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