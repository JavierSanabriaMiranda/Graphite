import React, { useRef } from 'react';
import { Video, Download, Loader2, GripVertical } from 'lucide-react';

/**
 * Component that represents an attached video file that can be played.
 * The video can be resized and downloaded
 */
const VideoAttachmentView = ({
    url, fileName, imgWidth, isMobile, selected,
    isDownloading, isResizing, handleDownload,
    startResizing, updateAttributes, displayExtension
}) => {

    const containerRef = useRef(null);

    return (
        <div
            ref={containerRef}
            className="relative flex flex-col gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm group/card transition-shadow mr-0"
            style={{ 
                width: imgWidth ? `${imgWidth}px` : '100%', 
                maxWidth: '100%',
                transition: isResizing ? 'none' : 'width 0.2s ease, box-shadow 0.2s ease'
            }}
        >
            {/* Header: Info and download */}
            <div className="flex items-center gap-3 px-1">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                    <Video className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-tight mt-0.5 mb-0.5">
                        {fileName}
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold leading-none mt-0.5 mb-0.5">
                        {displayExtension}
                    </p>
                </div>

                <div className={`flex gap-1 ${isMobile ? 'opacity-100' : 'opacity-0'} group-hover/card:opacity-100 transition-opacity`}>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="cursor-pointer p-2 text-zinc-500 dark:text-zinc-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                    </button>
                </div>
            </div>

            {/* Video container */}
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video shadow-inner">
                <video
                    src={url}
                    className="w-full h-full object-contain mt-0 mb-0"
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                />
            </div>

            {/* Resize handler (Desktop) */}
            <button
                onMouseDown={(e) => startResizing(e)}
                className={`absolute top-0 -right-1 h-full w-3 cursor-ew-resize hover:bg-primary/20 transition-colors hidden md:flex items-center justify-center group/resizer z-20 ${isResizing ? 'bg-primary/10' : ''}`}
            >
                <div className="hidden group-hover/resizer:block bg-primary p-0.5 rounded text-white shadow-lg">
                    <GripVertical size={10} />
                </div>
            </button>

            {/* Slider for mobile */}
            {selected && isMobile && (
                <div className="flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 p-2 rounded-full absolute -bottom-12 left-1/2 -translate-x-1/2 border border-zinc-200 dark:border-zinc-700 shadow-xl z-30">
                    <input
                        type="range" min="300" max="1200"
                        value={imgWidth || 600}
                        onChange={(e) => updateAttributes({ imgWidth: parseInt(e.target.value) })}
                        className="w-24 h-1 accent-primary"
                    />
                </div>
            )}
        </div>
    );
};

export default VideoAttachmentView;