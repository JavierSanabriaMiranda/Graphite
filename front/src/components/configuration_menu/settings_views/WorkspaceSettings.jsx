import React, { useState, useEffect } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext.';
import DeleteWorkspaceModal from './DeleteWorkspaceModal';
import { useToast } from '../../context/ToastContext';

const WorkspaceSettings = ({ t }) => {
    const { showToast } = useToast();

    const { activeWorkspace, updateWorkspaceName, deleteWorkspace } = useWorkspace();
    const [newName, setNewName] = useState(activeWorkspace?.name || '');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Sync input if workspace changes externally (e.g. renamed from another device)
    useEffect(() => {
        setNewName(activeWorkspace?.name || '');
    }, [activeWorkspace]);

    const handleUpdate = async () => {
        if (newName.trim() && newName !== activeWorkspace?.name) {
            await updateWorkspaceName(newName);
        }
    };

    const handleConfirmDelete = async () => {
        if (activeWorkspace) {
            await deleteWorkspace(activeWorkspace.workspace_id);
        }
        showToast(t('settings.workspace.delete_success'), 'success');
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Rename Section */}
            <div className="p-5 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {t('settings.workspace.name_title')}
                </h4>
                <p className="text-xs md:text-sm text-zinc-500 mt-1 mb-4">
                    {t('settings.workspace.name_description')}
                </p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text-primary"
                    />
                    <button
                        onClick={handleUpdate}
                        disabled={!newName.trim() || newName === activeWorkspace?.name}
                        className="cursor-pointer p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all active:scale-95"
                    >
                        <Save className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="p-5 bg-red-50/30 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
                <h4 className="text-sm md:text-base font-semibold text-red-600 dark:text-red-400">
                    {t('settings.workspace.delete_title')}
                </h4>
                <p className="text-xs md:text-sm text-red-500/70 mt-1 mb-4">
                    {t('settings.workspace.delete_description')}
                </p>
                <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-600/20"
                >
                    <Trash2 className="w-4 h-4" />
                    {t('settings.workspace.delete_button')}
                </button>
            </div>

            <DeleteWorkspaceModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                workspaceName={activeWorkspace?.name}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default WorkspaceSettings;