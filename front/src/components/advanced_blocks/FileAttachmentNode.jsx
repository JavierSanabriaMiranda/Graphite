import React, { useState, useEffect } from 'react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import { File, FileText, ImageIcon, Loader2, X, Download } from 'lucide-react';
import { useAttachment } from '../context/AttachmentContext';
import { attachmentService } from '../../services/db/attachmentService';
import { useTranslation } from 'react-i18next';

const FileAttachmentNode = ({ node, updateAttributes, selected }) => {
    const { t } = useTranslation();
    const { attachmentId, fileName, mimeType, imgWidth } = node.attrs;
    const { getFileUrl, deleteAttachment } = useAttachment();
    
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
    const handleResize = (e) => {
        const newWidth = e.target.value;
        updateAttributes({ imgWidth: newWidth });
        // Persist the new width in the database for future reference
        attachmentService.update(attachmentId, { img_width: parseInt(newWidth) });
    };

    return (
        <NodeViewWrapper className={`attachment-node my-4 group relative ${selected ? 'ring-2 ring-primary rounded-lg' : ''}`}>
            
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
                        <div className="flex flex-col items-start gap-2">
                            <div className="relative inline-block overflow-hidden rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
                                <img 
                                    src={url} 
                                    alt={fileName} 
                                    style={{ width: imgWidth ? `${imgWidth}px` : '100%', height: 'auto' }}
                                    className="block max-w-full"
                                />
                                
                                {/* Overlay of quick actions */}
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => window.open(url)}
                                        className="p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-md backdrop-blur-md"
                                    >
                                        <Download size={14} />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Resize Control */}
                            {selected && (
                                <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-xl mt-2 animate-in fade-in slide-in-from-top-1">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">{t('attachment.width')}</span>
                                    <input 
                                        type="range" 
                                        min="100" 
                                        max="1200" 
                                        value={imgWidth || 600} 
                                        onChange={handleResize}
                                        className="w-24 h-1 accent-primary cursor-pointer"
                                    />
                                    <span className="text-[10px] font-bold text-primary">{imgWidth || 'Auto'}px</span>
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
                            
                            <button 
                                onClick={() => window.open(url)}
                                className="ml-4 p-2 text-zinc-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            >
                                <Download size={18} />
                            </button>
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
});