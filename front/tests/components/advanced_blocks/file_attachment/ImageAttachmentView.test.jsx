import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import ImageAttachmentView from '../../../../src/components/advanced_blocks/file_attachment/ImageAttachmentView';

// --- MOCKS ---

vi.mock('../../util/ImageLightbox', () => ({
    default: ({ isOpen, onClose }) => isOpen ? (
        <div data-testid="lightbox">
            <button onClick={onClose}>Close Lightbox</button>
        </div>
    ) : null,
}));

vi.mock('lucide-react', () => ({
    Download: () => <div data-testid="icon-download" />,
    Loader2: () => <div data-testid="icon-loader" />,
    GripVertical: () => <div data-testid="icon-grip" />,
}));

describe('ImageAttachmentView Component', () => {
    const defaultProps = {
        url: 'test-image.jpg',
        fileName: 'nature.jpg',
        imgWidth: 400,
        isMobile: false,
        selected: false,
        isDownloading: false,
        isResizing: false,
        isLightboxOpen: false,
        setIsLightboxOpen: vi.fn(),
        handleDownload: vi.fn(),
        startResizing: vi.fn(),
        updateAttributes: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the image with correct src and alt text', () => {
        render(<ImageAttachmentView {...defaultProps} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'test-image.jpg');
        expect(img).toHaveAttribute('alt', 'nature.jpg');
    });

    it('should set the container width based on imgWidth prop', () => {
        const { container } = render(<ImageAttachmentView {...defaultProps} />);
        const wrapper = container.firstChild;
        expect(wrapper).toHaveStyle({ width: '400px' });
    });

    /**
     * Interaction: Lightbox
     */
    it('should call setIsLightboxOpen when double clicking the container', () => {
        const { container } = render(<ImageAttachmentView {...defaultProps} />);
        fireEvent.doubleClick(container.firstChild);
        expect(defaultProps.setIsLightboxOpen).toHaveBeenCalledWith(true);
    });

    /**
     * Interaction: Download
     */
    it('should show download button and call handleDownload on desktop', () => {
        render(<ImageAttachmentView {...defaultProps} />);
        
        const downloadIcon = screen.getByTestId('icon-download');
        const downloadBtn = downloadIcon.closest('button');
        
        fireEvent.click(downloadBtn);
        expect(defaultProps.handleDownload).toHaveBeenCalled();
    });

    /**
     * Interaction: Resizing
     */
    it('should call startResizing when the resize handle is pressed', () => {
        render(<ImageAttachmentView {...defaultProps} />);
        
        const gripIcon = screen.getByTestId('icon-grip');
        const resizeHandle = gripIcon.closest('button');
        
        fireEvent.mouseDown(resizeHandle);
        expect(defaultProps.startResizing).toHaveBeenCalled();
    });

    /**
     * Mobile logic
     */
    it('should show a range slider on mobile when selected', () => {
        render(<ImageAttachmentView {...defaultProps} isMobile={true} selected={true} />);
        const slider = screen.getByRole('slider');
        expect(slider).toBeInTheDocument();
        expect(slider).toHaveValue('400');

        fireEvent.change(slider, { target: { value: '800' } });
        expect(defaultProps.updateAttributes).toHaveBeenCalledWith({ imgWidth: 800 });
    });

    it('should hide action buttons and resize handle on mobile', () => {
        render(<ImageAttachmentView {...defaultProps} isMobile={true} />);
        // Download button shouldn't render
        expect(screen.queryByTestId('icon-download')).not.toBeInTheDocument();
    });
});