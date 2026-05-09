import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import { File, Loader2 } from 'lucide-react';
import { useAttachment } from '../../context/AttachmentContext';
import { attachmentService } from '../../../services/db/attachmentService';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { invoke } from "@tauri-apps/api/core";
import { useToast } from '../../context/ToastContext';

import ImageAttachmentView from './ImageAttachmentView';
import AudioAttachmentView from './AudioAttachmentView';
import VideoAttachmentView from './VideoAttachmentView';
import GenericFileAttachmentView from './GenericFileAttachmentView';

const FileAttachmentNode = ({ node, deleteNode, selected, updateAttributes }) => {
    const { t } = useTranslation();
    const { attachmentId, fileName, mimeType, imgWidth } = node.attrs;
    const { getFileUrl, downloadFile } = useAttachment();
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
    const isAudio = mimeType?.startsWith('audio/');
    const isVideo = mimeType?.startsWith('video/');

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
                    setLoading(true);
                    const assetUrl = await downloadFile(attachmentId);
                    setUrl(assetUrl);
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
                fileName: fileName
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
        let currentWidth = startWidth;

        const onMouseMove = (mouseMoveEvent) => {
            const currentX = mouseMoveEvent.clientX;
            // Get new width with cursor movement
            currentWidth = Math.max(300, Math.min(1200, startWidth + (currentX - startX)));

            // Update visual
            updateAttributes({ imgWidth: currentWidth });
        };

        const onMouseUp = async () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            try {
                // Persistimos usando el valor capturado en el closure
                // Es vital marcar is_dirty: 1 para que el syncService lo detecte
                await attachmentService.update(attachmentId, {
                    img_width: currentWidth
                });

                console.debug(`Ancho de imagen ${attachmentId} persistido: ${currentWidth}px`);
            } catch (error) {
                console.error("Error al guardar el nuevo ancho de la imagen:", error);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [imgWidth, updateAttributes, attachmentId]);

    return (
        <NodeViewWrapper
            className={`my-2 attachment-node relative group leading-none max-w-full select-none outline-none ${selected ? 'ring-2 ring-primary rounded-lg' : ''}`}
            style={{ display: isImage || isVideo ? 'inline-block' : 'block' }}
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
                        <div>
                            {isImage ? (
                                <ImageAttachmentView
                                    url={url} fileName={fileName} imgWidth={imgWidth} isMobile={isMobile}
                                    selected={selected} isDownloading={isDownloading} isResizing={isResizing}
                                    isLightboxOpen={isLightboxOpen} setIsLightboxOpen={setIsLightboxOpen}
                                    handleDownload={handleDownload} startResizing={startResizing}
                                    updateAttributes={updateAttributes}
                                />
                            ) : isAudio ? (
                                <AudioAttachmentView
                                    url={url}
                                    fileName={fileName}
                                    isDownloading={isDownloading}
                                    handleDownload={handleDownload}
                                    displayExtension={displayExtension}
                                />
                            ) : isVideo ? (
                                <VideoAttachmentView
                                    url={url}
                                    fileName={fileName}
                                    imgWidth={imgWidth} // Usamos el mismo atributo de ancho
                                    isMobile={isMobile}
                                    selected={selected}
                                    isDownloading={isDownloading}
                                    isResizing={isResizing}
                                    handleDownload={handleDownload}
                                    startResizing={startResizing} // La misma función de las imágenes
                                    updateAttributes={updateAttributes}
                                    displayExtension={displayExtension}
                                />
                            ) : (
                                <GenericFileAttachmentView
                                    fileName={fileName} mimeType={mimeType} displayExtension={displayExtension}
                                    isDownloading={isDownloading} handleDownload={handleDownload} isMobile={isMobile}
                                />
                            )}
                        </div>
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
        const { mimeType, fileName, imgWidth, attachmentId } = HTMLAttributes;

        const containerClasses = "export-attachment my-6 block leading-none max-w-full";
        const cardClasses = "flex flex-col gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200 shadow-sm";

        // Determine type
        const isImage = mimeType?.startsWith('image/');
        const isAudio = mimeType?.startsWith('audio/');
        const isVideo = mimeType?.startsWith('video/');

        const displayExtension = (fileName || '').includes('.')
            ? fileName.split('.').pop().toUpperCase()
            : (mimeType?.split('/')[1] || 'FILE').toUpperCase();

        /**
        * Audio Icon SVG Spec (Lucide style)
        * Defined as a Tiptap DOMOutputSpec to ensure portability.
        */
        const getAudioIcon = () => [
            'svg',
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "20", height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                class: "lucide lucide-music"
            },
            ['path', { d: "M9 18V5l12-2v13" }],
            ['circle', { cx: "6", cy: "18", r: "3" }],
            ['circle', { cx: "18", cy: "16", r: "3" }]
        ];

        /**
         * Video Icon SVG Spec (Lucide style)
         */
        const getVideoIcon = () => [
            'svg',
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "20", height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                class: "lucide lucide-video"
            },
            ['path', { d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" }],
            ['rect', { width: "14", height: "12", x: "2", y: "6", rx: "2" }]
        ];

        // Return structure
        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'attachment',
                'class': containerClasses,
                'data-attachment-id': attachmentId
            }),
            isImage ? [
                'div', { style: `width: ${imgWidth}px; max-width: 100%;` },
                ['img', { src: "", class: "rounded-xl shadow-md w-full h-auto m-0" }]
            ] : [
                'div', {
                    class: cardClasses,
                    style: isVideo ? `width: ${imgWidth}px; max-width: 100%` : 'max-width: 480px'
                },
                // Header (Icon + Info)
                ['div', { class: "flex items-center gap-3" },
                    ['div', { class: `w-10 h-10 rounded-xl flex items-center justify-center ${isAudio ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'}` },
                        isAudio ? getAudioIcon() : getVideoIcon()
                    ],
                    ['div', { class: "flex-1" },
                        ['p', { class: "text-sm font-bold text-zinc-900 m-0" }, fileName],
                        ['p', { class: "text-[10px] text-zinc-500 uppercase font-black m-0 mt-1" }, displayExtension]
                    ]
                ],
                // Media
                isAudio
                    ? ['audio', { src: "", controls: "true", class: "w-full h-9 mt-1" }]
                    : ['div', { class: "aspect-video bg-black rounded-xl overflow-hidden mt-1" },
                        ['video', { src: "", controls: "true", class: "w-full h-full object-contain" }]
                    ]
            ]
        ];
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