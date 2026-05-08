import { readFile } from '@tauri-apps/plugin-fs';
import { useAttachment } from '../components/context/AttachmentContext';

export const useAttachmentUpload = (editor, noteId) => {
    const { uploadFile } = useAttachment();

    const uploadAttachment = async (fileOrPath) => {
        if (!editor || !noteId) return;
        try {
            let fileToProcess;
            if (typeof fileOrPath === 'string') {
                const bytes = await readFile(fileOrPath);
                const fileName = fileOrPath.split(/[\\/]/).pop();
                fileToProcess = new File([bytes], fileName);
            } else {
                fileToProcess = fileOrPath;
            }

            const metadata = await uploadFile(fileToProcess, noteId);
            if (metadata) {
                editor.chain().focus().insertContent({
                    type: 'attachment',
                    attrs: {
                        attachmentId: metadata.attachment_id,
                        fileName: metadata.file_name,
                        mimeType: metadata.mime_type,
                        imgWidth: metadata.img_width || 600
                    }
                }).run();
            }
        } catch (err) {
            console.error("Error while processing attached file:", err);
        }
    };
    return { uploadAttachment };
};