import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BulletSelector, { BulletedListIcon } from '../../../src/components/lists/BulletSelector';
import { useEditorState } from '@tiptap/react';

vi.mock('@tiptap/react', async () => {
    const actual = await vi.importActual('@tiptap/react');
    return {
        ...actual,
        useEditorState: vi.fn(),
    };
});

describe('BulletSelector Suite', () => {
    let mockEditor;
    let mockChain;

    beforeEach(() => {
        vi.clearAllMocks();

        // Editor mock supporting chain
        mockChain = {
            focus: vi.fn().mockReturnThis(),
            toggleBulletList: vi.fn().mockReturnThis(),
            updateAttributes: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnThis(),
        };

        mockEditor = {
            chain: vi.fn(() => mockChain),
        };

        // Default state: desactivated list, dots style
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

    // Icon Tests
    describe('BulletedListIcon', () => {
        it('should render the SVG correctly with custom class', () => {
            const { container } = render(<BulletedListIcon className="test-class" />);
            const svg = container.querySelector('svg');
            expect(svg).toHaveClass('test-class');
            expect(svg.querySelectorAll('circle').length).toBe(3);
        });
    });

    // Selector tests
    describe('BulletSelector Component', () => {
        it('should return null if no editor is provided', () => {
            const { container } = render(<BulletSelector editor={null} />);
            expect(container.firstChild).toBeNull();
        });

        it('should open the menu when the main button is clicked', () => {
            render(<BulletSelector editor={mockEditor} />);

            const mainButton = screen.getByTitle('editor.toolbar.bulleted_list.bulleted_list');
            fireEvent.click(mainButton);

            // Verify that appears one of the menu options (example: squares)
            expect(screen.getByTitle('editor.toolbar.bulleted_list.squares')).toBeInTheDocument();
        });

        it('Case 1: should toggle list and set style if list is NOT active', () => {
            useEditorState.mockReturnValueOnce('default').mockReturnValueOnce(false);

            render(<BulletSelector editor={mockEditor} />);

            // Open menu and click on circles
            fireEvent.click(screen.getByTitle('editor.toolbar.bulleted_list.bulleted_list'));
            fireEvent.click(screen.getByTitle('editor.toolbar.bulleted_list.circles'));

            expect(mockChain.toggleBulletList).toHaveBeenCalled();
            expect(mockChain.updateAttributes).toHaveBeenCalledWith('bulletList', { listStyle: 'circle' });
            expect(mockChain.run).toHaveBeenCalled();
        });

        it('Case 2: should toggle list (turn off) if current style matches clicked style', () => {
            // Mock: Active list and style in square
            useEditorState.mockImplementation(({ selector }) => {
                const ctx = {
                    editor: {
                        getAttributes: () => ({ listStyle: 'square' }),
                        isActive: () => true,
                    }
                };
                return selector(ctx);
            });

            render(<BulletSelector editor={mockEditor} />);

            fireEvent.click(screen.getByTitle('editor.toolbar.bulleted_list.bulleted_list'));
            // Click on the same style it already has
            fireEvent.click(screen.getByTitle('editor.toolbar.bulleted_list.squares'));

            expect(mockChain.toggleBulletList).toHaveBeenCalled();
            // Must not call updateAttributes because list is being desactivated
            expect(mockChain.updateAttributes).not.toHaveBeenCalled();
            expect(mockChain.run).toHaveBeenCalled();
        });

        it('Case 3: should only update attributes if list is active but style is different', () => {
            // Mock: List active (dots) but clicking on squares
            useEditorState.mockImplementation(({ selector }) => {
                const ctx = {
                    editor: {
                        getAttributes: () => ({ listStyle: 'default' }),
                        isActive: () => true,
                    }
                };
                return selector(ctx);
            });

            render(<BulletSelector editor={mockEditor} />);

            fireEvent.click(screen.getByTitle('editor.toolbar.bulleted_list.bulleted_list'));
            fireEvent.click(screen.getByTitle('editor.toolbar.bulleted_list.squares'));

            // Shouldn't do toggle (because is already a list), just change style
            expect(mockChain.toggleBulletList).not.toHaveBeenCalled();
            expect(mockChain.updateAttributes).toHaveBeenCalledWith('bulletList', { listStyle: 'square' });
            expect(mockChain.run).toHaveBeenCalled();
        });

        it('should show primary background color when list is active', () => {
            useEditorState.mockImplementation(({ selector }) => {
                const ctx = {
                    editor: {
                        getAttributes: () => ({ listStyle: 'default' }),
                        isActive: () => true, // Force list to be active
                    }
                };
                return selector(ctx);
            });

            render(<BulletSelector editor={mockEditor} />);

            const mainButton = screen.getByTitle('editor.toolbar.bulleted_list.bulleted_list');

            expect(mainButton).toHaveClass('bg-primary');
            expect(mainButton).not.toHaveClass('bg-main-bg');
        });
    });
});