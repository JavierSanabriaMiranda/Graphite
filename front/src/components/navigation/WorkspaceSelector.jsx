import { useState } from 'react';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal
} from '@floating-ui/react';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWorkspace } from '../context/WorkspaceContext.';
import { useIsMobile } from '../../hooks/useIsMobile';

const WorkspaceSelector = () => {
    const { t } = useTranslation();
    const { workspaces, activeWorkspace, selectWorkspace, openCreation } = useWorkspace();
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(8), flip(), shift()],
        whileElementsMounted: autoUpdate,
        placement: 'bottom-start',
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ]);

    return (
        <>
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className={`${isMobile ?
                    "group flex items-center gap-3 w-full p-2 -ml-2 mb-6 hover:bg-hover-primary-bg rounded-2xl transition-all active:scale-95"
                    : "group flex items-center gap-2 overflow-hidden hover:bg-hover-primary-bg p-1 -ml-1 rounded-lg transition-all cursor-pointer flex-1 mr-2"
                 }`}
            >
                <div 
                    className={`${isMobile ? "w-12 h-12 text-2xl" : "w-8 h-8 text-xl"} bg-primary/10 dark:bg-primary/30 rounded shrink-0 flex items-center justify-center font-bold text-black dark:text-white shadow-sm group-hover:scale-105 transition-transform`}
                    style={{ fontFamily: 'var(--font-emoji)'}}
                >
                    {activeWorkspace?.icon || activeWorkspace?.name?.charAt(0).toUpperCase() || 'W'}
                </div>
                <div className="flex flex-col min-w-0">
                    <h2 className={`${isMobile ? "text-2xl font-bold" : "font-semibold"}  text-text-primary truncate text-left`}>
                        {activeWorkspace?.name || '...'}
                    </h2>
                </div>
                <ChevronsUpDown className="w-3 h-3 text-zinc-500 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Menú Flotante */}
            {isOpen && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        style={{ ...floatingStyles, visibility: isOpen ? 'visible' : 'hidden' }}
                        {...getFloatingProps()}
                        className="z-100 w-64 bg-main-bg border border-gray-300 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150"
                    >
                        <div className="p-2 max-h-72 overflow-y-auto custom-scrollbar">
                            <span className="px-2 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                {t('workspaces.title') || 'Workspaces'}
                            </span>

                            <div className="mt-1 space-y-0.5">
                                {workspaces.map((ws) => (
                                    <button
                                        key={ws.workspace_id}
                                        onClick={() => {
                                            selectWorkspace(ws);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xl transition-colors
                                            ${activeWorkspace?.workspace_id === ws.workspace_id
                                                ? 'bg-primary/10 text-primary font-bold'
                                                : 'cursor-pointer text-text-primary hover:bg-hover-primary-bg'
                                            }`}
                                    >
                                        <div 
                                            className="w-5 h-5 bg-zinc-200 dark:bg-zinc-800 rounded flex items-center justify-center text-xl font-bold"
                                            style={{ fontFamily: 'var(--font-emoji)' }}
                                        >
                                            {ws.icon || ws.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="truncate flex-1 text-left">{ws.name}</span>
                                        {activeWorkspace?.workspace_id === ws.workspace_id && (
                                            <Check className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-gray-300 dark:border-zinc-700 p-1">
                            <button
                                onClick={() => { openCreation(); setIsOpen(false); }}
                                className="cursor-pointer w-full flex items-center gap-2 px-2 py-1.5 text-xs text-zinc-500 hover:text-text-primary hover:bg-hover-primary-bg rounded-md transition-all"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>{t('workspaces.create') || 'Create Workspace'}</span>
                            </button>
                        </div>
                    </div>
                </FloatingPortal>
            )}
        </>
    );
};

export default WorkspaceSelector;