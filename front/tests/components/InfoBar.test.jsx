import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import InfoBar from '../../src/components/InfoBar';
import { useNote } from '../../src/components/context/NoteContext';
import { useIsMobile } from '../../src/hooks/useIsMobile';
import { noteLinkService } from '../../src/services/db/noteLinkService';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: { language: 'en' }
    }),
}));

vi.mock('../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../src/hooks/useIsMobile', () => ({
    useIsMobile: vi.fn(),
}));

vi.mock('../../src/services/db/noteLinkService', () => ({
    noteLinkService: {
        getBacklinks: vi.fn(),
    },
}));

// Mock child component to verify props
vi.mock('../../src/components/navigation/Backlinks', () => ({
    default: ({ backlinks }) => (
        <div data-testid="backlinks-container">
            Count: {backlinks.length}
        </div>
    ),
}));

describe('InfoBar Component', () => {
    const mockNote = {
        note_id: 'note-123',
        created_at: '2026-01-01T10:00:00Z',
        updated_at: '2026-01-02T15:30:00Z'
    };

    const mockBacklinks = [
        { note_id: 'ref-1', title: 'Reference 1' },
        { note_id: 'ref-2', title: 'Reference 2' }
    ];

    beforeEach(() => {
        vi.clearAllMocks();

        // Default mock implementation
        useNote.mockReturnValue({
            selectedNote: mockNote,
            refreshTrigger: 0
        });

        useIsMobile.mockReturnValue(false);
        noteLinkService.getBacklinks.mockResolvedValue(mockBacklinks);
    });

    /**
     * Test: Guard Clause
     */
    it('should render nothing if no note is selected', () => {
        useNote.mockReturnValue({ selectedNote: null });
        const { container } = render(<InfoBar />);
        expect(container.firstChild).toBeNull();
    });

    /**
     * Test: Initial Rendering & Visibility (Desktop)
     */
    it('should render the toggle button with opacity-0 on desktop', () => {
        render(<InfoBar />);
        const toggleButton = screen.getByRole('button');

        expect(toggleButton).toHaveClass('opacity-0');
        expect(screen.getByText('editor.info_bar.show_info')).toBeInTheDocument();
    });

    /**
     * Test: Visibility (Mobile)
     */
    it('should have full opacity on mobile devices', () => {
        useIsMobile.mockReturnValue(true);
        render(<InfoBar />);
        const toggleButton = screen.getByRole('button');

        expect(toggleButton).toHaveClass('opacity-100');
    });

    /**
     * Test: Data Fetching logic
     */
    it('should fetch backlinks when the component mounts with a selected note', async () => {
        render(<InfoBar />);

        await waitFor(() => {
            expect(noteLinkService.getBacklinks).toHaveBeenCalledWith('note-123');
        });
    });

    /**
     * Test: Interaction & Expanded Content
     */
    it('should expand and show dates and backlinks when clicked', async () => {
        await act(async () => {
            render(<InfoBar />);
        });

        const toggleButton = screen.getByRole('button');

        await act(async () => {
            fireEvent.click(toggleButton);
        });

        expect(screen.getByText('editor.info_bar.hide_info')).toBeInTheDocument();

        // Use findBy to wait for the async backlink data to populate the child component
        const backlinksComp = await screen.findByTestId('backlinks-container');
        expect(backlinksComp).toHaveTextContent('Count: 2');
    });

    /**
     * Test: Date Formatting
     */
    it('should display formatted dates correctly', async () => {
        await act(async () => {
            render(<InfoBar />);
        });

        await act(async () => {
            fireEvent.click(screen.getByRole('button'));
        });

        const dateElements = screen.getAllByText(/2026/);
        expect(dateElements.length).toBeGreaterThan(0);
    });

    /**
     * Test: Refresh logic
     */
    it('should re-fetch backlinks when refreshTrigger changes', async () => {
        const { rerender } = render(<InfoBar />);

        // Change trigger in context
        useNote.mockReturnValue({
            selectedNote: mockNote,
            refreshTrigger: 1
        });

        await act(async () => {
            rerender(<InfoBar />);
        });

        expect(noteLinkService.getBacklinks).toHaveBeenCalledTimes(2);
    });
});