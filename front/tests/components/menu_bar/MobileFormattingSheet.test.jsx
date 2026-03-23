import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MobileFormattingSheet from '../../../src/components/menu_bar/MobileFormattingSheet';
import { useEditorState } from '@tiptap/react';
import { useNote } from '../../../src/components/context/NoteContext';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('@tiptap/react', () => ({
    useEditorState: vi.fn(),
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../../src/components/util/DropdownArrow', () => ({
    default: ({ menuOpen }) => <div data-testid="dropdown-arrow">{menuOpen ? 'open' : 'closed'}</div>,
}));

describe('MobileFormattingSheet Component', () => {
    let mockEditor;
    const mockCreateSubnote = vi.fn();
    const mockSelectNote = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        // Tiptap editor mock
        const chain = {};
        chain.focus = vi.fn(() => chain);
        chain.toggleBold = vi.fn(() => chain);
        chain.toggleItalic = vi.fn(() => chain);
        chain.toggleUnderline = vi.fn(() => chain);
        chain.toggleStrike = vi.fn(() => chain);
        chain.toggleCode = vi.fn(() => chain);
        chain.toggleHeading = vi.fn(() => chain);
        chain.toggleBlockquote = vi.fn(() => chain);
        chain.toggleCodeBlock = vi.fn(() => chain);
        chain.toggleCallout = vi.fn(() => chain);
        chain.insertPageBlock = vi.fn(() => chain);
        chain.toggleBulletList = vi.fn(() => chain);
        chain.toggleOrderedList = vi.fn(() => chain);
        chain.toggleTaskList = vi.fn(() => chain);
        chain.setToggle = vi.fn(() => chain);
        chain.unsetToggle = vi.fn(() => chain);
        chain.run = vi.fn();

        mockEditor = {
            chain: vi.fn(() => chain),
            isActive: vi.fn(() => false),
        };

        // Editor state mock
        useEditorState.mockReturnValue({
            isBold: false,
            isItalic: false,
            isUnderline: false,
            isStrike: false,
            isCode: false,
            currentTextType: 'paragraph',
        });

        useNote.mockReturnValue({
            createSubnote: mockCreateSubnote,
            selectNote: mockSelectNote,
        });

        // visualViewport mock
        global.visualViewport = {
            height: 800,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        };
        global.innerHeight = 800;
    });

    it('should return null if no editor is provided', () => {
        const { container } = render(<MobileFormattingSheet editor={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders the quick access bar by default', () => {
        render(<MobileFormattingSheet editor={mockEditor} />);
        // Verify basic buttons on bar
        expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
    });

    it('triggers editor commands on quick access button clicks', () => {
        render(<MobileFormattingSheet editor={mockEditor} />);

        fireEvent.click(screen.getByRole('button', { name: /bold/i }));

        expect(mockEditor.chain).toHaveBeenCalled();
        expect(mockEditor.chain().focus().toggleBold).toHaveBeenCalled();
        expect(mockEditor.chain().run).toHaveBeenCalled();
    });

    it('toggles the expanded menu when the dropdown button is clicked', () => {
        render(<MobileFormattingSheet editor={mockEditor} />);

        const toggleBtn = screen.getByTestId('dropdown-arrow').parentElement;

        expect(screen.queryByText('editor.toolbar.tools')).not.toBeInTheDocument();

        fireEvent.click(toggleBtn);

        // Now should be visible
        expect(screen.getByText('editor.toolbar.tools')).toBeInTheDocument();
    });

    it('executes a command and closes the menu when a grid item is clicked', () => {
        render(<MobileFormattingSheet editor={mockEditor} />);

        // Open menu
        fireEvent.click(screen.getByTestId('dropdown-arrow').parentElement);

        // Click on H1
        const h1Btn = screen.getByText('editor.slash.h1.title');
        fireEvent.click(h1Btn);

        expect(mockEditor.chain().focus().toggleHeading).toHaveBeenCalledWith({ level: 1 });

        // Menu should close after the action
        expect(screen.queryByText('editor.toolbar.tools')).not.toBeInTheDocument();
    });

    it('handles the "Page" block creation correctly', async () => {
        const fakeNote = { note_id: 'new-123' };
        mockCreateSubnote.mockResolvedValue(fakeNote);

        render(<MobileFormattingSheet editor={mockEditor} />);
        fireEvent.click(screen.getByTestId('dropdown-arrow').parentElement);

        const pageBtn = screen.getByText('editor.slash.page.title');

        await act(async () => {
            fireEvent.click(pageBtn);
        });

        expect(mockCreateSubnote).toHaveBeenCalled();
        expect(mockEditor.chain().insertPageBlock).toHaveBeenCalledWith('new-123');
        expect(mockSelectNote).toHaveBeenCalledWith(fakeNote);
    });

    it('applies active styling when formatting is active', () => {
        // Simulate bold is active
        useEditorState.mockReturnValue({
            isBold: true,
        });

        render(<MobileFormattingSheet editor={mockEditor} />);

        const boldBtn = screen.getByRole('button', { name: /bold/i });
        // Verify it has active class
        expect(boldBtn.className).toContain('bg-primary/10');
    });

    it('updates bottom offset on visual viewport resize', () => {
        render(<MobileFormattingSheet editor={mockEditor} />);

        // Get callback function from listener
        const resizeCallback = global.visualViewport.addEventListener.mock.calls.find(
            call => call[0] === 'resize'
        )[1];

        // Simulate keyboard opened
        global.visualViewport.height = 400;
        global.innerHeight = 800;

        act(() => {
            resizeCallback();
        });

        const quickAccessBar = screen.getByRole('button', { name: /bold/i }).parentElement;
        // Bottom padding has to change
        expect(quickAccessBar.style.paddingBottom).toBe('40px');
    });
});