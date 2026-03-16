import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DeleteButton from '../../../src/components/options_menu/DeleteButton';

describe('DeleteButton Component', () => {
    it('should render correctly with translated text', () => {
        render(<DeleteButton onClick={() => { }} />);

        // Verify transalted text is present
        expect(screen.getByText('editor.options_menu.delete.label')).toBeInTheDocument();
    });

    it('should render the Trash2 icon', () => {
        const { container } = render(<DeleteButton onClick={() => { }} />);

        // Lucide-react renderiza SVGs. Verificamos que haya uno dentro del botón.
        const icon = container.querySelector('svg');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('lucide-trash2');
    });

    it('should call onClick function when clicked', () => {
        const mockOnClick = vi.fn();
        render(<DeleteButton onClick={mockOnClick} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Verify function has been executed once
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should have the correct styling classes for a delete action', () => {
        render(<DeleteButton onClick={() => { }} />);

        const button = screen.getByRole('button');

        // Verify feedback classes
        expect(button).toHaveClass('text-red-600');
        expect(button).toHaveClass('cursor-pointer');
        expect(button).toHaveClass('hover:bg-red-50');
    });
});