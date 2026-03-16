import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TiptapEditor from '../../src/components/TiptapEditor';
import { useNote } from '../../src/components/context/NoteContext';
import { useToast } from '../../src/components/context/ToastContext';
import { noteService } from '../../src/services/db/noteService';
import { useEditor } from '@tiptap/react';


// Mocking ProseMirror's EditorState to avoid 
// 'topNodeType' errors during unit tests.
vi.mock('@tiptap/pm/state', () => ({
    EditorState: {
        create: vi.fn().mockReturnValue({}),
    },
}));

// 1. Mock External Dependencies and Hooks
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../src/components/context/ToastContext', () => ({
    useToast: vi.fn(),
}));

vi.mock('../../src/services/db/noteService', () => ({
    noteService: {
        update: vi.fn(),
    },
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

// 3. Mock Child Components
vi.mock('../../src/components/menu_bar/MenuBar', () => ({ default: () => <div data-testid="menu-bar" /> }));
vi.mock('../../src/components/PathBar', () => ({ default: () => <div data-testid="path-bar" /> }));
vi.mock('../../src/components/util/EmptyState', () => ({ default: () => <div data-testid="empty-state" /> }));
vi.mock('../../src/components/util/EmojiPicker', () => ({ default: ({ children }) => <div data-testid="emoji-picker">{children}</div> }));

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
        // Enable fake timers
        vi.useFakeTimers();

        mockShowToast = vi.fn();
        mockTriggerRefresh = vi.fn();

        useToast.mockReturnValue({ showToast: mockShowToast });
        useNote.mockReturnValue({
            selectedNote: mockActiveNote,
            triggerRefresh: mockTriggerRefresh,
            createRootNote: vi.fn(),
        });

        mockEditor = {
            commands: { setContent: vi.fn() },
            getJSON: vi.fn().mockReturnValue({ type: 'doc', content: [] }),
            view: { updateState: vi.fn() },
            state: { plugins: [], doc: {} },
            schema: { nodeFromJSON: vi.fn().mockReturnValue({}) },
        };

        useEditor.mockReturnValue(mockEditor);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    // Helper to bypass the initial 5ms loading timer
    const waitForInitialLoad = async () => {
        await act(async () => {
            await vi.advanceTimersByTimeAsync(10);
        });
    };

    it('should update the note title on blur', async () => {
        noteService.update.mockResolvedValue({ success: true });
        render(<TiptapEditor />);
        await waitForInitialLoad();

        const titleInput = screen.getByDisplayValue('Test Note');
        fireEvent.change(titleInput, { target: { value: 'New Title' } });

        // Trigger blur and resolve promises
        await act(async () => {
            fireEvent.blur(titleInput);
            // This is the key: run all pending timers AND their microtasks (promises)
            await vi.runAllTimersAsync();
        });

        expect(noteService.update).toHaveBeenCalledWith('note-123', { title: 'New Title' });
        expect(mockTriggerRefresh).toHaveBeenCalled();
    });

    it('should show an error toast on title collision', async () => {
        noteService.update.mockResolvedValue({ error: 'COLLISION' });
        render(<TiptapEditor />);
        await waitForInitialLoad();

        const titleInput = screen.getByDisplayValue('Test Note');
        fireEvent.change(titleInput, { target: { value: 'Collision Title' } });

        await act(async () => {
            fireEvent.blur(titleInput);
            await vi.runAllTimersAsync();
        });

        // Check if toast was called with the translation key
        expect(mockShowToast).toHaveBeenCalledWith('editor.errors.name_collision', "error");
        // Verify title reverted to original
        expect(titleInput.value).toBe('Test Note');
    });

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
        expect(mockTriggerRefresh).toHaveBeenCalled();
    });

    it('should trigger auto-save after 2 seconds of inactivity', async () => {
        render(<TiptapEditor />);
        await waitForInitialLoad();

        // Trigger Tiptap's onUpdate manually from the mock
        const onUpdateCallback = useEditor.mock.calls[0][0].onUpdate;

        await act(async () => {
            onUpdateCallback({ editor: mockEditor });
            // Advance exactly 2000ms and resolve the update promise
            await vi.advanceTimersByTimeAsync(2000);
        });

        expect(noteService.update).toHaveBeenCalledWith('note-123', expect.objectContaining({
            content: expect.any(Object),
            is_dirty: 1
        }));
    });
});