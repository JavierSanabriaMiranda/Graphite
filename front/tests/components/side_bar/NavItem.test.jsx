import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavItem from '../../../src/components/side_bar/NavItem';
import { useNote } from '../../../src/components/context/NoteContext';
import { noteService } from '../../../src/services/db/noteService';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        hasSubnotes: vi.fn(),
        getSubnotes: vi.fn(),
    },
}));

// Mocking child components to simplify the DOM tree
vi.mock('../../../src/components/util/DropdownArrow', () => ({
    default: ({ menuOpen }) => <span data-testid="dropdown-arrow" data-open={menuOpen} />,
}));

vi.mock('../../../src/components/util/NoteIcon', () => ({
    default: ({ iconChar }) => <span data-testid="note-icon">{iconChar}</span>,
}));

describe('NavItem Component', () => {
    const mockNote = {
        note_id: 'note-1',
        title: 'Parent Note',
        icon: '🚀',
    };

    const mockSubnotes = [
        { note_id: 'sub-1', title: 'Child Note 1', icon: null },
    ];

    const mockSelectNote = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        // Default Context State
        useNote.mockReturnValue({
            selectedNote: null,
            selectNote: mockSelectNote,
            refreshTrigger: 0,
        });

        // Default DB Response (No subnotes)
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
        await act(async () => {
            render(<NavItem note={noteNoIcon} />);
        });

        // Lucide icons usually render as SVGs. We check for its existence
        const iconContainer = screen.getByText('Parent Note').previousSibling;
        expect(iconContainer.querySelector('svg')).toBeInTheDocument();
    });

    it('should call selectNote from context when the note is clicked', async () => {
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });

        fireEvent.click(screen.getByText('Parent Note'));
        expect(mockSelectNote).toHaveBeenCalledWith(mockNote);
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

        // Expand the note
        await act(async () => {
            fireEvent.click(arrowButton);
        });

        // Check for loading state first (sidebar.loading key)
        expect(noteService.getSubnotes).toHaveBeenCalledWith(mockNote.note_id);

        // Wait for subnotes to appear
        await waitFor(() => {
            expect(screen.getByText('Child Note 1')).toBeInTheDocument();
        });
    });

    it('should handle the recursive level padding correctly', async () => {
        const level = 2;
        await act(async () => {
            render(<NavItem note={mockNote} level={level} />);
        });

        const container = screen.getByText('Parent Note').closest('div');
        // Padding calculation: level * 12 + 8 => 2 * 12 + 8 = 32px
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