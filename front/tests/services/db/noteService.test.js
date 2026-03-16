import { describe, it, expect, vi, beforeEach } from 'vitest';
import { noteService } from '../../../src/services/db/noteService';
import { getDB } from '../../../src/services/db';

vi.mock('../../../src/services/db/index', () => ({
    getDB: vi.fn(),
}));

describe('noteService Suite', () => {
    let mockDb;

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup the mock DB interface
        mockDb = {
            select: vi.fn(),
            execute: vi.fn(),
        };
        getDB.mockResolvedValue(mockDb);

        // Mock crypto.randomUUID for predictable IDs in tests
        global.crypto.randomUUID = vi.fn().mockReturnValue('mock-uuid-123');
    });

    describe('Read Operations', () => {
        it('should get notes by workspace ordered by date', async () => {
            mockDb.select.mockResolvedValue([{ title: 'Note 1' }]);

            const result = await noteService.getByWorkspace('ws-1');

            expect(mockDb.select).toHaveBeenCalledWith(
                expect.stringContaining("SELECT * FROM NOTES WHERE workspace_id = $1"),
                ['ws-1']
            );
            expect(result).toHaveLength(1);
        });

        it('should return a single note or null in getByNoteId', async () => {
            mockDb.select.mockResolvedValueOnce([{ note_id: 'n1' }]).mockResolvedValueOnce([]);

            const note = await noteService.getByNoteId('n1');
            const nonExistent = await noteService.getByNoteId('n2');

            expect(note.note_id).toBe('n1');
            expect(nonExistent).toBeNull();
        });

        it('should check if subnotes exist and return boolean', async () => {
            mockDb.select.mockResolvedValue([{ has_children: 1 }]);
            const hasChildren = await noteService.hasSubnotes('parent-1');
            expect(hasChildren).toBe(true);

            mockDb.select.mockResolvedValue([{ has_children: 0 }]);
            const noChildren = await noteService.hasSubnotes('parent-2');
            expect(noChildren).toBe(false);
        });
    });

    describe('Create Operation & Path Logic', () => {
        it('should create a root note with correct path', async () => {
            // Mock getNoteByPath to return null (no collision)
            mockDb.select.mockResolvedValue([]);

            const noteId = await noteService.create('ws-1', 'My Note');

            expect(noteId).toBe('mock-uuid-123');
            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO NOTES"),
                expect.arrayContaining(['mock-uuid-123', 'ws-1', 'My Note', '/My Note'])
            );
        });

        it('should handle title collisions by adding a counter', async () => {
            // Simulate that "Note" exists, but "Note (1)" does not
            mockDb.select
                .mockResolvedValueOnce([{ title: 'Note' }]) // First check: exists
                .mockResolvedValueOnce([]); // Second check: doesn't exist

            const noteId = await noteService.create('ws-1', 'Note');

            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining(['Note (1)', '/Note (1)'])
            );
        });
    });

    describe('Update Operation', () => {
        it('should build a dynamic update query', async () => {
            const data = { title: 'New Title' };
            const currentNote = { note_id: 'n1', title: 'Old', workspace_id: 'ws1', note_path: '/Old' };

            // Mock internal lookups
            vi.spyOn(noteService, 'getByNoteId').mockResolvedValue(currentNote);
            vi.spyOn(noteService, 'getNoteByPath').mockResolvedValue(null); // No collision

            await noteService.update('n1', data);

            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("UPDATE NOTES SET title = $1, note_path = $2, is_dirty = $3, updated_at = $4 WHERE note_id = $5"),
                expect.arrayContaining(['New Title', '/New Title', 1])
            );
        });

        it('should return COLLISION error if the new path exists', async () => {
            const currentNote = { note_id: 'n1', title: 'Old', workspace_id: 'ws1' };
            const collisionNote = { note_id: 'n2', title: 'Existing' };

            vi.spyOn(noteService, 'getByNoteId').mockResolvedValue(currentNote);
            vi.spyOn(noteService, 'getNoteByPath').mockResolvedValue(collisionNote);

            const result = await noteService.update('n1', { title: 'Existing' });

            expect(result).toEqual({ error: 'COLLISION', message: 'Path already exists' });
            expect(mockDb.execute).not.toHaveBeenCalled();
        });
    });

    describe('Delete Operation', () => {
        it('should execute a recursive CTE for logical delete', async () => {
            await noteService.delete('n1');

            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("WITH RECURSIVE descendant_notes"),
                ['n1']
            );
        });
    });
});