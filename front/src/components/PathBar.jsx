import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import ChangeThemeButton from './util/ChangeThemeButton';
import OptionsMenu from './options_menu/OptionsMenu';
import { noteService } from '../services/db/noteService'

/**
 * PathBar - Topbar for navigation and note state
 */
const PathBar = ({ activeNote, saveStatus, editor, onNoteSelect }) => {
    const { t } = useTranslation();

    // Handles the click on a path part to redirect to that note
    const handlePathClick = async (parts, index) => {
        // If current note (last part), do nothing
        if (index === parts.length - 1) return;

        // Reconstruimos el path: ["Raiz", "Carpeta"] -> "/Raiz/Carpeta"
        const subPathParts = parts.slice(0, index + 1);
        const targetPath = "/" + subPathParts.join("/");

        try {
            const targetNote = await noteService.getNoteByPath(targetPath, activeNote.workspace_id);
            if (targetNote && onNoteSelect) {
                onNoteSelect(targetNote);
            }
        } catch (error) {
            console.error("Error al navegar por el path:", error);
        }
    };

    // Logic for formatting path
    const renderBreadcrumbs = () => {
        if (!activeNote?.note_path) return null;

        const parts = activeNote.note_path.split('/').filter(p => p !== '');

        const segmentClass = (isLast) => `
            truncate transition-colors max-w-45
            ${isLast
                ? "text-text-primary font-semibold cursor-default"
                : "hover:text-primary hover:bg-primary/10 px-1.5 py-0.5 rounded-md cursor-pointer"}
        `;

        // If path is too deep, format it like this: "Root / ... / Parent / Current note"
        if (parts.length > 3) {
            return (
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs overflow-hidden">
                    <span onClick={() => handlePathClick(parts, 0)} className="truncate max-w-45 hover:text-text-primary transition-colors cursor-default">{parts[0]}</span>
                    <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                    <span className="opacity-50">...</span>
                    <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                    <span onClick={() => handlePathClick(parts, part.length - 2)} className="truncate max-w-45 hover:text-text-primary transition-colors cursor-default">{parts[parts.length - 2]}</span>
                    <ChevronRight className="w-3 h-3 shrink-0 text-primary/50" />
                    <span className="text-text-primary font-semibold truncate">{parts[parts.length - 1]}</span>
                </div>
            );
        }

        return (
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                {parts.map((part, index) => {
                    const isLast = index === parts.length - 1;
                    return (
                        <div key={index} className="flex items-center gap-1">
                            <span
                                className={segmentClass(isLast)}
                                onClick={() => handlePathClick(parts, index)}
                            >
                                {part}
                            </span>
                            {!isLast && <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300 dark:border-zinc-800 bg-main-bg h-10 shrink-0 z-20">
            {/* Left side: Note path*/}
            <div className="flex items-center gap-2 overflow-hidden flex-1 mr-4">
                {renderBreadcrumbs()}
            </div>

            {/* Right side: State and actions */}
            <div className="flex items-center gap-4 shrink-0">
                {/* Save status*/}
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${saveStatus === 'saving' ? 'bg-amber-500 animate-pulse' : 'bg-primary'}`} />
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                        {saveStatus === 'saving' ? t('editor.saving') : t('editor.saved')}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 border-l border-gray-300 dark:border-zinc-700 pl-4">
                    <ChangeThemeButton />
                    <OptionsMenu editor={editor} />
                </div>
            </div>
        </div>
    );
};

export default PathBar;