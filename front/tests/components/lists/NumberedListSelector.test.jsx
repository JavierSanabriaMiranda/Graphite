import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NumberedListSelector, { NumberedListIcon } from '../../../src/components/lists/NumberedListSelector';
import { useEditorState } from '@tiptap/react';

vi.mock('@tiptap/react', async () => {
    const actual = await vi.importActual('@tiptap/react');
    return {
        ...actual,
        useEditorState: vi.fn(),
    };
});

describe('NumberedListSelector Suite', () => {
    let mockEditor;
    let mockChain;

    beforeEach(() => {
        vi.clearAllMocks();

        // Editor mock supporting chain
        mockChain = {
            focus: vi.fn().mockReturnThis(),
            toggleOrderedList: vi.fn().mockReturnThis(),
            updateAttributes: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnThis(),
        };

        mockEditor = {
            chain: vi.fn(() => mockChain),
        };

        // Default style: list desactivated, default style
        useEditorState.mockImplementation(({ selector }) => {
            const ctx = {
                editor: {
                    getAttributes: () => ({ listStyle: 'default' }),
                    isActive: () => false,
                }
            };
            return selector(ctx);
        });
    });

    // Icon test
    describe('NumberedListIcon', () => {
        it('should render the SVG correctly with custom class', () => {
            const { container } = render(<NumberedListIcon className="test-class" />);
            const svg = container.querySelector('svg');
            expect(svg).toHaveClass('test-class');
            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.getByText('3')).toBeInTheDocument();
        });
    });

    // Selector test
    describe('NumberedListSelector Component', () => {
        it('should return null if no editor is provided', () => {
            const { container } = render(<NumberedListSelector editor={null} />);
            expect(container.firstChild).toBeNull();
        });

        it('should toggle menu visibility on click', () => {
            render(<NumberedListSelector editor={mockEditor} />);
            
            const mainButton = screen.getByTitle('editor.toolbar.ordered_list.ordered_list');
            
            // Open
            fireEvent.click(mainButton);
            expect(screen.getByTitle('editor.toolbar.ordered_list.letters')).toBeInTheDocument();
            
            // Close
            fireEvent.click(mainButton);
            expect(screen.queryByTitle('editor.toolbar.ordered_list.letters')).not.toBeInTheDocument();
        });

        it('Case 1: should turn ON list and set style if currently inactive', () => {
            // isOrderedActive = false
            useEditorState.mockReturnValueOnce('default').mockReturnValueOnce(false);

            render(<NumberedListSelector editor={mockEditor} />);
            
            fireEvent.click(screen.getByTitle('editor.toolbar.ordered_list.ordered_list'));
            fireEvent.click(screen.getByTitle('editor.toolbar.ordered_list.roman'));

            expect(mockChain.toggleOrderedList).toHaveBeenCalled();
            expect(mockChain.updateAttributes).toHaveBeenCalledWith('orderedList', { listStyle: 'roman' });
            expect(mockChain.run).toHaveBeenCalled();
        });

        it('Case 2: should turn OFF list if same style is clicked while active', () => {
            // isOrderedActive = true, currentStyle = 'alpha'
            useEditorState.mockImplementation(({ selector }) => {
                const ctx = {
                    editor: {
                        getAttributes: () => ({ listStyle: 'alpha' }),
                        isActive: () => true,
                    }
                };
                return selector(ctx);
            });

            render(<NumberedListSelector editor={mockEditor} />);
            
            fireEvent.click(screen.getByTitle('editor.toolbar.ordered_list.ordered_list'));
            fireEvent.click(screen.getByTitle('editor.toolbar.ordered_list.letters'));

            expect(mockChain.toggleOrderedList).toHaveBeenCalled();
            expect(mockChain.updateAttributes).not.toHaveBeenCalled();
            expect(mockChain.run).toHaveBeenCalled();
        });

        it('Case 3: should only update style if active but different style is clicked', () => {
            // isOrderedActive = true, currentStyle = 'default' -> click en 'mix'
            useEditorState.mockImplementation(({ selector }) => {
                const ctx = {
                    editor: {
                        getAttributes: () => ({ listStyle: 'default' }),
                        isActive: () => true,
                    }
                };
                return selector(ctx);
            });

            render(<NumberedListSelector editor={mockEditor} />);
            
            fireEvent.click(screen.getByTitle('editor.toolbar.ordered_list.ordered_list'));
            fireEvent.click(screen.getByTitle('editor.toolbar.ordered_list.mix'));

            expect(mockChain.toggleOrderedList).not.toHaveBeenCalled();
            expect(mockChain.updateAttributes).toHaveBeenCalledWith('orderedList', { listStyle: 'mix' });
            expect(mockChain.run).toHaveBeenCalled();
        });

        it('should apply active classes when the list is enabled', () => {
            // Use mockImplementation for avoiding the issue of re-rendering
            useEditorState.mockImplementation(({ selector }) => {
                const ctx = {
                    editor: {
                        getAttributes: () => ({ listStyle: 'default' }),
                        isActive: () => true,
                    }
                };
                return selector(ctx);
            });

            render(<NumberedListSelector editor={mockEditor} />);
            const mainButton = screen.getByTitle('editor.toolbar.ordered_list.ordered_list');
            
            expect(mainButton).toHaveClass('bg-primary');
        });

        it('should render all 4 options in the menu', () => {
            render(<NumberedListSelector editor={mockEditor} />);
            fireEvent.click(screen.getByTitle('editor.toolbar.ordered_list.ordered_list'));
            
            expect(screen.getByTitle('editor.toolbar.ordered_list.numbers')).toBeInTheDocument();
            expect(screen.getByTitle('editor.toolbar.ordered_list.letters')).toBeInTheDocument();
            expect(screen.getByTitle('editor.toolbar.ordered_list.roman')).toBeInTheDocument();
            expect(screen.getByTitle('editor.toolbar.ordered_list.mix')).toBeInTheDocument();
        });
    });
});