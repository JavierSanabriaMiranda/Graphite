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

            // Rust command to save the file on disk and return the local path
            const localPath = await invoke('save_attachment', {
                id: attachmentId,
                extension: extension,
                data: bytes
            });

            // Generate the asset URL for frontend use
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
     * Deletes an attachment from both the database and the disk
     * @param {string} attachmentId - The ID of the attachment to delete
     * @returns {Promise<boolean>} - True if deletion was successful, false otherwise
     */
    const deleteAttachment = useCallback(async (attachmentId) => {
        try {
            // Retrieve attachment metadata from database
            const attachment = await attachmentService.getById(attachmentId);

            if (!attachment) {
                console.warn(`Attachment ${attachmentId} not found in database`);
                return false;
            }

            // Delete file from disk via Rust command
            try {
                await invoke('delete_attachment_file', { filePath: attachment.local_path });
            } catch (diskError) {
                console.error(`Failed to delete file from disk: ${attachment.local_path}`, diskError);
                // Continue with DB deletion even if file deletion fails
            }

            // Delete metadata from SQLite database
            await attachmentService.delete(attachmentId);

            return true;
        } catch (error) {
            console.error(`Error deleting attachment ${attachmentId}:`, error);
            return false;
        }
    }, []);


    /**
     * Syncs the attachments of a note by comparing the current content with the attachments stored in the database.
      * Deletes any attachments that are no longer referenced in the note content.
      * @param {string} noteId - The ID of the note to sync attachments for
      * @param {string|Object} currentContent - The current content of the note (can be a string or a JSON object)
     */
    const syncNoteAttachments = useCallback(async (noteId, currentContent) => {
        if (!noteId || !currentContent) return;

        try {
            // Get all attachment IDs currently referenced in the note's content
            const currentIdsInNote = new Set();
            const regex = /"attachmentId":"([a-f0-9-]{36})"/g;
            let match;

            const contentString = typeof currentContent === 'string'
                ? currentContent
                : JSON.stringify(currentContent);

            while ((match = regex.exec(contentString)) !== null) {
                currentIdsInNote.add(match[1]);
            }

            // Get all attachments currently stored in the database for this note
            const dbAttachments = await attachmentService.getByNoteId(noteId);

            // Get the list of attachments that are in the database but not in the current note content (orphans)
            const orphans = dbAttachments.filter(
                att => !currentIdsInNote.has(att.attachment_id)
            );

            if (orphans.length > 0) {
                // Physical and logical deletion of orphan attachments
                for (const orphan of orphans) {
                    await deleteAttachment(orphan.attachment_id);
                }
            }
        } catch (error) {
            console.error("Error while syncing note attachments:", error);
        }
    }, [deleteAttachment]);

    /**
     * Deletes all attachments associated with a note. 
     * This is typically called when a note is deleted to clean up any orphaned files and database entries.
     */
    const deleteAllAttachmentsForNote = useCallback(async (noteId) => {
        try {
            const attachments = await attachmentService.getByNoteId(noteId);
            for (const att of attachments) {
                await deleteAttachment(att.attachment_id);
            }
        } catch (error) {
            console.error(`Error deleting all attachments for note ${noteId}:`, error);
        }
    }, [deleteAttachment]);

    const value = {
        uploadFile,
        getFileUrl,
        deleteAttachment,
        syncNoteAttachments,
        deleteAllAttachmentsForNote,
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