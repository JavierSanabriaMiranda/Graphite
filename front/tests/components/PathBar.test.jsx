import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import PathBar from '../../src/components/PathBar';
import { useNote } from '../../src/components/context/NoteContext';
import { noteService } from '../../src/services/db/noteService';
import { useIsMobile } from '../../src/hooks/useIsMobile';
import { SyncStatus } from '../../src/util/SyncStatus';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

// Mock EditModeButton with interactive trigger
vi.mock('../../src/components/EditModeButton', () => ({
    default: ({ isEditable, onToggle }) => (
        <button onClick={onToggle} data-testid="edit-mode-btn">
            {isEditable ? 'Editable' : 'ReadOnly'}
        </button>
    )
}));

vi.mock('../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../src/services/db/noteService', () => ({
    noteService: {
        getNoteByPath: vi.fn(),
        getByNoteId: vi.fn(),
    },
}));

vi.mock('../../src/hooks/useIsMobile', () => ({
    useIsMobile: vi.fn(),
}));

// Child components mocks
vi.mock('../../src/components/util/ChangeThemeButton', () => ({ default: () => <button>ThemeBtn</button> }));
vi.mock('../../src/components/options_menu/OptionsMenu', () => ({ default: () => <button>Options</button> }));

describe('PathBar Component - Full Integrated Suite', () => {
    const mockOnNoteSelect = vi.fn();
    const mockSetNoteEditableMode = vi.fn();
    
    const mockActiveNote = {
        note_id: 'n1',
        workspace_id: 'ws1',
        note_path: '/Root/Folder/Current',
        is_editable: true
    };

    beforeEach(() => {
        vi.clearAllMocks();
        
        // Default desktop environment
        vi.mocked(useIsMobile).mockReturnValue(false);

        // Standard NoteContext state
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            selectNote: mockOnNoteSelect,
            refreshTrigger: 0,
            syncStatus: SyncStatus.ONLINE,
            setNoteEditableMode: mockSetNoteEditableMode
        });

        // Default DB Response
        noteService.getByNoteId.mockResolvedValue(mockActiveNote);
    });

    // --- BREADCRUMBS & NAVIGATION TESTS ---

    it('should render breadcrumbs correctly after sync', async () => {
        await act(async () => {
            render(<PathBar saveStatus="saved" editor={{}} />);
        });

        expect(await screen.findByText('Root')).toBeInTheDocument();
        expect(screen.getByText('Folder')).toBeInTheDocument();
        expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('should render collapsed breadcrumbs for deep paths', async () => {
        const deepNote = {
            ...mockActiveNote,
            note_path: '/Root/Sub1/Sub2/Sub3/Last',
        };
        noteService.getByNoteId.mockResolvedValue(deepNote);

        await act(async () => {
            render(<PathBar saveStatus="saved" editor={{}} />);
        });

        expect(await screen.findByText('Root')).toBeInTheDocument();
        expect(screen.getByText('...')).toBeInTheDocument();
        expect(screen.getByText('Sub3')).toBeInTheDocument();
        expect(screen.getByText('Last')).toBeInTheDocument();
    });

    it('should call selectNote when a path segment is clicked', async () => {
        const targetNote = { note_id: 'n2', title: 'Root' };
        noteService.getNoteByPath.mockResolvedValue(targetNote);

        await act(async () => {
            render(<PathBar saveStatus="saved" editor={{}} />);
        });

        const rootSegment = await screen.findByText('Root');
        await act(async () => {
            fireEvent.click(rootSegment);
        });

        expect(noteService.getNoteByPath).toHaveBeenCalledWith('/Root', 'ws1');
        expect(mockOnNoteSelect).toHaveBeenCalledWith(targetNote);
    });

    // --- EDIT MODE LOGIC TESTS ---

    it('should toggle edit mode and update context', async () => {
        await act(async () => {
            render(<PathBar saveStatus="saved" editor={{}} />);
        });

        const editBtn = await screen.findByTestId('edit-mode-btn');
        expect(editBtn).toHaveTextContent('Editable');

        // Toggle to ReadOnly
        await act(async () => {
            fireEvent.click(editBtn);
        });

        expect(mockSetNoteEditableMode).toHaveBeenCalledWith(false);
        expect(editBtn).toHaveTextContent('ReadOnly');
    });

    // --- SYNC & STATUS UI TESTS ---

    it('should display saving status with pulse animation', async () => {
        const { rerender } = render(<PathBar saveStatus="saving" editor={{}} />);

        const statusText = await screen.findByText('editor.saving');
        expect(statusText).toBeInTheDocument();
        
        const indicator = statusText.previousSibling;
        expect(indicator).toHaveClass('animate-pulse', 'bg-amber-500');

        await act(async () => {
            rerender(<PathBar saveStatus="saved" editor={{}} />);
        });

        expect(screen.getByText('editor.saved')).toBeInTheDocument();
    });

    it('should display conflict button when syncStatus is CONFLICT', async () => {
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            syncStatus: SyncStatus.CONFLICT,
            setNoteEditableMode: mockSetNoteEditableMode
        });

        await act(async () => {
            render(<PathBar saveStatus="saved" editor={{}} />);
        });

        expect(await screen.findByText('conflict.conflict')).toBeInTheDocument();
    });

    // --- MOBILE LOGIC TESTS ---

    describe('Mobile Viewport', () => {
        beforeEach(() => {
            vi.mocked(useIsMobile).mockReturnValue(true);
        });

        it('should render only immediate parent and current note', async () => {
            const deepNote = {
                note_id: 'n1',
                note_path: '/Root/Folder1/Folder2/CurrentNote',
            };
            noteService.getByNoteId.mockResolvedValue(deepNote);

            await act(async () => {
                render(<PathBar saveStatus="saved" editor={{}} />);
            });

            expect(await screen.findByText('Folder2')).toBeInTheDocument();
            expect(screen.getByText('CurrentNote')).toBeInTheDocument();
            expect(screen.queryByText('Root')).not.toBeInTheDocument();
        });

        it('should apply mobile-specific margins (mt-10)', async () => {
            await act(async () => {
                render(<PathBar saveStatus="saved" editor={{}} />);
            });

            const container = screen.getByText('Current').closest('.h-10');
            expect(container).toHaveClass('mt-10');
        });
    });

    // --- ERROR HANDLING ---

    it('should handle navigation errors gracefully and log them', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        noteService.getNoteByPath.mockRejectedValue(new Error('DB Fail'));

        await act(async () => {
            render(<PathBar saveStatus="saved" editor={{}} />);
        });

        const rootSegment = await screen.findByText('Root');
        await act(async () => {
            fireEvent.click(rootSegment);
        });

        expect(consoleSpy).toHaveBeenCalledWith("Error while navigating :", expect.any(Error));
        consoleSpy.mockRestore();
    });
});