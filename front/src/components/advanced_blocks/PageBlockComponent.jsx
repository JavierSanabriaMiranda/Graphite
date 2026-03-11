import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { noteService } from '../../services/db/noteService';
import { useNote } from '../context/NoteContext';
import NoteIcon from '../NoteIcon';

const PageBlockComponent = ({ node, deleteNode }) => {
    const { noteId } = node.attrs;
    const { selectNote, refreshTrigger } = useNote();
    const [noteData, setNoteData] = useState(null);
    const [checking, setChecking] = useState(true);

    // Checks note status to remove the node if note has been removed
    useEffect(() => {
        let isMounted = true;

        const checkNoteStatus = async () => {
            if (!noteId) return;

            const data = await noteService.getByNoteId(noteId);

            if (!isMounted) return;

            // If note doesn't exist or marked as deleted
            if (!data || data.is_deleted === 1) {
                deleteNode(); // Remove node from document
            } else {
                setNoteData(data);
            }
            setChecking(false);
        };

        checkNoteStatus();
        return () => { isMounted = false; };
    }, [noteId, refreshTrigger, deleteNode]);

    const handleNavigation = (e) => {
        e.preventDefault();
        if (noteData) {
            selectNote(noteData);
        }
    };

    if (checking || !noteData) return null;

    return (
        <NodeViewWrapper className="my-1">
            <div
                onClick={handleNavigation}
                className="flex items-center gap-1 p-2 rounded-lg cursor-pointer transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50 group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
            >
                <div className="w-6 h-6 shrink-0 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors">
                    {noteData.icon ? (
                        <NoteIcon iconChar={noteData.icon} className="w-5 h-5" />
                    ) : (
                        <FileText className="w-5 h-5" />
                    )}
                </div>

                <span className="flex-1 truncate text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                    {noteData.title}
                </span>
            </div>
        </NodeViewWrapper>
    );
};

export default PageBlockComponent;


export const PageBlock = Node.create({
    name: 'pageBlock',
    group: 'block',
    atom: true, // Makes the pageblock work as a single object (text inside cant be editable)

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

    // Comand to insert a page easily
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
});