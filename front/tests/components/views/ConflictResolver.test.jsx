import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import ConflictResolver from '../../../src/components/views/ConflictResolver';
import { useNote } from '../../../src/components/context/NoteContext';
import { useIsMobile } from '../../../src/hooks/useIsMobile';
import { useSettings } from '../../../src/components/context/SettingsContext';
import { noteService } from '../../../src/services/db/noteService';
import { useEditorConfig } from '../../../src/hooks/useEditorConfig';
import { useEditor } from '@tiptap/react';

// --- 1. MOCKS ---

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../../src/hooks/useIsMobile', () => ({
    useIsMobile: vi.fn(),
}));

vi.mock('../../../src/components/context/SettingsContext', () => ({
    useSettings: vi.fn(),
}));

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        resolveConflict: vi.fn(),
    },
}));

vi.mock('../../../src/hooks/useEditorConfig', () => ({
    useEditorConfig: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

vi.mock('@tiptap/react', () => ({
    useEditor: vi.fn(),
    EditorContent: () => <div data-testid="editor-content">Editor</div>,
}));

vi.mock('../../../src/components/util/EmojiPicker', () => ({
    default: ({ children, onSelect }) => (
        <div data-testid="emoji-picker" onClick={() => onSelect('🎯')}>
            {children}
        </div>
    ),
}));

vi.mock('../../../src/components/util/NoteIcon', () => ({
    default: ({ iconChar }) => <span data-testid="note-icon">{iconChar}</span>,
}));

describe('ConflictResolver Component', () => {
    const mockOnClose = vi.fn();
    const mockOnResolved = vi.fn();
    const mockCreateSubnote = vi.fn();
    const mockSelectNote = vi.fn();
    const mockNote = {
        note_id: 'note-123',
        title: 'Test Note',
        icon: '📝',
        content: JSON.stringify({ type: 'doc', content: [] }),
        conflict_title: 'Remote Title',
        conflict_icon: '🌐',
        conflict_content: JSON.stringify({ type: 'doc', content: [] }),
        remote_version: 'v2',
    };

    const mockEditorConfig = {
        extensions: [],
        editorProps: {},
    };

    const mockEditor = {
        getJSON: vi.fn(() => ({ type: 'doc', content: [] })),
    };

    beforeEach(() => {
        vi.clearAllMocks();

        // Default: desktop view
        useIsMobile.mockReturnValue(false);

        // Default context setup
        useNote.mockReturnValue({
            createSubnote: mockCreateSubnote,
            selectNote: mockSelectNote,
        });

        useSettings.mockReturnValue({
            defaultFont: 'sans-serif',
        });

        useEditorConfig.mockReturnValue(mockEditorConfig);

        // Mock the useEditor hook
        useEditor.mockReturnValue(mockEditor);

        noteService.resolveConflict.mockResolvedValue(undefined);
    });

    it('should return null if editors are not ready', () => {
        useEditor.mockReturnValueOnce(null);

        const { container } = render(
            <ConflictResolver note={mockNote} onClose={mockOnClose} onResolved={mockOnResolved} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should render header, buttons, and editors on desktop', () => {
        render(
            <ConflictResolver note={mockNote} onClose={mockOnClose} onResolved={mockOnResolved} />
        );

        // Header and buttons
        expect(screen.getByText(/conflict.resolve_title/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /conflict.keep_local/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /conflict.keep_remote/i })).toBeInTheDocument();

        // Desktop specific
        expect(screen.getByText(/conflict.local_label/i)).toBeInTheDocument();
        expect(screen.getByText(/conflict.remote_label/i)).toBeInTheDocument();
        expect(screen.getByText('conflict.resolve_desc')).toBeInTheDocument();

        // Editors
        const editors = screen.getAllByTestId('editor-content');
        expect(editors.length).toBe(2);
    });

    it('should render mobile layout with tabs when isMobile is true', () => {
        useIsMobile.mockReturnValue(true);
        render(
            <ConflictResolver note={mockNote} onClose={mockOnClose} onResolved={mockOnResolved} />
        );

        // Mobile tabs should be present
        const tabs = screen.getAllByRole('button');
        expect(tabs.some(btn => btn.textContent.includes('conflict.local_label'))).toBe(true);
        expect(tabs.some(btn => btn.textContent.includes('conflict.remote_label'))).toBe(true);

        // Description should not be shown on mobile
        const description = screen.queryByText('conflict.resolve_desc');
        expect(description).not.toBeInTheDocument();
    });

    it('should update title and icon when user interacts with local metadata', () => {
        render(
            <ConflictResolver note={mockNote} onClose={mockOnClose} onResolved={mockOnResolved} />
        );

        // Update title
        const titleInput = screen.getByDisplayValue('Test Note');
        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
        expect(titleInput.value).toBe('Updated Title');

        // Select emoji
        const emojiPicker = screen.getByTestId('emoji-picker');
        fireEvent.click(emojiPicker);

        // Check that the emoji was selected (one of the icons should be 🎯)
        const icons = screen.getAllByTestId('note-icon');
        expect(icons.some(icon => icon.textContent === '🎯')).toBe(true);
    });

    it('should resolve conflict with local data when Keep Local is clicked', async () => {
        mockEditor.getJSON.mockReturnValue({ type: 'doc', content: [{ type: 'paragraph' }] });

        render(
            <ConflictResolver note={mockNote} onClose={mockOnClose} onResolved={mockOnResolved} />
        );

        const keepLocalBtn = screen.getByRole('button', { name: /conflict.keep_local/i });
        fireEvent.click(keepLocalBtn);

        await waitFor(() => {
            expect(noteService.resolveConflict).toHaveBeenCalledWith(
                'note-123',
                'Test Note',
                '📝',
                { type: 'doc', content: [{ type: 'paragraph' }] },
                'v2'
            );
            expect(mockOnResolved).toHaveBeenCalled();
        });
    });

    it('should resolve conflict with remote data when Keep Remote is clicked', async () => {
        render(
            <ConflictResolver note={mockNote} onClose={mockOnClose} onResolved={mockOnResolved} />
        );

        const keepRemoteBtn = screen.getByRole('button', { name: /conflict.keep_remote/i });
        fireEvent.click(keepRemoteBtn);

        await waitFor(() => {
            expect(noteService.resolveConflict).toHaveBeenCalledWith(
                'note-123',
                'Remote Title',
                '🌐',
                { type: 'doc', content: [] },
                'v2'
            );
            expect(mockOnResolved).toHaveBeenCalled();
        });
    });

    it('should handle errors during resolution gracefully', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        noteService.resolveConflict.mockRejectedValueOnce(new Error('Network error'));

        render(
            <ConflictResolver note={mockNote} onClose={mockOnClose} onResolved={mockOnResolved} />
        );

        const keepLocalBtn = screen.getByRole('button', { name: /conflict.keep_local/i });
        fireEvent.click(keepLocalBtn);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalled();
        });

        consoleSpy.mockRestore();
    });

    it('should call onClose when close button is clicked', () => {
        const { container } = render(
            <ConflictResolver note={mockNote} onClose={mockOnClose} onResolved={mockOnResolved} />
        );

        const closeBtn = container.querySelector('[class*="hover:bg-zinc-100"]');
        fireEvent.click(closeBtn);

        expect(mockOnClose).toHaveBeenCalled();
    });
});
