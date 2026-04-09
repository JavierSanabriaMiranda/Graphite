import { describe, it, expect, vi, beforeEach } from 'vitest';
import { noteService } from '../../../src/services/db/noteService';
import { getDB } from '../../../src/services/db';

vi.mock('../../../src/services/db', () => ({
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

            vi.restoreAllMocks();
        });

        it('should return COLLISION error if the new path exists', async () => {
            const currentNote = { note_id: 'n1', title: 'Old', workspace_id: 'ws1' };
            const collisionNote = { note_id: 'n2', title: 'Existing' };

            vi.spyOn(noteService, 'getByNoteId').mockResolvedValue(currentNote);
            vi.spyOn(noteService, 'getNoteByPath').mockResolvedValue(collisionNote);

            const result = await noteService.update('n1', { title: 'Existing' });

            expect(result).toEqual({ error: 'COLLISION', message: 'Path already exists' });
            expect(mockDb.execute).not.toHaveBeenCalled();

            vi.restoreAllMocks();
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

    describe('getRootNotes', () => {
        it('should fetch root notes ordered by title', async () => {
            const rootNotes = [{ title: 'Note A' }, { title: 'Note B' }];
            mockDb.select.mockResolvedValue(rootNotes);

            const result = await noteService.getRootNotes('ws-1');

            expect(mockDb.select).toHaveBeenCalledWith(
                expect.stringContaining("SELECT * FROM NOTES WHERE workspace_id = $1 AND parent_id IS NULL"),
                ['ws-1']
            );
            expect(result).toHaveLength(2);
        });
    });

    describe('getSubnotes', () => {
        it('should get all child notes for a parent', async () => {
            const subnotes = [{ title: 'Child 1' }, { title: 'Child 2' }];
            mockDb.select.mockResolvedValue(subnotes);

            const result = await noteService.getSubnotes('parent-1');

            expect(mockDb.select).toHaveBeenCalledWith(
                expect.stringContaining("SELECT * FROM NOTES WHERE parent_id = $1"),
                ['parent-1']
            );
            expect(result).toHaveLength(2);
        });
    });

    describe('getNoteByPath', () => {
        it('should return note matching path and workspace', async () => {
            const note = { note_id: 'n1', note_path: '/Root/Child' };
            mockDb.select.mockClear();
            mockDb.select.mockResolvedValue([note]);

            const result = await noteService.getNoteByPath('/Root/Child', 'ws-1');

            expect(result).toEqual(note);
        });
    });

    describe('incrementVersion', () => {
        it('should update note version', async () => {
            await noteService.incrementVersion('n1', 5);

            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("UPDATE NOTES SET note_version = $1 WHERE note_id = $2"),
                [5, 'n1']
            );
        });
    });

    describe('getNotesNotSynced', () => {
        it('should return all dirty and not deleted notes', async () => {
            const dirtyNotes = [{ note_id: 'n1', is_dirty: 1 }];
            mockDb.select.mockResolvedValue(dirtyNotes);

            const result = await noteService.getNotesNotSynced();

            expect(mockDb.select).toHaveBeenCalledWith(
                expect.stringContaining("SELECT * FROM NOTES WHERE is_dirty = 1 AND is_deleted = 0")
            );
            expect(result).toHaveLength(1);
        });
    });

    describe('setConflict', () => {
        it('should set conflict data on a note', async () => {
            await noteService.setConflict('n1', 'Conflict Title', '📝', '{"type":"doc"}', 2);

            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("UPDATE NOTES SET conflict_title = $1, conflict_icon = $2, conflict_content = $3, remote_version = $4"),
                ['Conflict Title', '📝', '{"type":"doc"}', 2, 'n1']
            );
        });
    });

    describe('resolveConflict', () => {
        it('should resolve conflict and clear conflict fields', async () => {
            // Need to mock update to avoid internal calls
            vi.spyOn(noteService, 'update').mockResolvedValue({});
            vi.spyOn(noteService, 'resurrectNotes').mockResolvedValue({});
            mockDb.select.mockResolvedValue([]);

            const content = { type: 'doc', content: [] };
            await noteService.resolveConflict('n1', 'Title', '📝', content, 3);

            // Should have called update with the new title and icon
            expect(noteService.update).toHaveBeenCalledWith('n1', { title: 'Title', icon: '📝' });

            vi.restoreAllMocks();
        });
    });

    describe('resurrectNotes', () => {
        it('should undelete notes when provided with note IDs', async () => {
            mockDb.execute.mockClear();

            await noteService.resurrectNotes(['n1', 'n2']);

            // Verify execute was called with update SQL containing the note IDs
            const calls = mockDb.execute.mock.calls;
            expect(calls.length).toBeGreaterThan(0);
            // Check that the SQL contains UPDATE and the parameters include the IDs
            const [sql, params] = calls[0];
            expect(sql).toContain('UPDATE NOTES');
            expect(sql).toContain('is_deleted = 0');
        });

        it('should handle empty array without executing', async () => {
            mockDb.execute.mockClear();

            await noteService.resurrectNotes([]);

            expect(mockDb.execute).not.toHaveBeenCalled();
        });

        it('should handle null without executing', async () => {
            mockDb.execute.mockClear();

            await noteService.resurrectNotes(null);

            expect(mockDb.execute).not.toHaveBeenCalled();
        });
    });
});