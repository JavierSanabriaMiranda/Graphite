import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import NavItem from '../../../src/components/navigation/NavItem';
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
        getByNoteId: vi.fn(), // Added missing mock function
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

        
        // If it's the parent ID, return parent data.
        // If it's the subnote ID, return subnote data.
        noteService.getByNoteId.mockImplementation((id) => {
            if (id === 'note-1') return Promise.resolve(mockNote);
            if (id === 'sub-1') return Promise.resolve(mockSubnotes[0]);
            return Promise.resolve(null);
        });

        // Default DB Responses
        noteService.hasSubnotes.mockResolvedValue(false);
        noteService.getSubnotes.mockResolvedValue([]);
    });

    /**
     * Test basic rendering of note properties (title and custom icon)
     */
    it('should render the note title and icon correctly', async () => {
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });

        expect(screen.getByText('Parent Note')).toBeInTheDocument();
        expect(screen.getByTestId('note-icon')).toHaveTextContent('🚀');
    });

    /**
     * Test fallback icon rendering when the note record has no specific icon
     */
    it('should render default FileText icon if no icon is provided', async () => {
        const noteNoIcon = { ...mockNote, icon: null };
        noteService.getByNoteId.mockResolvedValue(noteNoIcon);

        await act(async () => {
            render(<NavItem note={noteNoIcon} />);
        });

        // Note title and check the SVG in the sibling container
        const titleSpan = screen.getByText('Parent Note');
        const iconDiv = titleSpan.previousSibling;
        expect(iconDiv.querySelector('svg')).toBeInTheDocument();
    });

    /**
     * Test integration with NoteContext: clicking the item should trigger selection
     */
    it('should call selectNote from context when the note is clicked', async () => {
        await act(async () => {
            render(<NavItem note={mockNote} />);
        });

        fireEvent.click(screen.getByText('Parent Note'));
        expect(mockSelectNote).toHaveBeenCalledWith(expect.objectContaining({
            note_id: 'note-1'
        }));
    });

    /**
     * Test visual feedback when the item matches the selectedNote in context
     */
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

    /**
     * Test visibility logic for the expand/collapse arrow based on subnotes existence
     */
    it('should show the expand arrow only if it has subnotes', async () => {
        noteService.hasSubnotes.mockResolvedValue(true);

        await act(async () => {
            render(<NavItem note={mockNote} />);
        });

        const arrowButton = screen.getByTestId('dropdown-arrow').closest('button');
        expect(arrowButton).not.toHaveClass('opacity-0');
    });

    /**
     * Test lazy loading of subnotes: fetching occurs only upon expansion
     */
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

        expect(noteService.getSubnotes).toHaveBeenCalledWith(mockNote.note_id);

        // Wait for subnotes to appear in the recursive render
        await waitFor(() => {
            expect(screen.getByText('Child Note 1')).toBeInTheDocument();
        });
    });

    /**
     * Test indentation logic for nested notes in the hierarchy
     */
    it('should handle the recursive level padding correctly', async () => {
        const level = 2;
        await act(async () => {
            render(<NavItem note={mockNote} level={level} />);
        });

        const container = screen.getByText('Parent Note').closest('div');
        // Padding calculation in component: level * 12 + 8 => 2 * 12 + 8 = 32px
        expect(container).toHaveStyle('padding-left: 32px');
    });

    /**
     * Test prevention of expansion when no children are detected in database
     */
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