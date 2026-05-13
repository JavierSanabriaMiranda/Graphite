import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import AudioAttachmentView from '../../../../src/components/advanced_blocks/file_attachment/AudioAttachmentView';
import { useIsMobile } from '../../../../src/hooks/useIsMobile';

// --- MOCKS ---

vi.mock('../../../../src/hooks/useIsMobile', () => ({
    useIsMobile: vi.fn(),
}));

vi.mock('lucide-react', () => ({
    Download: () => <div data-testid="download-icon" />,
    Music: () => <div data-testid="music-icon" />,
    Loader2: () => <div data-testid="loader-icon" />,
}));

describe('AudioAttachmentView Component', () => {
    const defaultProps = {
        url: 'https://example.com/audio.mp3',
        fileName: 'podcast_interview.mp3',
        isDownloading: false,
        handleDownload: vi.fn(),
        displayExtension: 'MP3'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        // Simulate desktop by default
        useIsMobile.mockReturnValue(false);
    });

    it('should render correctly with filename and extension', () => {
        render(<AudioAttachmentView {...defaultProps} />);

        expect(screen.getByText('podcast_interview.mp3')).toBeInTheDocument();
        expect(screen.getByText('MP3')).toBeInTheDocument();
        expect(screen.getByTestId('music-icon')).toBeInTheDocument();
    });

    it('should render the audio element with correct source', () => {
        const { container } = render(<AudioAttachmentView {...defaultProps} />);
        
        const audioElement = container.querySelector('audio');
        expect(audioElement).toBeInTheDocument();
        expect(audioElement).toHaveAttribute('src', defaultProps.url);
        expect(audioElement).toHaveAttribute('controlsList', 'nodownload');
    });

    it('should show download button and call handleDownload on desktop', () => {
        render(<AudioAttachmentView {...defaultProps} />);

        const downloadBtn = screen.getByRole('button');
        expect(downloadBtn).toBeInTheDocument();
        
        fireEvent.click(downloadBtn);
        expect(defaultProps.handleDownload).toHaveBeenCalledTimes(1);
    });

    it('should hide download button on mobile view', () => {
        useIsMobile.mockReturnValue(true);
        render(<AudioAttachmentView {...defaultProps} />);

        const downloadBtn = screen.queryByRole('button');
        expect(downloadBtn).not.toBeInTheDocument();
    });

    it('should show loader and disable button when isDownloading is true', () => {
        render(<AudioAttachmentView {...defaultProps} isDownloading={true} />);

        const downloadBtn = screen.getByRole('button');
        expect(downloadBtn).toBeDisabled();
        expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('download-icon')).not.toBeInTheDocument();
    });

    it('should apply custom groups for hover effects (visual check)', () => {
        const { container } = render(<AudioAttachmentView {...defaultProps} />);
        
        expect(container.firstChild).toHaveClass('group/card');
    });
});