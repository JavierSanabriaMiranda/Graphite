import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HighlightPicker from '../../../src/components/colors/HighlightPicker';
import { useEditorState } from '@tiptap/react';

vi.mock('@tiptap/react', async () => {
    const actual = await vi.importActual('@tiptap/react');
    return {
        ...actual,
        useEditorState: vi.fn(),
    };
});

describe('HighlightPicker', () => {
    let mockEditor;

    beforeEach(() => {
        vi.clearAllMocks();

        // Creates a mock of editor that supports chain
        const chain = {
            focus: vi.fn(() => chain),
            setHighlight: vi.fn(() => chain),
            unsetHighlight: vi.fn(() => chain),
            run: vi.fn(() => chain),
        };

        mockEditor = {
            chain: vi.fn(() => chain),
            getAttributes: vi.fn(() => ({ color: '#eab308' })),
        };

        // Simulates that current highlighting is yellow
        useEditorState.mockImplementation(({ selector }) => selector({ editor: mockEditor }));
    });

    it('should return null if no editor is provided', () => {
        const { container } = render(<HighlightPicker editor={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render the highlight indicator with the current color', () => {
        render(<HighlightPicker editor={mockEditor} />);
        
        const button = screen.getByTitle('editor.toolbar.highlight_color');
        const highlightIndicator = button.querySelector('div');
        
        // Border must be current color
        expect(highlightIndicator).toHaveStyle({ borderColor: '#eab308' });
        // Background must have the current color with opacity 0.6
        const background = highlightIndicator.firstChild;
        expect(background).toHaveStyle({ backgroundColor: '#eab308' });
    });

    it('should show the "A" letter only if a color is active', () => {
        // Case with color
        const { rerender } = render(<HighlightPicker editor={mockEditor} />);
        expect(screen.getByText('A')).toBeInTheDocument();

        // Case without color (null)
        useEditorState.mockReturnValue(null);
        rerender(<HighlightPicker editor={mockEditor} />);
        expect(screen.queryByText('A')).not.toBeInTheDocument();
    });

    it('should call unsetHighlight and close menu when reset button is clicked', () => {
        render(<HighlightPicker editor={mockEditor} />);
        
        fireEvent.click(screen.getByTitle('editor.toolbar.highlight_color'));
        
        fireEvent.click(screen.getByTitle('common.default'));

        expect(mockEditor.chain().focus().unsetHighlight).toHaveBeenCalled();
        expect(mockEditor.chain().focus().run).toHaveBeenCalled();
        // Menu closed
        expect(screen.queryByTitle('common.default')).not.toBeInTheDocument();
    });

    it('should apply preset highlight when a color option is clicked', () => {
        render(<HighlightPicker editor={mockEditor} />);
        
        fireEvent.click(screen.getByTitle('editor.toolbar.highlight_color'));
        
        // Click on red preset
        const redButton = screen.getByTitle('editor.toolbar.color.red');
        fireEvent.click(redButton);

        expect(mockEditor.chain().focus().setHighlight).toHaveBeenCalledWith({ color: '#ef4444' });
    });

    it('should apply active styles to the selected preset', () => {
        useEditorState.mockReturnValue('#22c55e'); // Green
        
        render(<HighlightPicker editor={mockEditor} />);
        fireEvent.click(screen.getByTitle('editor.toolbar.highlight_color'));

        const greenButton = screen.getByTitle('editor.toolbar.color.green');
        const circleContainer = greenButton.firstChild;
        
        // isActive class: ring-2, scale-105, etc.
        expect(circleContainer).toHaveClass('ring-2');
        expect(circleContainer).toHaveClass('scale-105');
    });

    it('should handle custom color input for highlight', () => {
        render(<HighlightPicker editor={mockEditor} />);
        fireEvent.click(screen.getByTitle('editor.toolbar.highlight_color'));

        // Get red input
        const colorInput = document.querySelector('input[type="color"]');
        
        fireEvent.input(colorInput, { target: { value: '#00ffff' } });

        expect(mockEditor.chain().focus().setHighlight).toHaveBeenCalledWith({ color: '#00ffff' });
    });

    it('should stop propagation when clicking inside the menu', () => {
        render(<HighlightPicker editor={mockEditor} />);
        fireEvent.click(screen.getByTitle('editor.toolbar.highlight_color'));

        const menu = screen.getByTitle('common.default').closest('div').parentElement;
        const stopPropagationSpy = vi.fn();
        
        fireEvent.click(menu, { stopPropagation: stopPropagationSpy });
        
        // Verifies that menu doesn't close by accident when clicking on container
        expect(screen.getByTitle('common.default')).toBeInTheDocument();
    });
});