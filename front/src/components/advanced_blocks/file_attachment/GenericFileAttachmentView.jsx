import React from 'react';
import {
    File,
    FileText,
    Sheet,
    Presentation,
    CodeXml,
    Music,
    Video,
    Workflow,
    Download,
    Loader2
} from 'lucide-react';

/**
 * Component that represents a generic attached file with an icon based on file extension
 * It allows to download the file
 */
const GenericFileAttachmentView = ({
    fileName, mimeType, displayExtension, isDownloading, handleDownload, isMobile
}) => {

    /**
     * Returns the appropriate icon based on the file type, using both extension and MIME type for better accuracy.
     */
    const getFileConfig = () => {
        const ext = displayExtension?.toLowerCase();
        const mime = mimeType?.toLowerCase() || '';

        // PDF -> Red
        if (ext === 'pdf') return {
            icon: <FileText size={20} />,
            colorClass: 'text-red-600 dark:text-red-400',
            bgClass: 'bg-red-50 dark:bg-red-950/40',
        };

        // Word -> Blue
        if (['doc', 'docx'].includes(ext)) return {
            icon: <FileText size={20} />,
            colorClass: 'text-blue-600 dark:text-blue-400',
            bgClass: 'bg-blue-50 dark:bg-blue-950/40',
        };

        // Excel -> Green
        if (['xls', 'xlsx', 'csv'].includes(ext)) return {
            icon: <Sheet size={20} />,
            colorClass: 'text-emerald-600 dark:text-emerald-400',
            bgClass: 'bg-emerald-50 dark:bg-emerald-950/40',
        };

        // PowerPoint -> Orange
        if (['ppt', 'pptx'].includes(ext)) return {
            icon: <Presentation size={20} />,
            colorClass: 'text-orange-600 dark:text-orange-400',
            bgClass: 'bg-orange-50 dark:bg-orange-950/40',
        };

        // Draw.io  -> Amber
        if (ext === 'drawio' || mime.includes('jgraph')) return {
            icon: <Workflow size={20} />,
            colorClass: 'text-amber-600 dark:text-amber-400',
            bgClass: 'bg-amber-50 dark:bg-amber-950/40',
        };

        // HTML / XML -> Yellow
        if (['html', 'htm', 'xml'].includes(ext) || mime.includes('html')) return {
            icon: <CodeXml size={20} />,
            colorClass: 'text-yellow-600 dark:text-yellow-400',
            bgClass: 'bg-yellow-50 dark:bg-yellow-950/40',
        };

        // Media -> Purple
        if (mime.startsWith('audio/') || mime.startsWith('video/')) return {
            icon: mime.startsWith('audio/') ? <Music size={20} /> : <Video size={20} />,
            colorClass: 'text-purple-600 dark:text-purple-400',
            bgClass: 'bg-purple-50 dark:bg-purple-950/40',
        };

        // Default -> Zinc
        return {
            icon: <File size={20} />,
            colorClass: 'text-zinc-600 dark:text-zinc-400',
            bgClass: 'bg-zinc-100 dark:bg-zinc-800/50',
        };
    };

    const config = getFileConfig();

    return (
        <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all group/card select-none outline-none">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className={`p-3 rounded-lg shrink-0 flex items-center justify-center ${config.bgClass} ${config.colorClass}`}>
                    {config.icon}
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200 truncate">{fileName}</span>
                    <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">{displayExtension}</span>
                </div>
            </div>

            {!isMobile &&
                <div className={`flex gap-1 'opacity-0' group-hover/card:opacity-100 transition-opacity`}>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="cursor-pointer p-2 text-zinc-500 dark:text-zinc-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                    </button>
                </div>
            }
        </div>
    );
};

export default GenericFileAttachmentView;