import { describe, it, expect, vi, beforeEach } from 'vitest';
import { syncService } from '../../../src/services/db/syncService';
import { getDB } from '../../../src/services/db';

vi.mock('../../../src/services/db/index', () => ({
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
        it('should successfully purge deleted and synced rows', async () => {
            // Mocking return values for execute (mimicking rowsAffected)
            mockDb.execute
                .mockResolvedValueOnce({ rowsAffected: 5 })  // Notes deleted
                .mockResolvedValueOnce({ rowsAffected: 2 }); // Workspaces deleted

            const result = await syncService.purgeSyncedDeletes();

            // Verify SQL execution
            expect(mockDb.execute).toHaveBeenCalledWith(
                "DELETE FROM NOTES WHERE is_deleted = 1 AND is_dirty = 0"
            );
            expect(mockDb.execute).toHaveBeenCalledWith(
                "DELETE FROM WORKSPACES WHERE is_deleted = 1 AND is_dirty = 0"
            );

            // Verify result mapping
            expect(result).toEqual({
                notes: 5,
                workspaces: 2
            });
        });

        it('should log and re-throw error if database execution fails', async () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
            const dbError = new Error("Disk Full");
            mockDb.execute.mockRejectedValue(dbError);

            await expect(syncService.purgeSyncedDeletes()).rejects.toThrow("Disk Full");

            expect(consoleSpy).toHaveBeenCalledWith(
                "Error while database purge",
                dbError
            );

            consoleSpy.mockRestore();
        });
    });

    describe('getPendingUploads', () => {
        it('should fetch all rows marked as dirty', async () => {
            const mockNotes = [{ note_id: '1', title: 'Dirty Note' }];
            const mockWorkspaces = [{ workspace_id: '1', name: 'Dirty Workspace' }];

            mockDb.select
                .mockResolvedValueOnce(mockNotes)
                .mockResolvedValueOnce(mockWorkspaces);

            const result = await syncService.getPendingUploads();

            // Verify queries
            expect(mockDb.select).toHaveBeenCalledWith("SELECT * FROM NOTES WHERE is_dirty = 1");
            expect(mockDb.select).toHaveBeenCalledWith("SELECT * FROM WORKSPACES WHERE is_dirty = 1");

            // Verify structure
            expect(result.notes).toEqual(mockNotes);
            expect(result.workspaces).toEqual(mockWorkspaces);
        });
    });
});