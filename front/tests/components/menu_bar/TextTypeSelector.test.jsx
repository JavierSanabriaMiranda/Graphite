import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TextTypeSelector from '../../../src/components/menu_bar/TextTypeSelector';
import { useNote } from '../../../src/components/context/NoteContext';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../../src/components/util/SearchablePicker', () => ({
    default: ({ items, onSelect, buttonLabel, value }) => (
        <div data-testid="mock-picker">
            <span data-testid="current-label">{buttonLabel}</span>
            <div data-testid="current-value">{value}</div>
            {items.map((item) => (
                <button key={item.value} onClick={() => onSelect(item.value)}>
                    {item.label}
                </button>
            ))}
        </div>
    ),
}));

describe('TextTypeSelector Component', () => {
    let mockEditor;
    let mockChain;
    let mockNoteContext;

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup Tiptap Chain Mock
        mockChain = {
            focus: vi.fn().mockReturnThis(),
            setParagraph: vi.fn().mockReturnThis(),
            toggleHeading: vi.fn().mockReturnThis(),
            toggleBlockquote: vi.fn().mockReturnThis(),
            toggleCallout: vi.fn().mockReturnThis(),
            toggleCodeBlock: vi.fn().mockReturnThis(),
            insertPageBlock: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnThis(),
        };

        mockEditor = {
            chain: vi.fn(() => mockChain),
        };

        // Setup Note Context Mock
        mockNoteContext = {
            selectNote: vi.fn(),
            createSubnote: vi.fn(),
        };
        useNote.mockReturnValue(mockNoteContext);
    });

    it('should render the correct label based on state', () => {
        const state = { currentTextType: 'h1' };
        render(<TextTypeSelector editor={mockEditor} state={state} />);

        // Should show the translated key for Heading 1
        expect(screen.getByTestId('current-label')).toHaveTextContent('editor.toolbar.block_type.h1');
    });

    it('should call setParagraph when "p" is selected', () => {
        render(<TextTypeSelector editor={mockEditor} state={{ currentTextType: 'p' }} />);

        const optionButton = screen.getAllByRole('button').find(btn =>
            btn.textContent === 'editor.toolbar.block_type.normal_text'
        );

        fireEvent.click(optionButton);

        expect(mockChain.setParagraph).toHaveBeenCalled();
        expect(mockChain.run).toHaveBeenCalled();
    });

    it('should call toggleHeading with correct level when "h2" is selected', () => {
        render(<TextTypeSelector editor={mockEditor} state={{ currentTextType: 'p' }} />);

        fireEvent.click(screen.getByText('editor.toolbar.block_type.h2'));

        expect(mockChain.toggleHeading).toHaveBeenCalledWith({ level: 2 });
        expect(mockChain.run).toHaveBeenCalled();
    });

    it('should call toggleBlockquote when "quote" is selected', () => {
        render(<TextTypeSelector editor={mockEditor} state={{ currentTextType: 'p' }} />);

        fireEvent.click(screen.getByText('editor.toolbar.block_type.quote'));

        expect(mockChain.toggleBlockquote).toHaveBeenCalled();
    });

    it('should call toggleCallout when "callout" is selected', () => {
        render(<TextTypeSelector editor={mockEditor} state={{ currentTextType: 'p' }} />);

        fireEvent.click(screen.getByText('editor.toolbar.block_type.callout'));

        expect(mockChain.toggleCallout).toHaveBeenCalled();
    });

    it('should handle "page" creation and insertion correctly', async () => {
        const newNote = { note_id: 'new-123', title: 'New Subnote' };
        mockNoteContext.createSubnote.mockResolvedValue(newNote);

        render(<TextTypeSelector editor={mockEditor} state={{ currentTextType: 'p' }} />);

        // Selecting "page" involves async logic
        await act(async () => {
            fireEvent.click(screen.getByText('editor.toolbar.block_type.page'));
        });

        expect(mockNoteContext.createSubnote).toHaveBeenCalled();
        expect(mockChain.insertPageBlock).toHaveBeenCalledWith('new-123');
        expect(mockNoteContext.selectNote).toHaveBeenCalledWith(newNote);
        expect(mockChain.run).toHaveBeenCalled();
    });

    it('should not insert page block if createSubnote fails or returns null', async () => {
        mockNoteContext.createSubnote.mockResolvedValue(null);

        render(<TextTypeSelector editor={mockEditor} state={{ currentTextType: 'p' }} />);

        await act(async () => {
            fireEvent.click(screen.getByText('editor.toolbar.block_type.page'));
        });

        expect(mockChain.insertPageBlock).not.toHaveBeenCalled();
        expect(mockNoteContext.selectNote).not.toHaveBeenCalled();
    });
});