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
import { Copy, Clipboard, Link as LinkIcon, Scissors, ListPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EditorContextMenu = ({ x, y, onClose, editor }) => {
    const { t } = useTranslation();

    // Virtual positioning with Floating UI
    const { refs, floatingStyles, context } = useFloating({
        open: true,
        onOpenChange: (open) => { if (!open) onClose(); },
        middleware: [offset(5), flip(), shift()],
        placement: 'bottom-start',
    });

    // Close at click outside or Escape key
    const dismiss = useDismiss(context);
    const { getFloatingProps } = useInteractions([dismiss]);

    // Set virtual reference to the click position
    React.useEffect(() => {
        refs.setPositionReference({
            getBoundingClientRect: () => ({
                width: 0, height: 0, x, y, top: y, left: x, right: x, bottom: y,
            }),
        });
    }, [x, y, refs]);

    const menuItems = [
        {
            label: t('editor.context_menu.copy'),
            icon: <Copy size={14} />,
            action: () => { editor.commands.focus(); document.execCommand('copy'); }
        },
        {
            label: t('editor.context_menu.cut'),
            icon: <Scissors size={14} />,
            action: () => { editor.commands.focus(); document.execCommand('cut'); }
        },
        {
            label: t('editor.context_menu.paste'),
            icon: <Clipboard size={14} />,
            action: async () => {
                editor.commands.focus();
                try {
                    const text = await navigator.clipboard.readText();
                    editor.commands.insertContent(text);
                } catch (err) {
                    console.error("No se pudo acceder al portapapeles", err);
                }
            }
        },
        { type: 'separator' },
        {
            label: t('editor.context_menu.add_content_block'),
            icon: <ListPlus size={14} />,
            action: () => {
                // Inserts / to trigger the slash commands suggestion
                editor.chain().focus().insertContent('/').run();
            }
        },
        {
            label: t('editor.context_menu.add_link_to_note'),
            icon: <LinkIcon size={14} />,
            action: () => {
                // Inserts [[ to trigger the NoteLink suggestion
                editor.chain().focus().insertContent('[[').run();
            },
            className: 'text-primary'
        },
    ];

    return (
        <FloatingPortal>
            <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="z-9999 min-w-45 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-1.5 animate-in fade-in zoom-in-95 duration-100"
            >
                {menuItems.map((item, index) => (
                    item.type === 'separator' ? (
                        <div key={index} className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
                    ) : (
                        <button
                            key={index}
                            onClick={() => { item.action(); onClose(); }}
                            className={`w-full flex items-center gap-3 px-2.5 py-2 text-xs font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer ${item.className || 'text-zinc-700 dark:text-zinc-300'}`}
                        >
                            <span className="opacity-70">{item.icon}</span>
                            {item.label}
                        </button>
                    )
                ))}
            </div>
        </FloatingPortal>
    );
};

export default EditorContextMenu;