import { useRef } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { useEffect, useState } from 'react';
import { Trash2, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { noteService } from '../../services/db/noteService';
import { useNote } from '../context/NoteContext';
import NoteIcon from '../util/NoteIcon';
import DeleteConfirmModal from '../options_menu/DeleteConfirmModal';

const PageBlockComponent = ({ node, deleteNode, selected, getPos, editor }) => {
    const { t } = useTranslation();
    const { noteId } = node.attrs;
    const { selectNote, refreshTrigger } = useNote();
    const [noteData, setNoteData] = useState(null);
    const [checking, setChecking] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Reference to external div to control focus
    const containerRef = useRef(null);

    // Effect to get focus when selecting page block
    useEffect(() => {
        if (selected && containerRef.current) {
            containerRef.current.focus();
        }
    }, [selected]);

    // Checks note status to remove the node if note has been removed
    useEffect(() => {
        let isMounted = true;

        const checkNoteStatus = async () => {
            if (!noteId) return;

            const data = await noteService.getByNoteId(noteId);

            if (!isMounted) return;

            // If note doesn't exist or marked as deleted
            if (!data || data.is_deleted === 1) {
                const pos = getPos();
                // Use authorized delete
                editor.view.dispatch(
                    editor.state.tr
                        .delete(pos, pos + node.nodeSize)
                        .setMeta('forceDeletePageBlock', true)
                );
            } else {
                setNoteData(data);
            }
            setChecking(false);
        };

        checkNoteStatus();
        return () => { isMounted = false; };
    }, [noteId, refreshTrigger, deleteNode]);

    const handleConfirmedDelete = () => {
        const pos = getPos();

        // Use editor to remove
        editor.view.dispatch(
            editor.state.tr
                .delete(pos, pos + node.nodeSize)
                .setMeta('forceDeletePageBlock', true) // Key for deleting
        );

        setIsDeleteModalOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            selectNote(noteData);
        }
    };

    if (checking || !noteData) return null;

    return (
        <NodeViewWrapper
            className={`my-2 group/page select-none transition-all ${selected ? 'ring-2 ring-primary/40 rounded-xl' : ''}`}
            contentEditable={false}
        >
            <div
                ref={containerRef}
                role="button"
                tabIndex={0}
                onClick={() => selectNote(noteData)}
                onKeyDown={handleKeyDown}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border
                    ${selected
                        ? 'bg-primary/5 border-primary/30'
                        : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }
                `}
            >
                <div className="w-6 h-6 shrink-0 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors">
                    {noteData.icon ? (
                        <NoteIcon iconChar={noteData.icon} className="w-5 h-5" />
                    ) : (
                        <FileText className="w-5 h-5" />
                    )}
                </div>

                <span className="flex-1 truncate text-sm font-medium text-text-primary group-hover/page:text-primary transition-colors">
                    {noteData.title}
                </span>

                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Avoid navigate to page
                        setIsDeleteModalOpen(true);
                    }}
                    className="cursor-pointer opacity-0 group-hover/page:opacity-100 p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-zinc-400 hover:text-red-600 rounded-md transition-all"
                    title={t('common.delete') || "Delete"}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                noteToDelete={noteData}
                onConfirm={handleConfirmedDelete}
            />
        </NodeViewWrapper>
    );
};

export default PageBlockComponent;


export const PageBlock = Node.create({
    name: 'pageBlock',
    group: 'block',
    atom: true, // Makes the pageblock work as a single object (text inside cant be editable)
    selectable: true,
    draggable: true,
    isolating: true,

    addAttributes() {
        return {
            noteId: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="page-block"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'page-block' }), 0];
    },

    addNodeView() {
        return ReactNodeViewRenderer(PageBlockComponent);
    },

    // Command to insert a page easily
    addCommands() {
        return {
            insertPageBlock: (noteId) => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: { noteId },
                });
            },
        };
    },

    // Avoids delete page writing into de PageBlock or with backspace
    addProseMirrorPlugins() {
        const nodeType = this.type;

        return [
            new Plugin({
                key: new PluginKey('pageBlockProtection'),
                filterTransaction(tr, state) {
                    if (!tr.docChanged) return true;

                    // Delete must have a key called "forceDeletePageBlock"
                    const isAuthorized = tr.getMeta('forceDeletePageBlock');
                    if (isAuthorized) return true;

                    // Count how many children has the current page
                    let oldPages = 0;
                    state.doc.descendants((node) => {
                        if (node.type === nodeType) oldPages++;
                    });

                    let newPages = 0;
                    tr.doc.descendants((node) => {
                        if (node.type === nodeType) newPages++;
                    });

                    // If not authorized and number of children goes down, cancel
                    if (newPages < oldPages) {
                        // Dont let transaction take place
                        return false;
                    }

                    return true;
                },
            }),
        ];
    },
});