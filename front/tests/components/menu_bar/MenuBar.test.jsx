import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MenuBar from '../../../src/components/menu_bar/MenuBar';
import { useEditorState } from '@tiptap/react';

// Mocking all child components to isolate MenuBar logic
vi.mock('../../../src/components/menu_bar/colors/ColorPicker', () => ({ default: () => <div data-testid="color-picker" /> }));
vi.mock('../../../src/components/menu_bar/colors/HighlightPicker', () => ({ default: () => <div data-testid="highlight-picker" /> }));
vi.mock('../../../src/components/menu_bar/AlignmentSelector', () => ({ default: () => <div data-testid="alignment-selector" /> }));
vi.mock('../../../src/components/menu_bar/lists/BulletSelector', () => ({ default: () => <div data-testid="bullet-selector" /> }));
vi.mock('../../../src/components/menu_bar/lists/NumberedListSelector', () => ({ default: () => <div data-testid="numbered-selector" /> }));
vi.mock('../../../src/components/menu_bar/lists/TodoList', () => ({ default: () => <div data-testid="todo-selector" /> }));
vi.mock('../../../src/components/menu_bar/TextTypeSelector', () => ({ default: () => <div data-testid="text-type-selector" /> }));
vi.mock('../../../src/components/menu_bar/FontSelector', () => ({ default: () => <div data-testid="font-selector" /> }));
vi.mock('../../../src/components//advanced_blocks/toggle_block/ToggleIcon', () => ({ ToggleIcon: () => <span data-testid="toggle-icon" /> }));

vi.mock('@tiptap/react', () => ({
    useEditorState: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

describe('MenuBar Component', () => {
    let mockEditor;
    let mockChain;

    beforeEach(() => {
        vi.clearAllMocks();

        // Mocking Tiptap's command chain
        mockChain = {
            focus: vi.fn().mockReturnThis(),
            toggleBold: vi.fn().mockReturnThis(),
            toggleItalic: vi.fn().mockReturnThis(),
            toggleUnderline: vi.fn().mockReturnThis(),
            toggleStrike: vi.fn().mockReturnThis(),
            toggleCode: vi.fn().mockReturnThis(),
            setToggle: vi.fn().mockReturnThis(),
            unsetToggle: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnThis(),
        };

        mockEditor = {
            chain: vi.fn(() => mockChain),
        };

        // Default state returned by the selector
        useEditorState.mockReturnValue({
            isBold: false,
            isItalic: false,
            isUnderline: false,
            isStrike: false,
            isCode: false,
            isToggle: false,
        });
    });

    it('should return null if editor is not provided', () => {
        const { container } = render(<MenuBar editor={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render all tool sections and children', () => {
        render(<MenuBar editor={mockEditor} />);

        expect(screen.getByTestId('text-type-selector')).toBeInTheDocument();
        expect(screen.getByTestId('font-selector')).toBeInTheDocument();
        expect(screen.getByTestId('color-picker')).toBeInTheDocument();
        expect(screen.getByTestId('alignment-selector')).toBeInTheDocument();
        expect(screen.getByTestId('todo-selector')).toBeInTheDocument();
    });

    it('should call toggleBold command when Bold button is clicked', () => {
        render(<MenuBar editor={mockEditor} />);

        const boldBtn = screen.getByText('B');
        fireEvent.click(boldBtn);

        expect(mockChain.toggleBold).toHaveBeenCalled();
        expect(mockChain.run).toHaveBeenCalled();
    });

    it('should apply active classes when a format is active', () => {
        // Configure mocks before render
        vi.mocked(useEditorState).mockReturnValue({
            isBold: true,
            isItalic: false,
            isUnderline: false,
            isStrike: false,
            isCode: false,
            isToggle: false,
        });

        render(<MenuBar editor={mockEditor} />);

        // Look for bold button
        const boldBtn = screen.getByText('B').closest('button');

        // Verify that has active class
        expect(boldBtn.className).toContain('bg-primary');
    });

    it('should call setToggle when toggle button is clicked and state is inactive', () => {
        useEditorState.mockReturnValue({ isToggle: false });
        render(<MenuBar editor={mockEditor} />);

        const toggleBtn = screen.getByTitle('editor.toolbar.toggle_block');
        fireEvent.click(toggleBtn);

        expect(mockChain.setToggle).toHaveBeenCalled();
        expect(mockChain.run).toHaveBeenCalled();
    });

    it('should call unsetToggle when toggle button is clicked and state is active', () => {
        useEditorState.mockReturnValue({ isToggle: true });
        render(<MenuBar editor={mockEditor} />);

        const toggleBtn = screen.getByTitle('editor.toolbar.toggle_block');
        fireEvent.click(toggleBtn);

        expect(mockChain.unsetToggle).toHaveBeenCalled();
        expect(mockChain.run).toHaveBeenCalled();
    });

    it('should handle all basic formatting buttons (Italic, Underline, Strike, Code)', () => {
        render(<MenuBar editor={mockEditor} />);

        fireEvent.click(screen.getByText('I').closest('button'));
        expect(mockChain.toggleItalic).toHaveBeenCalled();

        fireEvent.click(screen.getByText('U').closest('button'));
        expect(mockChain.toggleUnderline).toHaveBeenCalled();

        fireEvent.click(screen.getByText('S').closest('button'));
        expect(mockChain.toggleStrike).toHaveBeenCalled();

        // As codeblock doesn't have text, look for button that contains an SVG
        const buttons = screen.getAllByRole('button');
        const codeBtn = buttons.find(btn => btn.querySelector('svg') && !btn.title);

        fireEvent.click(codeBtn);
        expect(mockChain.toggleCode).toHaveBeenCalled();
    });
});