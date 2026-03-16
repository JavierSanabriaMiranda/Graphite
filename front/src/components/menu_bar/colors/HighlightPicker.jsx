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
 * Tool that opens a menu with colors to apply as highlight to the selected text. 
 * It also includes a custom color selector and a reset button.
 * 
 * @param {Object} editor - The editor instance
 * @returns 
 */
const HighlightPicker = ({ editor }) => {
    const { t } = useTranslation();
    const currentColor = useEditorState({
        editor,
        selector: (ctx) => ctx.editor.getAttributes('highlight').color,
    });

    const [menuOpen, setMenuOpen] = useState(false);

    if (!editor) return null;

    const presets = [
        { name: t('editor.toolbar.color.red'), color: '#ef4444' },
        { name: t('editor.toolbar.color.blue'), color: '#3b82f6' },
        { name: t('editor.toolbar.color.green'), color: '#22c55e' },
        { name: t('editor.toolbar.color.yellow'), color: '#eab308' },
        { name: t('editor.toolbar.color.purple'), color: '#a855f7' },
    ];

    // Icon for selector
    const HighlightCircle = ({ color, isActive, isReset }) => (
        <div
            className={`
                flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all relative overflow-hidden
                ${isActive ? 'ring-2 ring-primary/40 ring-offset-1 dark:ring-offset-zinc-900 scale-105 border-primary/50' : 'border-zinc-200 dark:border-zinc-700'}
                bg-white dark:bg-zinc-950
            `}
            style={!isReset ? { borderColor: color } : {}}
        >
            {/* Background layer (Color or Checkerboard) */}
            <div
                className={`absolute inset-0 ${isReset ? 'bg-checkerboard' : ''}`}
                style={{ backgroundColor: color, opacity: isReset ? 1 : 0.7 }}
            />

            {!isReset && (
                <span className={`
                    relative z-10 text-base font-bold leading-none
                    ${isReset ? 'text-black' : 'text-zinc-900 dark:text-zinc-100'}
                `}>
                    A
                </span>
            )}
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

    return (
        <div className="relative inline-block">
            {/* BOTÓN PRINCIPAL */}
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className="cursor-pointer flex items-center gap-2 p-1.5 px-2.5 bg-main-bg rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                title={t('editor.toolbar.highlight_color')}
            >
                <div
                    className={`
                        flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all relative overflow-hidden
                        ${!currentColor ? 'border-zinc-300 dark:border-zinc-600' : ''}
                    `}
                    style={currentColor ? { borderColor: currentColor } : {}}
                >
                    {/* Fondo */}
                    <div
                        className={`absolute inset-0 ${!currentColor ? 'bg-checkerboard' : ''}`}
                        style={{ backgroundColor: currentColor, opacity: currentColor ? 0.6 : 1 }}
                    />
                    {/* Letra A (Se muestra si hay color) */}
                    {currentColor && (
                        <span className="relative z-10 text-base font-bold text-zinc-900 dark:text-zinc-100">
                            A
                        </span>
                    )}
                </div>
                <DropdownArrow menuOpen={menuOpen} defaultRotateAngle={0} />
            </button>

            {/* MENÚ DE SELECCIÓN */}
            {menuOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className="z-50 p-2.5 bg-main-bg border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-150"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center gap-2">
                        {/* Botón Reset / Sin resaltado */}
                        <button
                            onClick={() => {
                                editor.chain().focus().unsetHighlight().run();
                                setMenuOpen(false);
                            }}
                            className="cursor-pointer active:scale-95 transition-transform"
                            title={t('common.default')}
                        >
                            <HighlightCircle isReset isActive={!currentColor} />
                        </button>

                        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1" />

                        {/* Presets de Resaltado */}
                        {presets.map(({ name, color }) => (
                            <button
                                key={color}
                                onClick={() => {
                                    editor.chain().focus().setHighlight({ color }).run();
                                    setMenuOpen(false);
                                }}
                                className="cursor-pointer active:scale-95 transition-transform"
                                title={name}
                            >
                                <HighlightCircle
                                    color={color}
                                    isActive={currentColor === color}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />

                    {/* Selector Custom */}
                    <div className="flex items-center gap-2">
                        <div
                            className="relative w-7 h-7 overflow-hidden rounded-full border-2 shadow-inner hover:scale-110 transition-transform flex items-center justify-center"
                            style={{ borderColor: currentColor || '#888888' }}
                        >
                            <div
                                className="absolute inset-0 opacity-60"
                                style={{ backgroundColor: currentColor || 'transparent' }}
                            />
                            {currentColor && (
                                <span className="relative z-10 text-xs font-bold text-zinc-900 dark:text-zinc-100">A</span>
                            )}
                            <input
                                type="color"
                                onInput={e => editor.chain().focus().setHighlight({ color: e.target.value }).run()}
                                value={currentColor || '#000000'}
                                className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer opacity-0"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HighlightPicker;