import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';

// Mock all the hooks and services
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../src/hooks/useIsMobile', () => ({
    useIsMobile: vi.fn(),
}));

vi.mock('../src/hooks/useOnlineSync', () => ({
    useOnlineSync: vi.fn(),
}));

vi.mock('../src/components/context/AuthContext', () => ({
    AuthProvider: ({ children }) => children,
    useAuth: vi.fn(),
}));

vi.mock('../src/components/context/UIContext', () => ({
    UIProvider: ({ children }) => children,
    useUI: vi.fn(),
}));

vi.mock('../src/components/context/WorkspaceContext', () => ({
    WorkspaceProvider: ({ children }) => children,
    useWorkspace: vi.fn(),
}));

vi.mock('../src/components/context/NoteContext', () => ({
    NoteProvider: ({ children }) => children,
}));

vi.mock('../src/components/context/SettingsContext', () => ({
    SettingsProvider: ({ children }) => children,
}));

vi.mock('../src/components/context/ToastContext', () => ({
    ToastProvider: ({ children }) => children,
}));

vi.mock('../src/services/db/userService', () => ({
    userService: {
        getCurrentUser: vi.fn(),
    },
}));

vi.mock('../src/services/db/workspaceService', () => ({
    workspaceService: {
        getByUser: vi.fn(),
    },
}));

vi.mock('../src/components/TiptapEditor', () => ({
    default: () => <div data-testid="tiptap-editor">TiptapEditor</div>,
}));

