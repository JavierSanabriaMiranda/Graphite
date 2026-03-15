import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmojiPicker from './EmojiPicker';

window.HTMLElement.prototype.scrollTo = vi.fn();

describe('EmojiPicker', () => {
    const mockOnSelect = vi.fn();

    // Helper para renderizar con el trigger
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
        
        // Look for searching input that only appears when picker is opened
        expect(screen.getByPlaceholderText(/emojis.search/i)).toBeInTheDocument();
    });

    it('should switch between Emojis and Icons views', () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));

        const iconsTab = screen.getByText('icons.icons');
        fireEvent.click(iconsTab);

        // When swithing to icons view, placeholder searching input placeholder must change
        expect(screen.getByPlaceholderText(/icons.search/i)).toBeInTheDocument();
    });

    it('should hide the view selector if showIconsMenu is false', () => {
        renderPicker({ showIconsMenu: false });
        fireEvent.click(screen.getByText('Open Picker'));

        expect(screen.queryByText('icons.icons')).not.toBeInTheDocument();
        expect(screen.queryByText('emojis.emojis')).not.toBeInTheDocument();
    });

    it('should filter items when typing in the search input', async () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));

        const input = screen.getByPlaceholderText(/emojis.search/i);
        
        // Simulates grinning search
        fireEvent.change(input, { target: { value: 'grinning' } });

        // Verifies that "😀" emoji appears
        expect(screen.getByText('😀')).toBeInTheDocument();
    });

    it('should change category and reset scroll', () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));

        // Look for a category button by it's title
        const catButton = screen.getByTitle('emojis.categories.food');
        fireEvent.click(catButton);

        // Food category must be active
        expect(catButton).toHaveClass('text-primary');
    });

    it('should call onSelect and close when an item is clicked', () => {
        renderPicker();
        fireEvent.click(screen.getByText('Open Picker'));

        // Click onf first emoji found (grinning 😀)
        const emojiButton = screen.getByText('😀');
        fireEvent.click(emojiButton);

        expect(mockOnSelect).toHaveBeenCalledWith('😀');
        // Picker must close (visibility = hidden)
        const picker = screen.getByPlaceholderText(/emojis.search/i).closest('.z-1000');
        expect(picker).toHaveStyle({ visibility: 'hidden' });
    });
});