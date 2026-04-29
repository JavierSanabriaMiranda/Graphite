import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import WorkspaceSettings from '../../../../src/components/settings/settings_views/WorkspaceSettings';
import { useWorkspace } from '../../../../src/components/context/WorkspaceContext';
import { useToast } from '../../../../src/components/context/ToastContext';

// --- 1. MOCKS ---

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../../src/components/context/WorkspaceContext', () => ({
    useWorkspace: vi.fn(),
}));

vi.mock('../../../../src/components/context/ToastContext', () => ({
    useToast: vi.fn(),
}));

// Mock child components to isolate WorkspaceSettings logic
vi.mock('../../../../src/components/util/EmojiPicker', () => ({
    default: ({ children, onSelect }) => (
        <div data-testid="emoji-picker-mock" onClick={() => onSelect('🚀')}>
            {children}
        </div>
    ),
}));

vi.mock('./DeleteWorkspaceModal', () => ({
    default: ({ isOpen, onConfirm, workspaceName }) => isOpen ? (
        <div data-testid="delete-modal-mock">
            <span>Deleting: {workspaceName}</span>
            <button onClick={onConfirm}>Confirm Delete</button>
        </div>
    ) : null,
}));

describe('WorkspaceSettings Component', () => {
    const mockShowToast = vi.fn();
    const mockUpdateName = vi.fn();
    const mockUpdateIcon = vi.fn();
    const mockDelete = vi.fn();

    const mockActiveWorkspace = {
        workspace_id: 'ws-123',
        name: 'My Workspace',
        icon: '📁'
    };

    beforeEach(() => {
        vi.clearAllMocks();

        useToast.mockReturnValue({ showToast: mockShowToast });
        useWorkspace.mockReturnValue({
            activeWorkspace: mockActiveWorkspace,
            updateWorkspaceName: mockUpdateName,
            updateWorkspaceIcon: mockUpdateIcon,
            deleteWorkspace: mockDelete
        });
    });

    /**
     * Verify that the component correctly loads the active workspace data 
     * into the input and renders titles.
     */
    it('should render correctly with active workspace data', () => {
        render(<WorkspaceSettings t={(key) => key} />);

        expect(screen.getByDisplayValue('My Workspace')).toBeInTheDocument();
        expect(screen.getByText('📁')).toBeInTheDocument();
        expect(screen.getByText('settings.workspace.name_title')).toBeInTheDocument();
    });

    /**
     * Test the renaming logic: input change and save button trigger.
     */
    it('should update workspace name when save button is clicked', async () => {
        render(<WorkspaceSettings t={(key) => key} />);

        const input = screen.getByRole('textbox');
        const saveBtn = screen.getByRole('button', { name: '' }); // The button with Save icon

        fireEvent.change(input, { target: { value: 'New WS Name' } });
        fireEvent.click(saveBtn);

        expect(mockUpdateName).toHaveBeenCalledWith('New WS Name');
        await waitFor(() => {
            expect(mockShowToast).toHaveBeenCalledWith('settings.workspace.update_success', 'success');
        });
    });

    /**
     * Verify that the save button is disabled if the name is empty 
     * or hasn't changed.
     */
    it('should disable save button if name is empty or unchanged', () => {
        render(<WorkspaceSettings t={(key) => key} />);
        
        const saveBtn = screen.getByRole('button', { name: '' });
        
        // Initial state: unchanged
        expect(saveBtn).toBeDisabled();

        // Empty state
        fireEvent.change(screen.getByRole('textbox'), { target: { value: ' ' } });
        expect(saveBtn).toBeDisabled();
    });

    /**
     * Test icon update via EmojiPicker mock.
     */
    it('should call updateWorkspaceIcon when an emoji is selected', async () => {
        render(<WorkspaceSettings t={(key) => key} />);

        const picker = screen.getByTestId('emoji-picker-mock');
        fireEvent.click(picker); // Simulates selection of '🚀' via mock

        expect(mockUpdateIcon).toHaveBeenCalledWith('🚀');
        await waitFor(() => {
            expect(mockShowToast).toHaveBeenCalledWith('settings.workspace.update_success', 'success');
        });
    });

    /**
     * Test icon removal logic.
     */
    it('should remove icon when remove button is clicked', async () => {
        render(<WorkspaceSettings t={(key) => key} />);

        const removeBtn = screen.getByTitle('editor.remove_icon');
        fireEvent.click(removeBtn);

        expect(mockUpdateIcon).toHaveBeenCalledWith('');
        await waitFor(() => {
            expect(mockShowToast).toHaveBeenCalledWith('settings.workspace.update_success', 'success');
        });
    });

    /**
     * Test the full deletion flow: opening modal and confirming.
     * Updated to handle the real component rendering if mock hoisting fails.
     */
    it('should open delete modal and call deleteWorkspace on confirmation', async () => {
        render(<WorkspaceSettings t={(key) => key} />);

        const openModalBtn = screen.getByText('settings.workspace.delete_button');
        fireEvent.click(openModalBtn);

        const modalTitle = await screen.findByText('settings.workspace.delete_confirm_title');
        expect(modalTitle).toBeInTheDocument();

        const confirmBtn = screen.getByText('common.delete');
        fireEvent.click(confirmBtn);

        expect(mockDelete).toHaveBeenCalledWith('ws-123');
        
        await waitFor(() => {
            expect(mockShowToast).toHaveBeenCalledWith('settings.workspace.delete_success', 'success');
        });
    });

    /**
     * Verify that useEffect updates the local state if the active workspace changes 
     * (e.g., from another component or device).
     */
    it('should sync local name state when activeWorkspace changes externally', () => {
        const { rerender } = render(<WorkspaceSettings t={(key) => key} />);

        const newWorkspace = { ...mockActiveWorkspace, name: 'External Change' };
        
        useWorkspace.mockReturnValue({
            activeWorkspace: newWorkspace,
            updateWorkspaceName: mockUpdateName,
            updateWorkspaceIcon: mockUpdateIcon,
            deleteWorkspace: mockDelete
        });

        rerender(<WorkspaceSettings t={(key) => key} />);
        expect(screen.getByDisplayValue('External Change')).toBeInTheDocument();
    });
});