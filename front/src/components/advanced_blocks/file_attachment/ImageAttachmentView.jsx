import React, { useRef } from 'react';
import { Download, Loader2, GripVertical } from 'lucide-react';
import ImageLightbox from '../../util/ImageLightbox';

const ImageAttachmentView = ({ 
    url, fileName, imgWidth, isMobile, selected, 
    isDownloading, isResizing, isLightboxOpen, 
    setIsLightboxOpen, handleDownload, startResizing, updateAttributes 
}) => {
    const containerRef = useRef(null);

    return (
        <div
            ref={containerRef}
            role='button'
            tabIndex={0}
            className="relative inline-block leading-none max-w-full cursor-zoom-in select-none outline-none"
            style={{ width: imgWidth ? `${imgWidth}px` : 'auto', maxWidth: '100%' }}
            onDoubleClick={() => setIsLightboxOpen(true)}
        >
            <img
                src={url}
                alt={fileName}
                className={`block w-full h-auto transition-opacity rounded-lg mt-0 mb-0 ${isResizing ? 'opacity-80' : 'opacity-100'}`}
            />

            <ImageLightbox 
                url={url} 
                fileName={fileName} 
                isOpen={isLightboxOpen} 
                onClose={() => setIsLightboxOpen(false)} 
            />

            {/* Action buttons overlay */}
            <div className={`absolute top-2 right-2 flex gap-1 ${isMobile ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity z-10`}>
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="cursor-pointer p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-md backdrop-blur-sm shadow-lg disabled:opacity-50"
                >
                    {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                </button>
            </div>

            {/* Resize handler */}
            <button
                onMouseDown={(e) => startResizing(e, containerRef)}
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
    );
};

export default ImageAttachmentView;