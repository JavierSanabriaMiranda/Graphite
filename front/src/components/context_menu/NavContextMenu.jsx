import React from 'react';
import {
    useFloating,
    offset,
    flip,
    shift,
    useDismiss,
    useInteractions,
    FloatingPortal,
} from '@floating-ui/react';
import { Trash2, PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NavContextMenu = ({ x, y, onClose, onDeleteClick, onCreateSubpageClick }) => {
    const { t } = useTranslation();

    const { refs, floatingStyles, context } = useFloating({
        open: true,
        onOpenChange: (open) => { if (!open) onClose(); },
        middleware: [offset(5), flip(), shift()],
        placement: 'bottom-start',
    });

    const dismiss = useDismiss(context);
    const { getFloatingProps } = useInteractions([dismiss]);

    // Sync floating position with click coordinates
    React.useEffect(() => {
        refs.setPositionReference({
            getBoundingClientRect: () => ({
                width: 0, height: 0, x, y, top: y, left: x, right: x, bottom: y,
            }),
        });
    }, [x, y, refs]);

    return (
        <FloatingPortal>
            <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="z-9999 min-w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-1.5 animate-in fade-in zoom-in-95 duration-100"
            >
                <button
                    onClick={() => {
                        onCreateSubpageClick();
                        onClose();
                    }}
                    className="w-full flex items-center gap-3 px-2.5 py-2 text-xs font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                    <PlusCircle size={14} />
                    {t('sidebar.context_menu.add_subpage')}
                </button>
                <button
                    onClick={() => {
                        onDeleteClick();
                        onClose();
                    }}
                    className="w-full flex items-center gap-3 px-2.5 py-2 text-xs font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                >
                    <Trash2 size={14} />
                    {t('sidebar.context_menu.delete_page')}
                </button>
            </div>
        </FloatingPortal>
    );
};

export default NavContextMenu;