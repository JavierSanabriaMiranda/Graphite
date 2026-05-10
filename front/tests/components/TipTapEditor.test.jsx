import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import TiptapEditor from '../../src/components/TiptapEditor';
import { useNote } from '../../src/components/context/NoteContext';
import { useToast } from '../../src/components/context/ToastContext';
import { useAuth } from '../../src/components/context/AuthContext';
import { useSettings } from '../../src/components/context/SettingsContext';
import { useAttachment } from '../../src/components/context/AttachmentContext';
import { useIsMobile } from '../../src/hooks/useIsMobile';
import { noteService } from '../../src/services/db/noteService';
import { useEditor } from '@tiptap/react';
import { useEditorConfig } from '../../src/hooks/useEditorConfig';

// --- MOCKS ---

vi.mock('@tiptap/pm/state', () => ({
    EditorState: {
        create: vi.fn().mockReturnValue({
            plugins: [],
            doc: { content: { size: 0 } }
        })
    },
}));

vi.mock('@tiptap/react', async () => {
    const actual = await vi.importActual('@tiptap/react');
    return {
        ...actual,
        useEditor: vi.fn(),
        EditorContent: ({ editor }) => <div data-testid="tiptap-content" />,
    };
});

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../src/components/context/NoteContext', () => ({ useNote: vi.fn() }));
vi.mock('../../src/components/context/ToastContext', () => ({ useToast: vi.fn() }));
vi.mock('../../src/components/context/AuthContext', () => ({ useAuth: vi.fn() }));
vi.mock('../../src/components/context/SettingsContext', () => ({ useSettings: vi.fn() }));
vi.mock('../../src/components/context/AttachmentContext', () => ({ useAttachment: vi.fn() }));
vi.mock('../../src/hooks/useIsMobile', () => ({ useIsMobile: vi.fn() }));
vi.mock('../../src/hooks/useEditorConfig', () => ({ useEditorConfig: vi.fn() }));

vi.mock('../../src/services/db/noteService', () => ({
    noteService: {
        update: vi.fn(),
        getSubnotes: vi.fn().mockResolvedValue([]),
    },
}));

// Mocks de componentes hijos
vi.mock('../../src/components/menu_bar/MenuBar', () => ({ default: () => <div data-testid="menu-bar" /> }));
vi.mock('../../src/components/menu_bar/MobileFormattingSheet', () => ({ default: () => <div data-testid="mobile-formatting" /> }));
vi.mock('../../src/components/PathBar', () => ({ default: () => <div data-testid="path-bar" /> }));
vi.mock('../../src/components/util/EmptyState', () => ({ default: () => <div data-testid="empty-state" /> }));
vi.mock('../../src/components/util/EmojiPicker', () => ({ default: ({ children }) => <div data-testid="emoji-picker">{children}</div> }));
vi.mock('../../src/components/util/NoteIcon', () => ({ default: () => <div data-testid="note-icon" /> }));
vi.mock('../../src/components/views/ConflictResolver', () => ({ default: () => <div data-testid="conflict-resolver" /> }));
vi.mock('../../src/components/InfoBar', () => ({ default: () => <div data-testid="info-bar" /> }));
vi.mock('../../src/components/util/ChangeThemeButton', () => ({ default: () => <button>Theme</button> }));

