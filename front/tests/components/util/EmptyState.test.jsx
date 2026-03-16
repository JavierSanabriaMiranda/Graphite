import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EmptyState from '../../../src/components/util/EmptyState';
import { useTranslation } from 'react-i18next';

vi.mock('react-i18next', () => ({
    useTranslation: vi.fn(),
}));

vi.mock('lucide-react', () => ({
    Plus: () => <svg data-testid="plus-icon" />,
}));

describe('EmptyState Component', () => {
    const mockOnCreateNote = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        // Default implementation: returns the key 
        vi.mocked(useTranslation).mockReturnValue({
            t: (key) => key,
        });
    });

    it('should render the component with translation keys', () => {
        render(<EmptyState onCreateNote={mockOnCreateNote} />);

        // Verify correct keys
        expect(screen.getByText('editor.empty_state.title')).toBeInTheDocument();
        expect(screen.getByText('editor.empty_state.description')).toBeInTheDocument();
        expect(screen.getByText('sidebar.new_note')).toBeInTheDocument();
    });

    it('should use fallback text if translations return empty', () => {
        vi.mocked(useTranslation).mockReturnValue({
            t: (key) => {
                if (key === 'editor.empty_state.title') return '';
                if (key === 'editor.empty_state.description') return '';
                return key;
            },
        });

        render(<EmptyState onCreateNote={mockOnCreateNote} />);

        expect(screen.getByText('Graphite')).toBeInTheDocument();
        expect(screen.getByText('Choose a page to start writing')).toBeInTheDocument();
    });

    it('should call onCreateNote when the button is clicked', () => {
        render(<EmptyState onCreateNote={mockOnCreateNote} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockOnCreateNote).toHaveBeenCalledTimes(1);
    });

    it('should render the background logo div with correct styles', () => {
        const { container } = render(<EmptyState onCreateNote={mockOnCreateNote} />);

        const logoDiv = container.querySelector('.opacity-\\[0\\.04\\]');

        expect(logoDiv).toBeInTheDocument();

        // get current style
        const maskValue = logoDiv.style.maskImage || logoDiv.style.WebkitMaskImage;

        expect(maskValue).toContain('/app_icon.png');

        const sizeValue = logoDiv.style.maskSize || logoDiv.style.WebkitMaskSize;
        expect(sizeValue).toBe('contain');
    });

    it('should render the Plus icon inside the button', () => {
        render(<EmptyState onCreateNote={mockOnCreateNote} />);

        expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
    });
});