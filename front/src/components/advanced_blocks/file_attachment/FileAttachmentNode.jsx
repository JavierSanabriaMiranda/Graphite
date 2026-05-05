import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import { File, FileText, Loader2, GripVertical, Download } from 'lucide-react';
import { useAttachment } from '../../context/AttachmentContext';
import { attachmentService } from '../../../services/db/attachmentService';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { invoke } from "@tauri-apps/api/core";
import { useToast } from '../../context/ToastContext';
import ImageLightbox from '../../util/ImageLightbox';

import ImageAttachmentView from './ImageAttachmentView';
import GenericFileAttachmentView from './GenericFileAttachmentView';

const FileAttachmentNode = ({ node, deleteNode, selected, updateAttributes }) => {
    const { t } = useTranslation();
    const { attachmentId, fileName, mimeType, imgWidth } = node.attrs;
    const { getFileUrl } = useAttachment();
    const { showToast } = useToast();
    const isMobile = useIsMobile();

    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);


    const containerRef = useRef(null);

    const isImage = mimeType?.startsWith('image/');

    /**
     * Helper to get a clean extension for display.
     * It tries to get it from the fileName first, as it's more reliable than the mimeType.
     */
    const displayExtension = (fileName || '').includes('.')
        ? fileName.split('.').pop().toUpperCase()
        : (mimeType?.split('/')[1] || 'FILE').toUpperCase();

    // Load the file URL when the component mounts
    useEffect(() => {
        const loadResource = async () => {
            try {
                const metadata = await attachmentService.getById(attachmentId);
                if (metadata && metadata.local_path) {
                    const assetUrl = await getFileUrl(metadata.local_path);
                    setUrl(assetUrl);
                } else {
                    // TODO: Implement a fallback mechanism to fetch the file from cloud storage
                    console.warn(`No local_path found for attachment ${attachmentId}`);
                    setError(true);
                }
            } catch (e) {
                console.error(`Error loading attachment ${attachmentId}:`, e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        loadResource();
    }, [attachmentId, getFileUrl]);

    /**
     * Handles the file download process by invoking a Rust command.
     * It uses the local path from the database to copy the file to the user's downloads folder.
     */
    const handleDownload = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isDownloading) return;

        setIsDownloading(true);
        try {
            const metadata = await attachmentService.getById(attachmentId);
            if (!metadata || !metadata.local_path) {
                throw new Error("Source path not found");
            }

            // Invoke Rust command to handle native file copying to Downloads/Gallery
            await invoke('download_attachment', {
                sourcePath: metadata.local_path,
                fileName: fileName,
                isImage: isImage
            });

            showToast(t('attachment.download_success'), 'success', t('attachment.download_success_message', { fileName }));

        } catch (err) {
            console.error("Download failed:", err);
            showToast(t('attachment.download_failed'), 'error');
        } finally {
            setIsDownloading(false);
        }
    };

    // Function to handle image resizing
    const startResizing = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);

        const startX = e.clientX;
        const startWidth = imgWidth || containerRef.current?.offsetWidth || 600;

        const onMouseMove = (mouseMoveEvent) => {
            // Get new width with cursor movement
            const currentX = mouseMoveEvent.clientX;
            const newWidth = Math.max(300, Math.min(1200, startWidth + (currentX - startX)));

            updateAttributes({ imgWidth: newWidth });
        };

        const onMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            // Persist on db at release
            const finalWidth = containerRef.current?.offsetWidth;
            attachmentService.update(attachmentId, { img_width: finalWidth });
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [imgWidth, updateAttributes, attachmentId]);

    return (
        <NodeViewWrapper
            className={`attachment-node relative group leading-none max-w-full select-none outline-none ${selected ? 'ring-2 ring-primary rounded-lg' : ''}`}
            style={{ display: isImage ? 'inline-block' : 'block' }}
        >
            {loading && (
                <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">{t('attachment.loading')}</span>
                </div>
            )}

            {!loading && error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/30">
                    <File className="w-5 h-5 text-red-500" />
                    <span className="text-xs font-medium text-red-600">{t('attachment.not_available')}</span>
                </div>
            )}

            {!loading && !error && (
                <>
                    {!loading && !error && (
                        isImage ? (
                            <ImageAttachmentView
                                url={url} fileName={fileName} imgWidth={imgWidth} isMobile={isMobile}
                                selected={selected} isDownloading={isDownloading} isResizing={isResizing}
                                isLightboxOpen={isLightboxOpen} setIsLightboxOpen={setIsLightboxOpen}
                                handleDownload={handleDownload} startResizing={startResizing}
                                updateAttributes={updateAttributes}
                            />
                        ) : (
                            <GenericFileAttachmentView
                                fileName={fileName} mimeType={mimeType} displayExtension={displayExtension}
                                isDownloading={isDownloading} handleDownload={handleDownload} isMobile={isMobile}
                            />
                        )
                    )}
                </>
            )}
        </NodeViewWrapper>
    );
};

export default FileAttachmentNode;


export const AttachmentExtension = Node.create({
    name: 'attachment',
    group: 'block',
    atom: true,
    draggable: true,

    // Define what attributes this node will have and their default values
    addAttributes() {
        return {
            attachmentId: { default: null },
            fileName: { default: 'File' },
            mimeType: { default: null },
            imgWidth: { default: 600 }, // Default width for images, can be overridden by metadata from the DB
        };
    },

    parseHTML() {
        return [{ tag: 'div[data-type="attachment"]' }];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'attachment' })];
    },

    addNodeView() {
        return ReactNodeViewRenderer(FileAttachmentNode);
    },

    // Add keyboard shortcuts to handle deletion via backspace or delete key
    addKeyboardShortcuts() {
        return {
            Backspace: ({ editor }) => {
                const { selection } = editor.state;

                // If node is selected but the cursor is right after an attachment, delete that attachment
                if (selection.node && selection.node.type.name === 'attachment') {
                    return editor.commands.deleteSelection();
                }

                // If the cursor is right after an attachment node, delete that attachment
                if (selection.$anchor.nodeBefore?.type.name === 'attachment') {
                    return editor.commands.deleteNode('attachment');
                }

                return false;
            },

            Delete: ({ editor }) => {
                const { selection } = editor.state;

                // If node is selected but the cursor is right after an attachment, delete that attachment
                if (selection.node && selection.node.type.name === 'attachment') {
                    return editor.commands.deleteSelection();
                }

                // If the cursor is right before an attachment node, delete that attachment
                if (selection.$anchor.nodeAfter?.type.name === 'attachment') {
                    return editor.commands.deleteNode('attachment');
                }

                return false;
            },
        };
    },
});