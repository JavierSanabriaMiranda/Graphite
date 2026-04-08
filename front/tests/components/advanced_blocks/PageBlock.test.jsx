import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import PageBlockComponent, { PageBlock } from '../../../src/components/advanced_blocks/PageBlockComponent';
import { noteService } from '../../../src/services/db/noteService';
import { useNote } from '../../../src/components/context/NoteContext';

vi.mock('@tiptap/react', () => ({
    NodeViewWrapper: ({ children, className }) => <div className={className} data-testid="wrapper">{children}</div>,
    ReactNodeViewRenderer: vi.fn(),
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../../src/services/db/noteService', () => ({
    noteService: {
        getByNoteId: vi.fn(),
    },
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

vi.mock('../../../src/components/options_menu/DeleteConfirmModal', () => ({
    // Asegúrate de que los botones tengan nombres claros
    default: ({ isOpen, onConfirm, onClose }) => isOpen ? (
        <div data-testid="modal">
            <button onClick={onConfirm}>Confirm Delete</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    ) : null,
}));

describe('PageBlockComponent', () => {
    let mockProps;
    const mockSelectNote = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        useNote.mockReturnValue({
            selectNote: mockSelectNote,
            refreshTrigger: 0
        });

        const mockTr = {
            delete: vi.fn().mockReturnThis(),
            setMeta: vi.fn().mockReturnThis()
        };

        // Fix: Added the structure that the component expects in editor.options
        mockProps = {
            node: { attrs: { noteId: 'note-123' }, nodeSize: 1 },
            getPos: vi.fn().mockReturnValue(10),
            selected: false,
            editor: {
                options: {
                    editorProps: {
                        panelRole: 'local', // Default role
                        allowDeleted: false
                    }
                },
                state: { tr: mockTr },
                view: { 
                    dispatch: vi.fn(),
                    dom: {
                        addEventListener: vi.fn(),
                        removeEventListener: vi.fn()
                    }
                }
            }
        };
    });

    /**
     * Test that note data is displayed correctly after async load
     */
    it('should render note data after loading', async () => {
        noteService.getByNoteId.mockResolvedValue({
            note_id: 'note-123',
            title: 'My Testing Note',
            icon: '📝',
            is_deleted: 0
        });

        render(<PageBlockComponent {...mockProps} />);

        await waitFor(() => {
            expect(screen.getByText('My Testing Note')).toBeInTheDocument();
        });
    });

    /**
     * Test that component removes itself from editor if the note is missing in DB
     */
    it('should self-destruct if note does not exist in DB', async () => {
        noteService.getByNoteId.mockResolvedValue(null);

        render(<PageBlockComponent {...mockProps} />);

        await waitFor(() => {
            expect(mockProps.editor.view.dispatch).toHaveBeenCalled();
            expect(mockProps.editor.state.tr.setMeta).toHaveBeenCalledWith('forceDeletePageBlock', true);
        });
    });

    /**
     * Test navigation trigger when user clicks the block
     */
    it('should navigate to note on click', async () => {
        const noteData = { note_id: 'note-123', title: 'Test', is_deleted: 0 };
        noteService.getByNoteId.mockResolvedValue(noteData);

        render(<PageBlockComponent {...mockProps} />);

        const block = await screen.findByText('Test');
        fireEvent.click(block);

        expect(mockSelectNote).toHaveBeenCalledWith(noteData);
    });

    /**
     * Test the full deletion flow: open modal -> confirm -> dispatch authorized transaction
     */
    it('should open modal and delete note on confirmation', async () => {
        noteService.getByNoteId.mockResolvedValue({ note_id: 'note-123', title: 'Test', is_deleted: 0 });

        render(<PageBlockComponent {...mockProps} />);

        // We use the translation key as we mocked 't' to return the key
        const trashBtn = await screen.findByTitle('common.delete');
        fireEvent.click(trashBtn);

        expect(screen.getByTestId('modal')).toBeInTheDocument();

        const confirmBtn = screen.getByText('Confirm Delete');
        fireEvent.click(confirmBtn);

        expect(mockProps.editor.view.dispatch).toHaveBeenCalled();
        expect(mockProps.editor.state.tr.setMeta).toHaveBeenCalledWith('forceDeletePageBlock', true);
    });
});

describe('PageBlock Extension & Protection Plugin', () => {
    /**
     * Basic integrity check for the Tiptap extension configuration
     */
    it('should define correct attributes and commands', () => {
        expect(PageBlock.name).toBe('pageBlock');
        const commands = PageBlock.config.addCommands();
        expect(commands).toHaveProperty('insertPageBlock');
    });

    describe('filterTransaction Plugin', () => {
        const plugin = PageBlock.config.addProseMirrorPlugins.call(PageBlock)[0];
        const nodeType = PageBlock.type;

        it('should allow transaction if doc did not change', () => {
            const tr = { docChanged: false };
            const result = plugin.spec.filterTransaction(tr, {});
            expect(result).toBe(true);
        });

        it('should allow transaction if forceDeletePageBlock meta is present', () => {
            const tr = {
                docChanged: true,
                getMeta: vi.fn().mockReturnValue(true)
            };
            const result = plugin.spec.filterTransaction(tr, {});
            expect(result).toBe(true);
        });

        /**
         * Test the protection plugin: it should block deletion if the authorized metadata is missing
         */
        it('should block transaction if a PageBlock is being deleted without authorization', () => {
            const state = {
                doc: { descendants: (cb) => { cb({ type: nodeType }); cb({ type: nodeType }); } }
            };
            const tr = {
                docChanged: true,
                getMeta: vi.fn().mockReturnValue(false),
                doc: { descendants: (cb) => { cb({ type: nodeType }); } }
            };

            const result = plugin.spec.filterTransaction(tr, state);
            expect(result).toBe(false);
        });
    });
});