import { describe, it, expect, vi, beforeEach } from 'vitest';
import { syncService } from '../../../src/services/db/syncService';
import { getDB } from '../../../src/services/db';
import { remoteNoteService, remoteWorkspaceService, remoteNoteLinkService, remoteAttachmentService } from '../../../src/services/api';
import { encryptData, decryptData } from '../../../src/util/crypto';
import { noteService } from '../../../src/services/db/noteService';
import { noteLinkService } from '../../../src/services/db/noteLinkService';
import { SyncStatus } from '../../../src/util/SyncStatus';
import { invoke } from "@tauri-apps/api/core";

vi.mock('../../../src/services/db', () => ({
    getDB: vi.fn(),
}));

vi.mock('../../../src/services/api', () => ({
    remoteNoteService: {
        getRemoteNoteMetadata: vi.fn(),
        getRemoteNoteContent: vi.fn(),
        updateRemoteNote: vi.fn(),
        getRemoteMetadataByParent: vi.fn().mockResolvedValue([]),
        getRemoteMetadataByWorkspace: vi.fn().mockResolvedValue([]),
    },
    remoteWorkspaceService: {
        upsertRemoteWorkspace: vi.fn(),
        getAllRemoteWorkspaces: vi.fn().mockResolvedValue([]),
    },
    remoteNoteLinkService: {
        updateRemoteLinks: vi.fn(),
        getRemoteNoteGraph: vi.fn(),
        getRemoteLinksByWorkspace: vi.fn().mockResolvedValue([]),
    },
    remoteAttachmentService: {
        checkAttachment: vi.fn(),
        getMetadataAndDownloadUrl: vi.fn(),
        deleteRemoteAttachment: vi.fn(),
    },
}));

vi.mock('../../../src/util/crypto', () => ({
    encryptData: vi.fn(),
    decryptData: vi.fn(),
}));

vi.mock('@tauri-apps/api/core', () => ({
    invoke: vi.fn(),
}));

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        incrementVersion: vi.fn(),
        setConflict: vi.fn(),
    },
}));

vi.mock('../../../src/services/db/noteLinkService', () => ({
    noteLinkService: {
        getLinksBySource: vi.fn().mockResolvedValue([]),
    },
}));

