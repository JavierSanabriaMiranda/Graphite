import { describe, it, expect, vi, beforeEach } from 'vitest';
import { noteLinkService } from '../../../src/services/db/noteLinkService';
import { getDB } from '../../../src/services/db/index';

vi.mock('../../../src/services/db/index', () => ({
    getDB: vi.fn(),
}));

describe('noteLinkService - Note Relationships', () => {
    let dbMock;

    beforeEach(() => {
        vi.clearAllMocks();

        dbMock = {
            execute: vi.fn().mockResolvedValue({ rowsAffected: 1 }),
            select: vi.fn().mockResolvedValue([]),
        };
        getDB.mockResolvedValue(dbMock);
    });

    /**
     * Test: Updating links (Full cycle)
     */
    it('should delete existing links and insert new unique targets', async () => {
        const sourceId = 'note-A';
        const targetIds = ['note-B', 'note-C', 'note-B']; // Includes a duplicate

        await noteLinkService.updateLinks(sourceId, targetIds);

        // Verify deletion of old links
        expect(dbMock.execute).toHaveBeenCalledWith(
            "DELETE FROM NOTE_LINKS WHERE source_id = $1",
            [sourceId]
        );

        // Verify insertion of unique targets (B and C)
        // note-B should only be inserted once due to Set logic
        expect(dbMock.execute).toHaveBeenCalledTimes(3); // 1 delete + 2 inserts
        expect(dbMock.execute).toHaveBeenCalledWith(
            expect.stringContaining("INSERT OR IGNORE INTO NOTE_LINKS"),
            [sourceId, 'note-B']
        );
        expect(dbMock.execute).toHaveBeenCalledWith(
            expect.stringContaining("INSERT OR IGNORE INTO NOTE_LINKS"),
            [sourceId, 'note-C']
        );
    });

    /**
     * Test: Self-reference guard
     */
    it('should ignore self-referencing links', async () => {
        const sourceId = 'note-A';
        const targetIds = ['note-A', 'note-B'];

        await noteLinkService.updateLinks(sourceId, targetIds);

        // Only note-B should be inserted
        expect(dbMock.execute).toHaveBeenCalledWith(
            expect.stringContaining("INSERT OR IGNORE INTO NOTE_LINKS"),
            [sourceId, 'note-B']
        );
        // Ensure note-A -> note-A was never called
        const insertCalls = dbMock.execute.mock.calls.filter(call => call[0].includes('INSERT'));
        expect(insertCalls.length).toBe(1);
    });

    /**
     * Test: Empty targets
     */
    it('should only perform deletion if target list is empty', async () => {
        await noteLinkService.updateLinks('note-A', []);
        
        expect(dbMock.execute).toHaveBeenCalledTimes(1);
        expect(dbMock.execute).toHaveBeenCalledWith(expect.stringContaining("DELETE"), expect.any(Array));
    });

    /**
     * Test: Fetching backlinks
     */
    it('should query the database with a JOIN to retrieve note metadata for backlinks', async () => {
        const targetId = 'note-target';
        const mockBacklinks = [
            { note_id: 'note-1', title: 'Reference 1' },
            { note_id: 'note-2', title: 'Reference 2' }
        ];
        dbMock.select.mockResolvedValue(mockBacklinks);

        const result = await noteLinkService.getBacklinks(targetId);

        expect(dbMock.select).toHaveBeenCalledWith(
            expect.stringContaining("JOIN NOTE_LINKS NL ON N.note_id = NL.source_id"),
            [targetId]
        );
        expect(result).toEqual(mockBacklinks);
    });

    /**
     * Test: Getting outgoing links
     */
    it('should retrieve all outgoing links for a source note', async () => {
        const sourceId = 'note-source';
        await noteLinkService.getLinksBySource(sourceId);

        expect(dbMock.select).toHaveBeenCalledWith(
            "SELECT * FROM NOTE_LINKS WHERE source_id = $1",
            [sourceId]
        );
    });
});