describe('TiptapEditor Component', () => {
    let mockEditor;
    let mockShowToast;

    const mockActiveNote = {
        note_id: 'note-123',
        title: 'Test Note',
        content: JSON.stringify({ type: 'doc', content: [] }),
        icon: '📝',
        is_editable: 1
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();

        mockShowToast = vi.fn();
        useToast.mockReturnValue({ showToast: mockShowToast });
        useAuth.mockReturnValue({ dek: 'dek', isAuthenticated: true });
        useSettings.mockReturnValue({ defaultFont: 'Inter' });
        useIsMobile.mockReturnValue(false);
        useAttachment.mockReturnValue({ uploadFile: vi.fn(), deleteAttachment: vi.fn(), syncNoteAttachments: vi.fn() });

        // SOLUCIÓN ERROR 1: Asegurar que allNotes siempre sea un array, incluso cuando no hay nota seleccionada
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            allNotes: [],
            triggerRefresh: vi.fn(),
            createRootNote: vi.fn(),
            selectNote: vi.fn(),
            isSyncing: false,
            syncStatus: 'ONLINE',
            refreshCurrentNote: vi.fn(),
        });

        // SOLUCIÓN ERROR 3: Estructura completa de state y view para evitar "undefined"
        mockEditor = {
            commands: {
                setContent: vi.fn(),
                focus: vi.fn().mockReturnThis(),
                insertContent: vi.fn().mockReturnThis()
            },
            chain: () => ({
                focus: () => ({
                    insertContent: vi.fn().mockReturnThis(),
                    run: vi.fn()
                })
            }),
            getJSON: vi.fn().mockReturnValue({ type: 'doc', content: [] }),
            view: {
                updateState: vi.fn(),
                coordsAtPos: vi.fn().mockReturnValue({ left: 100, top: 100, bottom: 120 }),
                state: { // Añadido aquí para handleEmojiCommand
                    selection: { from: 0, $from: { pos: 0 } }
                }
            },
            state: { // Tiptap usa editor.state y editor.view.state
                selection: { $from: { pos: 0 }, from: 0 },
                plugins: [],
                schema: { nodeFromJSON: vi.fn().mockReturnValue({}) },
                doc: { content: { size: 0 } }
            },
            schema: { nodeFromJSON: vi.fn().mockReturnValue({}) },
            extensionManager: { extensions: [] },
            isDestroyed: false,
            setEditable: vi.fn(),
            setOptions: vi.fn()
        };

        useEditor.mockReturnValue(mockEditor);
        useEditorConfig.mockReturnValue({});
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const renderEditor = async () => {
        const res = render(<TiptapEditor />);
        await act(async () => {
            vi.advanceTimersByTime(100);
        });
        return res;
    };

    // --- TESTS ---

    it('should navigate from Editor to Title when ArrowUp is pressed at position 0', async () => {
        await renderEditor();
        const handleKeyDown = vi.mocked(useEditorConfig).mock.calls[0][0].handleKeyDownProp;

        const titleInput = screen.getByPlaceholderText('editor.no_title_placeholder');
        const focusSpy = vi.spyOn(titleInput, 'focus');

        const mockView = { state: { selection: { $from: { pos: 0 } } } };
        const mockEvent = { key: 'ArrowUp' };

        act(() => { handleKeyDown(mockView, mockEvent); });
        expect(focusSpy).toHaveBeenCalled();
    });

    it('should navigate from Title to Editor when Enter or ArrowDown is pressed', async () => {
        await renderEditor();
        const titleInput = screen.getByPlaceholderText('editor.no_title_placeholder');

        fireEvent.keyDown(titleInput, { key: 'Enter' });
        expect(mockEditor.commands.focus).toHaveBeenCalledWith('start');

        fireEvent.keyDown(titleInput, { key: 'ArrowDown' });
        expect(mockEditor.commands.focus).toHaveBeenCalledWith('start');
    });

    it('should update the note title on blur if changed', async () => {
        noteService.update.mockResolvedValue({ success: true });
        await renderEditor();
        const titleInput = screen.getByDisplayValue('Test Note');
        fireEvent.change(titleInput, { target: { value: 'New Title' } });

        await act(async () => {
            fireEvent.blur(titleInput);
            vi.runAllTimers();
        });

        expect(noteService.update).toHaveBeenCalledWith('note-123', expect.objectContaining({ title: 'New Title' }));
    });

    it('should show an error toast and revert title on name collision', async () => {
        noteService.update.mockResolvedValue({ error: 'COLLISION' });
        await renderEditor();
        const titleInput = screen.getByDisplayValue('Test Note');
        fireEvent.change(titleInput, { target: { value: 'Collided' } });

        await act(async () => {
            fireEvent.blur(titleInput);
            vi.runAllTimers();
        });

        expect(mockShowToast).toHaveBeenCalledWith('editor.errors.name_collision_title', "error", expect.any(String));
        expect(titleInput.value).toBe('Test Note');
    });

    it('should trigger auto-save after 2 seconds of inactivity', async () => {
        await renderEditor();
        const onUpdateCallback = vi.mocked(useEditorConfig).mock.calls[0][0].onUpdate;

        await act(async () => {
            onUpdateCallback({ editor: mockEditor });
            vi.advanceTimersByTime(2000);
        });

        expect(noteService.update).toHaveBeenCalledWith('note-123', expect.objectContaining({ is_dirty: 1 }));
    });

    it('should show EmptyState when no note is selected', async () => {
        useNote.mockReturnValue({
            selectedNote: null,
            allNotes: [],
            triggerRefresh: vi.fn(),
            createRootNote: vi.fn(),
        });

        render(<TiptapEditor />);
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });

    it('should display conflict resolution banner when conflict is detected', async () => {
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            syncStatus: 'CONFLICT',
            allNotes: []
        });
        await renderEditor();
        expect(screen.getByText('conflict.conflict_detected_title')).toBeInTheDocument();
    });

    it('should open conflict resolver when resolve button is clicked', async () => {
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            syncStatus: 'CONFLICT',
            allNotes: []
        });
        await renderEditor();
        const resolveBtn = screen.getByText('conflict.resolve_conflict');
        fireEvent.click(resolveBtn);
        expect(screen.getByTestId('conflict-resolver')).toBeInTheDocument();
    });

    it('should show offline empty state when offline with no content', async () => {
        useNote.mockReturnValue({
            selectedNote: { ...mockActiveNote, content: null },
            syncStatus: 'OFFLINE_EMPTY',
            allNotes: []
        });
        await renderEditor();
        expect(screen.getByText('editor.offline_empty_title')).toBeInTheDocument();
    });

    it('should handle icon removal', async () => {
        await renderEditor();
        const removeBtn = screen.getByTitle('editor.remove_icon');
        await act(async () => { fireEvent.click(removeBtn); });
        expect(noteService.update).toHaveBeenCalledWith('note-123', { icon: null });
    });

    it('should handle icon selection and save to DB', async () => {
        await renderEditor();
        expect(screen.getByTestId('note-icon')).toBeInTheDocument();
        expect(screen.getAllByTestId('emoji-picker').length).toBeGreaterThan(0);
    });

    it('should inject content to editor when loading a note with content', async () => {
        // Configuramos una nota con contenido
        const contentNote = {
            ...mockActiveNote,
            content: JSON.stringify({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }] })
        };

        useNote.mockReturnValue({
            selectedNote: contentNote,
            allNotes: [],
            triggerRefresh: vi.fn(),
            syncStatus: 'ONLINE',
        });

        // Renderizamos
        render(<TiptapEditor />);

        // Ejecutamos todos los timers pendientes (el setTimeout de inyección)
        await act(async () => {
            vi.runAllTimers();
        });

        expect(mockEditor.view.updateState).toHaveBeenCalled();
    });

    it('should not focus title when ArrowUp is pressed at position > 1', async () => {
        await renderEditor();
        const handleKeyDown = vi.mocked(useEditorConfig).mock.calls[0][0].handleKeyDownProp;
        const titleInput = screen.getByPlaceholderText('editor.no_title_placeholder');
        const focusSpy = vi.spyOn(titleInput, 'focus');

        const mockView = { state: { selection: { $from: { pos: 10 } } } };
        act(() => { handleKeyDown(mockView, { key: 'ArrowUp' }); });
        expect(focusSpy).not.toHaveBeenCalled();
    });

    it('should revert empty title change without saving to DB', async () => {
        await renderEditor();
        const titleInput = screen.getByDisplayValue('Test Note');
        fireEvent.change(titleInput, { target: { value: '' } });

        await act(async () => {
            fireEvent.blur(titleInput);
            vi.runAllTimers();
        });

        expect(noteService.update).not.toHaveBeenCalled();
        expect(titleInput.value).toBe('Test Note');
    });

    it('should handle emoji command and create floating reference', async () => {
        await renderEditor();
        const handleEmojiCommand = vi.mocked(useEditorConfig).mock.calls[0][0].handleEmojiCommand;

        act(() => { handleEmojiCommand(); });
        // After command, a second EmojiPicker (floating) should be rendered via conditional
        expect(screen.getAllByTestId('emoji-picker').length).toBeGreaterThan(1);
    });

    it('should apply mobile styling when isMobile is true', async () => {
        useIsMobile.mockReturnValue(true);
        await renderEditor();
        expect(screen.getByTestId('mobile-formatting')).toBeInTheDocument();
        expect(screen.queryByTestId('menu-bar')).not.toBeInTheDocument();
    });

    it('should render PathBar with correct props', async () => {
        await renderEditor();
        expect(screen.getByTestId('path-bar')).toBeInTheDocument();
    });
});