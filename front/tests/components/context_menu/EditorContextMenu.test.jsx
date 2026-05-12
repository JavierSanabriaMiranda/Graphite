import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import EditorContextMenu from '../../../src/components/context_menu/EditorContextMenu';

// Mock Floating UI to avoid issues with Portals and virtual positioning in JSDOM
vi.mock('@floating-ui/react', () => ({
    useFloating: () => ({
        refs: { setFloating: vi.fn(), setPositionReference: vi.fn() },
        floatingStyles: {},
        context: {}
    }),
    offset: vi.fn(),
    flip: vi.fn(),
    shift: vi.fn(),
    useDismiss: vi.fn(),
    useInteractions: () => ({ getFloatingProps: vi.fn(() => ({})) }),
    FloatingPortal: ({ children }) => <div>{children}</div>,
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

describe('EditorContextMenu Component', () => {
    const mockOnClose = vi.fn();

    // Mocking Tiptap editor and its chainable commands
    const mockEditor = {
        commands: {
            focus: vi.fn(),
            insertContent: vi.fn(),
        },
        chain: vi.fn(() => ({
            focus: vi.fn(() => ({
                insertContent: vi.fn(() => ({
                    run: vi.fn()
                }))
            }))
        }))
    };

    const defaultProps = {
        x: 100,
        y: 200,
        onClose: mockOnClose,
        editor: mockEditor
    };

    beforeEach(() => {
        vi.clearAllMocks();
        // Mock Clipboard API
        Object.assign(navigator, {
            clipboard: {
                readText: vi.fn().mockResolvedValue('clipboard content'),
            },
        });
        // Mock document.execCommand for legacy copy/cut
        document.execCommand = vi.fn();
    });

    it('should render all menu items correctly', () => {
        render(<EditorContextMenu {...defaultProps} />);

        expect(screen.getByText('editor.context_menu.copy')).toBeInTheDocument();
        expect(screen.getByText('editor.context_menu.cut')).toBeInTheDocument();
        expect(screen.getByText('editor.context_menu.paste')).toBeInTheDocument();
        expect(screen.getByText('editor.context_menu.add_content_block')).toBeInTheDocument();
    });

    it('should call copy command and close menu when Copy is clicked', () => {
        render(<EditorContextMenu {...defaultProps} />);

        fireEvent.click(screen.getByText('editor.context_menu.copy'));

        expect(mockEditor.commands.focus).toHaveBeenCalled();
        expect(document.execCommand).toHaveBeenCalledWith('copy');
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should read from clipboard and insert content when Paste is clicked', async () => {
        render(<EditorContextMenu {...defaultProps} />);

        fireEvent.click(screen.getByText('editor.context_menu.paste'));

        await waitFor(() => {
            expect(navigator.clipboard.readText).toHaveBeenCalled();
            expect(mockEditor.commands.insertContent).toHaveBeenCalledWith('clipboard content');
        });
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should trigger slash command when "Add content block" is clicked', () => {
        render(<EditorContextMenu {...defaultProps} />);

        fireEvent.click(screen.getByText('editor.context_menu.add_content_block'));

        // Verifying the Tiptap command chain for "/"
        expect(mockEditor.chain).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('should trigger note link suggestion when "Add link to note" is clicked', () => {
        render(<EditorContextMenu {...defaultProps} />);

        fireEvent.click(screen.getByText('editor.context_menu.add_link_to_note'));

        // Verifying the Tiptap command chain for "[["
        expect(mockEditor.chain).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });
});