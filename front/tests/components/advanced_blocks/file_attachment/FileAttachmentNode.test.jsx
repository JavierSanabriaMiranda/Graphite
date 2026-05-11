import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import FileAttachmentNode from '../../../../src/components/advanced_blocks/file_attachment/FileAttachmentNode';

const mockShowToast = vi.fn();
const mockGetFileUrl = vi.fn();
const mockDownloadFile = vi.fn();

vi.mock('@tiptap/react', () => ({
    NodeViewWrapper: ({ children, className, style }) => (
        <div data-testid="node-view-wrapper" className={className} style={style}>{children}</div>
    ),
    ReactNodeViewRenderer: vi.fn(),
}));

vi.mock('@tiptap/core', () => ({
    Node: { create: vi.fn(() => ({})) },
    mergeAttributes: vi.fn((...args) => Object.assign({}, ...args)),
}));

vi.mock('../../../../src/components/context/AttachmentContext', () => ({
    useAttachment: () => ({
        getFileUrl: mockGetFileUrl.mockResolvedValue('blob:mock-url'),
        downloadFile: mockDownloadFile.mockResolvedValue('blob:remote-url'),
    }),
}));

vi.mock('../../../../src/components/context/ToastContext', () => ({
    useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock('../../../../src/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));

vi.mock('../../../../src/services/db/attachmentService', () => ({
    attachmentService: {
        getById: vi.fn(),
        update: vi.fn().mockResolvedValue({ success: true }),
    },
}));

vi.mock('@tauri-apps/api/core', () => ({
    invoke: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

const ImageMock = vi.fn(() => <div data-testid="image-view" />);
const AudioMock = vi.fn(() => <div data-testid="audio-view" />);
vi.mock('../../../../src/components/advanced_blocks/file_attachment/ImageAttachmentView', () => ({ default: (props) => { ImageMock(props); return <div data-testid="image-view" /> } }));
vi.mock('../../../../src/components/advanced_blocks/file_attachment/AudioAttachmentView', () => ({ default: (props) => { AudioMock(props); return <div data-testid="audio-view" /> } }));
vi.mock('../../../../src/components/advanced_blocks/file_attachment/VideoAttachmentView', () => ({ default: () => <div data-testid="video-view" /> }));
vi.mock('../../../../src/components/advanced_blocks/file_attachment/GenericFileAttachmentView', () => ({ default: () => <div data-testid="generic-view" /> }));

import { attachmentService } from '../../../../src/services/db/attachmentService';
import { invoke } from '@tauri-apps/api/core';

describe('FileAttachmentNode Component - Logic & Lifecycle', () => {
    const defaultProps = {
        node: {
            attrs: {
                attachmentId: 'att-123',
                fileName: 'test.png',
                mimeType: 'image/png',
                imgWidth: 600
            }
        },
        deleteNode: vi.fn(),
        selected: false,
        updateAttributes: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should load local resource if local_path exists', async () => {
        attachmentService.getById.mockResolvedValue({
            attachment_id: 'att-123',
            local_path: '/local/path/file.png'
        });

        render(<FileAttachmentNode {...defaultProps} />);

        await waitFor(() => {
            expect(mockGetFileUrl).toHaveBeenCalledWith('/local/path/file.png');
            expect(ImageMock).toHaveBeenCalledWith(expect.objectContaining({ url: 'blob:mock-url' }));
        });
    });

    it('should trigger remote download if local_path is missing', async () => {
        attachmentService.getById.mockResolvedValue({
            attachment_id: 'att-123',
            local_path: null // Not in local
        });

        render(<FileAttachmentNode {...defaultProps} />);

        await waitFor(() => {
            expect(mockDownloadFile).toHaveBeenCalledWith('att-123');
            expect(ImageMock).toHaveBeenCalledWith(expect.objectContaining({ url: 'blob:remote-url' }));
        });
    });

    it('should handle successful download via Rust invoke', async () => {
        attachmentService.getById.mockResolvedValue({
            attachment_id: 'att-123',
            local_path: '/path/to/source'
        });

        render(<FileAttachmentNode {...defaultProps} />);
        
        await waitFor(() => expect(ImageMock).toHaveBeenCalled());

        const { handleDownload } = ImageMock.mock.calls[0][0];

        await act(async () => {
            await handleDownload({ preventDefault: vi.fn(), stopPropagation: vi.fn() });
        });

        expect(invoke).toHaveBeenCalledWith('download_attachment', {
            sourcePath: '/path/to/source',
            fileName: 'test.png'
        });
        expect(mockShowToast).toHaveBeenCalledWith('attachment.download_success', 'success', expect.anything());
    });

    it('should show error toast if Rust download fails', async () => {
        attachmentService.getById.mockResolvedValue({ local_path: '/path' });
        invoke.mockRejectedValue(new Error('Rust error'));

        render(<FileAttachmentNode {...defaultProps} />);
        await waitFor(() => expect(ImageMock).toHaveBeenCalled());

        const { handleDownload } = ImageMock.mock.calls[0][0];

        await act(async () => {
            await handleDownload({ preventDefault: vi.fn(), stopPropagation: vi.fn() });
        });

        expect(mockShowToast).toHaveBeenCalledWith('attachment.download_failed', 'error');
    });

    it('should handle image resizing and persist to DB on mouseUp', async () => {
        attachmentService.getById.mockResolvedValue({ local_path: '/path' });
        render(<FileAttachmentNode {...defaultProps} />);
        
        await waitFor(() => expect(ImageMock).toHaveBeenCalled());

        const { startResizing } = ImageMock.mock.calls[0][0];

        // Simulate resize init
        const mockEvent = { 
            preventDefault: vi.fn(), 
            stopPropagation: vi.fn(),
            clientX: 100 
        };

        act(() => {
            startResizing(mockEvent);
        });

        // Simulate mouse move
        const moveEvent = new MouseEvent('mousemove', { clientX: 200 }); // +100px
        act(() => {
            document.dispatchEvent(moveEvent);
        });

        expect(defaultProps.updateAttributes).toHaveBeenCalledWith({ imgWidth: 700 });

        const upEvent = new MouseEvent('mouseup');
        await act(async () => {
            document.dispatchEvent(upEvent);
        });

        expect(attachmentService.update).toHaveBeenCalledWith('att-123', {
            img_width: 700
        });
    });

    it('should calculate displayExtension correctly from fileName', async () => {
        const propsWithExt = {
            ...defaultProps,
            node: { attrs: { ...defaultProps.node.attrs, fileName: 'archive.tar.gz', mimeType: 'application/gzip' } }
        };

        render(<FileAttachmentNode {...propsWithExt} />);
        
        await waitFor(() => expect(AudioMock).not.toHaveBeenCalled());
    });
});