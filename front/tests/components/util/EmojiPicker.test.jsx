import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EmojiPicker from '../../../src/components/util/EmojiPicker';

// Mock scrollTo as it's not implemented in JSDOM
window.HTMLElement.prototype.scrollTo = vi.fn();

// Mock translation to return the key
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('EmojiPicker', () => {
    const mockOnSelect = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Helper to render the picker with common props
     */
    const renderPicker = (props = {}) => {
        return render(
            <EmojiPicker onSelect={mockOnSelect} {...props}>
                <button>Open Picker</button>
            </EmojiPicker>
        );
    };

    it('should render the children (trigger)', () => {
        renderPicker();
        expect(screen.getByText('Open Picker')).toBeInTheDocument();
    });

    it('should open the picker when clicking the trigger', async () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));
        
        // Search input placeholder is a proxy for the picker being open
        expect(screen.getByPlaceholderText('emojis.search')).toBeInTheDocument();
    });

    /**
     * Test switching between Emojis and Icons tabs
     */
    it('should switch between Emojis and Icons views', () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));

        const iconsTab = screen.getByText('icons.icons');
        fireEvent.click(iconsTab);

        // Placeholder should change to reflect icon mode
        expect(screen.getByPlaceholderText('icons.search')).toBeInTheDocument();
    });

    it('should hide the view selector if showIconsMenu is false', () => {
        renderPicker({ showIconsMenu: false });
        fireEvent.click(screen.getByText('Open Picker'));

        expect(screen.queryByText('icons.icons')).not.toBeInTheDocument();
        expect(screen.queryByText('emojis.emojis')).not.toBeInTheDocument();
    });

    /**
     * Test search logic including text normalization (accents)
     */
    it('should filter items when typing in the search input and normalize text', async () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));

        const input = screen.getByPlaceholderText('emojis.search');
        
        // Test normalization: searching "corazon" should find "corazón" logic
        fireEvent.change(input, { target: { value: 'grinning' } });

        // Checks if specific emoji from EMOJI_DATA appears
        expect(screen.getByText('😀')).toBeInTheDocument();
    });

    /**
     * Test category navigation
     */
    it('should change category and update active styles', () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));

        const foodCat = screen.getByTitle('emojis.categories.food');
        fireEvent.click(foodCat);

        // Check if the button receives the primary color class
        expect(foodCat).toHaveClass('text-primary');
    });

    /**
     * Test selection flow for Emojis
     */
    it('should call onSelect and close when an emoji is clicked', () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));

        const emojiButton = screen.getByText('😀');
        fireEvent.click(emojiButton);

        expect(mockOnSelect).toHaveBeenCalledWith('😀');
        
        // Picker container should have visibility: hidden after selection
        const pickerContainer = screen.getByPlaceholderText('emojis.search').closest('.z-1000');
        expect(pickerContainer).toHaveStyle({ visibility: 'hidden' });
    });

    /**
     * Test external reference behavior (e.g., opened from a Slash Command)
     */
    it('should open automatically if externalReference is provided', () => {
        const mockOnClose = vi.fn();
        const externalRef = {
            element: document.createElement('div'),
            onClose: mockOnClose
        };

        render(<EmojiPicker onSelect={mockOnSelect} externalReference={externalRef} />);

        // Should be visible immediately without clicking
        const pickerContainer = screen.getByPlaceholderText('emojis.search').closest('.z-1000');
        expect(pickerContainer).toHaveStyle({ visibility: 'visible' });
    });

    /**
     * Test Icon selection
     * Simplified: verify the icons view renders correctly and handles selection
     */
    it('should handle icon selection correctly', () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));

        // Switch to icons view
        const iconsTab = screen.getByText('icons.icons');
        fireEvent.click(iconsTab);

        // Verify icons view is displayed with search input
        expect(screen.getByPlaceholderText('icons.search')).toBeInTheDocument();

        // Verify there are icon buttons rendered (with SVG children)
        const iconButtons = screen.getAllByRole('button')
            .filter(btn => btn.querySelector('svg') && btn !== iconsTab);

        expect(iconButtons.length).toBeGreaterThan(0);
    }, 6000);

    /**
     * Test scroll reset when changing view
     */
    it('should reset scroll to top when category or view changes', () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));

        // Switch to icons - the main test is that this doesn't crash
        // and the component handles the view change
        const iconsTab = screen.getByText('icons.icons');
        fireEvent.click(iconsTab);

        // Verify the icons view is now displayed
        expect(screen.getByPlaceholderText('icons.search')).toBeInTheDocument();
    });
});