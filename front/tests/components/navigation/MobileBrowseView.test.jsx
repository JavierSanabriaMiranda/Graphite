import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MobileBrowseView from '../../../src/components/navigation/MobileBrowseView';
import { noteService } from '../../../src/services/db/noteService';
import { useNote } from '../../../src/components/context/NoteContext';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        getRootNotes: vi.fn(),
        hasSubnotes: vi.fn().mockResolvedValue(false),
    },
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../../src/components/navigation/NavItem', () => ({
    default: ({ note }) => <li data-testid="nav-item">{note.title}</li>,
}));

describe('MobileBrowseView Component', () => {
    const mockWorkspace = { workspace_id: 'ws-123', name: 'TFG Workspace' };
    const mockNotes = [
        { note_id: '1', title: 'Nota de Bienvenida' },
        { note_id: '2', title: 'Plan de Proyecto' },
    ];
    const mockCreateRootNote = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        // Context default configuration
        useNote.mockReturnValue({
            refreshTrigger: 0,
            createRootNote: mockCreateRootNote,
        });

        // noteService default configuration
        noteService.getRootNotes.mockResolvedValue(mockNotes);
    });

    it('should render workspace name and its first letter', async () => {
        render(<MobileBrowseView workspace={mockWorkspace} />);

        const workspaceElements = screen.getAllByText('TFG Workspace');
        expect(workspaceElements.length).toBe(2);
        expect(workspaceElements[0]).toBeInTheDocument();

        expect(screen.getByText('T')).toBeInTheDocument();
        expect(screen.getByText('sidebar.pages')).toBeInTheDocument();
    });

    it('should fetch and render notes on mount', async () => {
        render(<MobileBrowseView workspace={mockWorkspace} />);

        // Verify service has been called with correct id
        expect(noteService.getRootNotes).toHaveBeenCalledWith('ws-123');

        // Wait for notes to be renderized
        await waitFor(() => {
            const items = screen.getAllByTestId('nav-item');
            expect(items).toHaveLength(2);
            expect(screen.getByText('Nota de Bienvenida')).toBeInTheDocument();
        });
    });

    it('should show the empty state when no notes are returned', async () => {
        noteService.getRootNotes.mockResolvedValue([]);
        render(<MobileBrowseView workspace={mockWorkspace} />);

        await waitFor(() => {
            expect(screen.getByText('common.no_result')).toBeInTheDocument();
        });
        expect(screen.queryByTestId('nav-item')).not.toBeInTheDocument();
    });

    it('should call createRootNote when the plus button is clicked', () => {
        render(<MobileBrowseView workspace={mockWorkspace} />);

        const addButton = screen.getByRole('button', { name: '' }).closest('button');
        const plusButton = screen.getAllByRole('button').find(btn => btn.querySelector('.lucide-plus'));

        fireEvent.click(plusButton);
        expect(mockCreateRootNote).toHaveBeenCalledTimes(1);
    });

    it('should re-fetch notes when workspace changes', async () => {
        const { rerender } = render(<MobileBrowseView workspace={mockWorkspace} />);

        const newWorkspace = { workspace_id: 'ws-456', name: 'Personal' };

        rerender(<MobileBrowseView workspace={newWorkspace} />);

        expect(noteService.getRootNotes).toHaveBeenCalledWith('ws-456');
    });

    it('should re-fetch notes when refreshTrigger updates', async () => {
        const { rerender } = render(<MobileBrowseView workspace={mockWorkspace} />);

        // Simulates trigger changes on context
        useNote.mockReturnValue({
            refreshTrigger: 1,
            createRootNote: mockCreateRootNote,
        });

        rerender(<MobileBrowseView workspace={mockWorkspace} />);

        // Should have been called 2 times
        expect(noteService.getRootNotes).toHaveBeenCalledTimes(2);
    });
});