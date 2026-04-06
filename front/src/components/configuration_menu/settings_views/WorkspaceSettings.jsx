import React, { useState, useEffect } from 'react';
import { Save, Trash2, Smile } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext.';
import DeleteWorkspaceModal from './DeleteWorkspaceModal';
import { useToast } from '../../context/ToastContext';
import EmojiPicker from '../../util/EmojiPicker';

/**
 * View that represents the workspace tab settings
 * 
 * @param {Function} t - i18n function to use internationalized strings 
 */
const WorkspaceSettings = ({ t }) => {
    const { showToast } = useToast();

    const { activeWorkspace, updateWorkspaceName, updateWorkspaceIcon, deleteWorkspace } = useWorkspace();
    const [newName, setNewName] = useState(activeWorkspace?.name || '');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Sync input if workspace changes externally (e.g. renamed from another device)
    useEffect(() => {
        setNewName(activeWorkspace?.name || '');
    }, [activeWorkspace]);

    const handleUpdate = async () => {
        if (newName.trim() && newName !== activeWorkspace?.name) {
            await updateWorkspaceName(newName);
            showToast(t('settings.workspace.update_success'), 'success');
        }
    };

    const handleIconSelect = async (newIcon) => {
        try {
            await updateWorkspaceIcon(newIcon);
            showToast(t('settings.workspace.update_success'), 'success');
        } catch (error) {
            showToast(t('settings.workspace.update_error'), 'error');
        }
    };

    const handleConfirmDelete = async () => {
        if (activeWorkspace) {
            await deleteWorkspace(activeWorkspace.workspace_id);
            showToast(t('settings.workspace.delete_success'), 'success');
        }
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
                        className="cursor-pointer p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 transition-all disabled:active:scale-100 active:scale-95"
                    >
                        <Save className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>

            {/* Change icon */}
            <div className="p-5 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {t('settings.workspace.icon_title')}
                </h4>
                <p className="text-xs md:text-sm text-zinc-500 mt-1 mb-4">
                    {t('settings.workspace.icon_description')}
                </p>

                <div className="flex items-center gap-4">
                    <div className="relative w-fit group/icon-wrapper">
                        <EmojiPicker onSelect={handleIconSelect} showIconsMenu={false}>
                            <div className="group relative w-16 h-16 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl flex items-center justify-center text-3xl shadow-sm hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
                                {activeWorkspace?.icon ? (
                                    <span style={{ fontFamily: 'var(--font-emoji)' }}>
                                        {activeWorkspace.icon}
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-zinc-400 font-bold text-xl group-hover:hidden">
                                            {activeWorkspace?.name?.charAt(0).toUpperCase()}
                                        </span>
                                        {/* Overlay al hacer hover */}
                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 flex items-center justify-center transition-colors">
                                            <Smile className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </EmojiPicker>
                        {activeWorkspace?.icon && (
                            <button
                                onClick={() => handleIconSelect('')}
                                className="absolute -top-2 -right-2 p-1.5 text-text-primary bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm opacity-0 group-hover/icon-wrapper:opacity-100 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900 transition-all z-10"
                                title={t('editor.remove_icon')}
                            >
                                <Trash2 className="cursor-pointer w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-text-primary">
                            {activeWorkspace?.icon ? t('settings.workspace.change_icon') : t('settings.workspace.add_icon')}
                        </span>
                        <span className="text-xs text-zinc-500">
                            {t('settings.workspace.icon_hint') || "Haz clic en el cuadro para elegir un emoji."}
                        </span>
                    </div>
                </div>
            </div>

            {/* Danger Zone (Delete) */}
            <div className="p-5 bg-red-50/30 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
                <h4 className="text-sm md:text-base font-semibold text-red-600 dark:text-red-400">
                    {t('settings.workspace.delete_title')}
                </h4>
                <p className="text-xs md:text-sm text-red-500/70 mt-1 mb-4">
                    {t('settings.workspace.delete_description')}
                </p>
                <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl dark:brightness-90 hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-600/20"
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
        </div >
    );
};

export default WorkspaceSettings;