import { useState } from 'react';
import { useEditorState } from '@tiptap/react';
import DropdownArrow from './DropdownArrow';
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
 * @returns 
 */
const ColorPicker = ({ editor }) => {
    if (!editor) return null;

    const presets = [
        { name: 'Rojo', color: '#ef4444' },
        { name: 'Azul', color: '#3b82f6' },
        { name: 'Verde', color: '#22c55e' },
        { name: 'Amarillo', color: '#eab308' },
        { name: 'Púrpura', color: '#a855f7' },
    ];

    const currentColor = useEditorState({
        editor,
        selector: (ctx) => ctx.editor.getAttributes('textStyle').color,
    });

    const [menuOpen, setMenuOpen] = useState(false);

    // Positioning and interactions with Floating UI
    const { refs, floatingStyles, context } = useFloating({
        open: menuOpen,
        onOpenChange: setMenuOpen,
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
            {/* Main button */}
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 p-2 bg-main-bg rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
            >
                <div
                    className={`w-6 h-6 border border-black/10 rounded-full ${!currentColor ? 'bg-checkerboard' : ''}`}
                    style={{ backgroundColor: currentColor }}
                />
                <DropdownArrow menuOpen={menuOpen} defaultRotateAngle={0} />
            </button>

            {/* Color menu */}
            {menuOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className="absolute z-20 p-2 bg-main-bg border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in zoom-in duration-150"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Color presets container */}
                    <div className="flex items-center gap-1.5">
                        {presets.map(({ name, color }) => (
                            <button
                                key={color}
                                onClick={() => {
                                    editor.chain().focus().setColor(color).run();
                                    setMenuOpen(false); // Opcional: cerrar al elegir
                                }}
                                className={`w-6 h-6 rounded-full border transition-all hover:scale-110 active:scale-95 ${editor.isActive('textStyle', { color })
                                        ? 'ring-2 ring-blue-500 border-white'
                                        : 'border-transparent'
                                    }`}
                                style={{ backgroundColor: color }}
                                title={name}
                            />
                        ))}
                    </div>

                    {/* divisor */}
                    <div className="w-px h-6 bg-gray-200 dark:bg-zinc-600" />

                    {/* custom color selector */}
                    <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 overflow-hidden border border-gray-300 dark:border-zinc-500 rounded-md shadow-sm">
                            <input
                                type="color"
                                onInput={e => editor.chain().focus().setColor(e.target.value).run()}
                                value={currentColor}
                                className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                            />
                        </div>

                        {/* Reset button */}
                        <button
                            onClick={() => {
                                editor.chain().focus().unsetColor().run();
                                setMenuOpen(false);
                            }}
                            className="p-1 text-[10px] uppercase tracking-wider font-bold text-gray-400 hover:text-red-500 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;