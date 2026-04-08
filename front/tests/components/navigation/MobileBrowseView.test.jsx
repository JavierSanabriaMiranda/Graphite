import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MobileBrowseView from '../../../src/components/navigation/MobileBrowseView';
import { noteService } from '../../../src/services/db/noteService';
import { useNote } from '../../../src/components/context/NoteContext';
import { useWorkspace } from '../../../src/components/context/WorkspaceContext';

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

vi.mock('../../../src/components/context/WorkspaceContext', () => ({
    useWorkspace: vi.fn(),
}));

vi.mock('../../../src/components/navigation/NavItem', () => ({
    default: ({ note }) => <li data-testid="nav-item">{note.title}</li>,
}));

vi.mock('../../../src/components/navigation/WorkspaceSelector', () => ({
    default: () => <div data-testid="workspace-selector">WorkspaceSelector</div>,
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

        // Note Context default mock
        useNote.mockReturnValue({
            refreshTrigger: 0,
            createRootNote: mockCreateRootNote,
        });

        // Workspace Context default mock
        useWorkspace.mockReturnValue({
            activeWorkspace: mockWorkspace
        });

        // noteService default mock
        noteService.getRootNotes.mockResolvedValue(mockNotes);
    });

    /**
     * Verify that the header renders correctly using data from the WorkspaceContext
     */
    it('should render workspace name and its translations', async () => {
        render(<MobileBrowseView />);

        // The name appears in the uppercase p tag
        expect(screen.getByText('TFG Workspace')).toBeInTheDocument();
        expect(screen.getByText('sidebar.pages')).toBeInTheDocument();
    });

    /**
     * Verify that root notes are fetched automatically when the component mounts
     */
    it('should fetch and render notes on mount', async () => {
        render(<MobileBrowseView />);

        // Verify service has been called with the ID from context
        expect(noteService.getRootNotes).toHaveBeenCalledWith('ws-123');

        await waitFor(() => {
            const items = screen.getAllByTestId('nav-item');
            expect(items).toHaveLength(2);
            expect(screen.getByText('Nota de Bienvenida')).toBeInTheDocument();
        });
    });

    /**
     * Test the UI state when the current workspace has no notes
     */
    it('should show the empty state when no notes are returned', async () => {
        noteService.getRootNotes.mockResolvedValue([]);
        render(<MobileBrowseView />);

        await waitFor(() => {
            expect(screen.getByText('common.no_result')).toBeInTheDocument();
        });
        expect(screen.queryByTestId('nav-item')).not.toBeInTheDocument();
    });

    /**
     * Test user interaction with the "Add Note" button
     */
    it('should call createRootNote when the plus button is clicked', () => {
        render(<MobileBrowseView />);

        // Find the button by its child icon (Plus)
        const plusButton = screen.getAllByRole('button').find(btn => 
            btn.querySelector('svg') // Plus icon is a lucide-react SVG
        );

        fireEvent.click(plusButton);
        expect(mockCreateRootNote).toHaveBeenCalledTimes(1);
    });

    /**
     * Ensure the component reacts to workspace changes in the context
     */
    it('should re-fetch notes when workspace changes in context', async () => {
        const { rerender } = render(<MobileBrowseView />);

        const newWorkspace = { workspace_id: 'ws-456', name: 'Personal' };
        
        // Mock the new value before rerender
        useWorkspace.mockReturnValue({
            activeWorkspace: newWorkspace
        });

        rerender(<MobileBrowseView />);

        expect(noteService.getRootNotes).toHaveBeenCalledWith('ws-456');
    });

    /**
     * Test integration with the refreshTrigger (used for real-time updates or sync)
     */
    it('should re-fetch notes when refreshTrigger updates', async () => {
        const { rerender } = render(<MobileBrowseView />);

        // Simulates trigger changes on note context
        useNote.mockReturnValue({
            refreshTrigger: 1,
            createRootNote: mockCreateRootNote,
        });

        rerender(<MobileBrowseView />);

        // Should have been called 2 times (initial + refresh)
        expect(noteService.getRootNotes).toHaveBeenCalledTimes(2);
    });
});