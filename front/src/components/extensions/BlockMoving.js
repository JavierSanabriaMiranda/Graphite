import { Extension } from '@tiptap/core';
import { NodeSelection, TextSelection } from '@tiptap/pm/state';

/**
 * Extension to allow blocks to be moved up and down on the editor. 
 * This means swaping position with the block above or below it.
 */
export const BlockMoving = Extension.create({
    name: 'blockMoving',

    addKeyboardShortcuts() {
        return {
            // Use Mod (Cmd on Mac, Ctrl on Windows) + Shift + Arrow
            'Mod-Shift-ArrowUp': () => this.editor.commands.moveBlockUp(),
            'Mod-Shift-ArrowDown': () => this.editor.commands.moveBlockDown(),

            // Use Mod (Option on Mac, Alt on Windows) + Shift + Arrow
            'Alt-Shift-ArrowUp': () => this.editor.commands.moveBlockUp(),
            'Alt-Shift-ArrowDown': () => this.editor.commands.moveBlockDown(),
        };
    },

    addCommands() {
        return {

            // Moves block up swaping position with the block just above 
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

                    // Smart selection
                    if (currentBlock.isLeaf || currentBlock.type.spec.atom) {
                        // If atom block, select it as node
                        tr.setSelection(NodeSelection.create(tr.doc, newPos));
                    } else {
                        // If paragraph, put cursor inside
                        tr.setSelection(TextSelection.near(tr.doc.resolve(newPos + 1)));
                    }

                    dispatch(tr.scrollIntoView());
                }
                return true;
            },

            // Moves block down swaping position with the block just below
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