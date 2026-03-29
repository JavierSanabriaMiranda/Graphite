import React, { useState } from 'react';
import { SmilePlus, ArrowRight, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWorkspace } from '../context/WorkspaceContext.';
import EmojiPicker from '../util/EmojiPicker';
import { useIsMobile } from '../../hooks/useIsMobile';

const CreateWorkspaceView = () => {
    const { t } = useTranslation();
    const { closeCreation, createNewWorkspace } = useWorkspace();
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const isMobile = useIsMobile();

    const handleCreate = () => {
        if (name.trim()) {
            createNewWorkspace(name, icon);
        }
    };

    return (
        <div className="fixed inset-0 z-100 bg-main-bg flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="max-w-3xl w-full flex flex-col">

                <div className="absolute w-120 h-120 bg-primary/10 rounded-full blur-[120px] pointer-events-none top-1/3 right-4  -translate-y-1/2" />
                <div className="absolute w-75 h-75 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[80px] -top-10 -left-10 pointer-events-none" />

                {/* Header */}
                <h1 className={`${isMobile ? "text-4xl" : "text-6xl"} font-bold text-text-primary mb-4 `}>
                    {t('workspaces.create_title') || 'Create Workspace'}
                </h1>
                <p className={`${isMobile ? "text-base" : "text-lg"} text-zinc-800 dark:text-zinc-400 mb-16`}>
                    {t('workspaces.create_subtitle')}
                </p>

                <div className="w-full flex items-start gap-8 mb-16">
                    {/* Icon Upload / Emoji */}
                    <div className="flex flex-col gap-2 items-center">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{t('workspaces.icon')}</span>
                        <div className="relative w-fit group/icon-wrapper">
                            <EmojiPicker onSelect={(emoji) => setIcon(emoji)}>
                                <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-700 dark:border-0 border-2 border-dashed border-zinc-500 hover: hover:border-0 dark:hover:border-2 hover:border-dashed dark:hover:border-primary/50 rounded-xl flex flex-col items-center justify-center hover:bg-zinc-800/50 transition-all cursor-pointer group">
                                    {icon ? (
                                        <span className="text-4xl" style={{ fontFamily: 'var(--font-emoji)' }}>{icon}</span>
                                    ) : (
                                        <SmilePlus className="w-8 h-8 text-zinc-700 dark:text-zinc-300 group-hover:text-main-bg dark:group-hover:text-zinc-400 transition-colors" />
                                    )}
                                </div>
                            </EmojiPicker>
                            {icon && (
                                <button
                                    onClick={() => setIcon('')}
                                    className="absolute -top-2 -right-2 p-1.5 text-text-primary bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm opacity-0 group-hover/icon-wrapper:opacity-100 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900 transition-all z-10"
                                    title={t('editor.remove_icon') || "Quitar icono"}
                                >
                                    <Trash2 className="cursor-pointer w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Name Input */}
                    <div className="flex-1 flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{t('workspaces.set_name')}</span>
                        <input
                            autoFocus
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={isMobile ? t('workspaces.name_placeholder_mobile') : t('workspaces.name_placeholder')}
                            className={`${isMobile ? "text-xl" : "text-4xl"} w-full bg-transparent font-medium text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700 outline-none border-b border-zinc-800 focus:border-primary transition-colors pb-4`}
                        />
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className={`${isMobile ? "gap-12" : "gap-16"} w-full flex items-center justify-end mt-8`}>
                    <button
                        onClick={closeCreation}
                        className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest cursor-pointer"
                    >
                        {t('common.cancel')}
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={!name.trim()}
                        className={`${isMobile ? "px-4" : "px-8"} flex items-center gap-3 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 cursor-pointer`}
                    >
                        <span>{t('workspaces.button_create')}</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateWorkspaceView;