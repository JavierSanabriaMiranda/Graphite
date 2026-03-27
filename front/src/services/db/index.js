import Database from '@tauri-apps/plugin-sql';
import setupScript from './setup.sql?raw';

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
    let i = 0;

    while (i < sqlScript.length) {
        const char = sqlScript[i];

        // 1. Handle single-line comments (-- comment)
        // If we find '--' and we are not inside a string, skip until newline
        if (!inString && char === '-' && sqlScript[i + 1] === '-') {
            while (i < sqlScript.length && sqlScript[i] !== '\n') {
                i++;
            }
            continue;
        }

        // 2. Handle strings ('text')
        if (char === "'") {
            inString = !inString;
        }

        // 3. Handle BEGIN/END blocks (case insensitive)
        if (!inString) {
            const nextFive = sqlScript.substring(i, i + 5).toUpperCase();
            const nextThree = sqlScript.substring(i, i + 3).toUpperCase();

            if (nextFive === 'BEGIN') {
                blockLevel++;
                currentStatement += nextFive;
                i += 5;
                continue;
            } else if (nextThree === 'END') {
                blockLevel--;
                currentStatement += nextThree;
                i += 3;
                continue;
            }
        }

        // 4. Split logic (Semicolon)
        if (char === ';' && !inString && blockLevel <= 0) {
            if (currentStatement.trim()) {
                statements.push(currentStatement.trim());
            }
            currentStatement = '';
        } else {
            currentStatement += char;
        }

        i++;
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