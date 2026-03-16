import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExportButton from '../../../src/components/options_menu/ExportButton';

describe('ExportButton Component', () => {
    it('should render correctly with the translation key', () => {
        render(<ExportButton onOpenModal={() => { }} />);

        // Verify translated text appears
        expect(screen.getByText('editor.options_menu.export.export')).toBeInTheDocument();
    });

    it('should render the export SVG icon', () => {
        const { container } = render(<ExportButton onOpenModal={() => { }} />);

        // Get SVG
        const svg = container.querySelector('svg');
        const path = container.querySelector('path');

        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('w-4', 'h-4');
        expect(path).toBeInTheDocument();
    });

    it('should call onOpenModal when clicked', () => {
        const mockOnOpenModal = vi.fn();
        render(<ExportButton onOpenModal={mockOnOpenModal} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Check callback is called
        expect(mockOnOpenModal).toHaveBeenCalledTimes(1);
    });

    it('should have the correct hover and transition classes', () => {
        render(<ExportButton onOpenModal={() => { }} />);

        const button = screen.getByRole('button');

        expect(button).toHaveClass('cursor-pointer');
        expect(button).toHaveClass('hover:bg-hover-primary-bg');
        expect(button).toHaveClass('transition-colors');
        expect(button).toHaveClass('w-full');
    });
});