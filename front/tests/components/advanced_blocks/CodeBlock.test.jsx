import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CodeBlockComponent, CustomCodeBlock } from '../../../src/components/advanced_blocks/CodeBlockComponent';

// Clipboard mock
Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn(() => Promise.resolve()),
    },
});

vi.mock('@tiptap/react', async () => {
    const actual = await vi.importActual('@tiptap/react');
    return {
        ...actual,
        NodeViewWrapper: ({ children, className }) => <div className={className} data-testid="wrapper">{children}</div>,
        NodeViewContent: ({ className, as }) => <div className={className} data-testid="content" />,
    };
});

const mockShowToast = vi.fn();

// Toast mock
vi.mock('../../../src/components/context/ToastContext', () => ({
    useToast: () => ({ showToast: mockShowToast }),
}));

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('CodeBlockComponent', () => {
    let mockProps;

    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubGlobal('navigator', {
            clipboard: {
                writeText: vi.fn().mockImplementation(() => Promise.resolve()),
            },
        });

        mockProps = {
            node: {
                attrs: { language: 'javascript' },
                textContent: 'console.log("hello")'
            },
            updateAttributes: vi.fn(),
            extension: {
                options: { lowlight: { listLanguages: () => ['javascript', 'python'] } }
            },
            editor: { commands: { focus: vi.fn() } },
            t: (key) => key
        };
    });

    it('should render the correct language label', () => {
        render(<CodeBlockComponent {...mockProps} />);

        // Get button to open menu
        const pickerButton = screen.getByRole('button', { name: /javascript/i });
        expect(pickerButton).toBeInTheDocument();
    });

    it('should show "Auto-detect" if no language is set', () => {
        mockProps.node.attrs.language = null;
        render(<CodeBlockComponent {...mockProps} />);

        const pickerButton = screen.getByRole('button', {
            name: (content) => content.includes('auto_detect')
        });
        expect(pickerButton).toBeInTheDocument();
    });

    it('should copy code to clipboard and show toast', async () => {
        render(<CodeBlockComponent {...mockProps} />);

        const copyButton = screen.getByTitle(/copy_content/i);

        await act(async () => {
            fireEvent.click(copyButton);
        });

        // Verify native API was called
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('console.log("hello")');

        // Wait for .then() to trigger toast
        await waitFor(() => {
            expect(mockShowToast).toHaveBeenCalledWith(expect.any(String), "success");
        }, { timeout: 1000 });
    });

    it('should update language attribute when a new language is selected', async () => {
        render(<CodeBlockComponent {...mockProps} />);

        // Open menu
        const trigger = screen.getByRole('button', { name: /javascript/i });
        fireEvent.click(trigger);

        // Get python option on list
        const pythonOption = await screen.findByRole('button', { name: /python/i });
        fireEvent.click(pythonOption);

        expect(mockProps.updateAttributes).toHaveBeenCalledWith({ language: 'python' });
    });
});

describe('CustomCodeBlock Extension', () => {
    it('should have a high priority', () => {
        expect(CustomCodeBlock.config.priority).toBe(1000);
    });

    it('should render correct HTML structure', () => {
        const node = { attrs: { language: 'js' } };

        // Simulates this object that tiptap would have internally
        const mockContext = {
            options: {
                HTMLAttributes: {}
            }
        };

        const html = CustomCodeBlock.config.renderHTML.call(mockContext, {
            node,
            HTMLAttributes: { class: 'test' }
        });

        expect(html[0]).toBe('pre');
        expect(html[2][0]).toBe('code');
        expect(html[2][1].class).toBe('language-js');
    });

    describe('Keyboard Shortcuts', () => {
        let mockEditor;

        beforeEach(() => {
            mockEditor = {
                isActive: vi.fn(),
                // Force command to return true
                commands: {
                    insertContent: vi.fn().mockReturnValue(true)
                },
                state: {
                    selection: {
                        $from: {
                            nodeBefore: { text: '    ' }
                        }
                    }
                }
            };
        });

        it('should handle Tab key inside code block', () => {
            mockEditor.isActive.mockReturnValue(true);
            const shortcuts = CustomCodeBlock.config.addKeyboardShortcuts.call({ editor: mockEditor });

            const result = shortcuts.Tab();
            expect(result).toBe(true);
            expect(mockEditor.commands.insertContent).toHaveBeenCalledWith('\t');
        });

        it('should maintain indentation on Enter', () => {
            mockEditor.isActive.mockReturnValue(true);
            const shortcuts = CustomCodeBlock.config.addKeyboardShortcuts.call({ editor: mockEditor });

            const result = shortcuts.Enter();
            expect(result).toBe(true);
            expect(mockEditor.commands.insertContent).toHaveBeenCalledWith(expect.stringContaining('\n'));
        });
    });
});