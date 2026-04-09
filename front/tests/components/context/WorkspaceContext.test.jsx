import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WorkspaceProvider, useWorkspace } from '../../../src/components/context/WorkspaceContext';
import { workspaceService } from '../../../src/services/db/workspaceService';
import { syncService } from '../../../src/services/db/syncService';
import { userService } from '../../../src/services/db/userService';
import { useAuth } from '../../../src/components/context/AuthContext';

// --- 1. MOCKS ---

vi.mock('../../../src/services/db/workspaceService', () => ({
    workspaceService: {
        create: vi.fn(),
        getByUser: vi.fn(),
        getById: vi.fn(),
        updateName: vi.fn(),
        updateIcon: vi.fn(),
        delete: vi.fn(),
    },
}));

vi.mock('../../../src/services/db/syncService', () => ({
    syncService: {
        syncPendingData: vi.fn(),
        pullAllMetadata: vi.fn(),
    },
}));

vi.mock('../../../src/services/db/userService', () => ({
    userService: {
        getCurrentUser: vi.fn(),
    },
}));

vi.mock('../../../src/components/context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

/**
 * Helper component to test context values and methods
 */
const WorkspaceConsumer = () => {
    const {
        workspaces,
        activeWorkspace,
        createNewWorkspace,
        updateWorkspaceName,
        deleteWorkspace,
        isCreatingWorkspace
    } = useWorkspace();

    return (
        <div>
            <div data-testid="ws-count">{workspaces.length}</div>
            <div data-testid="active-ws">{activeWorkspace?.name || 'none'}</div>
            <div data-testid="creating-status">{isCreatingWorkspace ? 'yes' : 'no'}</div>
            <button onClick={() => createNewWorkspace('New WS', '🚀')}>Create</button>
            <button onClick={() => updateWorkspaceName('Updated Name')}>Update</button>
            <button onClick={() => deleteWorkspace('ws-1')}>Delete</button>
        </div>
    );
};

describe('WorkspaceContext - WorkspaceProvider', () => {
    const mockUser = { user_id: 'user-123' };
    const mockDek = new Uint8Array([1, 2, 3]);

    beforeEach(() => {
        vi.clearAllMocks();
        // Default Auth State
        useAuth.mockReturnValue({ dek: mockDek, isAuthenticated: true });
        userService.getCurrentUser.mockResolvedValue(mockUser);
        // Browser online status
        Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    });

    /**
     * Test initial load: should fetch workspaces and select the first one.
     */
    it('should load workspaces and set the first one as active on mount', async () => {
        const mockList = [{ workspace_id: 'ws-1', name: 'Work' }, { workspace_id: 'ws-2', name: 'Personal' }];
        workspaceService.getByUser.mockResolvedValue(mockList);

        await act(async () => {
            render(<WorkspaceProvider><WorkspaceConsumer /></WorkspaceProvider>);
        });

        await waitFor(() => {
            expect(workspaceService.getByUser).toHaveBeenCalledWith('user-123');
            expect(screen.getByTestId('ws-count')).toHaveTextContent('2');
            expect(screen.getByTestId('active-ws')).toHaveTextContent('Work');
        });
    });

    /**
     * Test workspace creation flow: DB save -> list refresh -> background sync.
     */
    it('should create a new workspace and trigger sync', async () => {
        const newWs = { workspace_id: 'ws-new', name: 'New WS', icon: '🚀' };
        workspaceService.create.mockResolvedValue(newWs);
        workspaceService.getByUser.mockResolvedValue([newWs]);

        await act(async () => {
            render(<WorkspaceProvider><WorkspaceConsumer /></WorkspaceProvider>);
        });

        const createBtn = screen.getByText('Create');
        await act(async () => {
            fireEvent.click(createBtn);
        });

        expect(workspaceService.create).toHaveBeenCalledWith('user-123', 'New WS', '🚀');
        expect(syncService.syncPendingData).toHaveBeenCalledWith(mockDek);
        expect(screen.getByTestId('active-ws')).toHaveTextContent('New WS');
    });

    /**
     * Test renaming logic: persistence and local state synchronization.
     */
    it('should update workspace name and refresh local state', async () => {
        const initialWs = { workspace_id: 'ws-1', name: 'Old Name' };
        const updatedWs = { workspace_id: 'ws-1', name: 'Updated Name' };

        workspaceService.getByUser.mockResolvedValue([initialWs]);
        workspaceService.getById.mockResolvedValue(updatedWs);

        await act(async () => {
            render(<WorkspaceProvider><WorkspaceConsumer /></WorkspaceProvider>);
        });

        const updateBtn = screen.getByText('Update');
        await act(async () => {
            fireEvent.click(updateBtn);
        });

        expect(workspaceService.updateName).toHaveBeenCalledWith('ws-1', 'Updated Name');
        expect(screen.getByTestId('active-ws')).toHaveTextContent('Updated Name');
    });

    /**
     * Test deletion flow: should update list and fallback to another workspace.
     */
    it('should delete workspace and switch active workspace', async () => {
        const ws1 = { workspace_id: 'ws-1', name: 'To Delete' };
        const ws2 = { workspace_id: 'ws-2', name: 'Fallback' };

        workspaceService.getByUser
            .mockResolvedValueOnce([ws1, ws2]) // Initial
            .mockResolvedValue([ws2]);       // After delete

        await act(async () => {
            render(<WorkspaceProvider><WorkspaceConsumer /></WorkspaceProvider>);
        });

        const deleteBtn = screen.getByText('Delete');
        await act(async () => {
            fireEvent.click(deleteBtn);
        });

        expect(workspaceService.delete).toHaveBeenCalledWith('ws-1');
        expect(screen.getByTestId('active-ws')).toHaveTextContent('Fallback');
        expect(screen.getByTestId('ws-count')).toHaveTextContent('1');
    });

    /**
     * Test the behavior when no workspaces exist (triggers creation mode).
     */
    it('should show creation mode if no workspaces are found', async () => {
        workspaceService.getByUser.mockResolvedValue([]);

        await act(async () => {
            render(<WorkspaceProvider><WorkspaceConsumer /></WorkspaceProvider>);
        });

        await waitFor(() => {
            expect(screen.getByTestId('creating-status')).toHaveTextContent('yes');
            expect(screen.getByTestId('active-ws')).toHaveTextContent('none');
        });
    });

    /**
     * Verify that metadata sync is triggered when changing workspaces (Lazy Sync).
     */
    it('should trigger lazy sync of metadata when a workspace is selected', async () => {
        const mockWs = { workspace_id: 'ws-target', name: 'Target' };
        
        // Consumer to trigger the selection
        const SelectionTrigger = () => {
            const { selectWorkspace } = useWorkspace();
            return <button onClick={() => selectWorkspace(mockWs)}>Select Manual</button>;
        };

        render(
            <WorkspaceProvider>
                <SelectionTrigger />
            </WorkspaceProvider>
        );

        // We need to wait for the provider to finish loading its initial state
        const selectBtn = await screen.findByText('Select Manual');
        
        await act(async () => {
            fireEvent.click(selectBtn);
        });

        // Now we wait for the async chain inside selectWorkspace
        await waitFor(() => {
            expect(syncService.pullAllMetadata).toHaveBeenCalledWith(
                mockDek, 
                'user-123'
            );
        });
    });
});