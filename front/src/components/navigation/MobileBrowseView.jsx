import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, FolderOpen, ChevronRight } from 'lucide-react';
import { noteService } from '../../services/db/noteService';
import { useNote } from '../context/NoteContext';
import NavItem from './NavItem';
import WorkspaceSelector from './WorkspaceSelector';
import { useWorkspace } from '../context/WorkspaceContext.';

const MobileBrowseView = () => {
    const { t } = useTranslation();
    const { refreshTrigger, createRootNote } = useNote();
    const [notes, setNotes] = useState([]);
    const { activeWorkspace: workspace } = useWorkspace();

    useEffect(() => {
        if (workspace) {
            noteService.getRootNotes(workspace.workspace_id).then(setNotes);
        }
    }, [workspace, refreshTrigger]);

    return (
        <div className="flex flex-col h-full bg-main-bg animate-in fade-in duration-300">
            {/* Header */}
            <header className="px-6 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                {/* Workspace button */}
                <WorkspaceSelector/>

                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                        <FolderOpen className="text-primary w-6 h-6" />
                        {t('sidebar.pages')}
                    </h1>
                    <button
                        onClick={createRootNote}
                        className="p-2 bg-primary/10 text-primary rounded-full active:scale-90 transition-transform"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                    {workspace?.name || 'Workspace'}
                </p>
            </header>

            {/* Notes list */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {notes.length > 0 ? (
                    <ul className="space-y-1">
                        {notes.map(note => (
                            <NavItem
                                key={note.note_id}
                                note={note}
                                level={0}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
                        <FolderOpen className="w-12 h-12 mb-2" />
                        <p className="text-sm">{t('common.no_result')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileBrowseView;