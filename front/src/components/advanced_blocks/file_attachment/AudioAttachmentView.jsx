import React, { useRef, useState } from 'react';
import { Download, Music, Loader2 } from 'lucide-react';
import { useIsMobile } from '../../../hooks/useIsMobile';

/**
 * Component that represents an attached audio file that can be played.
 * This audio can also be downloaded
 */
const AudioAttachmentView = ({ url, fileName, isDownloading, handleDownload, displayExtension }) => {
    const isMobile = useIsMobile()

    return (
        <div className="flex flex-col gap-2 p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 w-full max-w group/card">
            <div className="flex items-center gap-3">
                {/* Header: Info and download */}
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Music className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
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
            {/* Audio container */}
            <div className="mt-1">
                <audio
                    src={url}
                    className="cursor-pointer w-full h-8"
                    controls
                    controlsList="nodownload"
                />
            </div>
        </div>
    );
};

export default AudioAttachmentView;