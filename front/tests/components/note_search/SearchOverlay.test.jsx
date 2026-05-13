import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import SearchOverlay from '../../../src/components/note_search/SearchOverlay';
import { useUI } from '../../../src/components/context/UIContext';
import { useNote } from '../../../src/components/context/NoteContext';

vi.mock('../../../src/components/context/UIContext', () => ({
    useUI: vi.fn(),
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

// Mock child component to verify received props
vi.mock('../../../src/components/note_search/SearchResultList', () => ({
    default: ({ results, onSelect }) => (
        <div data-testid="results-wrapper">
            {results.map(note => (
                <button 
                    key={note.note_id} 
                    onClick={() => onSelect(note)}
                >
                    {note.title}
                </button>
            ))}
        </div>
    ),
}));

describe('SearchOverlay Component', () => {
    const mockCloseSearch = vi.fn();
    const mockSelectNote = vi.fn();
    
    const mockNotes = [
        { note_id: '1', title: 'Apple' },
        { note_id: '2', title: 'Árbol' }, // Test with accents
        { note_id: '3', title: 'Banana' },
        { note_id: '4', title: 'Computing' },
        { note_id: '5', title: 'Desktop' },
        { note_id: '6', title: 'Elephant' },
        { note_id: '7', title: 'Falcon' },
        { note_id: '8', title: 'Giraffe' },
        { note_id: '9', title: 'Hotel' },
        { note_id: '10', title: 'Iguana' },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        
        useUI.mockReturnValue({
            isSearchOpen: true,
            closeSearch: mockCloseSearch,
        });

        useNote.mockReturnValue({
            allNotes: mockNotes,
            selectNote: mockSelectNote,
        });
    });

    /**
     * Test Guard Clause: Visibility
     */
    it('should return null if isSearchOpen is false', () => {
        useUI.mockReturnValue({ isSearchOpen: false, closeSearch: mockCloseSearch });
        const { container } = render(<SearchOverlay />);
        expect(container.firstChild).toBeNull();
    });

    /**
     * Test Filtering Logic: Normalization and Case Insensitivity
     */
    it('should filter notes correctly ignoring accents and case', () => {
        render(<SearchOverlay />);
        const input = screen.getByPlaceholderText('search.placeholder');

        // Search for "arbol" (no accent) should find "Árbol"
        fireEvent.change(input, { target: { value: 'arbol' } });
        
        expect(screen.getByText('Árbol')).toBeInTheDocument();
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    /**
     * Test Logic Constraint: Result Limiting
     */
    it('should display a maximum of 8 results', () => {
        render(<SearchOverlay />);
        const input = screen.getByPlaceholderText('search.placeholder');

        // Empty search should show all notes up to the limit
        fireEvent.change(input, { target: { value: '' } });

        const resultButtons = screen.getAllByRole('button').filter(b => b.textContent !== 'X');
        // Subtract 1 if the backdrop is considered a button, or just check the result wrapper
        expect(screen.getByTestId('results-wrapper').children.length).toBe(8);
    });

    /**
     * Test UI Interaction: Selection Flow
     */
    it('should select note and close overlay when a result is clicked', () => {
        render(<SearchOverlay />);
        
        const resultItem = screen.getByText('Apple');
        fireEvent.click(resultItem);

        expect(mockSelectNote).toHaveBeenCalledWith(mockNotes[0]);
        expect(mockCloseSearch).toHaveBeenCalled();
    });

    /**
     * Test UI Interaction: Close via Backdrop
     */
    it('should call closeSearch when backdrop is clicked', () => {
        render(<SearchOverlay />);
        
        const backdrop = screen.getByLabelText('common.close_search');
        fireEvent.click(backdrop);

        expect(mockCloseSearch).toHaveBeenCalled();
    });

    /**
     * Test Keyboard Accessibility: Escape key
     */
    it('should call closeSearch when Escape key is pressed', () => {
        render(<SearchOverlay />);
        
        fireEvent.keyDown(window, { key: 'Escape' });

        expect(mockCloseSearch).toHaveBeenCalled();
    });

    /**
     * Test AutoFocus
     */
    it('should focus the input automatically on mount', () => {
        render(<SearchOverlay />);
        const input = screen.getByPlaceholderText('search.placeholder');
        expect(input).toHaveFocus();
    });
});