import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import GenericFileAttachmentView from '../../../../src/components/advanced_blocks/file_attachment/GenericFileAttachmentView';

vi.mock('lucide-react', () => ({
    File: () => <div data-testid="icon-file" />,
    FileText: () => <div data-testid="icon-filetext" />,
    Sheet: () => <div data-testid="icon-sheet" />,
    Presentation: () => <div data-testid="icon-presentation" />,
    CodeXml: () => <div data-testid="icon-code" />,
    Music: () => <div data-testid="icon-music" />,
    Video: () => <div data-testid="icon-video" />,
    Workflow: () => <div data-testid="icon-workflow" />,
    Download: () => <div data-testid="icon-download" />,
    Loader2: () => <div data-testid="icon-loader" />,
}));

describe('GenericFileAttachmentView Component', () => {
    const defaultProps = {
        fileName: 'document.pdf',
        mimeType: 'application/pdf',
        displayExtension: 'PDF',
        isDownloading: false,
        handleDownload: vi.fn(),
        isMobile: false
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the filename and extension correctly', () => {
        render(<GenericFileAttachmentView {...defaultProps} />);
        expect(screen.getByText('document.pdf')).toBeInTheDocument();
        expect(screen.getByText('PDF')).toBeInTheDocument();
    });

    /**
     * Test logic mapping: Icon and Colors
     */
    it('should apply red color and FileText icon for PDF files', () => {
        const { container } = render(<GenericFileAttachmentView {...defaultProps} />);
        
        const iconContainer = container.querySelector('.rounded-lg');
        expect(iconContainer).toHaveClass('text-red-600');
        expect(screen.getByTestId('icon-filetext')).toBeInTheDocument();
    });

    it('should apply emerald color and Sheet icon for Excel files', () => {
        render(
            <GenericFileAttachmentView 
                {...defaultProps} 
                fileName="data.xlsx" 
                displayExtension="XLSX" 
            />
        );
        
        expect(screen.getByTestId('icon-sheet')).toBeInTheDocument();
        const iconContainer = screen.getByTestId('icon-sheet').parentElement;
        expect(iconContainer).toHaveClass('text-emerald-600');
    });

    it('should apply purple color and Music icon for audio files', () => {
        render(
            <GenericFileAttachmentView 
                {...defaultProps} 
                mimeType="audio/mpeg" 
                displayExtension="MP3" 
            />
        );
        
        expect(screen.getByTestId('icon-music')).toBeInTheDocument();
        const iconContainer = screen.getByTestId('icon-music').parentElement;
        expect(iconContainer).toHaveClass('text-purple-600');
    });

    it('should apply zinc color and default File icon for unknown extensions', () => {
        render(
            <GenericFileAttachmentView 
                {...defaultProps} 
                fileName="unknown.xyz" 
                displayExtension="XYZ" 
                mimeType="application/unknown"
            />
        );
        
        expect(screen.getByTestId('icon-file')).toBeInTheDocument();
    });

    /**
     * Test Interaction and Responsive logic
     */
    it('should call handleDownload when the download button is clicked', () => {
        render(<GenericFileAttachmentView {...defaultProps} />);
        
        const downloadBtn = screen.getByRole('button');
        fireEvent.click(downloadBtn);
        
        expect(defaultProps.handleDownload).toHaveBeenCalled();
    });

    it('should not render the download button on mobile', () => {
        render(<GenericFileAttachmentView {...defaultProps} isMobile={true} />);
        
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should show a loader icon when isDownloading is true', () => {
        render(<GenericFileAttachmentView {...defaultProps} isDownloading={true} />);
        
        expect(screen.getByTestId('icon-loader')).toBeInTheDocument();
        expect(screen.queryByTestId('icon-download')).not.toBeInTheDocument();
        expect(screen.getByRole('button')).toBeDisabled();
    });
});