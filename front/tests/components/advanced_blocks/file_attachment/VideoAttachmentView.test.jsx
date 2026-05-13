import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import VideoAttachmentView from '../../../../src/components/advanced_blocks/file_attachment/VideoAttachmentView';

vi.mock('lucide-react', () => ({
    Video: () => <div data-testid="icon-video" />,
    Download: () => <div data-testid="icon-download" />,
    Loader2: () => <div data-testid="icon-loader" />,
    GripVertical: () => <div data-testid="icon-grip" />,
}));

describe('VideoAttachmentView Component', () => {
    const defaultProps = {
        url: 'test-video.mp4',
        fileName: 'presentation.mp4',
        imgWidth: 500,
        isMobile: false,
        selected: false,
        isDownloading: false,
        isResizing: false,
        handleDownload: vi.fn(),
        startResizing: vi.fn(),
        updateAttributes: vi.fn(),
        displayExtension: 'MP4'
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render video info and extension correctly', () => {
        render(<VideoAttachmentView {...defaultProps} />);
        
        expect(screen.getByText('presentation.mp4')).toBeInTheDocument();
        expect(screen.getByText('MP4')).toBeInTheDocument();
        expect(screen.getByTestId('icon-video')).toBeInTheDocument();
    });

    it('should set the width and source of the video correctly', () => {
        const { container } = render(<VideoAttachmentView {...defaultProps} />);
        
        const mainDiv = container.firstChild;
        expect(mainDiv).toHaveStyle({ width: '500px' });

        const videoElement = container.querySelector('video');
        expect(videoElement).toHaveAttribute('src', 'test-video.mp4');
        expect(videoElement).toHaveAttribute('controlsList', 'nodownload');
    });

    it('should call handleDownload when download button is clicked', () => {
        render(<VideoAttachmentView {...defaultProps} />);
        
        // Find icon then click its parent button
        const downloadBtn = screen.getByTestId('icon-download').closest('button');
        fireEvent.click(downloadBtn);
        
        expect(defaultProps.handleDownload).toHaveBeenCalled();
    });

    it('should show loader when isDownloading is true', () => {
        render(<VideoAttachmentView {...defaultProps} isDownloading={true} />);
        
        expect(screen.getByTestId('icon-loader')).toBeInTheDocument();
        expect(screen.queryByTestId('icon-download')).not.toBeInTheDocument();
    });

    it('should call startResizing on desktop when grip is pressed', () => {
        render(<VideoAttachmentView {...defaultProps} />);
        
        const gripHandle = screen.getByTestId('icon-grip').closest('button');
        fireEvent.mouseDown(gripHandle);
        
        expect(defaultProps.startResizing).toHaveBeenCalled();
    });

    it('should show range slider on mobile when selected', () => {
        render(<VideoAttachmentView {...defaultProps} isMobile={true} selected={true} />);
        
        const slider = screen.getByRole('slider');
        expect(slider).toBeInTheDocument();
        
        fireEvent.change(slider, { target: { value: '800' } });
        expect(defaultProps.updateAttributes).toHaveBeenCalledWith({ imgWidth: 800 });
    });

    it('should hide download button on mobile', () => {
        render(<VideoAttachmentView {...defaultProps} isMobile={true} />);
        expect(screen.queryByTestId('icon-download')).not.toBeInTheDocument();
    });
});