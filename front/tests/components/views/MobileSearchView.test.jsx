import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import MobileSearchView from '../../../src/components/views/MobileSearchView';
import { useNote } from '../../../src/components/context/NoteContext';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

// Mocking the Result List to verify it receives the filtered data
vi.mock('../../../src/components/note_search/SearchResultList', () => ({
    default: ({ results, onSelect }) => (
        <div data-testid="results-list">
            {results.map(note => (
                <button key={note.note_id} onClick={() => onSelect(note)}>
                    {note.title}
                </button>
            ))}
        </div>
    ),
}));

describe('MobileSearchView Component', () => {
    const mockSelectNote = vi.fn();
    const mockNotes = [
        { note_id: '1', title: 'Work Tasks' },
        { note_id: '2', title: 'Shopping List' },
        { note_id: '3', title: 'Workout Routine' },
    ];

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup the context mock with predefined notes
        useNote.mockReturnValue({
            allNotes: mockNotes,
            selectNote: mockSelectNote
        });
    });

    /**
     * Test: Basic Rendering
     */
    it('should render the search title and input placeholder', () => {
        render(<MobileSearchView />);
        
        expect(screen.getByText('search.title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('search.placeholder')).toBeInTheDocument();
    });

    /**
     * Test: Search Filtering Logic
     */
    it('should filter notes based on the input query (case insensitive)', () => {
        render(<MobileSearchView />);
        
        const input = screen.getByPlaceholderText('search.placeholder');
        
        // Type "work" to filter
        fireEvent.change(input, { target: { value: 'work' } });

        // "Work Tasks" and "Workout Routine" contain "work"
        expect(screen.getByText('Work Tasks')).toBeInTheDocument();
        expect(screen.getByText('Workout Routine')).toBeInTheDocument();
        
        // "Shopping List" should be filtered out
        expect(screen.queryByText('Shopping List')).not.toBeInTheDocument();
    });

    /**
     * Test: Selection Action
     */
    it('should call selectNote when a result is clicked', () => {
        render(<MobileSearchView />);
        
        const input = screen.getByPlaceholderText('search.placeholder');
        fireEvent.change(input, { target: { value: 'Shopping' } });

        const resultItem = screen.getByText('Shopping List');
        fireEvent.click(resultItem);

        expect(mockSelectNote).toHaveBeenCalledWith(mockNotes[1]);
    });

    /**
     * Test: Result Limiting
     * Component uses .slice(0, 8)
     */
    it('should limit the results to a maximum of 8 items', () => {
        // Create 10 similar notes
        const manyNotes = Array.from({ length: 10 }, (_, i) => ({
            note_id: `${i}`,
            title: `Note ${i}`
        }));

        useNote.mockReturnValue({
            allNotes: manyNotes,
            selectNote: mockSelectNote
        });

        render(<MobileSearchView />);
        
        const resultsContainer = screen.getByTestId('results-list');
        expect(resultsContainer.children.length).toBe(8);
    });

    /**
     * Test: AutoFocus
     */
    it('should have autoFocus enabled on the search input', () => {
        render(<MobileSearchView />);
        const input = screen.getByPlaceholderText('search.placeholder');
        expect(input).toHaveFocus();
    });
});