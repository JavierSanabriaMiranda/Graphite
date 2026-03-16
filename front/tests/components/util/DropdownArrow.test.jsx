import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DropdownArrow from '../../../src/components/util/DropdownArrow';

describe('DropdownArrow', () => {
    
    // Default props test
    it('should apply default rotation when closed and opened', () => {
        const { container, rerender } = render(<DropdownArrow menuOpen={false} />);
        let svg = container.querySelector('svg');
        expect(svg).toHaveClass('-rotate-90');

        rerender(<DropdownArrow menuOpen={true} />);
        svg = container.querySelector('svg');
        expect(svg).toHaveClass('rotate-180');
    });

    // Personalized angles test (closed menu)
    it('should apply custom defaultRotateAngle when closed', () => {
        const { container } = render(
            <DropdownArrow menuOpen={false} defaultRotateAngle={90} />
        );
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass('rotate-90');
    });

    // Personalized angles test (opened menu)
    it('should apply custom rotateAngle when open', () => {
        const { container } = render(
            <DropdownArrow menuOpen={true} rotateAngle={0} />
        );
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass('rotate-0');
    });

    // Visual integrity test
    it('should render the SVG path correctly', () => {
        const { container } = render(<DropdownArrow menuOpen={false} />);
        const path = container.querySelector('path');
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute('d', 'M19 9l-7 7-7-7');
    });

    // Static classes estability test
    it('should have transition and size classes', () => {
        const { container } = render(<DropdownArrow menuOpen={false} />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass('transition-transform', 'duration-200', 'w-4', 'h-4');
    });
});