import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Info } from 'lucide-react';
import { noteLinkService } from '../services/db/noteLinkService';
import { useNote } from './context/NoteContext';
import { useIsMobile } from '../hooks/useIsMobile';
import Backlinks from './navigation/Backlinks';

/**
 * InfoBar Component
 * Displays note metadata (creation date) and a backlinks explorer.
 */
const InfoBar = () => {
    const { t, i18n } = useTranslation();
    const { refreshTrigger, selectedNote } = useNote();
    const isMobile = useIsMobile();

    const [showInfoBar, setShowInfoBar] = useState(false);
    const [backlinks, setBacklinks] = useState([]);

    // Fetch backlinks whenever the note changes or a refresh is triggered
    useEffect(() => {
        const fetchBacklinks = async () => {
            if (selectedNote?.note_id) {
                const links = await noteLinkService.getBacklinks(selectedNote.note_id);
                setBacklinks(links);
            }
        };
        fetchBacklinks();
    }, [selectedNote?.note_id, refreshTrigger]);

    if (!selectedNote) return null;

    return (
        <div className="group mt-2 flex flex-col items-start gap-2">
            {/* Main Toggle Button */}
            <button
                onClick={() => setShowInfoBar(!showInfoBar)}
                className={`
                    flex items-center gap-1.5 text-zinc-700 dark:text-zinc-400 hover:text-primary 
                    transition-all duration-300 font-medium cursor-pointer p-1 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800
                    ${isMobile
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100 transition-opacity'
                    }
                `}
            >
                <Info className="w-4 h-4" />
                {showInfoBar ? t('editor.info_bar.hide_info') : t('editor.info_bar.show_info')}
            </button>

            {showInfoBar && (
                <div className="flex items-center gap-6 py-3 px-4 w-full animate-in slide-in-from-top-2 duration-200 border-b border-zinc-300 dark:border-zinc-700">

                    {/* Creation Date Section */}
                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                        <Calendar className="w-4 h-4 opacity-70" />
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase tracking-widest font-bold opacity-70">
                                {t('editor.info_bar.created_at')}
                            </span>
                            <span className="text-xs font-medium">
                                {selectedNote.created_at
                                    ? new Date(selectedNote.created_at).toLocaleDateString(i18n.language, { dateStyle: 'long' })
                                    : '---'}
                            </span>
                        </div>
                    </div>

                    {/* Last Update Section */}
                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                        <Calendar className="w-4 h-4 opacity-70" />
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase tracking-widest font-bold opacity-70">
                                {t('editor.info_bar.updated_at')}
                            </span>
                            <span className="text-xs font-medium">
                                {selectedNote.updated_at
                                    ? new Date(selectedNote.updated_at).toLocaleString(i18n.language, {
                                        dateStyle: 'long',
                                        timeStyle: 'short'
                                    })
                                    : '---'}
                            </span>
                        </div>
                    </div>

                    {/* Backlinks Section */}
                    <Backlinks backlinks={backlinks} />
                </div>
            )}
        </div>
    );
};

export default InfoBar;