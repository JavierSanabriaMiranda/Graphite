import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { AttachmentProvider, useAttachment } from '../../../src/components/context/AttachmentContext';
import { attachmentService } from '../../../src/services/db/attachmentService';
import { invoke } from "@tauri-apps/api/core";

vi.mock('@tauri-apps/api/core', () => ({
    invoke: vi.fn(),
}));

vi.mock('../../../src/services/db/attachmentService', () => ({
    attachmentService: {
        create: vi.fn(),
        getById: vi.fn(),
        getByNoteId: vi.fn(),
        delete: vi.fn(),
    },
}));

vi.mock('../../../src/services/db/syncService', () => ({
    syncService: {
        downloadAttachment: vi.fn(),
    },
}));

vi.mock('../../../src/components/context/ToastContext', () => ({
    useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

/**
 * Force mock for crypto.randomUUID to ensure predictable attachment IDs
 */
Object.defineProperty(global, 'crypto', {
    value: {
        randomUUID: vi.fn(() => 'mock-uuid-12345')
    },
    configurable: true
});

/**
 * Mock the global Image constructor to simulate instant metadata loading.
 * JSDOM does not trigger 'onload' for images automatically.
 */
const setupImageMock = () => {
    const originalImage = global.Image;
    global.Image = class {
        constructor() {
            setTimeout(() => {
                if (this.onload) {
                    this.width = 800;
                    this.onload();
                }
            }, 0);
        }
    };
    return () => { global.Image = originalImage; };
};

describe('AttachmentContext', () => {
    let restoreImageMock;

    beforeEach(() => {
        vi.clearAllMocks();
        restoreImageMock = setupImageMock();
    });

    afterEach(() => {
        restoreImageMock();
    });

    const wrapper = ({ children }) => (
        <AttachmentProvider>
            {children}
        </AttachmentProvider>
    );

    /**
     * Test: File Size Validation
     */
    it('should reject files larger than 5MB', async () => {
        const { result } = renderHook(() => useAttachment(), { wrapper });
        const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'huge.zip', { type: 'application/zip' });

        let uploaded;
        await act(async () => {
            uploaded = await result.current.uploadFile(largeFile, 'note-1');
        });

        expect(uploaded).toBeNull();
    });

    /**
     * Test: MIME Type Validation
     */
    it('should reject unauthorized MIME types', async () => {
        const { result } = renderHook(() => useAttachment(), { wrapper });
        const illegalFile = new File(['void'], 'virus.exe', { type: 'application/x-msdownload' });

        let uploaded;
        await act(async () => {
            uploaded = await result.current.uploadFile(illegalFile, 'note-1');
        });

        expect(uploaded).toBeNull();
    });

    /**
     * Test: Successful Upload Flow
     */
    it('should upload a valid image, save it via Rust and return metadata', async () => {
        const { result } = renderHook(() => useAttachment(), { wrapper });
        const file = new File(['fake-image-data'], 'test.png', { type: 'image/png' });
        
        // Mock Tauri invoke responses
        vi.mocked(invoke).mockImplementation((cmd) => {
            if (cmd === 'save_attachment') return Promise.resolve('/local/storage/test.png');
            if (cmd === 'get_asset_url') return Promise.resolve('attachment://test.png');
        });
        vi.mocked(attachmentService.create).mockResolvedValue(true);

        let uploaded;
        await act(async () => {
            uploaded = await result.current.uploadFile(file, 'note-1');
        });

        expect(uploaded).not.toBeNull();
        expect(uploaded.attachment_id).toBe('mock-uuid-12345');
        expect(uploaded.img_width).toBe(800);
        expect(invoke).toHaveBeenCalledWith('save_attachment', expect.anything());
    });

    /**
     * Test: Attachment Deletion
     */
    it('should delete file from disk and database', async () => {
        const { result } = renderHook(() => useAttachment(), { wrapper });
        const mockAttachment = { attachment_id: 'att-1', local_path: '/path/file.jpg' };
        
        vi.mocked(attachmentService.getById).mockResolvedValue(mockAttachment);
        vi.mocked(invoke).mockResolvedValue(true);
        vi.mocked(attachmentService.delete).mockResolvedValue(true);

        let success;
        await act(async () => {
            success = await result.current.deleteAttachment('att-1');
        });

        expect(success).toBe(true);
        expect(invoke).toHaveBeenCalledWith('delete_attachment_file', { filePath: mockAttachment.local_path });
        expect(attachmentService.delete).toHaveBeenCalledWith('att-1');
    });

    /**
     * Test: Synchronization (Orphan Cleanup)
     * Matches the internal Regex: /"attachmentId":"([a-f0-9-]{36})"/g
     */
    it('should delete orphaned attachments not present in note content', async () => {
        const { result } = renderHook(() => useAttachment(), { wrapper });
        
        const activeId = '11111111-1111-1111-1111-111111111111';
        const orphanId = '22222222-2222-2222-2222-222222222222';

        const dbAtts = [
            { attachment_id: activeId, local_path: '/p1' },
            { attachment_id: orphanId, local_path: '/p2' }
        ];
        
        vi.mocked(attachmentService.getByNoteId).mockResolvedValue(dbAtts);
        vi.mocked(attachmentService.getById).mockImplementation((id) => {
            return Promise.resolve(dbAtts.find(a => a.attachment_id === id));
        });

        // Content must contain the EXACT string structure the regex expects
        const noteContent = `Some text with {"attachmentId":"${activeId}"} and no more.`;

        await act(async () => {
            await result.current.syncNoteAttachments('note-1', noteContent);
        });

        // Verify orphan was deleted
        expect(attachmentService.delete).toHaveBeenCalledWith(orphanId);
        // Verify active attachment was NOT deleted
        expect(attachmentService.delete).not.toHaveBeenCalledWith(activeId);
    });

    /**
     * Test: Bulk Deletion for Note
     */
    it('should delete all attachments when a note is removed', async () => {
        const { result } = renderHook(() => useAttachment(), { wrapper });
        const dbAtts = [
            { attachment_id: 'att-1', local_path: '/p1' },
            { attachment_id: 'att-2', local_path: '/p2' }
        ];
        
        vi.mocked(attachmentService.getByNoteId).mockResolvedValue(dbAtts);
        vi.mocked(attachmentService.getById)
            .mockImplementation((id) => Promise.resolve(dbAtts.find(a => a.attachment_id === id)));

        await act(async () => {
            await result.current.deleteAllAttachmentsForNote('note-1');
        });

        expect(attachmentService.delete).toHaveBeenCalledTimes(2);
    });
});