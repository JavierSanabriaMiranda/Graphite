import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, AlertTriangle } from 'lucide-react';
import ChangeThemeButton from './util/ChangeThemeButton';
import OptionsMenu from './options_menu/OptionsMenu';
import { noteService } from '../services/db/noteService'
import { useNote } from './context/NoteContext';
import { useIsMobile } from '../hooks/useIsMobile';
import { SyncStatus } from '../util/SyncStatus';
import EditModeButton from './EditModeButton';

/**
 * PathBar - Topbar for navigation and note state
 */
const PathBar = ({ saveStatus, editor, onResolveConflict }) => {
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const {
        selectedNote: activeNote,
        selectNote: onNoteSelect,
        refreshTrigger,
        syncStatus,
        setNoteEditableMode
    } = useNote();
    const [displayNote, setDisplayNote] = useState(activeNote);

    // When selected note changes or refreshTrigger
    // look for path on db
    useEffect(() => {
        const syncNoteData = async () => {
            if (activeNote?.note_id) {
                const freshNote = await noteService.getByNoteId(activeNote.note_id);
                setDisplayNote(freshNote);
            } else {
                setDisplayNote(null);
            }
        };

        syncNoteData();
    }, [activeNote?.note_id, refreshTrigger]);

    const handleToggleEditMode = async () => {
        if (!displayNote) return;
        const newStatus = !displayNote.is_editable;

        await setNoteEditableMode(newStatus);

        setDisplayNote(prev => ({ ...prev, is_editable: newStatus }));
    };

    // Handles the click on a path part to redirect to that note
    const handlePathClick = async (parts, index) => {
        // If current note (last part), do nothing
        if (index === parts.length - 1) return;

        // Rebuild path: ["Root", "Folder"] -> "/Root/Folder"
        const subPathParts = parts.slice(0, index + 1);
        const targetPath = "/" + subPathParts.join("/");

        try {
            const targetNote = await noteService.getNoteByPath(targetPath, activeNote.workspace_id);
            if (targetNote && onNoteSelect) {
                onNoteSelect(targetNote);
            }
        } catch (error) {
            console.error("Error while navigating :", error);
        }
    };

    // Logic for formatting path
    const renderBreadcrumbs = () => {
        if (!displayNote?.note_path) return null;

        const parts = displayNote.note_path.split('/').filter(p => p !== '');

        if (isMobile) {
            const parentName = parts.length > 1 ? parts[parts.length - 2] : null;
            const currentName = parts[parts.length - 1];

            return (
                <div className="flex items-center gap-1 text-xs overflow-hidden">
                    {parentName && (
                        <>
                            <button
                                onClick={() => handlePathClick(parts, parts.length - 2)}
                                className="text-zinc-500 truncate max-w-20"
                            >
                                {parentName}
                            </button>
                            <ChevronRight className="w-3 h-3 shrink-0 opacity-30" />
                        </>
                    )}
                    <span className="text-text-primary font-bold truncate">
                        {currentName}
                    </span>
                </div>
            );
        }

        const segmentClass = (isLast) => `
            truncate transition-colors max-w-[180px]
            ${isLast
                ? "text-text-primary font-semibold cursor-default"
                : "hover:text-primary hover:bg-primary/10 px-1.5 py-0.5 rounded-md cursor-pointer"}
        `;

        // Case: Deep route (Breadcrumbs collapsed)
        if (parts.length > 3) {
            return (
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs overflow-hidden">
                    <button
                        onClick={() => handlePathClick(parts, 0)}
                        className="truncate max-w-37.5 hover:text-text-primary transition-colors"
                    >
                        {parts[0]}
                    </button>
                    <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                    <span className="opacity-50 px-1">...</span>
                    <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                    <button
                        onClick={() => handlePathClick(parts, parts.length - 2)}
                        className="truncate max-w-37.5 hover:text-text-primary transition-colors"
                    >
                        {parts[parts.length - 2]}
                    </button>
                    <ChevronRight className="w-3 h-3 shrink-0 text-primary/50" />
                    <span className="text-text-primary font-semibold truncate">
                        {parts[parts.length - 1]}
                    </span>
                </div>
            );
        }

        // Case: Normal route
        return (
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                {parts.map((part, index) => {
                    const isLast = index === parts.length - 1;
                    return (
                        <div key={index} className="flex items-center gap-1">
                            <button
                                className={segmentClass(isLast)}
                                onClick={() => handlePathClick(parts, index)}
                            >
                                {part}
                            </button>
                            {!isLast && <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={`flex items-center justify-between px-4 py-2 bg-main-bg h-10 shrink-0 z-20 ${isMobile ? 'mt-10' : ''}`}>
            {/* Left side: Note path*/}
            <div className="flex items-center gap-2 overflow-hidden flex-1 mr-4">
                {renderBreadcrumbs()}
            </div>

            {/* Right side: State and actions */}
            <div className="flex items-center gap-4 shrink-0">

                {/* CONFLICT */}
                {syncStatus === SyncStatus.CONFLICT && (
                    <button
                        onClick={onResolveConflict}
                        className="group relative flex items-center p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-lg transition-all cursor-pointer animate-in fade-in zoom-in duration-300"
                    >
                        <AlertTriangle className="w-4 h-4 mr-1.5" />
                        <span className="text-[10px] font-bold uppercase tracking-tight mr-1">{t('conflict.conflict')}</span>

                        {/* Tooltip */}
                        <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-white dark:bg-zinc-800 border border-red-200 dark:border-red-900 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-left">
                            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                                {t('conflict.conflict_warning_pathbar')}
                            </p>
                        </div>
                    </button>
                )}

                {/* Warning for OFFLINE_STALE status */}
                {syncStatus === SyncStatus.OFFLINE_STALE && (
                    <div className="group relative flex items-center">
                        <AlertTriangle className="w-6 h-6 text-amber-500 animate-in fade-in zoom-in duration-300" />

                        {/* Tooltip */}
                        <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-white dark:bg-zinc-800 border border-amber-300 dark:border-amber-900 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-tight">
                                    {t('editor.sync_warning_title')}
                                </span>
                                <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                                    {t('editor.sync_warning_description')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Save status*/}
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${saveStatus === 'saving' ? 'bg-amber-500 animate-pulse' : 'bg-primary'}`} />
                    {!isMobile && (
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                            {saveStatus === 'saving' ? t('editor.saving') : t('editor.saved')}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    {displayNote && (
                        <EditModeButton
                            isEditable={displayNote.is_editable}
                            onToggle={handleToggleEditMode}
                        />
                    )}
                    <ChangeThemeButton />
                    <OptionsMenu editor={editor} />
                </div>
            </div>
        </div>
    );
};

export default PathBar;