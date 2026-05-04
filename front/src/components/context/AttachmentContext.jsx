import React, { createContext, useContext, useState, useCallback } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { attachmentService } from '../../services/db/attachmentService';

const AttachmentContext = createContext();

export const AttachmentProvider = ({ children }) => {
    const [isUploading, setIsUploading] = useState(false);

    /**
     * Generates a URL for the file to be used in the frontend, given its local path on disk.
     */
    const getFileUrl = useCallback(async (localPath) => {
        if (!localPath) {
            console.warn('getFileUrl called with empty path');
            return null;
        }

        try {
            // Use the Rust backend to generate the proper asset URL with correct encoding
            const assetUrl = await invoke('get_asset_url', { filePath: localPath });
            console.debug(`Generated asset URL for "${localPath}": ${assetUrl}`);
            return assetUrl;
        } catch (error) {
            console.error(`Error generating asset URL for "${localPath}":`, error);
            return null;
        }
    }, []);

    /**
     * Process a file (JS File), saves it locally via Rust, and registers metadata in SQLite.
     */
    const uploadFile = useCallback(async (file, noteId) => {
        setIsUploading(true);
        try {
            const attachmentId = crypto.randomUUID();
            const extension = file.name.split('.').pop();
            const arrayBuffer = await file.arrayBuffer();
            const bytes = Array.from(new Uint8Array(arrayBuffer));

            // 1. Rust guarda y devuelve la ruta absoluta
            const localPath = await invoke('save_attachment', {
                id: attachmentId,
                extension: extension,
                data: bytes
            });

            // 2. Generamos la URL compatible con el WebView
            const assetUrl = await getFileUrl(localPath);

            const metadata = {
                attachment_id: attachmentId,
                note_id: noteId,
                file_name: file.name,
                mime_type: file.type,
                file_size: file.size,
                local_path: localPath,
                img_width: file.type.startsWith('image/') ? await getImageWidth(file) : null
            };

            await attachmentService.create(metadata);
            return { ...metadata, url: assetUrl };
        } catch (error) {
            console.error("Error:", error);
            throw error;
        } finally {
            setIsUploading(false);
        }
    }, [getFileUrl]);

    /**
     * Helper to get the original width of an image file, used for proper rendering in the frontend.
     */
    const getImageWidth = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img.width);
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    /**
     * Deletes the attachment from the DB and the disk
     */
    const deleteAttachment = useCallback(async (attachmentId) => {
        const attachment = await attachmentService.getById(attachmentId);
        if (attachment) {
            // Delete file from disk via Rust
            await invoke('delete_attachment_file', { filePath: attachment.local_path });
            // Logical delete in SQLite
            await attachmentService.delete(attachmentId);
        }
    }, []);

    const value = {
        uploadFile,
        getFileUrl,
        deleteAttachment,
        isUploading
    };

    return (
        <AttachmentContext.Provider value={value}>
            {children}
        </AttachmentContext.Provider>
    );
};

export const useAttachment = () => {
    const context = useContext(AttachmentContext);
    if (!context) {
        throw new Error('useAttachment debe usarse dentro de un AttachmentProvider');
    }
    return context;
};