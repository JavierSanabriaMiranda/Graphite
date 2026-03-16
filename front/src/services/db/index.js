import Database from '@tauri-apps/plugin-sql';
import setupScript from './setup.sql?raw';
import { getWelcomeNote } from './pre_designed_pages/welcomeContent';
import i18next from 'i18next';

let db = null;

/**
 * Safely splits SQL commands by semicolon, ignoring semicolons inside
 * single quotes and BEGIN...END blocks to prevent ReDoS attacks.
 * * @param {string} sqlScript - The full SQL setup script
 * @returns {string[]} Array of individual SQL statements
 */
const splitSqlCommands = (sqlScript) => {
    const statements = [];
    let currentStatement = '';
    let inString = false;
    let blockLevel = 0;

    // Remove SQL comments to avoid confusion during parsing
    const cleanScript = sqlScript.replace(/--.*$/gm, '');

    for (let i = 0; i < cleanScript.length; i++) {
        const char = cleanScript[i];

        // Check for strings
        if (char === "'") {
            inString = !inString;
        }

        // Check for BEGIN/END blocks (case insensitive)
        if (!inString) {
            const nextFive = cleanScript.substring(i, i + 5).toUpperCase();
            const nextThree = cleanScript.substring(i, i + 3).toUpperCase();

            if (nextFive === 'BEGIN') {
                blockLevel++;
            } else if (nextThree === 'END') {
                blockLevel--;
            }
        }

        // Split logic
        if (char === ';' && !inString && blockLevel <= 0) {
            if (currentStatement.trim()) {
                statements.push(currentStatement.trim());
            }
            currentStatement = '';
        } else {
            currentStatement += char;
        }
    }

    if (currentStatement.trim()) {
        statements.push(currentStatement.trim());
    }

    return statements;
};

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

                const queries = splitSqlCommands(setupScript);

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