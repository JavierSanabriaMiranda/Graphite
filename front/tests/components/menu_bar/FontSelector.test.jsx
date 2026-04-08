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

        mockChain = {
            focus: vi.fn().mockReturnThis(),
            setFontFamily: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnThis(),
        };

        mockEditor = {
            chain: vi.fn(() => mockChain),
        };

        mockState = {
            currentFont: 'Inter',
        };
    });

    /**
     * Test that the picker displays the correct font label and 
     * applies the font-stack (including emoji support) to the preview.
     */
    it('should render the picker with the current font and emoji stack', () => {
        render(<FontSelector editor={mockEditor} state={mockState} />);

        expect(screen.getByTestId('mock-picker')).toBeInTheDocument();
        expect(screen.getByTestId('picker-value')).toHaveTextContent('Inter');

        const label = screen.getByTestId('picker-button-label');
        expect(label).toHaveTextContent('Inter');
        
        // Match the actual font stack logic: "Font, var(--font-emoji)"
        expect(label.firstChild).toHaveStyle({
            fontFamily: 'Inter, var(--font-emoji)'
        });
    });

    /**
     * Test that selecting a font triggers the editor command 
     * with the combined font + emoji stack.
     */
    it('should handle font selection and execute editor commands with emoji stack', () => {
        render(<FontSelector editor={mockEditor} state={mockState} />);

        const arialButton = screen.getByText('Arial');
        fireEvent.click(arialButton);

        expect(mockEditor.chain).toHaveBeenCalled();
        expect(mockChain.focus).toHaveBeenCalled();
        // Verify it includes the emoji variable
        expect(mockChain.setFontFamily).toHaveBeenCalledWith('Arial, var(--font-emoji)');
        expect(mockChain.run).toHaveBeenCalled();
    });

    /**
     * Test fallback for fonts not present in the predefined list
     */
    it('should fallback correctly if the current font is not in the FONTS list', () => {
        const customState = { currentFont: 'NonExistentFont' };
        render(<FontSelector editor={mockEditor} state={customState} />);

        const label = screen.getByTestId('picker-button-label');
        expect(label).toHaveTextContent('NonExistentFont');
        expect(label.firstChild).toHaveStyle({
            fontFamily: 'NonExistentFont, var(--font-emoji)'
        });
    });

    /**
     * Test default behavior when no font is provided in the state
     */
    it('should fallback to "Inter" if state.currentFont is null/undefined', () => {
        const emptyState = { currentFont: null };
        render(<FontSelector editor={mockEditor} state={emptyState} />);

        const label = screen.getByTestId('picker-button-label');
        expect(label).toHaveTextContent('Inter');
    });

    /**
     * Verify that the data passed to the generic SearchablePicker is correct
     */
    it('should pass correctly formatted items to the SearchablePicker', () => {
        render(<FontSelector editor={mockEditor} state={mockState} />);
        expect(screen.getByText('Courier New')).toBeInTheDocument();
    });

    /**
     * Test i18n integration for the search placeholder
     */
    it('should use translated placeholder from i18next', () => {
        render(<FontSelector editor={mockEditor} state={mockState} />);
        expect(screen.getByTestId('picker-placeholder')).toHaveTextContent('editor.toolbar.text_font.search');
    });
});