import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import CreateWorkspaceView from '../../../src/components/views/CreateWorkspaceView';
import { useWorkspace } from '../../../src/components/context/WorkspaceContext';
import { useIsMobile } from '../../../src/hooks/useIsMobile';

// --- 1. MOCKS ---

vi.mock('../../../src/components/context/WorkspaceContext', () => ({
    useWorkspace: vi.fn(),
}));

vi.mock('../../../src/hooks/useIsMobile', () => ({
    useIsMobile: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

vi.mock('../../../src/components/util/EmojiPicker', () => ({
    default: ({ children, onSelect, showIconsMenu }) => (
        <div data-testid="emoji-picker" onClick={() => onSelect('🚀')}>
            {children}
        </div>
    ),
}));

describe('CreateWorkspaceView Component', () => {
    const mockCloseCreation = vi.fn();
    const mockCreateNewWorkspace = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        // Default: desktop view
        useIsMobile.mockReturnValue(false);

        // Default context setup
        useWorkspace.mockReturnValue({
            closeCreation: mockCloseCreation,
            createNewWorkspace: mockCreateNewWorkspace,
        });
    });

    it('should render workspace creation form with all elements', () => {
        render(<CreateWorkspaceView />);

        // Title and subtitle
        expect(screen.getByText('workspaces.create_title')).toBeInTheDocument();
        expect(screen.getByText('workspaces.create_subtitle')).toBeInTheDocument();

        // Input and picker
        expect(screen.getByPlaceholderText(/workspaces.name_placeholder/i)).toBeInTheDocument();
        expect(screen.getByTestId('emoji-picker')).toBeInTheDocument();

        // Buttons
        expect(screen.getByRole('button', { name: /workspaces.button_create/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /common.cancel/i })).toBeInTheDocument();
    });

    it('should not show cancel button when showCancelBtn is false', () => {
        render(<CreateWorkspaceView showCancelBtn={false} />);

        expect(screen.queryByRole('button', { name: /common.cancel/i })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: /workspaces.button_create/i })).toBeInTheDocument();
    });

    it('should manage button state based on input', () => {
        render(<CreateWorkspaceView />);

        const nameInput = screen.getByPlaceholderText(/workspaces.name_placeholder/i);
        const createBtn = screen.getByRole('button', { name: /workspaces.button_create/i });

        // Initially disabled
        expect(createBtn).toBeDisabled();

        // Enabled with content
        fireEvent.change(nameInput, { target: { value: 'My Workspace' } });
        expect(createBtn).not.toBeDisabled();

        // Disabled with whitespace only
        fireEvent.change(nameInput, { target: { value: '   ' } });
        expect(createBtn).toBeDisabled();
    });

    it('should handle name input changes and focus', () => {
        render(<CreateWorkspaceView />);

        const nameInput = screen.getByPlaceholderText(/workspaces.name_placeholder/i);

        // Updates value
        fireEvent.change(nameInput, { target: { value: 'Test Workspace' } });
        expect(nameInput.value).toBe('Test Workspace');
    });

    it('should handle emoji selection and workspace creation', async () => {
        render(<CreateWorkspaceView />);

        const nameInput = screen.getByPlaceholderText(/workspaces.name_placeholder/i);
        fireEvent.change(nameInput, { target: { value: 'My Workspace' } });

        const emojiPicker = screen.getByTestId('emoji-picker');
        fireEvent.click(emojiPicker);
        expect(screen.getByText('🚀')).toBeInTheDocument();

        const createBtn = screen.getByRole('button', { name: /workspaces.button_create/i });
        fireEvent.click(createBtn);

        await waitFor(() => {
            expect(mockCreateNewWorkspace).toHaveBeenCalledWith('My Workspace', '🚀');
        });
    });

    it('should create workspace without icon when none selected', async () => {
        render(<CreateWorkspaceView />);

        const nameInput = screen.getByPlaceholderText(/workspaces.name_placeholder/i);
        fireEvent.change(nameInput, { target: { value: 'Simple Workspace' } });

        const createBtn = screen.getByRole('button', { name: /workspaces.button_create/i });
        fireEvent.click(createBtn);

        await waitFor(() => {
            expect(mockCreateNewWorkspace).toHaveBeenCalledWith('Simple Workspace', '');
        });
    });

    it('should call closeCreation when cancel button is clicked', () => {
        render(<CreateWorkspaceView showCancelBtn={true} />);

        const cancelBtn = screen.getByRole('button', { name: /common.cancel/i });
        fireEvent.click(cancelBtn);

        expect(mockCloseCreation).toHaveBeenCalled();
    });

    it('should apply responsive design classes', () => {
        const { rerender } = render(<CreateWorkspaceView />);

        // Desktop
        let title = screen.getByText('workspaces.create_title');
        expect(title).toHaveClass('text-6xl');
        let createBtn = screen.getByRole('button', { name: /workspaces.button_create/i });
        expect(createBtn).toHaveClass('px-8');

        // Mobile
        useIsMobile.mockReturnValue(true);
        rerender(<CreateWorkspaceView />);

        title = screen.getByText('workspaces.create_title');
        expect(title).toHaveClass('text-4xl');
        createBtn = screen.getByRole('button', { name: /workspaces.button_create/i });
        expect(createBtn).toHaveClass('px-4');
    });

    it('should show correct placeholder text based on device', () => {
        useIsMobile.mockReturnValue(false);
        const { rerender } = render(<CreateWorkspaceView />);

        expect(screen.getByPlaceholderText(/workspaces.name_placeholder\b/i)).toBeInTheDocument();

        useIsMobile.mockReturnValue(true);
        rerender(<CreateWorkspaceView />);

        expect(screen.getByPlaceholderText(/workspaces.name_placeholder_mobile/i)).toBeInTheDocument();
    });
});
