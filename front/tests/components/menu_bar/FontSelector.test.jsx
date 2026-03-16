import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FontSelector from '../../../src/components/menu_bar/FontSelector';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

vi.mock('../../../src/components/util/SearchablePicker', () => ({
    default: ({ items, value, onSelect, buttonLabel, placeholder }) => (
        <div data-testid="mock-picker">
            <div data-testid="picker-value">{value}</div>
            <div data-testid="picker-placeholder">{placeholder}</div>
            <div data-testid="picker-button-label">{buttonLabel}</div>
            {items.map((item) => (
                <button
                    key={item.value}
                    onClick={() => onSelect(item.value)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    ),
}));

describe('FontSelector Component', () => {
    let mockEditor;
    let mockChain;
    let mockState;

    beforeEach(() => {
        vi.clearAllMocks();

        // Mock Tiptap command chain: .chain().focus().setFontFamily(id).run()
        mockChain = {
            focus: vi.fn().mockReturnThis(),
            setFontFamily: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnThis(),
        };

        mockEditor = {
            chain: vi.fn(() => mockChain),
        };

        // Default state
        mockState = {
            currentFont: 'Inter',
        };
    });

    it('should render the picker with the current font from state', () => {
        render(<FontSelector editor={mockEditor} state={mockState} />);

        expect(screen.getByTestId('mock-picker')).toBeInTheDocument();
        expect(screen.getByTestId('picker-value')).toHaveTextContent('Inter');

        const label = screen.getByTestId('picker-button-label');
        expect(label).toHaveTextContent('Inter');
        // Verify inline style is applied for preview
        expect(label.firstChild).toHaveStyle('font-family: Inter');
    });

    it('should handle font selection and execute editor commands', () => {
        render(<FontSelector editor={mockEditor} state={mockState} />);

        // Click a font option (e.g., Arial) inside our mocked picker
        const arialButton = screen.getByText('Arial');
        fireEvent.click(arialButton);

        // Verify the Tiptap chain execution
        expect(mockEditor.chain).toHaveBeenCalled();
        expect(mockChain.focus).toHaveBeenCalled();
        expect(mockChain.setFontFamily).toHaveBeenCalledWith('Arial');
        expect(mockChain.run).toHaveBeenCalled();
    });

    it('should fallback correctly if the current font is not in the FONTS list', () => {
        const customState = { currentFont: 'NonExistentFont' };
        render(<FontSelector editor={mockEditor} state={customState} />);

        const label = screen.getByTestId('picker-button-label');
        expect(label).toHaveTextContent('NonExistentFont');
        expect(label.firstChild).toHaveStyle('font-family: NonExistentFont');
    });

    it('should fallback to "Inter" if state.currentFont is null/undefined', () => {
        const emptyState = { currentFont: null };
        render(<FontSelector editor={mockEditor} state={emptyState} />);

        const label = screen.getByTestId('picker-button-label');
        expect(label).toHaveTextContent('Inter');
    });

    it('should pass correctly formatted items to the SearchablePicker', () => {
        render(<FontSelector editor={mockEditor} state={mockState} />);

        // Check if one of the constant fonts (Courier New) is present in the list
        expect(screen.getByText('Courier New')).toBeInTheDocument();
    });

    it('should use translated placeholder or default string', () => {
        render(<FontSelector editor={mockEditor} state={mockState} />);

        // Our mock i18n returns the key
        expect(screen.getByTestId('picker-placeholder')).toHaveTextContent('editor.toolbar.text_font.search');
    });
});