import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import { File, FileText, ImageIcon, Loader2, GripVertical, Download } from 'lucide-react';
import { useAttachment } from '../context/AttachmentContext';
import { attachmentService } from '../../services/db/attachmentService';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../hooks/useIsMobile';

const FileAttachmentNode = ({ node, deleteNode, selected, updateAttributes }) => {
    const { t } = useTranslation();
    const { attachmentId, fileName, mimeType, imgWidth } = node.attrs;
    const { getFileUrl } = useAttachment();
    const isMobile = useIsMobile();

    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const containerRef = useRef(null);

    const isImage = mimeType?.startsWith('image/');

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
            className={`attachment-node relative group leading-none max-w-full ${selected ? 'ring-2 ring-primary rounded-lg' : ''}`}
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
                    {isImage ? (
                        <div
                            ref={containerRef}
                            className="relative inline-block leading-none max-w-full"
                            style={{
                                width: imgWidth ? `${imgWidth}px` : 'auto',
                                maxWidth: '100%'
                            }}
                        >
                            <img
                                src={url}
                                alt={fileName}
                                className={`block w-full h-auto transition-opacity ${isResizing ? 'opacity-80' : 'opacity-100'}`}
                                style={{ width: '100%' }}
                            />

                            {/* Action buttons overlay */}
                            <div className={`absolute top-2 right-2 flex gap-1 ${isMobile ? 'opacity-100' : 'opacity-0' }  group-hover:opacity-100 transition-opacity z-10`}>
                                <button
                                    onClick={() => window.open(url)}
                                    className="p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-md backdrop-blur-sm shadow-lg"
                                >
                                    <Download size={14} />
                                </button>
                            </div>

                            {/* Resize handler (only desktop) */}
                            <button
                                onMouseDown={startResizing}
                                className={`absolute top-0 -right-1 h-full w-3 cursor-ew-resize hover:bg-primary/20 transition-colors hidden md:flex items-center justify-center group/resizer z-20 ${isResizing ? 'bg-primary/10' : ''}`}
                            >
                                <div className="hidden group-hover/resizer:block bg-primary p-0.5 rounded text-white shadow-lg">
                                    <GripVertical size={10} />
                                </div>
                            </button>

                            {/* Slider for mobile */}
                            {selected && isMobile && (
                                <div className="flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 p-2 rounded-full absolute -bottom-10 left-1/2 -translate-x-1/2 border border-zinc-200 shadow-xl z-20">
                                    <input
                                        type="range" min="100" max="1200"
                                        value={imgWidth || 600}
                                        onChange={(e) => updateAttributes({ imgWidth: parseInt(e.target.value) })}
                                        className="w-24 h-1 accent-primary"
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Render for non-image files */
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all group/card">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="p-2.5 bg-primary/10 text-primary rounded-lg">
                                    {mimeType?.includes('pdf') ? <FileText size={20} /> : <File size={20} />}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200 truncate">{fileName}</span>
                                    <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">{mimeType?.split('/')[1]}</span>
                                </div>
                            </div>
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