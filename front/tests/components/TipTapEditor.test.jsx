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
import { EditorState } from '@tiptap/pm/state';

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

// Child component mocks
vi.mock('../../src/components/menu_bar/MenuBar', () => ({ default: () => <div data-testid="menu-bar" /> }));
vi.mock('../../src/components/menu_bar/MobileFormattingSheet', () => ({ default: () => <div data-testid="mobile-formatting" /> }));
vi.mock('../../src/components/PathBar', () => ({ default: () => <div data-testid="path-bar" /> }));
vi.mock('../../src/components/util/EmptyState', () => ({ default: () => <div data-testid="empty-state" /> }));
vi.mock('../../src/components/util/EmojiPicker', () => ({ default: ({ children }) => <div data-testid="emoji-picker">{children}</div> }));
vi.mock('../../src/components/util/NoteIcon', () => ({ default: () => <div data-testid="note-icon" /> }));
vi.mock('../../src/components/views/ConflictResolver', () => ({ default: () => <div data-testid="conflict-resolver" /> }));
vi.mock('../../src/components/InfoBar', () => ({ default: () => <div data-testid="info-bar" /> }));
vi.mock('../../src/components/util/ChangeThemeButton', () => ({ default: () => <button>Theme</button> }));
vi.mock('../../src/components/context_menu/EditorContextMenu', () => ({ default: () => <div data-testid="editor-context-menu" /> }));

