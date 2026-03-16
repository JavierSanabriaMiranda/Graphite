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

export const NumberedListIcon = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <text
                x="0" y="7"
                fontSize="9"
                fontWeight="bold"
                fill="currentColor"
                stroke="none"
                style={{ fontFamily: 'sans-serif' }}
            >
                1
            </text>
            <line x1="10" y1="5" x2="22" y2="5" />

            <text
                x="0" y="14"
                fontSize="9"
                fontWeight="bold"
                fill="currentColor"
                stroke="none"
                style={{ fontFamily: 'sans-serif' }}
            >
                2
            </text>
            <line x1="10" y1="12" x2="22" y2="12" />

            <text
                x="0" y="21"
                fontSize="9"
                fontWeight="bold"
                fill="currentColor"
                stroke="none"
                style={{ fontFamily: 'sans-serif' }}
            >
                3
            </text>
            <line x1="10" y1="19" x2="22" y2="19" />
        </g>
    </svg>
);

/**
 * NumberedListSelector component for selecting different ordered list styles in the editor.
 * 
 * @param {Object} editor - The editor instance 
 */
const NumberedListSelector = ({ editor }) => {
    const { t } = useTranslation();

    const currentStyle = useEditorState({
        editor,
        selector: (ctx) => ctx.editor.getAttributes('orderedList').listStyle || 'default',
    });

    const isOrderedActive = useEditorState({
        editor,
        selector: (ctx) => ctx.editor.isActive('orderedList'),
    });

    const [menuOpen, setMenuOpen] = useState(false);

    if (!editor) return null;

    const options = [
        {
            id: 'default',
            name: t('editor.toolbar.ordered_list.numbers'),
            icon: (
                <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <text x="0" y="7" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">1</text>
                    <line x1="10" y1="5" x2="21" y2="5" />
                    <text x="0" y="14" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">2</text>
                    <line x1="10" y1="12" x2="21" y2="12" />
                    <text x="0" y="21" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">3</text>
                    <line x1="10" y1="19" x2="21" y2="19" />
                </g>
            )
        },
        {
            id: 'alpha',
            name: t('editor.toolbar.ordered_list.letters'),
            icon: (
                <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <text x="0" y="7" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">a</text>
                    <line x1="10" y1="5" x2="21" y2="5" />
                    <text x="0" y="14" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">b</text>
                    <line x1="10" y1="12" x2="21" y2="12" />
                    <text x="0" y="21" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">c</text>
                    <line x1="10" y1="19" x2="21" y2="19" />
                </g>
            )
        },
        {
            id: 'roman',
            name: t('editor.toolbar.ordered_list.roman'),
            icon: (
                <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <text x="0" y="7" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">i</text>
                    <line x1="10" y1="5" x2="21" y2="5" />
                    <text x="0" y="14" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">ii</text>
                    <line x1="10" y1="12" x2="21" y2="12" />
                    <text x="0" y="21" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">iii</text>
                    <line x1="10" y1="19" x2="21" y2="19" />
                </g>
            )
        },
        {
            id: 'mix',
            name: t('editor.toolbar.ordered_list.mix'),
            icon: (
                <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <text x="0" y="7" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">1</text>
                    <line x1="10" y1="5" x2="21" y2="5" strokeWidth="2" />
                    <text x="0" y="14" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">a</text>
                    <line x1="10" y1="12" x2="21" y2="12" strokeWidth="2" opacity="0.7" />
                    <text x="1" y="21" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">i</text>
                    <line x1="10" y1="19" x2="21" y2="19" strokeWidth="2" opacity="0.4" />
                </g>
            )
        },
    ];

    const toggleStyle = (styleId) => {
        if (!isOrderedActive) {
            editor.chain().focus().toggleOrderedList().updateAttributes('orderedList', { listStyle: styleId }).run();
        } else if (currentStyle === styleId) {
            editor.chain().focus().toggleOrderedList().run();
        } else {
            editor.chain().focus().updateAttributes('orderedList', { listStyle: styleId }).run();
        }
        setMenuOpen(false);
    };

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
            <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                ref={refs.setReference}
                {...getReferenceProps()}
                className={`cursor-pointer flex items-center gap-1 p-2 rounded-lg transition-all ${isOrderedActive
                    ? 'bg-primary dark:bg-primary/10 text-white dark:text-primary'
                    : 'bg-main-bg text-text-primary hover:bg-hover-primary-bg border-transparent'
                    }`}
                title={t('editor.toolbar.ordered_list.ordered_list')}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {options.find(o => o.id === currentStyle)?.icon}
                </svg>
                <DropdownArrow menuOpen={menuOpen} defaultRotateAngle={0} />
            </button>

            {menuOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className="z-50 p-1.5 bg-main-bg border border-gray-200 dark:border-zinc-800 rounded-xl shadow-2xl flex items-center gap-1 animate-in fade-in zoom-in duration-100"
                >
                    {options.map((opt) => {
                        const isActive = isOrderedActive && currentStyle === opt.id;
                        return (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => toggleStyle(opt.id)}
                                className={`cursor-pointer p-2 rounded-lg transition-all hover:scale-105 active:scale-95 border ${isActive
                                    ? 'bg-primary dark:bg-primary/10 text-white dark:text-primary border-blue-200 dark:border-blue-800'
                                    : 'hover:bg-hover-primary-bg text-gray-500 dark:text-zinc-400 border-transparent'
                                    }`}
                                title={opt.name}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {opt.icon}
                                </svg>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default NumberedListSelector;