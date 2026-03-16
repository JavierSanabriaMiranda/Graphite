import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NoteIcon from '../../../src/components/util/NoteIcon';

describe('NoteIcon Component', () => {

    it('should return null if iconChar is not provided', () => {
        const { container } = render(<NoteIcon iconChar={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render an emoji as a span when iconChar is a single character', () => {
        const emoji = '🚀';
        render(<NoteIcon iconChar={emoji} />);

        const span = screen.getByText(emoji);
        expect(span.tagName).toBe('SPAN');
        expect(span).toHaveClass('flex items-center justify-center');
        // Verify that has the emoji font style
        expect(span.style.fontFamily).toBe('var(--font-emoji)');
    });

    it('should render an SVG when iconChar is a valid SVG path string', () => {
        const svgPath = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z';
        const { container } = render(<NoteIcon iconChar={svgPath} />);

        const svg = container.querySelector('svg');
        const path = container.querySelector('path');

        expect(svg).toBeInTheDocument();
        expect(path).toHaveAttribute('d', svgPath);
        expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('should render as text if the string is long but does not start with M/m', () => {
        const longText = 'This is a long string but not a path';
        render(<NoteIcon iconChar={longText} />);

        const span = screen.getByText(longText);
        expect(span.tagName).toBe('SPAN');
    });

    it('should render as text if the string starts with M but is too short', () => {
        const shortM = 'M12';
        render(<NoteIcon iconChar={shortM} />);

        const span = screen.getByText(shortM);
        expect(span.tagName).toBe('SPAN');
    });

    it('should apply custom classNames provided via props', () => {
        const customClass = 'custom-icon-class';
        const emoji = '⭐';
        render(<NoteIcon iconChar={emoji} className={customClass} />);

        const span = screen.getByText(emoji);
        expect(span).toHaveClass(customClass);
    });

    it('should handle SVG paths starting with lowercase "m"', () => {
        const lowerPath = 'm12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10z';
        const { container } = render(<NoteIcon iconChar={lowerPath} />);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });
});