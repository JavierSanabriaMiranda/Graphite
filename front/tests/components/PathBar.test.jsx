import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PathBar from '../../src/components/PathBar';
import { useNote } from '../../src/components/context/NoteContext';
import { noteService } from '../../src/services/db/noteService';
import { useIsMobile } from '../../src/hooks/useIsMobile';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
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
        // Default mock implementation for useNote including refreshTrigger
        vi.mocked(useIsMobile).mockReturnValue(false);

        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            selectNote: mockOnNoteSelect,
            refreshTrigger: 0,
        });

        // Default mock implementation for noteService to avoid null displayNote
        noteService.getByNoteId.mockResolvedValue(mockActiveNote);
    });

    it('should render short breadcrumbs correctly after sync', async () => {
        await act(async () => {
            render(<PathBar saveStatus="saved" editor={{}} />);
        });

        // Use findBy to wait for the useEffect/setState cycle
        expect(await screen.findByText('Root')).toBeInTheDocument();
        expect(screen.getByText('Folder')).toBeInTheDocument();
        expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('should render collapsed breadcrumbs for deep paths', async () => {
        const deepNote = {
            ...mockActiveNote,
            note_id: 'deep1',
            note_path: '/Root/Sub1/Sub2/Sub3/Last',
        };
        useNote.mockReturnValue({
            selectedNote: deepNote,
            selectNote: mockOnNoteSelect,
            refreshTrigger: 0
        });
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

    it('should do nothing when the current note (last segment) is clicked', async () => {
        await act(async () => {
            render(<PathBar saveStatus="saved" editor={{}} />);
        });

        const currentSegment = await screen.findByText('Current');
        fireEvent.click(currentSegment);

        expect(noteService.getNoteByPath).not.toHaveBeenCalled();
    });

    it('should update display data when refreshTrigger changes', async () => {
        const { rerender } = render(<PathBar saveStatus="saved" editor={{}} />);

        // Initial fetch check
        await waitFor(() => expect(noteService.getByNoteId).toHaveBeenCalledTimes(1));

        // Update trigger in context mock
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            selectNote: mockOnNoteSelect,
            refreshTrigger: 1, // Trigger changed
        });

        await act(async () => {
            rerender(<PathBar saveStatus="saved" editor={{}} />);
        });

        // Should call getByNoteId again due to trigger change
        await waitFor(() => expect(noteService.getByNoteId).toHaveBeenCalledTimes(2));
    });

    it('should show saving status with pulse animation', async () => {
        let rerenderFunc;
        await act(async () => {
            const { rerender } = render(<PathBar saveStatus="saving" editor={{}} />);
            rerenderFunc = rerender;
        });

        expect(await screen.findByText('editor.saving')).toBeInTheDocument();
        const indicator = screen.getByText('editor.saving').previousSibling;
        expect(indicator).toHaveClass('animate-pulse', 'bg-amber-500');

        await act(async () => {
            rerenderFunc(<PathBar saveStatus="saved" editor={{}} />);
        });

        expect(screen.getByText('editor.saved')).toBeInTheDocument();
        expect(indicator).toHaveClass('bg-primary');
    });

    it('should handle navigation errors gracefully', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        noteService.getNoteByPath.mockRejectedValue(new Error('DB Error'));

        await act(async () => {
            render(<PathBar saveStatus="saved" editor={{}} />);
        });

        const rootSegment = await screen.findByText('Root');
        await act(async () => {
            fireEvent.click(rootSegment);
        });

        // Exact match with the space before the colon in your code
        expect(consoleSpy).toHaveBeenCalledWith("Error while navigating :", expect.any(Error));
        consoleSpy.mockRestore();
    });

    it('should not render any breadcrumb buttons if there is no note path', async () => {
        // Setup mock state without path
        useNote.mockReturnValue({
            selectedNote: { note_path: null },
            selectNote: mockOnNoteSelect,
            refreshTrigger: 0
        });
        noteService.getByNoteId.mockResolvedValue({ note_path: null });

        // Render component
        await act(async () => {
            render(<PathBar saveStatus="saved" editor={{}} />);
        });

        // Check taht the only buttons present are the "Action" buttons (Theme and Options).
        const allButtons = screen.getAllByRole('button');

        // Filter buttons that are NOT the theme or options mocks
        const breadcrumbButtons = allButtons.filter(btn =>
            btn.textContent !== 'ThemeBtn' && btn.textContent !== 'Options'
        );

        // There should be 0 buttons belonging to the breadcrumb logic
        expect(breadcrumbButtons).toHaveLength(0);

        expect(screen.queryByText('Root')).not.toBeInTheDocument();
    });

    describe('Mobile Specific Logic', () => {
        beforeEach(() => {
            vi.clearAllMocks();
            // Forzamos que useIsMobile devuelva siempre true en este bloque
            vi.mocked(useIsMobile).mockReturnValue(true);

            // Setup básico de la nota
            useNote.mockReturnValue({
                selectedNote: { note_id: 'n1', workspace_id: 'ws1', note_path: '/Root/Folder/Current' },
                selectNote: vi.fn(),
                refreshTrigger: 0,
            });
            noteService.getByNoteId.mockResolvedValue({
                note_id: 'n1',
                note_path: '/Root/Folder/Current'
            });
        });

        it('should render only the immediate parent and current note on mobile', async () => {
            const deepNote = {
                note_id: 'deep1',
                note_path: '/Root/Folder1/Folder2/CurrentNote',
            };
            noteService.getByNoteId.mockResolvedValue(deepNote);
            useNote.mockReturnValue({
                selectedNote: deepNote,
                selectNote: vi.fn(),
                refreshTrigger: 0
            });

            await act(async () => {
                render(<PathBar saveStatus="saved" editor={{}} />);
            });

            // Esperamos a que se procese el useEffect y cambie el estado a la nota profunda
            expect(await screen.findByText('Folder2')).toBeInTheDocument();
            expect(screen.getByText('CurrentNote')).toBeInTheDocument();

            // IMPORTANTE: Al ser móvil, estos NO deben existir
            expect(screen.queryByText('Root')).not.toBeInTheDocument();
            expect(screen.queryByText('Folder1')).not.toBeInTheDocument();
        });

        it('should hide save status text and apply extra margin on mobile', async () => {
            await act(async () => {
                render(<PathBar saveStatus="saved" editor={{}} />);
            });

            // Verificamos que el texto no existe (solo en móvil)
            expect(screen.queryByText('editor.saved')).not.toBeInTheDocument();

            // Buscamos el contenedor principal que tiene el margen
            // En tu código: className={`... ${isMobile ? 'mt-10' : ''}`}
            const container = screen.getByText('Current').closest('.flex.items-center.justify-between');
            expect(container).toHaveClass('mt-10');
        });

        it('should not show parent button if note is at root level on mobile', async () => {
            const rootNote = {
                note_id: 'root1',
                note_path: '/OnlyRoot',
            };
            noteService.getByNoteId.mockResolvedValue(rootNote);
            useNote.mockReturnValue({
                selectedNote: rootNote,
                selectNote: vi.fn(),
                refreshTrigger: 0
            });

            await act(async () => {
                render(<PathBar saveStatus="saved" editor={{}} />);
            });

            expect(await screen.findByText('OnlyRoot')).toBeInTheDocument();

            // En móvil, si solo hay una parte, no se renderiza el bloque del parentName
            // Filtramos botones que no sean los de utilidades
            const buttons = screen.getAllByRole('button');
            const breadcrumbButtons = buttons.filter(btn =>
                btn.textContent !== 'ThemeBtn' && btn.textContent !== 'Options'
            );

            expect(breadcrumbButtons).toHaveLength(0);
        });
    });
});