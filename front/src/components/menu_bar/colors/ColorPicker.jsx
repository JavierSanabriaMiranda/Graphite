import { useState } from 'react';
import { useEditorState } from '@tiptap/react';
import { useTranslation } from 'react-i18next';
import DropdownArrow from '../../util/DropdownArrow';
import {
    useFloating,
    offset,
    flip,
    shift,
    useInteractions,
    useClick,
    useDismiss,
    autoUpdate
} from '@floating-ui/react';

/**
 * Tool that opens a menu with colors to apply as color to the selected text. 
 * It also includes a custom color selector and a reset button.
 * 
 * @param {Object} editor - The editor instance
 */
const ColorPicker = ({ editor }) => {
    const { t } = useTranslation();

    const currentColor = useEditorState({
        editor,
        selector: (ctx) => ctx.editor.getAttributes('textStyle').color,
    });

    const [menuOpen, setMenuOpen] = useState(false);

    const presets = [
        { name: t('editor.toolbar.color.red'), color: '#ef4444' },
        { name: t('editor.toolbar.color.blue'), color: '#3b82f6' },
        { name: t('editor.toolbar.color.green'), color: '#22c55e' },
        { name: t('editor.toolbar.color.yellow'), color: '#eab308' },
        { name: t('editor.toolbar.color.purple'), color: '#a855f7' },
    ];

    // Icon for the options
    const ColorCircle = ({ color, isActive }) => (
        <div
            className={`
                flex items-center justify-center w-7 h-7 rounded-full border transition-all
                ${isActive ? 'border-primary ring-1 ring-primary/30' : 'border-zinc-200 dark:border-zinc-700'}
                bg-main-bg
            `}
            style={{ borderColor: color }}
        >
            <span
                className="text-base font-bold"
                style={{ color: color || 'inherit' }}
            >
                A
            </span>
        </div>
    );

    // Positioning and interactions with Floating UI
    const { refs, floatingStyles, context } = useFloating({
        open: menuOpen,
        onOpenChange: setMenuOpen,
        placement: 'bottom-start',
        middleware: [
            offset(8), //  Space between button and menu
            flip(),    // Changes to top if not enough space at the bottom
            shift({ padding: 10 }) // Avoids to be cut off the screen edges
        ],
        whileElementsMounted: autoUpdate, // Keeps the position updated if the user scrolls or resizes while the menu is open
    });

    // Interactions for click and dismiss (click outside)
    const click = useClick(context);
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    if (!editor) return null;

    return (
        <div className="relative inline-block">
            {/* Main Button */}
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className="cursor-pointer flex items-center gap-1.5 p-1 px-2 bg-main-bg rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                title={t('editor.toolbar.text_color')}
            >
                <div
                    className={`
                        flex items-center justify-center w-7 h-7 rounded-full border transition-all
                        bg-main-bg
                        ${!currentColor ? 'border-zinc-400 dark:border-zinc-500' : ''}
                    `}
                    style={{ borderColor: currentColor }}
                >
                    <span
                        className={`text-base font-bold ${!currentColor ? 'text-black dark:text-white' : ''}`}
                        style={{ color: currentColor }}
                    >
                        A
                    </span>
                </div>
                <DropdownArrow menuOpen={menuOpen} defaultRotateAngle={0} />
            </button>

            {/* Color menu */}
            {menuOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className="z-50 p-2 bg-main-bg border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-150"
                >
                    <div className="flex items-center gap-1.5">
                        {/* Default option (Black/White based on theme) */}
                        <button
                            onClick={() => {
                                editor.chain().focus().unsetColor().run();
                                setMenuOpen(false);
                            }}
                            className="cursor-pointer group relative"
                            title={t('common.default')}
                        >
                            <div className={`
                                flex items-center justify-center w-7 h-7 rounded-full border transition-all
                                ${!currentColor ? 'border-primary ring-1 ring-primary/30' : 'border-zinc-200 dark:border-zinc-700'}
                                bg-white dark:bg-black
                            `}>
                                <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                    A
                                </span>
                            </div>
                        </button>

                        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1" />

                        {/* Presets */}
                        {presets.map(({ name, color }) => (
                            <button
                                key={color}
                                onClick={() => {
                                    editor.chain().focus().setColor(color).run();
                                    setMenuOpen(false);
                                }}
                                className="cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                                title={name}
                            >
                                <ColorCircle
                                    color={color}
                                    isActive={currentColor === color}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />

                    {/* Custom selector */}
                    <div className="flex items-center gap-2">
                        <div className="relative w-7 h-7 overflow-hidden rounded-full border border-zinc-300 dark:border-zinc-600 shadow-inner group hover:scale-110 transition-transform">
                            <input
                                type="color"
                                onInput={e => editor.chain().focus().setColor(e.target.value).run()}
                                value={currentColor || '#000000'}
                                className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;