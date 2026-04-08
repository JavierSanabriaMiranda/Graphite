import { describe, it, expect, vi, beforeEach } from 'vitest';
import { workspaceService } from '../../../src/services/db/workspaceService';
import { getDB } from '../../../src/services/db';

// 1. Mock DB connection
vi.mock('../../../src/services/db', () => ({
    getDB: vi.fn(),
}));

describe('workspaceService Suite', () => {
    let mockDb;

    beforeEach(() => {
        vi.clearAllMocks();

        mockDb = {
            select: vi.fn(),
            execute: vi.fn(),
        };
        getDB.mockResolvedValue(mockDb);

        // Predictable UUID for testing
        global.crypto.randomUUID = vi.fn().mockReturnValue('ws-uuid-999');
    });

    describe('Retrieval Logic', () => {
        /**
         * Test that retrieval only fetches workspaces that are NOT marked as deleted
         */
        it('should fetch workspaces by owner ID excluding deleted ones', async () => {
            const mockList = [{ name: 'Work 1' }, { name: 'Work 2' }];
            mockDb.select.mockResolvedValue(mockList);

            const result = await workspaceService.getByUser('user-123');

            expect(mockDb.select).toHaveBeenCalledWith(
                "SELECT * FROM WORKSPACES where owner_id = $1 AND is_deleted = 0",
                ['user-123']
            );
            expect(result).toEqual(mockList);
        });
    });

    describe('Creation Logic', () => {
        /**
         * Test successful workspace creation including the new icon field
         */
        it('should create a new workspace successfully with icon support', async () => {
            mockDb.execute.mockResolvedValue({ success: true });
            // Mock getById response after creation
            mockDb.select.mockResolvedValue([{ workspace_id: 'ws-uuid-999', name: 'New Project' }]);

            await workspaceService.create('user-123', 'New Project', '🚀');

            expect(mockDb.execute).toHaveBeenCalledWith(
                "INSERT INTO WORKSPACES (workspace_id, owner_id, name, icon, is_dirty) VALUES ($1, $2, $3, $4, 1)",
                ['ws-uuid-999', 'user-123', 'New Project', '🚀']
            );
        });

        /**
         * Test creation with null icon (default behavior)
         */
        it('should use null as default icon if not provided', async () => {
            mockDb.execute.mockResolvedValue({ success: true });
            mockDb.select.mockResolvedValue([{ workspace_id: 'ws-uuid-999' }]);

            await workspaceService.create('user-123', 'Project No Icon');

            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.any(String),
                ['ws-uuid-999', 'user-123', 'Project No Icon', null]
            );
        });
    });

    describe('Delete Logic', () => {
        /**
         * Test soft delete mechanism for both workspace and its related notes
         */
        it('should perform a soft delete on workspace and its notes', async () => {
            mockDb.execute.mockResolvedValue({ success: true });

            await workspaceService.delete('ws-123');

            // Check workspace soft delete
            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("UPDATE WORKSPACES SET is_deleted = 1"),
                ['ws-123']
            );
            // Check notes soft delete
            expect(mockDb.execute).toHaveBeenCalledWith(
                expect.stringContaining("UPDATE NOTES SET is_deleted = 1"),
                ['ws-123']
            );
        });
    });
});