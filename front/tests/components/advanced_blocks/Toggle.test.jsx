import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { ToggleBlock, ToggleBlockComponent } from '../../../src/components/advanced_blocks/toggle_block/ToggleBlock';
import { ToggleTitle } from '../../../src/components/advanced_blocks/toggle_block/ToggleTitle';
import { ToggleIcon } from '../../../src/components/advanced_blocks/toggle_block/ToggleIcon';

vi.mock('@tiptap/react', () => ({
    NodeViewWrapper: ({ children, className }) => <div className={className} data-testid="wrapper">{children}</div>,
    NodeViewContent: ({ className }) => <div className={className} data-testid="content" />,
    ReactNodeViewRenderer: vi.fn(),
}));

vi.mock('../../../src/components/util/DropdownArrow', () => ({
    default: ({ menuOpen }) => <div data-testid="arrow">{menuOpen ? 'open' : 'closed'}</div>,
}));

describe('ToggleBlockComponent', () => {
    let mockProps;

    beforeEach(() => {
        mockProps = {
            node: { attrs: { isOpen: true } },
            updateAttributes: vi.fn(),
        };
    });

    it('should toggle isOpen attribute when arrow is clicked', () => {
        render(<ToggleBlockComponent {...mockProps} />);
        
        const arrowContainer = screen.getByTestId('arrow').parentElement;
        fireEvent.click(arrowContainer);

        expect(mockProps.updateAttributes).toHaveBeenCalledWith({ isOpen: false });
    });

    it('should have correct classes based on isOpen state', () => {
        const { rerender } = render(<ToggleBlockComponent {...mockProps} />);
        expect(screen.getByTestId('wrapper')).toHaveClass('is-open');

        mockProps.node.attrs.isOpen = false;
        rerender(<ToggleBlockComponent {...mockProps} />);
        expect(screen.getByTestId('wrapper')).toHaveClass('is-closed');
    });
});

describe('ToggleBlock Commands', () => {
    it('setToggle should transform paragraph to toggle', () => {
        const mockChain = {
            focus: vi.fn().mockReturnThis(),
            insertContentAt: vi.fn().mockReturnThis(),
            setTextSelection: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnValue(true),
        };

        const mockState = {
            selection: {
                $from: {
                    before: vi.fn().mockReturnValue(0),
                    after: vi.fn().mockReturnValue(10),
                    depth: 1,
                    node: () => ({ content: { toJSON: () => [{ text: 'Hola' }] } })
                }
            }
        };

        const command = ToggleBlock.config.addCommands().setToggle();
        const result = command({ state: mockState, chain: () => mockChain });

        expect(result).toBe(true);
        expect(mockChain.insertContentAt).toHaveBeenCalled();
    });

    it('unsetToggle should flatten toggle back to paragraph', () => {
        const mockChain = {
            focus: vi.fn().mockReturnThis(),
            insertContentAt: vi.fn().mockReturnThis(),
            setTextSelection: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnValue(true),
        };

        const mockNode = {
            type: { name: 'toggleBlock' },
            nodeSize: 20,
            child: (index) => ({ content: { toJSON: () => [] } })
        };

        const mockState = {
            selection: {
                $from: {
                    depth: 1,
                    before: vi.fn().mockReturnValue(0),
                    node: () => mockNode
                }
            }
        };

        const command = ToggleBlock.config.addCommands().unsetToggle();
        const result = command({ state: mockState, chain: () => mockChain });

        expect(result).toBe(true);
        expect(mockChain.insertContentAt).toHaveBeenCalled();
    });
});

describe('ToggleTitle Keyboard Shortcuts', () => {
    let mockEditor;

    beforeEach(() => {
        mockEditor = {
            state: {
                selection: {
                    // empty must be at same level as $from
                    empty: true, 
                    $from: {
                        parent: { 
                            type: { name: 'toggleTitle' }, 
                            content: { size: 5 } 
                        },
                        parentOffset: 0, // Cursor at the beggining
                        depth: 2,
                        node: vi.fn(),
                        after: vi.fn().mockReturnValue(15)
                    }
                }
            },
            commands: { 
                unsetToggle: vi.fn().mockReturnValue(true) 
            },
            chain: vi.fn().mockReturnValue({
                focus: vi.fn().mockReturnThis(),
                run: vi.fn().mockReturnValue(true)
            })
        };
    });

    it('Backspace at the beginning should call unsetToggle', () => {
        const shortcuts = ToggleTitle.config.addKeyboardShortcuts.call({ editor: mockEditor });
        const result = shortcuts.Backspace();

        expect(result).toBe(true);
        expect(mockEditor.commands.unsetToggle).toHaveBeenCalled();
    });

    it('Enter at the end of title should move focus to content if open', () => {
        // Simulates cursor is at the end of the line (offset 5, tamaño 5)
        mockEditor.state.selection.$from.parentOffset = 5;
        // Simulates that parent (toggleBlock) is opened
        mockEditor.state.selection.$from.node.mockReturnValue({ attrs: { isOpen: true } });

        const shortcuts = ToggleTitle.config.addKeyboardShortcuts.call({ editor: mockEditor });
        const result = shortcuts.Enter();

        expect(result).toBe(true);
    });
});

describe('ToggleIcon', () => {
    it('should render SVG with custom className', () => {
        const { container } = render(<ToggleIcon className="custom-class" />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass('custom-class');
        expect(svg.querySelectorAll('path').length).toBe(4);
    });
});