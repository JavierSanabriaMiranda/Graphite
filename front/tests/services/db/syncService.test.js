import { describe, it, expect, vi, beforeEach } from 'vitest';
import { syncService } from '../../../src/services/db/syncService';
import { getDB } from '../../../src/services/db';
import { remoteNoteService, remoteWorkspaceService } from '../../../src/services/api';
import { encryptData, decryptData } from '../../../src/util/crypto';
import { noteService } from '../../../src/services/db/noteService';
import { SyncStatus } from '../../../src/util/SyncStatus';

vi.mock('../../../src/services/db', () => ({
    getDB: vi.fn(),
}));

vi.mock('../../../src/services/api', () => ({
    remoteNoteService: {
        getRemoteNoteMetadata: vi.fn(),
        getRemoteNoteContent: vi.fn(),
        updateRemoteNote: vi.fn(),
        getRemoteMetadataByParent: vi.fn(),
        getRemoteMetadataByWorkspace: vi.fn(),
        getAllRemoteWorkspaces: vi.fn(),
    },
    remoteWorkspaceService: {
        upsertRemoteWorkspace: vi.fn(),
        getAllRemoteWorkspaces: vi.fn(),
    },
}));

vi.mock('../../../src/util/crypto', () => ({
    encryptData: vi.fn(),
    decryptData: vi.fn(),
}));

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        incrementVersion: vi.fn(),
        setConflict: vi.fn(),
    },
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

        // Mock navigator.onLine
        Object.defineProperty(navigator, 'onLine', {
            writable: true,
            value: true,
        });
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

    describe('pullAllMetadata', () => {
        it('should return early if dek is not provided', async () => {
            await syncService.pullAllMetadata(null, 'user-1');

            expect(remoteWorkspaceService.getAllRemoteWorkspaces).not.toHaveBeenCalled();
        });

        it('should download and save workspaces and notes from remote', async () => {
            const dek = new Uint8Array(32);
            const userId = 'user-1';
            const remoteWorkspaces = [
                {
                    workspaceId: 'ws-1',
                    encryptedPayload: 'encrypted-name',
                    iv: 'iv-1',
                    isDeleted: false,
                    updatedAt: '2024-01-01',
                }
            ];

            remoteWorkspaceService.getAllRemoteWorkspaces.mockResolvedValue(remoteWorkspaces);
            remoteNoteService.getRemoteMetadataByWorkspace.mockResolvedValue([]);
            decryptData.mockResolvedValue('{"name":"My Workspace","icon":"📓"}');

            await syncService.pullAllMetadata(dek, userId);

            expect(remoteWorkspaceService.getAllRemoteWorkspaces).toHaveBeenCalled();
            expect(mockDb.execute).toHaveBeenCalled();
        });

        it('should handle errors gracefully during metadata pull', async () => {
            const dek = new Uint8Array(32);
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
            remoteWorkspaceService.getAllRemoteWorkspaces.mockRejectedValue(new Error('Network Error'));

            await syncService.pullAllMetadata(dek, 'user-1');

            expect(consoleSpy).toHaveBeenCalledWith(
                'Error pulling metadata:',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });
    });

    describe('getNoteWithSync - Offline Scenarios', () => {
        beforeEach(() => {
            navigator.onLine = false;
        });

        it('should return OFFLINE_STALE when offline and note has content', async () => {
            const dek = new Uint8Array(32);
            const localNote = { note_id: 'n1', content: 'Some content', note_version: 1 };
            mockDb.select.mockResolvedValue([localNote]);

            const result = await syncService.getNoteWithSync('n1', dek);

            expect(result.status).toBe(SyncStatus.OFFLINE_STALE);
            expect(result.note).toEqual(localNote);
        });

        it('should return OFFLINE_EMPTY when offline and note has no content', async () => {
            const dek = new Uint8Array(32);
            const localNote = { note_id: 'n1', content: null, note_version: 1 };
            mockDb.select.mockResolvedValue([localNote]);

            const result = await syncService.getNoteWithSync('n1', dek);

            expect(result.status).toBe(SyncStatus.OFFLINE_EMPTY);
            expect(result.note).toEqual(localNote);
        });
    });

    describe('getNoteWithSync - Online Scenarios', () => {
        beforeEach(() => {
            navigator.onLine = true;
        });

        it('should return ONLINE when note exists locally and remotely without conflicts', async () => {
            const dek = new Uint8Array(32);
            const localNote = { note_id: 'n1', content: 'Local', note_version: 1, is_dirty: 0 };
            const remoteMeta = { noteVersion: 1 };

            mockDb.select.mockResolvedValue([localNote]);
            remoteNoteService.getRemoteNoteMetadata.mockResolvedValue(remoteMeta);

            const result = await syncService.getNoteWithSync('n1', dek);

            expect(result.status).toBe(SyncStatus.ONLINE);
            expect(result.note).toEqual(localNote);
        });

        it('should use remote version when local is clean and has missing content', async () => {
            const dek = new Uint8Array(32);
            const localNote = { note_id: 'n1', content: null, note_version: 1, is_dirty: 0 };
            const remoteMeta = {
                noteVersion: 2,
                updatedAt: '2024-01-15',
            };

            mockDb.select
                .mockResolvedValueOnce([localNote])
                .mockResolvedValueOnce([{ ...localNote, content: 'Downloaded', note_version: 2 }]);
            remoteNoteService.getRemoteNoteMetadata.mockResolvedValue(remoteMeta);
            remoteNoteService.getRemoteNoteContent.mockResolvedValue({
                encryptedPayload: 'enc',
                iv: 'iv'
            });
            remoteNoteService.getRemoteMetadataByParent.mockResolvedValue([]);
            decryptData.mockResolvedValue('Downloaded');

            const result = await syncService.getNoteWithSync('n1', dek);

            expect(result.status).toBe(SyncStatus.ONLINE);
            expect(result.note.content).toBe('Downloaded');
        });

        it('should return OFFLINE_STALE when note does not exist remotely but exists locally', async () => {
            const dek = new Uint8Array(32);
            const localNote = { note_id: 'n1', content: 'Local', note_version: 1 };
            mockDb.select.mockResolvedValue([localNote]);
            remoteNoteService.getRemoteNoteMetadata.mockResolvedValue(null);

            const result = await syncService.getNoteWithSync('n1', dek);

            expect(result.status).toBe(SyncStatus.OFFLINE_STALE);
            expect(result.note).toEqual(localNote);
        });

        it('should update local note when clean and remote version is newer', async () => {
            const dek = new Uint8Array(32);
            const localNote = { note_id: 'n1', content: null, note_version: 1, is_dirty: 0 };
            const remoteMeta = {
                noteVersion: 3,
                updatedAt: '2024-01-15',
            };
            const remoteContent = { encryptedPayload: 'enc-payload', iv: 'iv' };

            mockDb.select
                .mockResolvedValueOnce([localNote])
                .mockResolvedValueOnce([{ ...localNote, content: 'Downloaded content', note_version: 3 }]);
            remoteNoteService.getRemoteNoteMetadata.mockResolvedValue(remoteMeta);
            remoteNoteService.getRemoteNoteContent.mockResolvedValue(remoteContent);
            remoteNoteService.getRemoteMetadataByParent.mockResolvedValue([]);
            decryptData.mockResolvedValue('Downloaded content');

            const result = await syncService.getNoteWithSync('n1', dek);

            expect(result.status).toBe(SyncStatus.ONLINE);
            expect(result.note.content).toBe('Downloaded content');
            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE NOTES SET content'),
                expect.arrayContaining(['Downloaded content', 'n1'])
            );
        });

        it('should handle network errors and fallback to offline status', async () => {
            const dek = new Uint8Array(32);
            const localNote = { note_id: 'n1', content: 'Local', note_version: 1, is_dirty: 0 };
            mockDb.select.mockResolvedValue([localNote]);
            remoteNoteService.getRemoteNoteMetadata.mockRejectedValue(new Error('Network failed'));

            const result = await syncService.getNoteWithSync('n1', dek);

            expect(result.status).toBe(SyncStatus.OFFLINE_STALE);
            expect(result.note).toEqual(localNote);
        });
    });
});