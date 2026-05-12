import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import SearchResultList from '../../../src/components/note_search/SearchResultList';

// Mocking NoteIcon to verify it receives the correct prop
vi.mock('../../../src/components/util/NoteIcon', () => ({
    default: ({ iconChar }) => <span data-testid="custom-icon">{iconChar}</span>,
}));

describe('SearchResultList Component', () => {
    const mockOnSelect = vi.fn();
    const mockT = vi.fn((key) => key);

    const mockResults = [
        { 
            note_id: '1', 
            title: 'Project Alpha', 
            note_path: 'work/projects', 
            icon: '🚀' 
        },
        { 
            note_id: '2', 
            title: '', // Test empty title fallback
            note_path: 'personal/drafts', 
            icon: null 
        }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test: Empty State
     */
    it('should render "no results" state when query is present but results are empty', () => {
        render(
            <SearchResultList 
                results={[]} 
                onSelect={mockOnSelect} 
                query="something" 
                t={mockT} 
            />
        );

        expect(screen.getByText('search.no_results')).toBeInTheDocument();
    });

    /**
     * Test: Rendering List
     */
    it('should render the list of results correctly', () => {
        render(
            <SearchResultList 
                results={mockResults} 
                onSelect={mockOnSelect} 
                query="pro" 
                t={mockT} 
            />
        );

        // Check first note
        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
        expect(screen.getByText('work/projects')).toBeInTheDocument();
        expect(screen.getByTestId('custom-icon')).toHaveTextContent('🚀');

        // Check second note (fallback title)
        expect(screen.getByText('Untitled')).toBeInTheDocument();
        expect(screen.getByText('personal/drafts')).toBeInTheDocument();
    });

    /**
     * Test: Default Icon
     */
    it('should render default FileText icon when no custom icon is provided', () => {
        render(
            <SearchResultList 
                results={[mockResults[1]]} 
                onSelect={mockOnSelect} 
                query="" 
                t={mockT} 
            />
        );

        // Should not render custom-icon, but the SVG from lucide
        expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
        const iconContainer = screen.getByRole('button').firstChild;
        expect(iconContainer.querySelector('svg')).toBeInTheDocument();
    });

    /**
     * Test: Selection Interaction
     */
    it('should trigger onSelect with the correct note object when clicked', () => {
        render(
            <SearchResultList 
                results={mockResults} 
                onSelect={mockOnSelect} 
                query="" 
                t={mockT} 
            />
        );

        const firstResult = screen.getByText('Project Alpha').closest('button');
        fireEvent.click(firstResult);

        expect(mockOnSelect).toHaveBeenCalledWith(mockResults[0]);
    });
});