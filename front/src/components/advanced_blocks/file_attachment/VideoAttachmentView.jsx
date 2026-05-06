import React from 'react';
import { Video, Download, Loader2 } from 'lucide-react';
import { useIsMobile } from '../../../hooks/useIsMobile';

const VideoAttachmentView = ({ url, fileName, isDownloading, handleDownload, displayExtension }) => {
    const isMobile = useIsMobile()

    return (
        <div className="flex flex-col gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm w-full group/card">
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
        </div>
    );
};

export default VideoAttachmentView;