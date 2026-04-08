import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import TiptapEditor from '../../src/components/TiptapEditor';
import { useNote } from '../../src/components/context/NoteContext';
import { useToast } from '../../src/components/context/ToastContext';
import { useAuth } from '../../src/components/context/AuthContext';
import { useSettings } from '../../src/components/context/SettingsContext';
import { useIsMobile } from '../../src/hooks/useIsMobile';
import { noteService } from '../../src/services/db/noteService';
import { useEditor } from '@tiptap/react';
import { useEditorConfig } from '../../src/hooks/useEditorConfig'; // Import it here

// --- 1. MOCK PROSEMIRROR STATE ---
vi.mock('@tiptap/pm/state', () => ({
    EditorState: {
        create: vi.fn().mockReturnValue({}),
    },
}));

// --- 2. MOCK EXTERNAL HOOKS & CONTEXTS ---
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../src/components/context/ToastContext', () => ({
    useToast: vi.fn(),
}));

vi.mock('../../src/components/context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('../../src/components/context/SettingsContext', () => ({
    useSettings: vi.fn(),
}));

vi.mock('../../src/hooks/useIsMobile', () => ({
    useIsMobile: vi.fn(),
}));

vi.mock('../../src/services/db/noteService', () => ({
    noteService: {
        update: vi.fn(),
    },
}));

// CRITICAL: Mock useEditorConfig at the top level
vi.mock('../../src/hooks/useEditorConfig', () => ({
    useEditorConfig: vi.fn(),
}));

vi.mock('@tiptap/react', async () => {
    const actual = await vi.importActual('@tiptap/react');
    return {
        ...actual,
        useEditor: vi.fn(),
        EditorContent: () => <div data-testid="tiptap-content" />,
        ReactNodeViewRenderer: vi.fn(),
    };
});

// --- 3. MOCK CHILD COMPONENTS ---
vi.mock('../../src/components/menu_bar/MenuBar', () => ({ default: () => <div data-testid="menu-bar" /> }));
vi.mock('../../src/components/PathBar', () => ({ default: () => <div data-testid="path-bar" /> }));
vi.mock('../../src/components/util/EmptyState', () => ({ default: () => <div data-testid="empty-state" /> }));
vi.mock('../../src/components/util/EmojiPicker', () => ({ default: ({ children }) => <div data-testid="emoji-picker">{children}</div> }));
vi.mock('../../src/components/util/NoteIcon', () => ({ default: () => <div data-testid="note-icon" /> }));

