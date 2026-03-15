import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TodoList, { TodoIcon } from '../../../src/components/lists/TodoList';
import { useEditorState } from '@tiptap/react';

vi.mock('@tiptap/react', async () => {
    const actual = await vi.importActual('@tiptap/react');
    return {
        ...actual,
        useEditorState: vi.fn(),
    };
});

describe('TodoList Suite', () => {
    let mockEditor;
    let mockChain;

    beforeEach(() => {
        vi.clearAllMocks();

        // Editor mock supporting chain
        mockChain = {
            focus: vi.fn().mockReturnThis(),
            toggleTaskList: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnThis(),
        };

        mockEditor = {
            chain: vi.fn(() => mockChain),
        };

        // Default state: To-do list desactivated
        useEditorState.mockImplementation(({ selector }) => {
            const ctx = {
                editor: {
                    isActive: () => false,
                }
            };
            return selector(ctx);
        });
    });

    // Icon test
    describe('TodoIcon', () => {
        it('should render the SVG correctly', () => {
            const { container } = render(<TodoIcon />);
            const svg = container.querySelector('svg');
            expect(svg).toBeInTheDocument();
            expect(svg).toHaveClass('w-5');
        });
    });

    // To-do list component test
    describe('TodoList Component', () => {
        it('should return null if no editor is provided', () => {
            const { container } = render(<TodoList editor={null} />);
            expect(container.firstChild).toBeNull();
        });

        it('should render correctly with title from translations', () => {
            render(<TodoList editor={mockEditor} />);

            // Verify that button has translated title
            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('title', 'editor.toolbar.todo_list');
        });

        it('should call toggleTaskList on click', () => {
            render(<TodoList editor={mockEditor} />);

            const button = screen.getByRole('button');
            fireEvent.click(button);

            // Verify tiptap execution chain
            expect(mockEditor.chain).toHaveBeenCalled();
            expect(mockChain.focus).toHaveBeenCalled();
            expect(mockChain.toggleTaskList).toHaveBeenCalled();
            expect(mockChain.run).toHaveBeenCalled();
        });

        it('should apply active styles when isTodoListActive is true', () => {
            // Force active state
            useEditorState.mockImplementation(({ selector }) => {
                const ctx = {
                    editor: {
                        isActive: () => true,
                    }
                };
                return selector(ctx);
            });

            render(<TodoList editor={mockEditor} />);
            const button = screen.getByRole('button');

            // Verify active state classes
            expect(button).toHaveClass('bg-primary');
            expect(button).toHaveClass('text-white');
            expect(button).not.toHaveClass('text-black');
        });

        it('should apply default styles when isTodoListActive is false', () => {
            // Default state on beforeEach is already false
            render(<TodoList editor={mockEditor} />);
            const button = screen.getByRole('button');

            expect(button).toHaveClass('text-black');
            expect(button).toHaveClass('hover:bg-hover-primary-bg');
            expect(button).not.toHaveClass('bg-primary');
        });
    });
});