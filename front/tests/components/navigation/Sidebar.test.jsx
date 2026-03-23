import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Sidebar from '../../../src/components/navigation/Sidebar';
import { useNote } from '../../../src/components/context/NoteContext';
import { noteService } from '../../../src/services/db/noteService';
import { useUI } from '../../../src/components/context/UIContext';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../../src/components/context/UIContext', () => ({
    useUI: vi.fn(),
}));

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        getRootNotes: vi.fn(),
    },
}));

// Mock child components
vi.mock('../../../src/components/navigation/NavItem', () => ({
    default: ({ note }) => <div data-testid="nav-item">{note.title}</div>,
}));

vi.mock('../../../src/components/configuration_menu/SettingsModal', () => ({
    default: ({ isOpen, onClose }) => isOpen ? (
        <div data-testid="settings-modal">
            <button onClick={onClose}>Close Settings</button>
        </div>
    ) : null,
}));

describe('Sidebar Component', () => {
    const mockWorkspace = { workspace_id: 'ws-1', name: 'My Workspace' };
    const mockNotes = [{ note_id: '1', title: 'Note 1' }, { note_id: '2', title: 'Note 2' }];
    const mockSetIsOpen = vi.fn();
    const mockCreateRootNote = vi.fn();
    const mockOpenSettings = vi.fn(); // Mock para la función de ajustes

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useNote).mockReturnValue({
            refreshTrigger: 0,
            createRootNote: mockCreateRootNote,
        });

        vi.mocked(useUI).mockReturnValue({
            openSettings: mockOpenSettings,
        });

        noteService.getRootNotes.mockResolvedValue(mockNotes);
    });

    it('should render the workspace name or fallback', async () => {
        await act(async () => {
            render(<Sidebar isOpen={true} setIsOpen={mockSetIsOpen} workspace={mockWorkspace} />);
        });

        expect(screen.getByText('My Workspace')).toBeInTheDocument();
    });

    it('should fetch and render root notes on mount/workspace change', async () => {
        await act(async () => {
            render(<Sidebar isOpen={true} setIsOpen={mockSetIsOpen} workspace={mockWorkspace} />);
        });

        expect(noteService.getRootNotes).toHaveBeenCalledWith(mockWorkspace.workspace_id);
        await waitFor(() => {
            expect(screen.getAllByTestId('nav-item')).toHaveLength(2);
        });
    });

    it('should toggle sidebar when the PanelLeft button is clicked', () => {
        render(<Sidebar isOpen={true} setIsOpen={mockSetIsOpen} workspace={mockWorkspace} />);

        // We select the specific toggle button. 
        // first button in the header (before Settings and Add Note).
        const allButtons = screen.getAllByRole('button');
        const toggleBtn = allButtons.find(btn => btn.querySelector('.lucide-panel-left'));

        fireEvent.click(toggleBtn);

        expect(mockSetIsOpen).toHaveBeenCalled();
    });

    it('should handle hover sensor logic when closed', () => {
        // Render closed
        render(<Sidebar isOpen={false} setIsOpen={mockSetIsOpen} workspace={mockWorkspace} />);

        const aside = screen.getByRole('complementary', { hidden: true });
        expect(aside).toHaveClass('-translate-x-full');

        // Find the invisible sensor div (the 4px left bar)
        const sensor = document.querySelector('.cursor-e-resize');

        fireEvent.mouseEnter(sensor);
        expect(aside).toHaveClass('translate-x-0');

        fireEvent.mouseLeave(aside);
        expect(aside).toHaveClass('-translate-x-full');
    });

    it('should call openSettings when the configuration button is clicked', async () => {
        render(<Sidebar isOpen={true} setIsOpen={mockSetIsOpen} workspace={mockWorkspace} />);

        const settingsBtn = screen.getByText('sidebar.configuration').closest('button');

        await act(async () => {
            fireEvent.click(settingsBtn);
        });

        expect(mockOpenSettings).toHaveBeenCalledTimes(1);
    });

    it('should call createRootNote when the add button is clicked', () => {
        render(<Sidebar isOpen={true} setIsOpen={mockSetIsOpen} workspace={mockWorkspace} />);

        const addBtn = screen.getByText('sidebar.new_note').closest('button');
        fireEvent.click(addBtn);

        expect(mockCreateRootNote).toHaveBeenCalled();
    });

    it('should render a blur backdrop only when floating and hovered', () => {
        const { container } = render(
            <Sidebar isOpen={false} setIsOpen={mockSetIsOpen} workspace={mockWorkspace} />
        );

        // Initial: closed and not hovered, no blur
        expect(container.querySelector('.backdrop-blur-\\[0\\.5px\\]')).not.toBeInTheDocument();

        // Hover sensor
        const sensor = document.querySelector('.cursor-e-resize');
        fireEvent.mouseEnter(sensor);

        expect(container.querySelector('.backdrop-blur-\\[0\\.5px\\]')).toBeInTheDocument();
    });
});