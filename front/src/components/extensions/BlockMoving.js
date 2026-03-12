import { Extension } from '@tiptap/core';
import { NodeSelection, TextSelection } from '@tiptap/pm/state';

export const BlockMoving = Extension.create({
    name: 'blockMoving',

    addKeyboardShortcuts() {
        return {
            // Usamos Mod (Cmd en Mac) + Shift + Flecha
            'Mod-Shift-ArrowUp': () => this.editor.commands.moveBlockUp(),
            'Mod-Shift-ArrowDown': () => this.editor.commands.moveBlockDown(),

            // Opcional: También habilitamos Alt + Shift + Flecha (muy común en VS Code/Notion)
            'Alt-Shift-ArrowUp': () => this.editor.commands.moveBlockUp(),
            'Alt-Shift-ArrowDown': () => this.editor.commands.moveBlockDown(),
        };
    },

    addCommands() {
        return {
            moveBlockUp: () => ({ state, dispatch }) => {
                const { selection, doc } = state;
                const currentBlockStart = selection.$from.before(1);
                const currentBlock = doc.nodeAt(currentBlockStart);

                if (!currentBlock || currentBlockStart === 0) return true;

                const prevBlockPos = doc.resolve(currentBlockStart - 1).before(1);
                const prevBlock = doc.nodeAt(prevBlockPos);

                if (!prevBlock) return true;

                if (dispatch) {
                    const tr = state.tr;
                    tr.delete(currentBlockStart, currentBlockStart + currentBlock.nodeSize);
                    tr.insert(prevBlockPos, currentBlock);

                    const newPos = prevBlockPos;

                    // LÓGICA DE SELECCIÓN INTELIGENTE
                    if (currentBlock.isLeaf || currentBlock.type.spec.atom) {
                        // Si es un PageBlock u otro átomo, lo seleccionamos como NODO
                        tr.setSelection(NodeSelection.create(tr.doc, newPos));
                    } else {
                        // Si es un párrafo, ponemos el cursor de texto dentro
                        tr.setSelection(TextSelection.near(tr.doc.resolve(newPos + 1)));
                    }

                    dispatch(tr.scrollIntoView());
                }
                return true;
            },

            moveBlockDown: () => ({ state, dispatch }) => {
                const { selection, doc } = state;
                const currentBlockStart = selection.$from.before(1);
                const currentBlock = doc.nodeAt(currentBlockStart);

                if (!currentBlock) return true;

                const currentBlockEnd = currentBlockStart + currentBlock.nodeSize;
                if (currentBlockEnd >= doc.content.size) return true;

                const nextBlock = doc.nodeAt(currentBlockEnd);
                if (!nextBlock) return true;

                if (dispatch) {
                    const tr = state.tr;
                    const nextBlockSize = nextBlock.nodeSize;

                    tr.delete(currentBlockStart, currentBlockEnd);
                    const insertPos = currentBlockStart + nextBlockSize;
                    tr.insert(insertPos, currentBlock);

                    // LÓGICA DE SELECCIÓN INTELIGENTE
                    if (currentBlock.isLeaf || currentBlock.type.spec.atom) {
                        tr.setSelection(NodeSelection.create(tr.doc, insertPos));
                    } else {
                        tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos + 1)));
                    }

                    dispatch(tr.scrollIntoView());
                }
                return true;
            },
        };
    },
});