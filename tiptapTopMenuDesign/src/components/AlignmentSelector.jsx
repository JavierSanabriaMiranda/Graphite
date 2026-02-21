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
 * Tool that allows to select the text alignment.
 * 
 * @param {Object} editor - The editor instance 
 */
const AlignmentSelector = ({ editor }) => {
    if (!editor) return null;

    const alignments = [
        { 
            name: 'Left', 
            value: 'left', 
            icon: <path d="M3 6h18M3 12h10M3 18h18" /> 
        },
        { 
            name: 'Center', 
            value: 'center', 
            icon: <path d="M3 6h18M7 12h10M3 18h18" /> 
        },
        { 
            name: 'Right', 
            value: 'right', 
            icon: <path d="M3 6h18M11 12h10M3 18h18" /> 
        },
        { 
            name: 'Justified', 
            value: 'justify', 
            icon: <path d="M3 6h18M3 12h18M3 18h18" /> 
        },
    ];

    // Detect current alignment state
    const currentAlign = useEditorState({
        editor,
        selector: (ctx) => {
            if (ctx.editor.isActive({ textAlign: 'center' })) return 'center';
            if (ctx.editor.isActive({ textAlign: 'right' })) return 'right';
            if (ctx.editor.isActive({ textAlign: 'justify' })) return 'justify';
            return 'left'; // Default
        },
    });

    const [menuOpen, setMenuOpen] = useState(false);

    const currentIcon = alignments.find(a => a.value === currentAlign)?.icon;

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
        <div className="relative inline-block" >
            {/* Main button */}
            <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                ref={refs.setReference}
                {...getReferenceProps()}
                className="flex items-center gap-2 p-2 bg-main-bg rounded-lg hover:bg-hover-primary-bg transition-colors"
                title="Alineación"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-gray-700 dark:text-zinc-300"
                >
                    {currentIcon}
                </svg>
                <DropdownArrow menuOpen={menuOpen} defaultRotateAngle={0} />
            </button>

            {/* Selection menu */}
            {menuOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className="absolute z-20 p-1.5 bg-main-bg border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl flex items-center gap-1 animate-in fade-in zoom-in duration-150"
                    onClick={(e) => e.stopPropagation()}
                >
                    {alignments.map((align) => (
                        <button
                            key={align.value}
                            type="button"
                            onClick={() => {
                                editor.chain().focus().setTextAlign(align.value).run();
                                setMenuOpen(false);
                            }}
                            className={`p-2 rounded-lg transition-all flex items-center justify-center ${
                                currentAlign === align.value
                                    ? 'text-white dark:text-primary bg-primary dark:bg-primary/10 shadow-sm'
                                    : 'hover:bg-hover-primary-bg text-gray-700 dark:text-zinc-300'
                            }`}
                            title={align.name}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                {align.icon}
                            </svg>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AlignmentSelector;