describe('syncService - Full Integration Suite', () => {
    let mockDb;
    const mockDek = new Uint8Array(32);

    beforeEach(() => {
        vi.clearAllMocks();

        mockDb = {
            select: vi.fn().mockResolvedValue([]),
            execute: vi.fn().mockResolvedValue({ rowsAffected: 0 }),
        };
        getDB.mockResolvedValue(mockDb);

        Object.defineProperty(navigator, 'onLine', {
            writable: true,
            value: true,
        });
    });

    // --- ORCHESTRATION & SYNC PENDING DATA ---

    describe('syncPendingData', () => {
        it('should encrypt note metadata and content separately before pushing', async () => {
            const dirtyNote = { 
                note_id: 'n1', title: 'T', content: 'C', 
                workspace_id: 'w1', is_dirty: 1, created_at: '2026-01-01', updated_at: '2026-01-01' 
            };
            
            mockDb.select.mockResolvedValueOnce([dirtyNote]) // notes
                         .mockResolvedValueOnce([])          // workspaces
                         .mockResolvedValueOnce([]);         // attachments
            
            encryptData.mockResolvedValue({ ciphertext: 'cipher', iv: 'iv' });
            remoteNoteService.updateRemoteNote.mockResolvedValue({ 
                ok: true, 
                json: () => ({ newVersion: 2 }) 
            });
            noteLinkService.getLinksBySource.mockResolvedValue([]);

            await syncService.syncPendingData(mockDek);

            // Verifies Zero-Knowledge: Metadata and Content are encrypted independently
            expect(encryptData).toHaveBeenCalledTimes(2);
            expect(remoteNoteService.updateRemoteNote).toHaveBeenCalled();
            expect(noteService.incrementVersion).toHaveBeenCalledWith('n1', 2);
        });

        it('should handle server conflicts (409) by downloading remote state and marking conflict', async () => {
            const dirtyNote = { note_id: 'n1', is_dirty: 1 };
            mockDb.select.mockResolvedValueOnce([dirtyNote]).mockResolvedValue([]);
            
            remoteNoteService.updateRemoteNote.mockResolvedValue({ ok: false, status: 409 });
            remoteNoteService.getRemoteNoteContent.mockResolvedValue({ encryptedPayload: 'rem-c', iv: 'iv' });
            remoteNoteService.getRemoteNoteMetadata.mockResolvedValue({ 
                encryptedMetadata: 'rem-m', metadataIv: 'iv', noteVersion: 5 
            });
            
            decryptData.mockResolvedValueOnce('{"title":"Remote Title"}').mockResolvedValueOnce('Remote Content');

            await syncService.syncPendingData(mockDek);

            expect(noteService.setConflict).toHaveBeenCalledWith(
                'n1', 'Remote Title', undefined, 'Remote Content', 5
            );
        });
    });

    // --- ATTACHMENT SYNC LOGIC ---

    describe('Attachment Sync', () => {
        it('should sync attachments by calculating checksums with Rust and calling remote check', async () => {
            const dirtyAtt = { 
                attachment_id: 'a1', local_path: '/path/file.png', 
                is_deleted: 0, file_size: 100, is_dirty: 1 
            };
            mockDb.select.mockResolvedValueOnce([]).mockResolvedValueOnce([]).mockResolvedValueOnce([dirtyAtt]);

            invoke.mockResolvedValueOnce('checksum-123'); 
            remoteAttachmentService.checkAttachment.mockResolvedValue({ needsUpload: true, uploadUrl: 'http://url' });

            await syncService.syncPendingData(mockDek);

            expect(invoke).toHaveBeenCalledWith('calculate_attachment_checksum', { path: dirtyAtt.local_path });
            expect(invoke).toHaveBeenCalledWith('upload_to_azure', expect.any(Object));
        });

        it('should inform remote server about attachment deletions', async () => {
            const deletedAtt = { attachment_id: 'a-del', is_deleted: 1, is_dirty: 1 };
            mockDb.select.mockResolvedValueOnce([]).mockResolvedValueOnce([]).mockResolvedValueOnce([deletedAtt]);

            await syncService.syncPendingData(mockDek);

            expect(remoteAttachmentService.deleteRemoteAttachment).toHaveBeenCalledWith('a-del');
        });
    });

    // --- METADATA & CONTENT PULL ---

    describe('getNoteWithSync', () => {
        it('should return OFFLINE_STALE when offline and content exists locally', async () => {
            navigator.onLine = false;
            mockDb.select.mockResolvedValue([{ note_id: 'n1', content: 'Local' }]);

            const result = await syncService.getNoteWithSync('n1', mockDek);
            expect(result.status).toBe(SyncStatus.OFFLINE_STALE);
        });

        it('should detect conflict when opening a dirty note with a newer remote version', async () => {
            const localNote = { note_id: 'n1', content: 'Local', note_version: 1, is_dirty: 1 };
            const remoteMeta = { noteVersion: 2, encryptedMetadata: 'meta', metadataIv: 'iv' };
            
            mockDb.select.mockResolvedValue([localNote]);
            remoteNoteService.getRemoteNoteMetadata.mockResolvedValue(remoteMeta);
            remoteNoteService.getRemoteNoteContent.mockResolvedValue({ encryptedPayload: 'remote', iv: 'iv' });
            
            decryptData.mockResolvedValueOnce('Remote Content')
                       .mockResolvedValueOnce('{"title":"Remote", "icon":""}');

            const result = await syncService.getNoteWithSync('n1', mockDek);

            expect(result.status).toBe(SyncStatus.CONFLICT);
            expect(noteService.setConflict).toHaveBeenCalled();
        });
    });

    describe('downloadAttachment', () => {
        it('should coordinate metadata fetch, Rust download, and DB registration', async () => {
            const remoteInfo = { 
                fileName: 'doc.pdf', downloadUrl: 'http://sas', 
                noteId: 'n1', fileSize: 500 
            };
            remoteAttachmentService.getMetadataAndDownloadUrl.mockResolvedValue(remoteInfo);
            invoke.mockResolvedValueOnce('/app/attachments').mockResolvedValueOnce(true);

            const result = await syncService.downloadAttachment('att-1');

            expect(result).toContain('/app/attachments/att-1.pdf');
            expect(mockDb.execute).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO ATTACHMENTS'), expect.any(Array));
        });
    });

    // --- PURGE & CLEANUP ---

    describe('purgeSyncedDeletes', () => {
        it('should purge deleted notes that are already clean (synced)', async () => {
            mockDb.select.mockResolvedValue([]); 

            await syncService.purgeSyncedDeletes();

            expect(mockDb.execute).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM NOTES"));
            expect(mockDb.execute).toHaveBeenCalledWith("DELETE FROM WORKSPACES WHERE is_deleted = 1 AND is_dirty = 0");
        });

        it('should call Rust to delete physical files from disk during purge', async () => {
            const syncedDeleteAtt = { attachment_id: 'a1', local_path: '/old/file.png', is_deleted: 1, is_dirty: 0 };
            mockDb.select.mockResolvedValueOnce([syncedDeleteAtt]);

            await syncService.purgeSyncedDeletes();

            expect(invoke).toHaveBeenCalledWith('delete_attachment_file', { filePath: '/old/file.png' });
            expect(mockDb.execute).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM ATTACHMENTS"), ['a1']);
        });
    });
});