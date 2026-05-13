import { describe, it, expect, vi, beforeEach } from 'vitest';
import { attachmentService } from '../../../src/services/db/attachmentService';
import { getDB } from '../../../src/services/db/index';

vi.mock('../../../src/services/db/index', () => ({
    getDB: vi.fn(),
}));

describe('attachmentService - Local SQLite Operations', () => {
    let dbMock;

    beforeEach(() => {
        vi.clearAllMocks();

        // Standard mock for the database connection
        dbMock = {
            execute: vi.fn().mockResolvedValue({ rowsAffected: 1 }),
            select: vi.fn().mockResolvedValue([]),
        };
        getDB.mockResolvedValue(dbMock);
    });

    /**
     * Test: Registration of a new attachment
     */
    it('should insert a new attachment and set is_dirty to 1', async () => {
        const mockData = {
            attachment_id: 'att-123',
            note_id: 'note-456',
            file_name: 'photo.jpg',
            mime_type: 'image/jpeg',
            file_size: 1024,
            local_path: '/path/to/photo.jpg',
            img_width: 800
        };

        await attachmentService.create(mockData);

        expect(dbMock.execute).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO ATTACHMENTS'),
            expect.arrayContaining([
                mockData.attachment_id,
                mockData.note_id,
                mockData.file_name,
                mockData.mime_type,
                mockData.file_size,
                800,
                mockData.local_path
            ])
        );
        
        // Ensure is_dirty is always set to 1 on creation
        const sql = dbMock.execute.mock.calls[0][0];
        expect(sql).toContain('1)'); 
    });

    /**
     * Test: Fetching attachments for a note
     */
    it('should fetch non-deleted attachments for a specific note', async () => {
        const noteId = 'note-123';
        const mockResults = [{ attachment_id: 'a1' }, { attachment_id: 'a2' }];
        dbMock.select.mockResolvedValue(mockResults);

        const result = await attachmentService.getByNoteId(noteId);

        expect(dbMock.select).toHaveBeenCalledWith(
            expect.stringContaining('WHERE note_id = $1 AND is_deleted = 0'),
            [noteId]
        );
        expect(result).toEqual(mockResults);
    });

    /**
     * Test: Fetching a single attachment by ID
     */
    it('should return a single attachment record or null if not found', async () => {
        dbMock.select.mockResolvedValueOnce([{ attachment_id: 'a1' }]);
        const found = await attachmentService.getById('a1');
        expect(found.attachment_id).toBe('a1');

        dbMock.select.mockResolvedValueOnce([]);
        const notFound = await attachmentService.getById('ghost');
        expect(notFound).toBeNull();
    });

    /**
     * Test: Dynamic Update logic
     */
    it('should build a dynamic update query and mark the record as dirty', async () => {
        const attachmentId = 'att-1';
        const updateData = { file_name: 'new_name.png' };

        await attachmentService.update(attachmentId, updateData);

        // Check if SQL contains the updated fields and the is_dirty flag
        const sql = dbMock.execute.mock.calls[0][0];
        const values = dbMock.execute.mock.calls[0][1];

        expect(sql).toContain('UPDATE ATTACHMENTS SET');
        expect(sql).toContain('file_name = $1');
        expect(sql).toContain('is_dirty = $2');
        expect(sql).toContain('updated_at = $3');
        
        // Ensure attachmentId is the last parameter for the WHERE clause
        expect(values[values.length - 1]).toBe(attachmentId);
    });

    /**
     * Test: Logical deletion
     */
    it('should perform a logical deletion by setting is_deleted flag', async () => {
        const id = 'att-delete';
        await attachmentService.delete(id);

        expect(dbMock.execute).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE ATTACHMENTS SET is_deleted = 1, is_dirty = 1'),
            [id]
        );
    });

    /**
     * Test: Sync logic (getNotSynced)
     */
    it('should retrieve only records marked as dirty', async () => {
        await attachmentService.getNotSynced();
        expect(dbMock.select).toHaveBeenCalledWith(
            expect.stringContaining('WHERE is_dirty = 1')
        );
    });

    /**
     * Test: Sync logic (markAsSynced)
     */
    it('should clear the is_dirty flag after sync', async () => {
        const id = 'att-synced';
        await attachmentService.markAsSynced(id);

        expect(dbMock.execute).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE ATTACHMENTS SET is_dirty = 0'),
            [id]
        );
    });
});