import { describe, it, expect, vi, beforeEach } from 'vitest';
import Database from '@tauri-apps/plugin-sql';

// 1. Mock de las dependencias
vi.mock('@tauri-apps/plugin-sql', () => ({
    default: {
        load: vi.fn(),
    },
}));

vi.mock('i18next', () => ({
    default: { language: 'en' },
}));

// Mock del script SQL con el mismo nombre que el import real
vi.mock('../../../src/services/db/setup.sql?raw', () => ({
    default: "CREATE TABLE USERS; -- un punto y coma;\nINSERT INTO T1 VALUES ('hello;world');"
}));

describe('Database Service', () => {
    let mockDb;
    let dbService;

    beforeEach(async () => {
        vi.resetModules();
        vi.clearAllMocks();

        dbService = await import('../../../src/services/db/index'); 

        mockDb = {
            execute: vi.fn().mockResolvedValue({}),
            select: vi.fn().mockResolvedValue([]),
        };
        Database.load.mockResolvedValue(mockDb);
        
        global.crypto.randomUUID = vi.fn().mockReturnValue('mock-uuid');
    });

    describe('splitSqlCommands Logic', () => {
        it('should correctly ignore semicolons in strings and comments', async () => {
            // Simulates table doesn't exist
            mockDb.select.mockResolvedValueOnce([]); 

            await dbService.initializeDB();
        
            // verify queries
            expect(mockDb.execute).toHaveBeenCalledWith("PRAGMA foreign_keys = ON;");
            expect(mockDb.execute).toHaveBeenCalledWith("CREATE TABLE USERS");
            expect(mockDb.execute).toHaveBeenCalledWith("INSERT INTO T1 VALUES ('hello;world')");
        });
    });

    describe('initializeDB', () => {
        it('should seed data if USERS table does not exist', async () => {
            mockDb.select.mockResolvedValueOnce([]); 

            await dbService.initializeDB();

            expect(Database.load).toHaveBeenCalledWith('sqlite:graphite.db');
            
            // Verify initail user was inserted
            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO USERS"),
                ['mock-uuid', 'User', 'local@graphite.app']
            );
        });

        it('should throw and log error if initialization fails', async () => {
            // Force error before call
            Database.load.mockRejectedValueOnce(new Error('Load Failed'));
            
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            await expect(dbService.initializeDB()).rejects.toThrow('Load Failed');
            
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('getDB', () => {
        it('should return existing db instance if already loaded', async () => {
            const db1 = await dbService.getDB();
            const db2 = await dbService.getDB();

            expect(Database.load).toHaveBeenCalledTimes(1);
            expect(db1).toBe(db2);
        });
    });
});