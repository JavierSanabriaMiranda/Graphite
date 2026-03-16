import { describe, it, expect, vi, beforeEach } from 'vitest';
import { workspaceService } from '../../../src/services/db/workspaceService';
import { getDB } from '../../../src/services/db';

// 1. Mock DB connection
vi.mock('../../../src/services/db/index', () => ({
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
        it('should fetch workspaces by owner ID', async () => {
            const mockList = [{ name: 'Work 1' }, { name: 'Work 2' }];
            mockDb.select.mockResolvedValue(mockList);

            const result = await workspaceService.getByUser('user-123');

            expect(mockDb.select).toHaveBeenCalledWith(
                "SELECT * FROM WORKSPACES where owner_id = $1",
                ['user-123']
            );
            expect(result).toEqual(mockList);
        });

        it('should fetch specifically by user and name', async () => {
            mockDb.select.mockResolvedValue([{ workspace_id: 'ws-1' }]);

            await workspaceService.getByUserAndName('user-123', 'My Workspace');

            expect(mockDb.select).toHaveBeenCalledWith(
                "SELECT * FROM WORKSPACES where owner_id = $1 AND name = $2",
                ['user-123', 'My Workspace']
            );
        });
    });

    describe('Creation Logic', () => {
        it('should create a new workspace successfully if name is unique', async () => {
            // First select (check collision) returns empty
            mockDb.select.mockResolvedValue([]);
            mockDb.execute.mockResolvedValue({ success: true });

            await workspaceService.create('user-123', 'New Project');

            expect(mockDb.execute).toHaveBeenCalledWith(
                "INSERT INTO WORKSPACES (workspace_id, owner_id, name, is_dirty) VALUES ($1, $2, $3, 1)",
                ['ws-uuid-999', 'user-123', 'New Project']
            );
        });

        it('should throw an error if the workspace name already exists for that user', async () => {
            // First select returns an existing workspace
            mockDb.select.mockResolvedValue([{ workspace_id: 'existing-id' }]);

            await expect(workspaceService.create('user-123', 'Existing Name'))
                .rejects
                .toThrow('User already have a workspace with name "Existing Name"');

            // Ensure execute was never called
            expect(mockDb.execute).not.toHaveBeenCalled();
        });
    });
});