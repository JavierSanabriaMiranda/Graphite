import { useRef } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { useEffect, useState } from 'react';
import { Trash2, FileText, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { noteService } from '../../services/db/noteService';
import { useNote } from '../context/NoteContext';
import NoteIcon from '../util/NoteIcon';
import DeleteConfirmModal from '../options_menu/DeleteConfirmModal';

/**
 * Component that represents a subpage inside the editor content.
 * When clicked it selects the subpage on the editor.
 * It has a button with a trash icon that allows the page to be removed. If the page that represents
 * the PageBlock has is_removed = 1, then the component won't be shown.
 * 
 * Has also special behavior when in conflict resolving, showing a left arrow button that allows the user to copy-paste
 * the PageBlockComponent from the remote editor to the local one.
 */
const PageBlockComponent = ({ node, deleteNode, selected, getPos, editor }) => {
    const { t } = useTranslation();
    const { noteId } = node.attrs;
    const { selectNote, refreshTrigger } = useNote();
    const [noteData, setNoteData] = useState(null);
    const [checking, setChecking] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    // State for rerender
    const [updateTick, setUpdateTick] = useState(0)

    // Reference to external div to control focus
    const containerRef = useRef(null);

    useEffect(() => {
        if (!selected || !noteData) return;

        const handleEditorKeyDown = (e) => {
            if (e.key === 'Enter') {
                // Avoid creating a new paragraph
                e.preventDefault();
                e.stopImmediatePropagation();
                selectNote(noteData);
            }
        };

        // Listen the keydown event
        editor.view.dom.addEventListener('keydown', handleEditorKeyDown, true);

        return () => {
            editor.view.dom.removeEventListener('keydown', handleEditorKeyDown, true);
        };
    }, [selected, noteData, selectNote, editor]);

    // Checks note status to remove the node if note has been removed
    useEffect(() => {
        let isMounted = true;

        const checkNoteStatus = async () => {
            if (!noteId) return;

            const data = await noteService.getByNoteId(noteId);

            if (!isMounted) return;

            // Check if editor allows to show deleted notes (personalized property)
            // This is used to show deleted notes on conflict resolver
            const allowDeleted = editor.options.editorProps?.allowDeleted;

            // If note doesn't exist or marked as deleted
            if (!data || (data.is_deleted === 1 && !allowDeleted)) {
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
            return;
        }
    };

    // Conflict resolving properties
    const role = editor.options.editorProps?.panelRole;
    const isRemoteConflictPanel = role === 'conflict-remote';
    const localEditor = editor.options.editorProps?.localEditor;

    useEffect(() => {
        // Just look for local editor updates if we are in remote editor
        if (isRemoteConflictPanel && localEditor) {
            const updateHandler = () => {
                // Rerender
                setUpdateTick(tick => tick + 1);
            };

            localEditor.on('update', updateHandler);
            return () => localEditor.off('update', updateHandler);
        }
    }, [isRemoteConflictPanel, localEditor]);

    if (checking || !noteData) return null;

    const isGhost = noteData.is_deleted === 1;

    const checkIfExistsInLocal = () => {
        if (!localEditor) return false;

        let exists = false;
        localEditor.state.doc.descendants((childNode) => {
            if (childNode.type.name === 'pageBlock' && childNode.attrs.noteId === noteId) {
                exists = true;
                return false;
            }
        });
        return exists;
    };

    const alreadyInLocal = isRemoteConflictPanel ? checkIfExistsInLocal() : false;

    // Function for conflict resolution to paste the pageBlockComponent at the end of the local editor
    const handleTransferToLocal = (e) => {
        e.stopPropagation();
        if (!localEditor || alreadyInLocal) return;

        const endOfDoc = localEditor.state.doc.content.size;

        localEditor.chain()
            .focus()
            .insertContentAt(endOfDoc, {
                type: 'pageBlock',
                attrs: { noteId }
            })
            .run();
    };

    return (
        <NodeViewWrapper
            className={`my-2 group/page select-none transition-all ${selected ? 'ring-2 ring-primary/40 rounded-xl' : ''}`}
            contentEditable={false}
        >
            <div
                ref={containerRef}
                role="button"
                tabIndex={0}
                onClick={() => !isGhost && selectNote(noteData)}
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

                {isRemoteConflictPanel && localEditor && !alreadyInLocal && (
                    <button
                        onClick={handleTransferToLocal}
                        className="cursor-pointer bg-primary text-white p-1.5 hover:scale-110 active:scale-95 rounded-lg transition-all shadow-md shadow-primary/20 shrink-0"
                        title={t('conflict.transfer_to_local')}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                )}

                {!isGhost && !isRemoteConflictPanel && (
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
                )}
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