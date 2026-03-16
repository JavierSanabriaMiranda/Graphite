import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ColorPicker from '../../../../src/components/menu_bar/colors/ColorPicker';
import { useEditorState } from '@tiptap/react';

vi.mock('@tiptap/react', async () => {
    const actual = await vi.importActual('@tiptap/react');
    return {
        ...actual,
        useEditorState: vi.fn(),
    };
});

describe('ColorPicker', () => {
    let mockEditor;

    beforeEach(() => {
        vi.clearAllMocks();

        // Creates a mock of editor that supports chain
        const chain = {
            focus: vi.fn(() => chain),
            setColor: vi.fn(() => chain),
            unsetColor: vi.fn(() => chain),
            run: vi.fn(() => chain),
        };

        mockEditor = {
            chain: vi.fn(() => chain),
            getAttributes: vi.fn(() => ({ color: '#ef4444' })),
        };

        // Simulates that current editor color is red
        useEditorState.mockImplementation(({ selector }) => selector({ editor: mockEditor }));
    });

    it('should return null if no editor is provided', () => {
        const { container } = render(<ColorPicker editor={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render the color indicator with the current color', () => {
        render(<ColorPicker editor={mockEditor} />);
        
        // Look for circle that indicates te color
        const indicator = screen.getByTitle('editor.toolbar.text_color');
        const colorCircle = indicator.querySelector('div');
        
        expect(colorCircle).toHaveStyle({ borderColor: '#ef4444' });
    });

    it('should open the menu when clicked', () => {
        render(<ColorPicker editor={mockEditor} />);
        
        const button = screen.getByTitle('editor.toolbar.text_color');
        fireEvent.click(button);

        // Must appear default option and presets
        expect(screen.getByTitle('common.default')).toBeInTheDocument();
        expect(screen.getByTitle('editor.toolbar.color.red')).toBeInTheDocument();
    });

    it('should call unsetColor and close menu when default is clicked', () => {
        render(<ColorPicker editor={mockEditor} />);
        
        fireEvent.click(screen.getByTitle('editor.toolbar.text_color'));
        fireEvent.click(screen.getByTitle('common.default'));

        expect(mockEditor.chain().focus().unsetColor).toHaveBeenCalled();
        expect(mockEditor.chain().focus().run).toHaveBeenCalled();
        // Menu must be closed
        expect(screen.queryByTitle('common.default')).not.toBeInTheDocument();
    });

    it('should set a preset color when a color circle is clicked', () => {
        render(<ColorPicker editor={mockEditor} />);
        
        fireEvent.click(screen.getByTitle('editor.toolbar.text_color'));
        
        // Click on blue color
        const blueButton = screen.getByTitle('editor.toolbar.color.blue');
        fireEvent.click(blueButton);

        expect(mockEditor.chain().focus().setColor).toHaveBeenCalledWith('#3b82f6');
    });

    it('should apply active styles to the current color preset', () => {
        // Configure state to be blue
        useEditorState.mockReturnValue('#3b82f6');
        
        render(<ColorPicker editor={mockEditor} />);
        fireEvent.click(screen.getByTitle('editor.toolbar.text_color'));

        const blueButton = screen.getByTitle('editor.toolbar.color.blue');
        const circle = blueButton.firstChild;
        
        // Check that has class "isActive" (ring and border-primary)
        expect(circle).toHaveClass('border-primary');
        expect(circle).toHaveClass('ring-1');
    });

    it('should handle custom color input change', () => {
        render(<ColorPicker editor={mockEditor} />);
        fireEvent.click(screen.getByTitle('editor.toolbar.text_color'));

        const colorInput = screen.getByShadowRoot ? screen.getByType('color') : document.querySelector('input[type="color"]');
        
        fireEvent.input(colorInput, { target: { value: '#ff00ff' } });

        expect(mockEditor.chain().focus().setColor).toHaveBeenCalledWith('#ff00ff');
    });
});