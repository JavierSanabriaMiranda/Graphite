import { ReactRenderer } from '@tiptap/react';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import SlashMenuList from '../slash_commands/SlashMenuList';

const normalizeText = (text) => {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replaceAll(/[\u0300-\u036f]/g, "");
};

export const getNoteLinkSuggestionConfig = (notesRef) => ({
    items: ({ query }) => {
        const currentNotes = notesRef.current || [];

        const cleanQuery = query.trim();
        const searchWords = normalizeText(cleanQuery).split(' ').filter(Boolean);

        if (searchWords.length === 0) {
            return currentNotes.slice(0, 10).map(note => ({
                title: note.title || 'Untitled Note',
                icon: note.icon,
                noteId: note.note_id
            }));
        }

        return currentNotes
            .filter(note => {
                const noteTitle = normalizeText(note.title || '');
                return searchWords.every(word => noteTitle.includes(word));
            })
            .slice(0, 10)
            .map(note => ({
                title: note.title || 'Untitled Note',
                icon: note.icon,
                noteId: note.note_id
            }));
    },

    render: () => {
        let component;
        let container;
        let editorInstance;

        const updatePosition = async (clientRect, element) => {
            if (!clientRect || !element) return;
            const { x, y } = await computePosition(
                { getBoundingClientRect: clientRect },
                element,
                {
                    placement: 'bottom-start',
                    middleware: [offset(8), flip(), shift({ padding: 10 })],
                }
            );
            Object.assign(element.style, { left: `${x}px`, top: `${y}px` });
        };

        return {
            onStart: props => {
                editorInstance = props.editor;
                component = new ReactRenderer(SlashMenuList, {
                    props,
                    editor: props.editor,
                });

                container = component.element;
                Object.assign(container.style, {
                    position: 'fixed',
                    visibility: 'visible',
                    top: '0',
                    left: '0',
                    zIndex: '9999',
                });

                document.body.appendChild(container);
                updatePosition(props.clientRect, container);
            },
            onUpdate(props) {
                editorInstance = props.editor;
                component.updateProps(props);
                updatePosition(props.clientRect, container);
            },
            onKeyDown(props) {
                if (props.event.key === 'Escape') {
                    const editor = editorInstance || props.editor;
                    const range = props.range;

                    if (editor && range) {
                        // Clear all suggestion range
                        editor.chain()
                            .focus()
                            .deleteRange(range)
                            .run();

                        return true;
                    }
                }

                return component.ref?.onKeyDown(props);
            },
            onExit() {
                if (container && document.body.contains(container)) {
                    document.body.removeChild(container);
                }
                component.destroy();
                editorInstance = null;
            },
        };
    },
});