vi.mock('../src/components/navigation/Sidebar', () => ({
    default: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock('../src/components/navigation/BottomNavBar', () => ({
    default: () => <div data-testid="bottom-navbar">BottomNavBar</div>,
}));

vi.mock('../src/components/navigation/MobileBrowseView', () => ({
    default: () => <div data-testid="mobile-browse">MobileBrowseView</div>,
}));

vi.mock('../src/components/views/AuthenticationView', () => ({
    default: () => <div data-testid="auth-view">AuthenticationView</div>,
}));

vi.mock('../src/components/views/CreateWorkspaceView', () => ({
    default: () => <div data-testid="create-workspace">CreateWorkspaceView</div>,
}));

vi.mock('../src/components/configuration_menu/SettingsModal', () => ({
    default: () => <div data-testid="settings-modal">SettingsModal</div>,
}));

import { useAuth } from '../src/components/context/AuthContext';
import { useWorkspace } from '../src/components/context/WorkspaceContext';
import { useUI } from '../src/components/context/UIContext';
import { useIsMobile } from '../src/hooks/useIsMobile';
import { userService } from '../src/services/db/userService';
import { workspaceService } from '../src/services/db/workspaceService';

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('DataWrapper - Authentication Flow', () => {
        it('should show authentication loading state', () => {
            useIsMobile.mockReturnValue(false);
            useAuth.mockReturnValue({
                isAuthenticated: false,
                loading: true,
            });

            render(<App />);

            expect(screen.getByText(/Desbloqueando Graphite/i)).toBeInTheDocument();
        });

        it('should show AuthenticationView when not authenticated', () => {
            useIsMobile.mockReturnValue(false);
            useAuth.mockReturnValue({
                isAuthenticated: false,
                loading: false,
            });

            render(<App />);

            expect(screen.getByTestId('auth-view')).toBeInTheDocument();
        });

        it('should load user data when authenticated', async () => {
            useIsMobile.mockReturnValue(false);
            useAuth.mockReturnValue({
                isAuthenticated: true,
                loading: false,
            });
            useWorkspace.mockReturnValue({
                isCreatingWorkspace: false,
                isLoading: false,
                workspaces: [{ workspace_id: 'ws1' }],
            });
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'editor',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });

            const mockUser = { user_id: 'user1' };
            userService.getCurrentUser.mockResolvedValue(mockUser);
            workspaceService.getByUser.mockResolvedValue([{ workspace_id: 'ws1' }]);

            render(<App />);

            await waitFor(() => {
                expect(userService.getCurrentUser).toHaveBeenCalled();
            });

            await waitFor(() => {
                expect(workspaceService.getByUser).toHaveBeenCalledWith('user1');
            });
        });
    });

    describe('AppContent - Workspace Loading State', () => {
        beforeEach(() => {
            useAuth.mockReturnValue({
                isAuthenticated: true,
                loading: false,
            });
            useIsMobile.mockReturnValue(false);
            userService.getCurrentUser.mockResolvedValue({ user_id: 'user1' });
            workspaceService.getByUser.mockResolvedValue([]);
        });

        it('should show loading state when workspaces are loading', async () => {
            useWorkspace.mockReturnValue({
                isCreatingWorkspace: false,
                isLoading: true,
                workspaces: [],
            });
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'editor',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/loading/i)).toBeInTheDocument();
            });
        });

        it('should show CreateWorkspaceView when creating workspace', async () => {
            useWorkspace.mockReturnValue({
                isCreatingWorkspace: true,
                isLoading: false,
                workspaces: [],
            });
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'editor',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByTestId('create-workspace')).toBeInTheDocument();
            });
        });
    });

    describe('AppContent - Layout and Navigation', () => {
        beforeEach(() => {
            useAuth.mockReturnValue({
                isAuthenticated: true,
                loading: false,
            });
            userService.getCurrentUser.mockResolvedValue({ user_id: 'user1' });
            workspaceService.getByUser.mockResolvedValue([{ workspace_id: 'ws1' }]);
            useWorkspace.mockReturnValue({
                isCreatingWorkspace: false,
                isLoading: false,
                workspaces: [{ workspace_id: 'ws1' }],
            });
        });

        it('should show Sidebar on desktop view', async () => {
            useIsMobile.mockReturnValue(false);
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'editor',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByTestId('sidebar')).toBeInTheDocument();
            });
        });

        it('should not show Sidebar on mobile view', async () => {
            useIsMobile.mockReturnValue(true);
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'editor',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
            });
        });

        it('should show BottomNavbar only on mobile', async () => {
            useIsMobile.mockReturnValue(true);
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'editor',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByTestId('bottom-navbar')).toBeInTheDocument();
            });
        });

        it('should not show BottomNavbar on desktop', async () => {
            useIsMobile.mockReturnValue(false);
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'editor',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.queryByTestId('bottom-navbar')).not.toBeInTheDocument();
            });
        });
    });

    describe('AppContent - Tab Navigation', () => {
        beforeEach(() => {
            useAuth.mockReturnValue({
                isAuthenticated: true,
                loading: false,
            });
            useWorkspace.mockReturnValue({
                isCreatingWorkspace: false,
                isLoading: false,
                workspaces: [{ workspace_id: 'ws1' }],
            });
            useIsMobile.mockReturnValue(false);
            userService.getCurrentUser.mockResolvedValue({ user_id: 'user1' });
            workspaceService.getByUser.mockResolvedValue([{ workspace_id: 'ws1' }]);
        });

        it('should show editor tab by default', async () => {
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'editor',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByTestId('tiptap-editor')).toBeInTheDocument();
            });
        });

        it('should show search view on search tab', async () => {
            useIsMobile.mockReturnValue(true);
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'search',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Sección de Búsqueda/)).toBeInTheDocument();
            });
        });

        it('should show browse view on browse tab', async () => {
            useIsMobile.mockReturnValue(true);
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'browse',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByTestId('mobile-browse')).toBeInTheDocument();
            });
        });
    });

    describe('Mobile Responsive Behavior', () => {
        beforeEach(() => {
            useAuth.mockReturnValue({
                isAuthenticated: true,
                loading: false,
            });
            useWorkspace.mockReturnValue({
                isCreatingWorkspace: false,
                isLoading: false,
                workspaces: [{ workspace_id: 'ws1' }],
            });
            userService.getCurrentUser.mockResolvedValue({ user_id: 'user1' });
            workspaceService.getByUser.mockResolvedValue([{ workspace_id: 'ws1' }]);
            useUI.mockReturnValue({
                isSettingsOpen: false,
                activeTab: 'editor',
                closeSettings: vi.fn(),
                setActiveTab: vi.fn(),
                openSettings: vi.fn(),
            });
        });

        it('should pin sidebar on desktop by default', async () => {
            useIsMobile.mockReturnValue(false);

            render(<App />);

            await waitFor(() => {
                expect(screen.getByTestId('sidebar')).toBeInTheDocument();
            });
        });

        it('should not pin sidebar on mobile by default', async () => {
            useIsMobile.mockReturnValue(true);

            render(<App />);

            await waitFor(() => {
                expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
            });
        });
    });
});
