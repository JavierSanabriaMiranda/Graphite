import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import FileAttachmentNode from '../../../../src/components/advanced_blocks/file_attachment/FileAttachmentNode';

// --- 1. MOCKS ---

// Mock Tiptap wrappers and Node
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

// Mock Contexts
vi.mock('../../../../src/components/context/AttachmentContext', () => ({
    useAttachment: () => ({
        getFileUrl: vi.fn().mockResolvedValue('blob:mock-url'),
        downloadFile: vi.fn().mockResolvedValue('blob:downloaded-url'),
    }),
}));

vi.mock('../../../../src/components/context/ToastContext', () => ({
    useToast: () => ({ showToast: vi.fn() }),
}));

// Mock Hooks & Services
vi.mock('../../../../src/hooks/useIsMobile', () => ({ useIsMobile: vi.fn(() => false) }));

vi.mock('../../../../src/services/db/attachmentService', () => ({
    attachmentService: {
        getById: vi.fn(),
        update: vi.fn(),
    },
}));

vi.mock('@tauri-apps/api/core', () => ({
    invoke: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

// Mock specialized views to isolate FileAttachmentNode logic
vi.mock('../../../../src/components/advanced_blocks/file_attachment/ImageAttachmentView', () => ({ default: () => <div data-testid="image-view" /> }));
vi.mock('../../../../src/components/advanced_blocks/file_attachment/AudioAttachmentView', () => ({ default: () => <div data-testid="audio-view" /> }));
vi.mock('../../../../src/components/advanced_blocks/file_attachment/VideoAttachmentView', () => ({ default: () => <div data-testid="video-view" /> }));
vi.mock('../../../../src/components/advanced_blocks/file_attachment/GenericFileAttachmentView', () => ({ default: () => <div data-testid="generic-view" /> }));

import { attachmentService } from '../../../../src/services/db/attachmentService';
import { invoke } from '@tauri-apps/api/core';

describe('FileAttachmentNode Component', () => {
    const defaultProps = {
        node: {
            attrs: {
                attachmentId: 'att-123',
                fileName: 'test-file.png',
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
        // Default DB response
        attachmentService.getById.mockResolvedValue({
            attachment_id: 'att-123',
            local_path: '/path/to/file.png'
        });
    });

    it('should show loading state initially and then render the correct view', async () => {
        render(<FileAttachmentNode {...defaultProps} />);
        
        expect(screen.getByText('attachment.loading')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByTestId('image-view')).toBeInTheDocument();
        });
    });

    it('should render AudioAttachmentView for audio mime types', async () => {
        const audioProps = {
            ...defaultProps,
            node: { attrs: { ...defaultProps.node.attrs, mimeType: 'audio/mpeg', fileName: 'music.mp3' } }
        };

        render(<FileAttachmentNode {...audioProps} />);

        await waitFor(() => {
            expect(screen.getByTestId('audio-view')).toBeInTheDocument();
        });
    });

    it('should render GenericFileAttachmentView for unknown mime types', async () => {
        const genericProps = {
            ...defaultProps,
            node: { attrs: { ...defaultProps.node.attrs, mimeType: 'application/pdf', fileName: 'doc.pdf' } }
        };

        render(<FileAttachmentNode {...genericProps} />);

        await waitFor(() => {
            expect(screen.getByTestId('generic-view')).toBeInTheDocument();
        });
    });

    it('should show error state if loading fails', async () => {
        attachmentService.getById.mockRejectedValue(new Error('DB Error'));
        
        render(<FileAttachmentNode {...defaultProps} />);

        await waitFor(() => {
            expect(screen.getByText('attachment.not_available')).toBeInTheDocument();
        });
    });
});