import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SettingsModal from '../../../src/components/configuration_menu/SettingsModal';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../src/components/configuration_menu/LanguageSelector', () => ({
    default: () => <div data-testid="language-selector-mock">Language Selector</div>,
}));

vi.mock('lucide-react', () => ({
    X: () => <svg data-testid="close-icon" />,
    Globe: () => <svg data-testid="globe-icon" />,
}));

describe('SettingsModal Component', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return null if isOpen is false', () => {
        const { container } = render(<SettingsModal isOpen={false} onClose={mockOnClose} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render the modal structure when isOpen is true', () => {
        render(<SettingsModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getAllByText('settings.title').length).toBeGreaterThan(0);
        expect(screen.getAllByText('settings.general').length).toBeGreaterThan(0);
        expect(screen.getByText('settings.language.title')).toBeInTheDocument();
    });

    it('should call onClose when the X button is clicked', () => {
        render(<SettingsModal isOpen={true} onClose={mockOnClose} />);

        // Get the button with icon X
        const closeButton = screen.getByTestId('close-icon').closest('button');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when the backdrop is clicked', async () => {
        const mockOnClose = vi.fn();
        render(<SettingsModal isOpen={true} onClose={mockOnClose} />);

        const backdrop = document.querySelector('.animate-in');

        fireEvent.mouseDown(backdrop);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should render the LanguageSelector component', () => {
        render(<SettingsModal isOpen={true} onClose={mockOnClose} />);

        // Verify children mock is present
        expect(screen.getByTestId('language-selector-mock')).toBeInTheDocument();
    });

    it('should not close when clicking inside the modal content', () => {
        render(<SettingsModal isOpen={true} onClose={mockOnClose} />);

        // Get both two tittles (modal sidebar and menu title) and click on first one
        const allTitles = screen.getAllByText('settings.title');
        fireEvent.click(allTitles[0]);

        expect(mockOnClose).not.toHaveBeenCalled();
    });
});