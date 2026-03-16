import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PathBar from '../../src/components/PathBar';
import { useNote } from '../../src/components/context/NoteContext';
import { noteService } from '../../src/services/db/noteService';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../src/services/db/noteService', () => ({
    noteService: {
        getNoteByPath: vi.fn(),
    },
}));

// Mock child components
vi.mock('../../src/components/util/ChangeThemeButton', () => ({ default: () => <button>ThemeBtn</button> }));
vi.mock('../../src/components/options_menu/OptionsMenu', () => ({ default: () => <button>Options</button> }));

describe('PathBar Component', () => {
    const mockOnNoteSelect = vi.fn();
    const mockActiveNote = {
        note_id: 'n1',
        workspace_id: 'ws1',
        note_path: '/Root/Folder/Current',
    };

    beforeEach(() => {
        vi.clearAllMocks();
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            selectNote: mockOnNoteSelect,
        });
    });

    it('should render short breadcrumbs correctly', () => {
        render(<PathBar saveStatus="saved" editor={{}} />);

        expect(screen.getByText('Root')).toBeInTheDocument();
        expect(screen.getByText('Folder')).toBeInTheDocument();
        expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('should render collapsed breadcrumbs for deep paths', () => {
        const deepNote = {
            ...mockActiveNote,
            note_path: '/Root/Sub1/Sub2/Sub3/Last',
        };
        useNote.mockReturnValue({ selectedNote: deepNote, selectNote: mockOnNoteSelect });

        render(<PathBar saveStatus="saved" editor={{}} />);

        expect(screen.getByText('Root')).toBeInTheDocument();
        expect(screen.getByText('...')).toBeInTheDocument();
        expect(screen.getByText('Sub3')).toBeInTheDocument();
        expect(screen.getByText('Last')).toBeInTheDocument();
    });

    it('should call selectNote when a path segment is clicked', async () => {
        const targetNote = { note_id: 'n2', title: 'Root' };
        noteService.getNoteByPath.mockResolvedValue(targetNote);

        render(<PathBar saveStatus="saved" editor={{}} />);

        const rootSegment = screen.getByText('Root');
        await act(async () => {
            fireEvent.click(rootSegment);
        });

        expect(noteService.getNoteByPath).toHaveBeenCalledWith('/Root', 'ws1');
        expect(mockOnNoteSelect).toHaveBeenCalledWith(targetNote);
    });

    it('should do nothing when the current note (last segment) is clicked', async () => {
        render(<PathBar saveStatus="saved" editor={{}} />);

        const currentSegment = screen.getByText('Current');
        fireEvent.click(currentSegment);

        expect(noteService.getNoteByPath).not.toHaveBeenCalled();
    });

    it('should show saving status with pulse animation', () => {
        const { rerender } = render(<PathBar saveStatus="saving" editor={{}} />);

        expect(screen.getByText('editor.saving')).toBeInTheDocument();
        const indicator = screen.getByText('editor.saving').previousSibling;
        expect(indicator).toHaveClass('animate-pulse', 'bg-amber-500');

        rerender(<PathBar saveStatus="saved" editor={{}} />);
        expect(screen.getByText('editor.saved')).toBeInTheDocument();
        expect(indicator).toHaveClass('bg-primary');
    });

    it('should handle navigation errors gracefully', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        noteService.getNoteByPath.mockRejectedValue(new Error('DB Error'));

        render(<PathBar saveStatus="saved" editor={{}} />);

        const rootSegment = screen.getByText('Root');
        await act(async () => {
            fireEvent.click(rootSegment);
        });

        expect(consoleSpy).toHaveBeenCalledWith("Error al navegar por el path:", expect.any(Error));
        consoleSpy.mockRestore();
    });

    it('should return null if there is no note path', () => {
        useNote.mockReturnValue({ selectedNote: { note_path: null }, selectNote: mockOnNoteSelect });
        const { container } = render(<PathBar saveStatus="saved" editor={{}} />);

        // The container should be empty on the breadcrumbs side
        const breadcrumbZone = container.firstChild.firstChild;
        expect(breadcrumbZone.childNodes.length).toBe(0);
    });
});