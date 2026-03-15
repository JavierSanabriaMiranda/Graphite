import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BlockMoving } from '../../../src/components/extensions/BlockMoving';
import { NodeSelection, TextSelection } from '@tiptap/pm/state';

vi.mock('@tiptap/pm/state', () => ({
    NodeSelection: {
        create: vi.fn().mockReturnValue({ type: 'node-selection' }),
    },
    TextSelection: {
        near: vi.fn().mockReturnValue({ type: 'text-selection' }),
    },
}));

describe('BlockMoving Extension', () => {
    let mockEditor;
    let mockState;
    let mockDispatch;
    let mockTr;

    beforeEach(() => {
        vi.clearAllMocks();

        // Mock of transaction
        mockTr = {
            delete: vi.fn().mockReturnThis(),
            insert: vi.fn().mockReturnThis(),
            setSelection: vi.fn().mockReturnThis(),
            scrollIntoView: vi.fn().mockReturnThis(),
            doc: { resolve: vi.fn() },
        };

        // Mock of state
        mockState = {
            selection: {
                $from: {
                    before: vi.fn(),
                },
            },
            doc: {
                nodeAt: vi.fn(),
                resolve: vi.fn().mockReturnValue({
                    before: vi.fn(),
                }),
                content: { size: 100 },
            },
            tr: mockTr,
        };

        mockDispatch = vi.fn();

        mockEditor = {
            commands: {
                moveBlockUp: vi.fn(),
                moveBlockDown: vi.fn(),
            },
        };
    });

    describe('Keyboard Shortcuts', () => {
        it('should register correct shortcuts', () => {
            const shortcuts = BlockMoving.config.addKeyboardShortcuts.call({ editor: mockEditor });
            
            shortcuts['Mod-Shift-ArrowUp']();
            expect(mockEditor.commands.moveBlockUp).toHaveBeenCalled();

            shortcuts['Mod-Shift-ArrowDown']();
            expect(mockEditor.commands.moveBlockDown).toHaveBeenCalled();
            
            shortcuts['Alt-Shift-ArrowUp']();
            expect(mockEditor.commands.moveBlockUp).toHaveBeenCalledTimes(2);
        });
    });

    describe('moveBlockUp Command', () => {
        const moveBlockUp = BlockMoving.config.addCommands().moveBlockUp();

        it('should do nothing if no current block is found', () => {
            mockState.doc.nodeAt.mockReturnValue(null);
            const result = moveBlockUp({ state: mockState, dispatch: mockDispatch });
            expect(result).toBe(true);
            expect(mockDispatch).not.toHaveBeenCalled();
        });

        it('should do nothing if current block is at the top (pos 0)', () => {
            mockState.selection.$from.before.mockReturnValue(0);
            mockState.doc.nodeAt.mockReturnValue({ nodeSize: 10 });
            
            const result = moveBlockUp({ state: mockState, dispatch: mockDispatch });
            expect(result).toBe(true);
            expect(mockDispatch).not.toHaveBeenCalled();
        });

        it('should move block up and set TextSelection for normal paragraphs', () => {
            const currentPos = 20;
            const prevBlockPos = 5;
            const currentBlock = { nodeSize: 10, isLeaf: false, type: { spec: {} } };
            const prevBlock = { nodeSize: 15 };

            mockState.selection.$from.before.mockReturnValue(currentPos);
            mockState.doc.nodeAt.mockImplementation((pos) => {
                if (pos === currentPos) return currentBlock;
                if (pos === prevBlockPos) return prevBlock;
                return null;
            });
            mockState.doc.resolve.mockReturnValue({ before: () => prevBlockPos });

            moveBlockUp({ state: mockState, dispatch: mockDispatch });

            expect(mockTr.delete).toHaveBeenCalledWith(currentPos, currentPos + 10);
            expect(mockTr.insert).toHaveBeenCalledWith(prevBlockPos, currentBlock);
            expect(mockDispatch).toHaveBeenCalledWith(mockTr);
        });

        it('should use NodeSelection for atom/leaf blocks', () => {
            const currentPos = 20;
            const currentBlock = { nodeSize: 10, isLeaf: true, type: { spec: { atom: true } } };
            
            mockState.selection.$from.before.mockReturnValue(currentPos);
            mockState.doc.nodeAt.mockReturnValue(currentBlock);
            mockState.doc.resolve.mockReturnValue({ before: () => 5 });

            moveBlockUp({ state: mockState, dispatch: mockDispatch });

            expect(mockTr.setSelection).toHaveBeenCalled();
        });
    });

    describe('moveBlockDown Command', () => {
        const moveBlockDown = BlockMoving.config.addCommands().moveBlockDown();

        it('should do nothing if current block is at the end of the doc', () => {
            const currentPos = 90;
            const currentBlock = { nodeSize: 10 };

            mockState.selection.$from.before.mockReturnValue(currentPos);
            mockState.doc.nodeAt.mockReturnValue(currentBlock);

            const result = moveBlockDown({ state: mockState, dispatch: mockDispatch });
            expect(result).toBe(true);
            expect(mockDispatch).not.toHaveBeenCalled();
        });

        it('should swap position with the next block', () => {
            const currentPos = 10;
            const currentBlock = { nodeSize: 10, isLeaf: false, type: { spec: {} } };
            const nextBlock = { nodeSize: 20 };

            mockState.selection.$from.before.mockReturnValue(currentPos);
            mockState.doc.nodeAt.mockImplementation((pos) => {
                if (pos === currentPos) return currentBlock;
                if (pos === currentPos + 10) return nextBlock;
                return null;
            });

            moveBlockDown({ state: mockState, dispatch: mockDispatch });

            expect(mockTr.delete).toHaveBeenCalledWith(currentPos, currentPos + 10);
            // insertPos = currentPos (10) + nextBlockSize (20) = 30
            expect(mockTr.insert).toHaveBeenCalledWith(30, currentBlock);
            expect(mockDispatch).toHaveBeenCalled();
        });

        it('should handle atom blocks moving down', () => {
            const currentPos = 10;
            const currentBlock = { nodeSize: 10, isLeaf: true, type: { spec: { atom: true } } };
            const nextBlock = { nodeSize: 20 };

            mockState.selection.$from.before.mockReturnValue(currentPos);
            mockState.doc.nodeAt.mockImplementation((pos) => {
                if (pos === currentPos) return currentBlock;
                if (pos === 20) return nextBlock;
                return null;
            });

            moveBlockDown({ state: mockState, dispatch: mockDispatch });

            expect(mockTr.setSelection).toHaveBeenCalled();
        });
    });
});