describe('TiptapEditor Component', () => {
    let mockEditor;
    let mockShowToast;
    let mockTriggerRefresh;

    const mockActiveNote = {
        note_id: 'note-123',
        title: 'Test Note',
        content: '{"type":"doc","content":[]}',
        icon: '📝',
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();

        mockShowToast = vi.fn();
        mockTriggerRefresh = vi.fn();

        useToast.mockReturnValue({ showToast: mockShowToast });
        useAuth.mockReturnValue({ dek: 'mock-dek', isAuthenticated: true });
        useSettings.mockReturnValue({ defaultFont: 'Inter' });
        useIsMobile.mockReturnValue(false);
        
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            triggerRefresh: mockTriggerRefresh,
            createRootNote: vi.fn(),
            selectNote: vi.fn(),
            isSyncing: false,
            syncStatus: 'ONLINE',
            refreshCurrentNote: vi.fn(),
        });

        mockEditor = {
            commands: {
                setContent: vi.fn(),
                focus: vi.fn().mockReturnThis(),
            },
            getJSON: vi.fn().mockReturnValue({ type: 'doc', content: [] }),
            view: {
                updateState: vi.fn(),
                dispatch: vi.fn(),
                dom: { addEventListener: vi.fn(), removeEventListener: vi.fn() }
            },
            state: {
                plugins: [],
                doc: {},
                selection: { $from: { pos: 0 } }
            },
            schema: { nodeFromJSON: vi.fn().mockReturnValue({}) },
            options: { editorProps: {} },
            isDestroyed: false
        };

        useEditor.mockReturnValue(mockEditor);
        // Default return for our custom config hook
        useEditorConfig.mockReturnValue({});
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const waitForInitialLoad = async () => {
        await act(async () => {
            await vi.advanceTimersByTimeAsync(50); // Increased time
        });
    };

    /**
     * Test Keyboard Navigation: Moving from Editor back to Title when at the start
     */
    it('should navigate from Editor to Title when ArrowUp is pressed at position 0', async () => {
        render(<TiptapEditor />);
        await waitForInitialLoad();

        // Capture the handleKeyDown function passed to useEditorConfig
        const handleKeyDown = vi.mocked(useEditorConfig).mock.calls[0][0].handleKeyDownProp;

        const titleInput = screen.getByDisplayValue('Test Note');
        const focusSpy = vi.spyOn(titleInput, 'focus');

        const mockView = { state: { selection: { $from: { pos: 0 } } } };
        const mockEvent = { key: 'ArrowUp' };

        act(() => {
            handleKeyDown(mockView, mockEvent);
        });

        expect(focusSpy).toHaveBeenCalled();
    });

    /**
     * Test Keyboard Navigation: Title to Editor
     */
    it('should navigate from Title to Editor when Enter or ArrowDown is pressed', async () => {
        render(<TiptapEditor />);
        await waitForInitialLoad();

        const titleInput = screen.getByDisplayValue('Test Note');

        fireEvent.keyDown(titleInput, { key: 'Enter' });
        expect(mockEditor.commands.focus).toHaveBeenCalledWith('start');

        fireEvent.keyDown(titleInput, { key: 'ArrowDown' });
        expect(mockEditor.commands.focus).toHaveBeenCalledWith('start');
    });

    /**
     * Test title persistence: saving to DB on blur
     */
    it('should update the note title on blur if changed', async () => {
        noteService.update.mockResolvedValue({ success: true });
        render(<TiptapEditor />);
        await waitForInitialLoad();

        const titleInput = screen.getByDisplayValue('Test Note');
        fireEvent.change(titleInput, { target: { value: 'New Title' } });

        await act(async () => {
            fireEvent.blur(titleInput);
            await vi.runAllTimersAsync();
        });

        expect(noteService.update).toHaveBeenCalledWith('note-123', expect.objectContaining({ title: 'New Title' }));
    });

    /**
     * Test title collision error handling
     */
    it('should show an error toast and revert title on name collision', async () => {
        noteService.update.mockResolvedValue({ error: 'COLLISION' });
        render(<TiptapEditor />);
        await waitForInitialLoad();

        const titleInput = screen.getByDisplayValue('Test Note');
        fireEvent.change(titleInput, { target: { value: 'Collision Title' } });

        await act(async () => {
            fireEvent.blur(titleInput);
            await vi.runAllTimersAsync();
        });

        expect(mockShowToast).toHaveBeenCalledWith('editor.errors.name_collision', "error");
        expect(titleInput.value).toBe('Test Note');
    });

    /**
     * Test icon removal
     */
    it('should handle icon removal', async () => {
        noteService.update.mockResolvedValue({ success: true });
        render(<TiptapEditor />);
        await waitForInitialLoad();

        const removeBtn = screen.getByTitle('editor.remove_icon');

        await act(async () => {
            fireEvent.click(removeBtn);
            await vi.runAllTimersAsync();
        });

        expect(noteService.update).toHaveBeenCalledWith('note-123', { icon: null });
    });

    /**
     * Test auto-save debounce
     */
    it('should trigger auto-save after 2 seconds of inactivity', async () => {
        render(<TiptapEditor />);
        await waitForInitialLoad();

        // Capture onUpdate from useEditorConfig calls
        const onUpdateCallback = vi.mocked(useEditorConfig).mock.calls[0][0].onUpdate;

        await act(async () => {
            onUpdateCallback({ editor: mockEditor });
            await vi.advanceTimersByTimeAsync(2000);
            await vi.runAllTimersAsync();
        });

        expect(noteService.update).toHaveBeenCalledWith('note-123', expect.objectContaining({
            is_dirty: 1
        }));
    });
});