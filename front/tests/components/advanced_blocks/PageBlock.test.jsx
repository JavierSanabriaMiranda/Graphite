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

vi.mock('../../../src/components/options_menu/DeleteConfirmModal', () => ({
    default: ({ isOpen, onConfirm, onClose }) => isOpen ? (
        <div data-testid="modal">
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onClose}>Close</button>
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

        // Mock of editor and it's transactions
        const mockTr = {
            delete: vi.fn().mockReturnThis(),
            setMeta: vi.fn().mockReturnThis()
        };

        mockProps = {
            node: { attrs: { noteId: 'note-123' }, nodeSize: 1 },
            getPos: vi.fn().mockReturnValue(10),
            selected: false,
            editor: {
                state: { tr: mockTr },
                view: { dispatch: vi.fn() }
            }
        };
    });

    it('should render note data after loading', async () => {
        noteService.getByNoteId.mockResolvedValue({
            note_id: 'note-123',
            title: 'My Testing Note',
            icon: '📝'
        });

        render(<PageBlockComponent {...mockProps} />);

        // At beginning is null
        expect(screen.queryByText('My Testing Note')).not.toBeInTheDocument();

        // Wait for load
        await waitFor(() => {
            expect(screen.getByText('My Testing Note')).toBeInTheDocument();
        });
    });

    it('should self-destruct if note does not exist in DB', async () => {
        // Simulates note has beed deleted in db
        noteService.getByNoteId.mockResolvedValue(null);

        render(<PageBlockComponent {...mockProps} />);

        await waitFor(() => {
            expect(mockProps.editor.view.dispatch).toHaveBeenCalled();
            expect(mockProps.editor.state.tr.setMeta).toHaveBeenCalledWith('forceDeletePageBlock', true);
        });
    });

    it('should navigate to note on click', async () => {
        const noteData = { note_id: 'note-123', title: 'Test' };
        noteService.getByNoteId.mockResolvedValue(noteData);

        render(<PageBlockComponent {...mockProps} />);
        
        const block = await screen.findByText('Test');
        fireEvent.click(block);

        expect(mockSelectNote).toHaveBeenCalledWith(noteData);
    });

    it('should open modal and delete note on confirmation', async () => {
        noteService.getByNoteId.mockResolvedValue({ note_id: 'note-123', title: 'Test' });

        render(<PageBlockComponent {...mockProps} />);
        
        const trashBtn = await screen.findByRole('button'); // Trash button
        fireEvent.click(trashBtn);

        // Confirm on modal
        const confirmBtn = screen.getByText('Confirm');
        fireEvent.click(confirmBtn);

        expect(mockProps.editor.view.dispatch).toHaveBeenCalled();
    });
});

describe('PageBlock Extension & Protection Plugin', () => {
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

        it('should block transaction if a PageBlock is being deleted without authorization', () => {
            // Simulates that old document had 2 pages and new has 1
            const state = {
                doc: { descendants: (cb) => { cb({ type: nodeType }); cb({ type: nodeType }); } }
            };
            const tr = { 
                docChanged: true, 
                getMeta: vi.fn().mockReturnValue(false),
                doc: { descendants: (cb) => { cb({ type: nodeType }); } } 
            };

            const result = plugin.spec.filterTransaction(tr, state);
            // Must be false: plugin blocks accidental delete
            expect(result).toBe(false);
        });
    });
});