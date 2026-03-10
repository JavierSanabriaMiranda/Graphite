import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import ChangeThemeButton from './util/ChangeThemeButton';
import OptionsMenu from './options_menu/OptionsMenu';

/**
 * PathBar - Topbar for navigation and note state
 */
const PathBar = ({ activeNote, saveStatus, editor }) => {
    const { t } = useTranslation();

    // Logic for formatting path
    const renderBreadcrumbs = () => {
        if (!activeNote?.note_path) return null;

        const parts = activeNote.note_path.split('/').filter(p => p !== '');
        
        // If path is too deep, format it like this: "Root / ... / Parent / Current note"
        if (parts.length > 3) {
            return (
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs overflow-hidden">
                    <span className="truncate max-w-45 hover:text-text-primary transition-colors cursor-default">{parts[0]}</span>
                    <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                    <span className="opacity-50">...</span>
                    <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                    <span className="truncate max-w-45 hover:text-text-primary transition-colors cursor-default">{parts[parts.length - 2]}</span>
                    <ChevronRight className="w-3 h-3 shrink-0 text-primary/50" />
                    <span className="text-text-primary font-semibold truncate">{parts[parts.length - 1]}</span>
                </div>
            );
        }

        return (
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                {parts.map((part, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                        <span className={index === parts.length - 1 
                            ? "text-text-primary font-semibold" 
                            : "truncate max-w-45 hover:text-text-primary transition-colors cursor-default"}>
                            {part}
                        </span>
                        {index < parts.length - 1 && <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />}
                    </div>
                ))}
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