describe('TiptapEditor Component - Full Integration Suite', () => {
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

        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            allNotes: [{ title: 'Note 1', note_id: '1' }],
            triggerRefresh: vi.fn(),
            selectNote: vi.fn(),
            isSyncing: false,
            syncStatus: 'ONLINE',
            refreshCurrentNote: vi.fn(),
        });

        // Setup complex Tiptap mock structure
        const mockChain = {
            focus: vi.fn().mockReturnThis(),
            insertContent: vi.fn().mockReturnThis(),
            insertContentAt: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnThis(),
            setContent: vi.fn().mockReturnThis()
        };

        mockEditor = {
            commands: {
                setContent: vi.fn(),
                focus: vi.fn().mockReturnThis(),
                insertContent: vi.fn().mockReturnThis()
            },
            chain: vi.fn(() => mockChain),
            getJSON: vi.fn().mockReturnValue({ type: 'doc', content: [] }),
            view: {
                updateState: vi.fn(),
                coordsAtPos: vi.fn().mockReturnValue({ left: 100, top: 100, bottom: 120 }),
                state: { selection: { from: 0, $from: { pos: 0 } } }
            },
            state: {
                selection: { $from: { pos: 0 }, from: 0 },
                plugins: [],
                doc: { content: { size: 10 }, descendants: vi.fn() }
            },
            schema: { nodeFromJSON: vi.fn().mockReturnValue({}) },
            extensionManager: { extensions: [{ name: 'noteLink', configure: vi.fn() }] },
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

    // --- TITLE & NAVIGATION TESTS ---

    it('should navigate from Editor to Title when ArrowUp is pressed at the start', async () => {
        await renderEditor();
        const handleKeyDown = vi.mocked(useEditorConfig).mock.calls[0][0].handleKeyDownProp;
        const titleInput = screen.getByPlaceholderText('editor.no_title_placeholder');
        const focusSpy = vi.spyOn(titleInput, 'focus');

        const mockView = { state: { selection: { $from: { pos: 0 } } } };
        act(() => { handleKeyDown(mockView, { key: 'ArrowUp' }); });
        expect(focusSpy).toHaveBeenCalled();
    });

    it('should update note title and trigger auto-save on blur', async () => {
        noteService.update.mockResolvedValue({ success: true });
        await renderEditor();
        const titleInput = screen.getByDisplayValue('Test Note');
        
        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
        await act(async () => {
            fireEvent.blur(titleInput);
            vi.runAllTimers();
        });

        expect(noteService.update).toHaveBeenCalledWith('note-123', expect.objectContaining({ title: 'Updated Title' }));
    });

    // --- RECONCILIATION & AUTO-APPEND TESTS ---

    it('should reconcile missing subpages and append them to the doc', async () => {
        const missingSubnotes = [{ note_id: 'sub-99', title: 'Missing' }];
        noteService.getSubnotes.mockResolvedValue(missingSubnotes);
        
        // Mocking empty descendants to trigger the "missing" logic
        mockEditor.state.doc.descendants.mockImplementation(() => {});

        await renderEditor();
        await act(async () => { vi.runAllTimers(); });

        expect(mockEditor.chain().insertContentAt).toHaveBeenCalledWith(
            expect.any(Number),
            expect.arrayContaining([expect.objectContaining({ type: 'pageBlock' })])
        );
    });

    // --- EXTENSION & STATE SYNC TESTS ---

    it('should update noteLink extension when allNotes changes', async () => {
        const { rerender } = render(<TiptapEditor />);
        
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            allNotes: [{ title: 'New Note', note_id: 'new' }],
            triggerRefresh: vi.fn(),
        });

        await act(async () => { rerender(<TiptapEditor />); });

        expect(mockEditor.setOptions).toHaveBeenCalled();
    });

    it('should set editor to read-only when note is_editable is 0', async () => {
        useNote.mockReturnValue({
            selectedNote: { ...mockActiveNote, is_editable: 0 },
            allNotes: [],
            triggerRefresh: vi.fn(),
        });

        await renderEditor();
        expect(mockEditor.setEditable).toHaveBeenCalledWith(false);
    });

    // --- INTERACTION & CONTEXT MENU TESTS ---

    it('should show custom context menu on desktop', async () => {
        const { container } = await renderEditor();
        
        const editorBody = container.querySelector('.tiptap-container');
        
        await act(async () => {
            fireEvent.contextMenu(editorBody, { clientX: 50, clientY: 50 });
        });

        expect(screen.getByTestId('editor-context-menu')).toBeInTheDocument();
    });

    it('should handle emoji command by positioning picker at cursor', async () => {
        await renderEditor();
        const handleEmojiCommand = vi.mocked(useEditorConfig).mock.calls[0][0].handleEmojiCommand;

        act(() => { handleEmojiCommand(); });
        // The picker should appear twice: once for the header and once for the slash command
        expect(screen.getAllByTestId('emoji-picker').length).toBeGreaterThan(1);
    });

    // --- AUTO-SAVE & PERSISTENCE TESTS ---

    it('should trigger content save after 2 seconds of inactivity', async () => {
        await renderEditor();
        const onUpdate = vi.mocked(useEditorConfig).mock.calls[0][0].onUpdate;

        act(() => { onUpdate({ editor: mockEditor }); });
        
        await act(async () => { vi.advanceTimersByTime(2000); });

        expect(noteService.update).toHaveBeenCalledWith('note-123', expect.objectContaining({ is_dirty: 1 }));
    });

    it('should force save on unmount if a timeout is pending', async () => {
        const { unmount } = render(<TiptapEditor />);
        const onUpdate = vi.mocked(useEditorConfig).mock.calls[0][0].onUpdate;

        act(() => { onUpdate({ editor: mockEditor }); });
        unmount();

        expect(noteService.update).toHaveBeenCalledWith('note-123', expect.objectContaining({ is_dirty: 1 }));
    });

    // --- UI STATE TESTS (SYNC & EMPTY) ---

    it('should show EmptyState when no note is selected', () => {
        useNote.mockReturnValue({ selectedNote: null, allNotes: [], createRootNote: vi.fn() });
        render(<TiptapEditor />);
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });

    it('should display conflict resolution banner when status is CONFLICT', async () => {
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            syncStatus: 'CONFLICT',
            allNotes: []
        });
        await renderEditor();
        expect(screen.getByText('conflict.conflict_detected_title')).toBeInTheDocument();
    });
});