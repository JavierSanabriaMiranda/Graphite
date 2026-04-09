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

    describe('addWelcomeWorkspace', () => {
        it('should create a welcome workspace with Personal name', async () => {
            mockDb.execute.mockResolvedValue({ success: true });

            const result = await workspaceService.addWelcomeWorkspace('user-123');

            expect(mockDb.execute).toHaveBeenCalledWith(
                "INSERT INTO WORKSPACES (workspace_id, owner_id, name, icon, is_dirty) VALUES ($1, $2, $3, $4, 1)",
                ['ws-uuid-999', 'user-123', 'Personal', '🔒']
            );
            expect(result).toBe('ws-uuid-999');
        });
    });

    describe('getById', () => {
        it('should return workspace by ID when it exists', async () => {
            const workspace = { workspace_id: 'ws-1', name: 'My Workspace' };
            mockDb.select.mockResolvedValue([workspace]);

            const result = await workspaceService.getById('ws-1');

            expect(mockDb.select).toHaveBeenCalledWith(
                "SELECT * FROM WORKSPACES where workspace_id = $1 AND is_deleted = 0",
                ['ws-1']
            );
            expect(result).toEqual(workspace);
        });

        it('should return null when workspace does not exist', async () => {
            mockDb.select.mockResolvedValue([]);

            const result = await workspaceService.getById('non-existent');

            expect(result).toBeNull();
        });
    });

    describe('updateName', () => {
        it('should update workspace name and mark as dirty', async () => {
            mockDb.execute.mockResolvedValue({ success: true });

            await workspaceService.updateName('ws-1', 'New Name');

            expect(mockDb.execute).toHaveBeenCalledWith(
                "UPDATE WORKSPACES SET name = $1, is_dirty = 1, updated_at = CURRENT_TIMESTAMP WHERE workspace_id = $2",
                ['New Name', 'ws-1']
            );
        });
    });

    describe('updateIcon', () => {
        it('should update workspace icon and mark as dirty', async () => {
            mockDb.execute.mockResolvedValue({ success: true });

            await workspaceService.updateIcon('ws-1', '🚀');

            expect(mockDb.execute).toHaveBeenCalledWith(
                "UPDATE WORKSPACES SET icon = $1, is_dirty = 1, updated_at = CURRENT_TIMESTAMP WHERE workspace_id = $2",
                ['🚀', 'ws-1']
            );
        });
    });

    describe('getWorkspacesNotSynced', () => {
        it('should fetch workspaces marked as dirty and not deleted', async () => {
            const dirtyWorkspaces = [{ workspace_id: 'ws-1', is_dirty: 1 }];
            mockDb.select.mockResolvedValue(dirtyWorkspaces);

            const result = await workspaceService.getWorkspacesNotSynced();

            expect(mockDb.select).toHaveBeenCalledWith(
                "SELECT * FROM WORKSPACES WHERE is_dirty = 1 AND is_deleted = 0"
            );
            expect(result).toEqual(dirtyWorkspaces);
        });
    });
});