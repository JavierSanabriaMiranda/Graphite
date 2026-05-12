import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import NavItem from '../../../src/components/navigation/NavItem';
import { useNote } from '../../../src/components/context/NoteContext';
import { noteService } from '../../../src/services/db/noteService';
import { useToast } from '../../../src/components/context/ToastContext';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../../src/components/context/ToastContext', () => ({
    useToast: vi.fn(),
}));

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        hasSubnotes: vi.fn(),
        getSubnotes: vi.fn(),
        getByNoteId: vi.fn(),
        update: vi.fn(),
    },
}));

vi.mock('../../../src/components/util/DropdownArrow', () => ({
    default: ({ menuOpen }) => <span data-testid="dropdown-arrow" data-open={menuOpen} />,
}));

vi.mock('../../../src/components/util/NoteIcon', () => ({
    default: ({ iconChar }) => <span data-testid="note-icon">{iconChar}</span>,
}));

// Interactive mock for NavContextMenu to test subpage creation and deletion triggers
vi.mock('../../../src/components/context_menu/NavContextMenu', () => ({
    default: ({ onCreateSubpageClick, onDeleteClick }) => (
        <div data-testid="nav-context-menu">
            <button onClick={onCreateSubpageClick}>Mock Create Subpage</button>
            <button onClick={onDeleteClick}>Mock Delete</button>
        </div>
    ),
}));

vi.mock('../../../src/components/options_menu/DeleteConfirmModal', () => ({
    default: ({ isOpen }) => isOpen ? <div data-testid="delete-modal">DeleteConfirmModal</div> : null,
}));

describe('NavItem Component', () => {
    const mockNote = { note_id: 'note-1', title: 'Parent Note', icon: '🚀' };
    const mockSubnotes = [{ note_id: 'sub-1', title: 'Child Note 1', icon: null }];
    const mockSelectNote = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        // Default Context State
        useNote.mockReturnValue({
            selectedNote: null,
            selectNote: mockSelectNote,
            refreshTrigger: 0,
        });

        // Setup default Toast behavior
        useToast.mockReturnValue({ showToast: vi.fn() });

        noteService.getByNoteId.mockImplementation((id) => {
            if (id === 'note-1') return Promise.resolve(mockNote);
            if (id === 'sub-1') return Promise.resolve(mockSubnotes[0]);
            return Promise.resolve(null);
        });

        noteService.hasSubnotes.mockResolvedValue(false);
        noteService.getSubnotes.mockResolvedValue([]);
    });

    it('should render the note title and icon correctly', async () => {
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });
        expect(screen.getByText('Parent Note')).toBeInTheDocument();
        expect(screen.getByTestId('note-icon')).toHaveTextContent('🚀');
    });

    it('should render default FileText icon if no icon is provided', async () => {
        const noteNoIcon = { ...mockNote, icon: null };
        noteService.getByNoteId.mockResolvedValue(noteNoIcon);
        await act(async () => {
            render(<NavItem note={noteNoIcon} />);
        });
        const titleSpan = screen.getByText('Parent Note');
        const iconDiv = titleSpan.previousSibling;
        expect(iconDiv.querySelector('svg')).toBeInTheDocument();
    });

    it('should call selectNote from context when the note is clicked', async () => {
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });
        fireEvent.click(screen.getByText('Parent Note'));
        expect(mockSelectNote).toHaveBeenCalledWith(expect.objectContaining({ note_id: 'note-1' }));
    });

    it('should apply active styles if the note is selected', async () => {
        useNote.mockReturnValue({
            selectedNote: { note_id: 'note-1' },
            selectNote: mockSelectNote,
            refreshTrigger: 0,
        });
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });
        const container = screen.getByText('Parent Note').closest('div');
        expect(container).toHaveClass('bg-primary/10');
    });

    it('should show the expand arrow only if it has subnotes', async () => {
        noteService.hasSubnotes.mockResolvedValue(true);
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });
        const arrowButton = screen.getByTestId('dropdown-arrow').closest('button');
        expect(arrowButton).not.toHaveClass('opacity-0');
    });

    it('should load and display subnotes when expanded', async () => {
        noteService.hasSubnotes.mockResolvedValue(true);
        noteService.getSubnotes.mockResolvedValue(mockSubnotes);
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });
        const arrowButton = screen.getByTestId('dropdown-arrow').closest('button');
        await act(async () => {
            fireEvent.click(arrowButton);
        });
        expect(noteService.getSubnotes).toHaveBeenCalledWith(mockNote.note_id);
        await waitFor(() => {
            expect(screen.getByText('Child Note 1')).toBeInTheDocument();
        });
    });

    it('should handle the recursive level padding correctly', async () => {
        await act(async () => {
            render(<NavItem note={mockNote} level={2} />);
        });
        const container = screen.getByText('Parent Note').closest('div');
        expect(container).toHaveStyle('padding-left: 32px');
    });

    it('should not expand if the note has no subnotes even if clicked', async () => {
        noteService.hasSubnotes.mockResolvedValue(false);
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });
        const arrowButton = screen.getByTestId('dropdown-arrow').closest('button');
        fireEvent.click(arrowButton);
        expect(noteService.getSubnotes).not.toHaveBeenCalled();
    });
});

