import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

describe('PageBlockComponent - Conflict Resolution Logic', () => {
    let mockProps;
    const mockSelectNote = vi.fn();
    const mockChain = vi.fn().mockReturnThis();
    const mockFocus = vi.fn().mockReturnThis();
    const mockInsertContentAt = vi.fn().mockReturnThis();
    const mockRun = vi.fn().mockReturnThis();

    const mockLocalEditor = {
        state: {
            doc: {
                content: { size: 100 },
                descendants: vi.fn()
            }
        },
        chain: mockChain,
        on: vi.fn(),
        off: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockChain.mockReturnValue({ focus: mockFocus.mockReturnValue({ insertContentAt: mockInsertContentAt.mockReturnValue({ run: mockRun }) }) });

        mockProps = {
            node: { attrs: { noteId: 'note-remote' }, nodeSize: 1 },
            getPos: vi.fn().mockReturnValue(0),
            selected: false,
            editor: {
                options: {
                    editorProps: {
                        panelRole: 'conflict-remote',
                        localEditor: mockLocalEditor
                    }
                },
                view: { dom: { addEventListener: vi.fn(), removeEventListener: vi.fn() } }
            }
        };
    });

    it('should show the transfer button only if not already in local editor', async () => {
        noteService.getByNoteId.mockResolvedValue({ note_id: 'note-remote', title: 'Remote Note' });
        
        // Simulate it doesn't exist on local editor
        mockLocalEditor.state.doc.descendants.mockImplementation((cb) => {
            cb({ type: { name: 'other' }, attrs: {} }); 
        });

        render(<PageBlockComponent {...mockProps} />);

        await waitFor(() => {
            expect(screen.getByTitle('conflict.transfer_to_local')).toBeInTheDocument();
        });
    });

    it('should hide transfer button if block already exists in local editor', async () => {
        noteService.getByNoteId.mockResolvedValue({ note_id: 'note-remote', title: 'Remote Note' });
        
        // Simulate it exists on local editor
        mockLocalEditor.state.doc.descendants.mockImplementation((cb) => {
            cb({ type: { name: 'pageBlock' }, attrs: { noteId: 'note-remote' } }); 
        });

        render(<PageBlockComponent {...mockProps} />);

        await waitFor(() => {
            expect(screen.queryByTitle('conflict.transfer_to_local')).not.toBeInTheDocument();
        });
    });

    it('should transfer block to local editor when arrow button is clicked', async () => {
        noteService.getByNoteId.mockResolvedValue({ note_id: 'note-remote', title: 'Remote Note' });
        mockLocalEditor.state.doc.descendants.mockImplementation(() => {});

        render(<PageBlockComponent {...mockProps} />);

        const transferBtn = await screen.findByTitle('conflict.transfer_to_local');
        fireEvent.click(transferBtn);

        expect(mockLocalEditor.chain).toHaveBeenCalled();
        expect(mockInsertContentAt).toHaveBeenCalledWith(100, {
            type: 'pageBlock',
            attrs: { noteId: 'note-remote' }
        });
    });
});

describe('PageBlockComponent - Keyboard Events', () => {
    let mockProps;
    const mockSelectNote = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockProps = {
            node: { attrs: { noteId: 'note-1' }, nodeSize: 1 },
            getPos: vi.fn(),
            selected: true,
            editor: {
                options: { editorProps: { panelRole: 'local' } },
                view: { 
                    dom: { 
                        addEventListener: vi.fn(), 
                        removeEventListener: vi.fn() 
                    } 
                }
            }
        };
        useNote.mockReturnValue({ selectNote: mockSelectNote });
    });

    it('should select note when Enter is pressed on the container', async () => {
        const noteData = { note_id: 'note-1', title: 'Keyboard Test' };
        noteService.getByNoteId.mockResolvedValue(noteData);

        render(<PageBlockComponent {...mockProps} />);
        
        const block = await screen.findByRole('button', { name: /keyboard test/i });
        
        fireEvent.keyDown(block, { key: 'Enter', code: 'Enter' });

        expect(mockSelectNote).toHaveBeenCalledWith(noteData);
    });

    it('should handle editor-level Enter key when selected', async () => {
        const noteData = { note_id: 'note-1', title: 'Editor Key Test' };
        noteService.getByNoteId.mockResolvedValue(noteData);

        render(<PageBlockComponent {...mockProps} />);

        // get registered function on addEventListener
        await waitFor(() => expect(mockProps.editor.view.dom.addEventListener).toHaveBeenCalled());
        const handler = mockProps.editor.view.dom.addEventListener.mock.calls[0][1];

        const mockEvent = { 
            key: 'Enter', 
            preventDefault: vi.fn(), 
            stopImmediatePropagation: vi.fn() 
        };
        
        handler(mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockSelectNote).toHaveBeenCalledWith(noteData);
    });
});

describe('PageBlockComponent - Visual States', () => {
    it('should show ghost state (unclickable) if note is deleted but allowed to be shown', async () => {
        // Simulate conflict mode where deletions can be shown
        const mockProps = {
            node: { attrs: { noteId: 'note-del' }, nodeSize: 1 },
            getPos: vi.fn(),
            editor: {
                options: { editorProps: { allowDeleted: true, panelRole: 'conflict-local' } },
                view: { dom: { addEventListener: vi.fn(), removeEventListener: vi.fn() } }
            }
        };
        
        const noteData = { note_id: 'note-del', title: 'Deleted Note', is_deleted: 1 };
        noteService.getByNoteId.mockResolvedValue(noteData);
        const mockSelectNote = vi.fn();
        useNote.mockReturnValue({ selectNote: mockSelectNote });

        render(<PageBlockComponent {...mockProps} />);

        const block = await screen.findByRole('button');
        fireEvent.click(block);

        // Can't navigate if is_deleted === 1
        expect(mockSelectNote).not.toHaveBeenCalled();
        // Remove button can't exist if is_deleted === 1
        expect(screen.queryByTitle('common.delete')).not.toBeInTheDocument();
    });
});