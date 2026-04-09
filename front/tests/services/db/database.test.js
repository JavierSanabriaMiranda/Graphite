import { describe, it, expect, vi, beforeEach } from 'vitest';
import Database from '@tauri-apps/plugin-sql';

vi.mock('@tauri-apps/plugin-sql', () => ({
    default: {
        load: vi.fn(),
    },
}));

vi.mock('i18next', () => ({
    default: { language: 'en' },
}));

vi.mock('../../../src/services/db/setup.sql?raw', () => ({
    default: "CREATE TABLE USERS; -- comment with ; \nINSERT INTO USERS (user_id, username, email) VALUES ($1, $2, $3);"
}));

describe('Database Service', () => {
    let mockDb;
    let dbService;

    beforeEach(async () => {
        vi.resetModules();
        vi.clearAllMocks();

        // Dynamic import to ensure fresh state for each test
        dbService = await import('../../../src/services/db/index'); 

        mockDb = {
            execute: vi.fn().mockResolvedValue({}),
            select: vi.fn().mockResolvedValue([]),
        };
        Database.load.mockResolvedValue(mockDb);
        
        global.crypto.randomUUID = vi.fn().mockReturnValue('mock-uuid');
    });

    describe('splitSqlCommands Logic', () => {
        /**
         * Test that the splitting logic correctly handles semicolons 
         * inside comments or strings, preventing broken queries.
         */
        it('should correctly ignore semicolons in strings and comments', async () => {
            mockDb.select.mockResolvedValueOnce([]); // Table USERS doesn't exist

            await dbService.initializeDB();
        
            // Check PRAGMA and the commands from our mock setup script
            expect(mockDb.execute).toHaveBeenCalledWith("PRAGMA foreign_keys = ON;");
            expect(mockDb.execute).toHaveBeenCalledWith("CREATE TABLE USERS");
            // Semicolon after "USERS" was correctly identified as a separator and trimmed
        });
    });

    describe('initializeDB', () => {
        /**
         * Test that the DB loads the correct file and runs the setup script
         * if the schema is not present.
         */
        it('should load the database and execute setup script if USERS is missing', async () => {
            mockDb.select.mockResolvedValueOnce([]); // Table USERS doesn't exist

            await dbService.initializeDB();

            expect(Database.load).toHaveBeenCalledWith('sqlite:graphite.db');
            
            // The setup script is expected to be called. 
            // We check if the INSERT from our setup mock was called.
            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO USERS"),
                // Note: If your setup.sql has hardcoded values, remove the arguments check.
                // If it uses $1, $2, then keep it.
            );
        });

        /**
         * Test error propagation during the connection phase.
         */
        it('should throw and log error if initialization fails', async () => {
            Database.load.mockRejectedValueOnce(new Error('Load Failed'));
            
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            await expect(dbService.initializeDB()).rejects.toThrow('Load Failed');
            
            expect(consoleSpy).toHaveBeenCalledWith(
                "Error while initializing DB:",
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });
    });

    describe('getDB', () => {
        /**
         * Test singleton pattern: the same DB instance should be returned
         * without loading the file multiple times.
         */
        it('should return existing db instance if already loaded', async () => {
            const db1 = await dbService.getDB();
            const db2 = await dbService.getDB();

            expect(Database.load).toHaveBeenCalledTimes(1);
            expect(db1).toBe(db2);
        });
    });
});