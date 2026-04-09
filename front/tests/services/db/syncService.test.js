import { describe, it, expect, vi, beforeEach } from 'vitest';
import { syncService } from '../../../src/services/db/syncService';
import { getDB } from '../../../src/services/db';

vi.mock('../../../src/services/db', () => ({
    getDB: vi.fn(),
}));

describe('syncService Suite', () => {
    let mockDb;

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup the mock DB interface
        mockDb = {
            select: vi.fn(),
            execute: vi.fn(),
        };
        getDB.mockResolvedValue(mockDb);
    });

    describe('purgeSyncedDeletes', () => {
        /**
         * Test that the purge logic correctly identifies rows that are 
         * both deleted and already synced (clean).
         */
        it('should successfully purge deleted and synced rows using the complex conflict-aware query', async () => {
            // Mocking return values for execute
            mockDb.execute
                .mockResolvedValueOnce({ rowsAffected: 5 })  // Notes deleted
                .mockResolvedValueOnce({ rowsAffected: 2 }); // Workspaces deleted

            const result = await syncService.purgeSyncedDeletes();

            // Use expect.stringContaining to avoid failing due to indentation/new lines in the SQL template literal
            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("DELETE FROM NOTES")
            );
            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("conflict_content IS NOT NULL")
            );
            expect(mockDb.execute).toHaveBeenCalledWith(
                "DELETE FROM WORKSPACES WHERE is_deleted = 1 AND is_dirty = 0"
            );
        });

        /**
         * Test that database errors are caught and logged without crashing the app,
         * as per the current service implementation (which has an internal try/catch).
         */
        it('should log an error if database execution fails during purge', async () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
            const dbError = new Error("Disk Full");
            mockDb.execute.mockRejectedValue(dbError);

            // Note: The service currently swallows the error with try/catch, 
            // so we check for the log instead of a rejection.
            await syncService.purgeSyncedDeletes();

            expect(consoleSpy).toHaveBeenCalledWith(
                "Error while database purge:",
                dbError
            );

            consoleSpy.mockRestore();
        });
    });

    describe('getPendingUploads', () => {
        /**
         * Test that the service retrieves all entities marked as 'dirty'
         * (unsynced changes).
         */
        it('should fetch all rows marked as dirty from notes and workspaces', async () => {
            const mockNotes = [{ note_id: '1', title: 'Dirty Note' }];
            const mockWorkspaces = [{ workspace_id: '1', name: 'Dirty Workspace' }];

            mockDb.select
                .mockResolvedValueOnce(mockNotes)
                .mockResolvedValueOnce(mockWorkspaces);

            const result = await syncService.getPendingUploads();

            expect(mockDb.select).toHaveBeenCalledWith("SELECT * FROM NOTES WHERE is_dirty = 1");
            expect(mockDb.select).toHaveBeenCalledWith("SELECT * FROM WORKSPACES WHERE is_dirty = 1");

            expect(result.notes).toEqual(mockNotes);
            expect(result.workspaces).toEqual(mockWorkspaces);
        });
    });

    describe('markAsClean', () => {
        it('should update is_dirty flag to 0 for a note', async () => {
            await syncService.markAsClean('NOTES', 'note_id', 'n1');

            expect(mockDb.execute).toHaveBeenCalledWith(
                "UPDATE NOTES SET is_dirty = 0 WHERE note_id = ?",
                ['n1']
            );
        });

        it('should update is_dirty flag to 0 for a workspace', async () => {
            await syncService.markAsClean('WORKSPACES', 'workspace_id', 'ws1');

            expect(mockDb.execute).toHaveBeenCalledWith(
                "UPDATE WORKSPACES SET is_dirty = 0 WHERE workspace_id = ?",
                ['ws1']
            );
        });
    });

    describe('syncPendingData', () => {
        it('should return early if dek is not provided', async () => {
            const result = await syncService.syncPendingData(null);

            expect(result).toBeUndefined();
            expect(mockDb.select).not.toHaveBeenCalled();
        });

        it('should call purgeSyncedDeletes after syncing', async () => {
            const dek = new Uint8Array(32);
            vi.spyOn(syncService, 'getPendingUploads').mockResolvedValue({
                notes: [],
                workspaces: []
            });

            await syncService.syncPendingData(dek);

            expect(mockDb.execute).toHaveBeenCalled();
            vi.restoreAllMocks();
        });
    });
});