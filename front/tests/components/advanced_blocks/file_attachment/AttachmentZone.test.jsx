import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

vi.mock('@tiptap/react', () => {
    return {
        Node: {
            create: vi.fn().mockReturnValue({}),
        },
        ReactNodeViewRenderer: vi.fn(),
        NodeViewWrapper: ({ children, className }) => <div className={className}>{children}</div>,
    };
});

vi.mock('@tauri-apps/plugin-dialog', () => ({
    open: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

vi.mock('../../../../src/components/context/NoteContext', () => ({
    useNote: vi.fn(),
}));

vi.mock('../../../../src/hooks/useAttachmentUpload', () => ({
    useAttachmentUpload: vi.fn(),
}));

import AttachmentZone from '../../../../src/components/advanced_blocks/file_attachment/AttachmentZone';
import { useNote } from '../../../../src/components/context/NoteContext';
import { useAttachmentUpload } from '../../../../src/hooks/useAttachmentUpload';
import { open } from '@tauri-apps/plugin-dialog';

describe('AttachmentZone Component', () => {
    const mockDeleteNode = vi.fn();
    const mockUploadAttachment = vi.fn();
    const mockEditor = { commands: {} };
    const mockNote = { note_id: 'note-123' };

    beforeEach(() => {
        vi.clearAllMocks();

        useNote.mockReturnValue({
            selectedNote: mockNote,
        });

        useAttachmentUpload.mockReturnValue({
            uploadAttachment: mockUploadAttachment,
        });
    });

    it('should render correctly with title and description', () => {
        render(<AttachmentZone editor={mockEditor} deleteNode={mockDeleteNode} />);
        expect(screen.getByText('attachment.attachment_zone_title')).toBeInTheDocument();
        expect(screen.getByText('Max 5MB')).toBeInTheDocument();
    });

    it('should change styles on drag events', () => {
        const { container } = render(<AttachmentZone editor={mockEditor} deleteNode={mockDeleteNode} />);
        const dropZone = container.querySelector('.attachment-zone-wrapper > div');

        fireEvent.dragOver(dropZone);
        expect(dropZone).toHaveClass('border-primary');

        fireEvent.dragLeave(dropZone);
        expect(dropZone).not.toHaveClass('border-primary');
    });

    it('should handle file drop', async () => {
        render(<AttachmentZone editor={mockEditor} deleteNode={mockDeleteNode} />);
        const dropZone = screen.getByText('attachment.attachment_zone_title').closest('div').parentElement;

        const file = new File(['content'], 'test.png', { type: 'image/png' });
        const dropEvent = {
            preventDefault: vi.fn(),
            dataTransfer: { files: [file] },
        };

        fireEvent.drop(dropZone, dropEvent);

        expect(mockDeleteNode).toHaveBeenCalled();
        expect(mockUploadAttachment).toHaveBeenCalledWith(file);
    });

    it('should open dialog and upload file on click', async () => {
        const mockFilePath = '/mock/path/file.jpg';
        vi.mocked(open).mockResolvedValue(mockFilePath);

        render(<AttachmentZone editor={mockEditor} deleteNode={mockDeleteNode} />);
        const dropZone = screen.getByText('attachment.attachment_zone_title').closest('div').parentElement;
        
        await act(async () => {
            fireEvent.click(dropZone);
        });

        expect(open).toHaveBeenCalled();
        expect(mockDeleteNode).toHaveBeenCalled();
        expect(mockUploadAttachment).toHaveBeenCalledWith(mockFilePath);
    });
});