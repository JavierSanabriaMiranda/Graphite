import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAttachmentUpload } from '../../src/hooks/useAttachmentUpload';
import { useAttachment } from '../../src/components/context/AttachmentContext';
import { readFile } from '@tauri-apps/plugin-fs';

vi.mock('@tauri-apps/plugin-fs', () => ({
    readFile: vi.fn(),
}));

vi.mock('../../src/components/context/AttachmentContext', () => ({
    useAttachment: vi.fn(),
}));

describe('useAttachmentUpload Hook', () => {
    let mockEditor;
    let mockUploadFile;

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup the mock for the attachment context
        mockUploadFile = vi.fn();
        useAttachment.mockReturnValue({ uploadFile: mockUploadFile });

        // Mocking the Tiptap editor command chain
        const chainMock = {
            focus: vi.fn().mockReturnThis(),
            insertContent: vi.fn().mockReturnThis(),
            run: vi.fn().mockReturnThis(),
        };

        mockEditor = {
            chain: vi.fn(() => chainMock),
        };
    });

    /**
     * Test Case: Uploading a direct File object (e.g., from a drop event or input)
     */
    it('should upload a File object and insert the attachment node into the editor', async () => {
        const mockFile = new File(['content'], 'image.png', { type: 'image/png' });
        const mockMetadata = {
            attachment_id: 'att-123',
            file_name: 'image.png',
            mime_type: 'image/png',
            img_width: 800
        };

        mockUploadFile.mockResolvedValue(mockMetadata);

        const { result } = renderHook(() => useAttachmentUpload(mockEditor, 'note-123'));

        await result.current.uploadAttachment(mockFile);

        // Verify context call
        expect(mockUploadFile).toHaveBeenCalledWith(mockFile, 'note-123');

        // Verify Tiptap insertion
        expect(mockEditor.chain().focus().insertContent).toHaveBeenCalledWith({
            type: 'attachment',
            attrs: {
                attachmentId: 'att-123',
                fileName: 'image.png',
                mimeType: 'image/png',
                imgWidth: 800
            }
        });
    });

    /**
     * Test Case: Uploading via file path (Tauri local file system)
     */
    it('should read file bytes from path and upload when a string path is provided', async () => {
        const mockBytes = new Uint8Array([0, 1, 2]);
        vi.mocked(readFile).mockResolvedValue(mockBytes);

        const mockMetadata = {
            attachment_id: 'att-456',
            file_name: 'document.pdf',
            mime_type: 'application/pdf'
        };
        mockUploadFile.mockResolvedValue(mockMetadata);

        const { result } = renderHook(() => useAttachmentUpload(mockEditor, 'note-123'));

        await result.current.uploadAttachment('C:\\Users\\Javi\\Documents\\document.pdf');

        // Verify Tauri FS call
        expect(readFile).toHaveBeenCalledWith('C:\\Users\\Javi\\Documents\\document.pdf');

        // Verify that a File object was created and uploaded
        expect(mockUploadFile).toHaveBeenCalledWith(expect.any(File), 'note-123');
        const fileArgument = mockUploadFile.mock.calls[0][0];
        expect(fileArgument.name).toBe('document.pdf');
    });

    /**
     * Test Case: Logic Guards
     */
    it('should bail out if editor or noteId are missing', async () => {
        const { result: noEditor } = renderHook(() => useAttachmentUpload(null, 'note-123'));
        await noEditor.current.uploadAttachment(new File([], 'test.txt'));
        expect(mockUploadFile).not.toHaveBeenCalled();

        const { result: noNoteId } = renderHook(() => useAttachmentUpload(mockEditor, null));
        await noNoteId.current.uploadAttachment(new File([], 'test.txt'));
        expect(mockUploadFile).not.toHaveBeenCalled();
    });

    /**
     * Test Case: Error Handling
     */
    it('should catch and log errors during the upload process', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        mockUploadFile.mockRejectedValue(new Error('Network Error'));

        const { result } = renderHook(() => useAttachmentUpload(mockEditor, 'note-123'));

        await result.current.uploadAttachment(new File([], 'fail.png'));

        expect(consoleSpy).toHaveBeenCalledWith(
            "Error while processing attached file:",
            expect.any(Error)
        );

        consoleSpy.mockRestore();
    });
});