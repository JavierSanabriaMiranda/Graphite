import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import SettingsView from '../../../src/components/settings/SettingsView';
import { useAuth } from '../../../src/components/context/AuthContext';
import { noteService } from '../../../src/services/db/noteService';
import { workspaceService } from '../../../src/services/db/workspaceService';

// --- 1. MOCKS ---

vi.mock('../../../src/components/context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        getNotesNotSynced: vi.fn(),
    },
}));

vi.mock('../../../src/services/db/workspaceService', () => ({
    workspaceService: {
        getWorkspacesNotSynced: vi.fn(),
    },
}));

// Mocking sub-views to keep the test focused on SettingsView logic
vi.mock('../../../src/components/settings/settings_views/GeneralSettings', () => ({
    default: () => <div data-testid="general-settings">General View</div>,
}));
vi.mock('../../../src/components/settings/settings_views/WorkspaceSettings', () => ({
    default: () => <div data-testid="workspace-settings">Workspace View</div>,
}));
vi.mock('../../../src/components/settings/settings_views/AccountSettings', () => ({
    default: () => <div data-testid="account-settings">Account View</div>,
}));
vi.mock('../../../src/components/settings/settings_views/LogoutModal', () => ({
    default: ({ isOpen, isUnsynced }) => isOpen ? (
        <div data-testid="logout-modal">
            Logout Modal {isUnsynced ? '(Unsynced Data Detected)' : '(Clean)'}
        </div>
    ) : null,
}));

describe('SettingsView Component', () => {
    const mockT = (key) => key;
    const mockOnClose = vi.fn();
    const mockLogout = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        useAuth.mockReturnValue({ logout: mockLogout });
        
        // Default: No unsynced data
        noteService.getNotesNotSynced.mockResolvedValue([]);
        workspaceService.getWorkspacesNotSynced.mockResolvedValue([]);
    });

    /**
     * Verify that the component starts with the General tab active
     * and displays the correct view.
     */
    it('should render and default to general settings tab', () => {
        render(<SettingsView t={mockT} onClose={mockOnClose} isMobile={false} />);

        expect(screen.getByTestId('general-settings')).toBeInTheDocument();
        // Check header title
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('settings.general.general');
    });

    /**
     * Test navigation between tabs and ensuring the content updates.
     */
    it('should switch tabs when clicking on sidebar buttons', () => {
        render(<SettingsView t={mockT} onClose={mockOnClose} isMobile={false} />);

        // Switch to Workspace
        const workspaceBtn = screen.getByRole('button', { name: /settings.workspace.workspace/i });
        fireEvent.click(workspaceBtn);
        expect(screen.getByTestId('workspace-settings')).toBeInTheDocument();

        // Switch to Account
        const accountBtn = screen.getByRole('button', { name: /settings.account.account/i });
        fireEvent.click(accountBtn);
        expect(screen.getByTestId('account-settings')).toBeInTheDocument();
    });

    /**
     * Verify mobile specific layout (tabs at the top instead of sidebar)
     */
    it('should show mobile navigation when isMobile is true', () => {
        const { container } = render(<SettingsView t={mockT} onClose={mockOnClose} isMobile={true} />);
        
        // On mobile, the sidebar (hidden sm:flex) is not visible, 
        // but the horizontal scroll div should be there.
        const mobileTabs = container.querySelector('.overflow-x-auto');
        expect(mobileTabs).toBeInTheDocument();
    });

    /**
     * Critical Logic: Check if the logout process correctly detects 
     * local data that has not been pushed to the cloud yet.
     */
    it('should detect unsynced data before opening logout modal', async () => {
        // Mock dirty data in DB
        workspaceService.getWorkspacesNotSynced.mockResolvedValue([{ id: 1 }]);
        noteService.getNotesNotSynced.mockResolvedValue([]);

        render(<SettingsView t={mockT} onClose={mockOnClose} isMobile={false} />);

        const logoutBtn = screen.getByText('settings.account.logout.logout');
        
        await act(async () => {
            fireEvent.click(logoutBtn);
        });

        // The modal should indicate that there is unsynced data
        expect(screen.getByTestId('logout-modal')).toHaveTextContent('(Unsynced Data Detected)');
        expect(workspaceService.getWorkspacesNotSynced).toHaveBeenCalled();
        expect(noteService.getNotesNotSynced).toHaveBeenCalled();
    });

    /**
     * Verify the logout modal behavior when everything is synced.
     */
    it('should open logout modal as clean if no unsynced data exists', async () => {
        render(<SettingsView t={mockT} onClose={mockOnClose} isMobile={false} />);

        const logoutBtn = screen.getByText('settings.account.logout.logout');
        
        await act(async () => {
            fireEvent.click(logoutBtn);
        });

        expect(screen.getByTestId('logout-modal')).toHaveTextContent('(Clean)');
    });

    /**
     * Ensure the close button triggers the onClose callback from props.
     */
    it('should call onClose when the X button is clicked', () => {
        render(<SettingsView t={mockT} onClose={mockOnClose} isMobile={false} />);

        // The header contains the X icon (mocked)
        const closeBtn = screen.getByRole('button', { name: '' }); // Lucide X is an SVG inside a button
        fireEvent.click(closeBtn);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});