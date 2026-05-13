import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import ImageLightbox from '../../../src/components/util/ImageLightbox';

// Mock Floating UI to control portal rendering and dismissal logic
vi.mock('@floating-ui/react', () => ({
    useFloating: () => ({
        refs: { setFloating: vi.fn() },
        context: {}
    }),
    useDismiss: vi.fn(),
    useInteractions: () => ({
        getFloatingProps: (props) => props
    }),
    FloatingPortal: ({ children }) => <div data-testid="portal">{children}</div>,
    FloatingOverlay: ({ children, style, className }) => (
        <div data-testid="overlay" style={style} className={className}>
            {children}
        </div>
    ),
}));

describe('ImageLightbox Component', () => {
    const mockOnClose = vi.fn();
    const defaultProps = {
        url: 'https://example.com/image.jpg',
        fileName: 'test-image.png',
        isOpen: true,
        onClose: mockOnClose
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test Guard Clause: Should not render if closed
     */
    it('should return null if isOpen is false', () => {
        const { container } = render(<ImageLightbox {...defaultProps} isOpen={false} />);
        expect(container.firstChild).toBeNull();
    });

    /**
     * Test Rendering: Verify portal and content
     */
    it('should render the image and the filename correctly', () => {
        render(<ImageLightbox {...defaultProps} />);
        
        expect(screen.getByAltText('test-image.png')).toHaveAttribute('src', 'https://example.com/image.jpg');
        expect(screen.getByText('test-image.png')).toBeInTheDocument();
    });

    /**
     * Test Interaction: Close button
     */
    it('should call onClose when the close button is clicked', () => {
        render(<ImageLightbox {...defaultProps} />);
        
        // The close button is the one with the X icon (lucide-react)
        const closeButton = screen.getAllByRole('button')[0]; 
        fireEvent.click(closeButton);
        
        expect(mockOnClose).toHaveBeenCalled();
    });

    /**
     * Test Interaction: Zoom Logic
     * We need to mock getBoundingClientRect because JSDOM returns 0 for everything
     */
    it('should toggle zoom state and calculate coordinates on image click', () => {
        render(<ImageLightbox {...defaultProps} />);
        
        const imageButton = screen.getByAltText('test-image.png').parentElement;
        const image = screen.getByAltText('test-image.png');

        // Mocking dimensions to test the math: ((clientX - left) / width) * 100
        // Click at 200, 200 on a 400x400 image starting at 0, 0 -> should be 50% 50%
        imageButton.getBoundingClientRect = vi.fn(() => ({
            width: 400,
            height: 400,
            top: 0,
            left: 0,
            bottom: 400,
            right: 400
        }));

        // Zoom In
        fireEvent.click(imageButton, { clientX: 200, clientY: 200 });

        // Check if cursor class changed
        expect(imageButton).toHaveClass('cursor-zoom-out');
        // Check if transform scale is applied
        expect(image).toHaveStyle('transform: scale(2.5)');
        // Check if origin is calculated correctly (50% 50%)
        expect(image).toHaveStyle('transform-origin: 50% 50%');

        // Zoom Out
        fireEvent.click(imageButton);
        expect(imageButton).toHaveClass('cursor-zoom-in');
        expect(image).toHaveStyle('transform: scale(1)');
    });

    /**
     * Test Accessibility: Keyboard close
     */
    it('should call onClose when Enter or Space is pressed on the overlay container', () => {
        render(<ImageLightbox {...defaultProps} />);
        
        const overlayContainer = screen.getByRole('button', { name: '' }); // The main div wrapper
        
        fireEvent.keyDown(overlayContainer, { key: 'Enter' });
        expect(mockOnClose).toHaveBeenCalled();
        
        fireEvent.keyDown(overlayContainer, { key: ' ', code: 'Space' });
        expect(mockOnClose).toHaveBeenCalledTimes(2);
    });

    /**
     * Test Reset Logic: useEffect clean up
     */
    it('should reset zoom state when the lightbox is closed', () => {
        const { rerender } = render(<ImageLightbox {...defaultProps} />);
        
        // Zoom in first
        const imageButton = screen.getByAltText('test-image.png').parentElement;
        fireEvent.click(imageButton, { clientX: 100, clientY: 100 });
        expect(imageButton).toHaveClass('cursor-zoom-out');

        // Close it via props
        rerender(<ImageLightbox {...defaultProps} isOpen={false} />);
        // Open it again
        rerender(<ImageLightbox {...defaultProps} isOpen={true} />);

        // Should be reset to zoom-in cursor (unzoomed)
        const resetImageButton = screen.getByAltText('test-image.png').parentElement;
        expect(resetImageButton).toHaveClass('cursor-zoom-in');
    });
});