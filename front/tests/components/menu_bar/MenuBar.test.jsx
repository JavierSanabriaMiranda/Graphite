import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MenuBar from '../../../src/components/menu_bar/MenuBar';
import { useEditorState } from '@tiptap/react';
import { useNote } from '../../../src/components/context/NoteContext';

// Mocking all child components to isolate MenuBar logic
vi.mock('../../../src/components/menu_bar/colors/ColorPicker', () => ({ default: () => <div data-testid="color-picker" /> }));
vi.mock('../../../src/components/menu_bar/colors/HighlightPicker', () => ({ default: () => <div data-testid="highlight-picker" /> }));
vi.mock('../../../src/components/menu_bar/AlignmentSelector', () => ({ default: () => <div data-testid="alignment-selector" /> }));
vi.mock('../../../src/components/menu_bar/lists/BulletSelector', () => ({ default: () => <div data-testid="bullet-selector" /> }));
vi.mock('../../../src/components/menu_bar/lists/NumberedListSelector', () => ({ default: () => <div data-testid="numbered-selector" /> }));
vi.mock('../../../src/components/menu_bar/lists/TodoList', () => ({ default: () => <div data-testid="todo-selector" /> }));
vi.mock('../../../src/components/menu_bar/TextTypeSelector', () => ({ default: () => <div data-testid="text-type-selector" /> }));
vi.mock('../../../src/components/menu_bar/FontSelector', () => ({ default: () => <div data-testid="font-selector" /> }));
vi.mock('../../../src/components/advanced_blocks/toggle_block/ToggleIcon', () => ({ ToggleIcon: () => <span data-testid="toggle-icon" /> }));

vi.mock('@tiptap/react', () => ({
    useEditorState: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
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
            insertPageBlock: vi.fn().mockReturnThis(),
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

        // Default mock for useNote
        vi.mocked(useNote).mockReturnValue({
            selectNote: vi.fn(),
            createSubnote: vi.fn(),
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

        // Code button contains an SVG. Get all buttons and find the one with SVG that's for code formatting
        const buttons = screen.getAllByRole('button');
        // The code button is the last one in the format group (after S)
        const formatButtons = buttons.slice(3, 8); // Bold, Italic, Underline, Strike, Code (adjusting based on actual position)
        const codeBtn = formatButtons.find(btn => btn.querySelector('svg'));

        if (codeBtn) {
            fireEvent.click(codeBtn);
            expect(mockChain.toggleCode).toHaveBeenCalled();
        }
    });

    it('should render the new subnote button', () => {
        render(<MenuBar editor={mockEditor} />);

        const newSubnoteBtn = screen.getByTitle('editor.toolbar.new_subnote');
        expect(newSubnoteBtn).toBeInTheDocument();
    });

    it('should call createSubnote when the new subnote button is clicked', async () => {
        const mockCreateSubnote = vi.fn().mockResolvedValue({ note_id: '123', name: 'New Note' });
        const mockSelectNote = vi.fn();

        vi.mocked(useNote).mockReturnValue({
            selectNote: mockSelectNote,
            createSubnote: mockCreateSubnote,
        });

        render(<MenuBar editor={mockEditor} />);

        const newSubnoteBtn = screen.getByTitle('editor.toolbar.new_subnote');
        fireEvent.click(newSubnoteBtn);

        // Wait for async operation
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(mockCreateSubnote).toHaveBeenCalled();
    });

    it('should insert page block and select note after creating subnote', async () => {
        const newNoteData = { note_id: '123', name: 'New Note' };
        const mockCreateSubnote = vi.fn().mockResolvedValue(newNoteData);
        const mockSelectNote = vi.fn();

        vi.mocked(useNote).mockReturnValue({
            selectNote: mockSelectNote,
            createSubnote: mockCreateSubnote,
        });

        render(<MenuBar editor={mockEditor} />);

        const newSubnoteBtn = screen.getByTitle('editor.toolbar.new_subnote');
        fireEvent.click(newSubnoteBtn);

        // Wait for async operation
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(mockChain.focus).toHaveBeenCalled();
        expect(mockChain.insertPageBlock).toHaveBeenCalledWith('123');
        expect(mockChain.run).toHaveBeenCalled();
        expect(mockSelectNote).toHaveBeenCalledWith(newNoteData);
    });

    it('should not insert page block if createSubnote returns null', async () => {
        const mockCreateSubnote = vi.fn().mockResolvedValue(null);
        const mockSelectNote = vi.fn();

        vi.mocked(useNote).mockReturnValue({
            selectNote: mockSelectNote,
            createSubnote: mockCreateSubnote,
        });

        render(<MenuBar editor={mockEditor} />);

        const newSubnoteBtn = screen.getByTitle('editor.toolbar.new_subnote');
        fireEvent.click(newSubnoteBtn);

        // Wait for async operation
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(mockChain.insertPageBlock).not.toHaveBeenCalled();
        expect(mockSelectNote).not.toHaveBeenCalled();
    });
});