describe('NavItem Component - Logic & Interactions', () => {
    const mockNote = { note_id: 'note-1', title: 'Parent Note', icon: '🚀' };
    const mockNewSubnote = { note_id: 'sub-new', title: 'New Sub' };
    
    const mockSelectNote = vi.fn();
    const mockCreateSubnote = vi.fn();
    const mockTriggerRefresh = vi.fn();
    const mockShowToast = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        useNote.mockReturnValue({
            selectedNote: null,
            selectNote: mockSelectNote,
            createSubnote: mockCreateSubnote,
            triggerRefresh: mockTriggerRefresh,
            refreshTrigger: 0,
        });

        useToast.mockReturnValue({ showToast: mockShowToast });
        noteService.getByNoteId.mockResolvedValue(mockNote);
        noteService.hasSubnotes.mockResolvedValue(false);
    });

    it('should prevent default and show context menu on right click', async () => {
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });
        const navItem = screen.getByText('Parent Note');
        fireEvent.contextMenu(navItem, { clientX: 100, clientY: 200 });
        expect(screen.getByTestId('nav-context-menu')).toBeInTheDocument();
    });

    it('should select the note when Enter or Space is pressed', async () => {
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });
        const navItemContainer = screen.getByText('Parent Note').closest('div');
        fireEvent.keyDown(navItemContainer, { key: 'Enter' });
        expect(mockSelectNote).toHaveBeenCalledWith(mockNote);
        fireEvent.keyDown(navItemContainer, { key: ' ' });
        expect(mockSelectNote).toHaveBeenCalledTimes(2);
    });

    it('should handle subpage creation flow correctly', async () => {
        mockCreateSubnote.mockResolvedValue(mockNewSubnote);
        noteService.hasSubnotes.mockResolvedValue(true);
        noteService.getSubnotes.mockResolvedValue([mockNewSubnote]);

        await act(async () => {
            render(<NavItem note={mockNote} />);
        });

        fireEvent.contextMenu(screen.getByText('Parent Note'));
        await act(async () => {
            fireEvent.click(screen.getByText('Mock Create Subpage'));
        });

        expect(mockCreateSubnote).toHaveBeenCalledWith(mockNote.note_id);
        expect(mockTriggerRefresh).toHaveBeenCalled();
        expect(mockSelectNote).toHaveBeenCalledWith(mockNewSubnote);
        expect(mockShowToast).toHaveBeenCalledWith('sidebar.context_menu.subpage_created', 'success');
    });

    it('should show error toast if subpage creation fails', async () => {
        mockCreateSubnote.mockRejectedValue(new Error('DB Error'));
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });
        fireEvent.contextMenu(screen.getByText('Parent Note'));
        await act(async () => {
            fireEvent.click(screen.getByText('Mock Create Subpage'));
        });
        expect(mockShowToast).toHaveBeenCalledWith('sidebar.context_menu.error_creating_subpage', 'error');
    });

    it('should open the DeleteConfirmModal when requested from context menu', async () => {
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });
        expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
        fireEvent.contextMenu(screen.getByText('Parent Note'));
        fireEvent.click(screen.getByText('Mock Delete'));
        expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    });
});