import { useState } from 'react';
import { useEditorState } from '@tiptap/react';
import DropdownArrow from './DropdownArrow';
import { useClickOutside } from '../hooks/useClickOutside';

const NumberedListSelector = ({ editor }) => {
    if (!editor) return null;

    const options = [
        { 
            id: 'default', 
            name: 'Numbers (1, 1.1)', 
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
            name: 'Letters (a, b, c)', 
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
            name: 'Roman Numerals (i, ii, iii)', 
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
            name: 'Mix (1, a, i)', 
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

    const currentStyle = useEditorState({
        editor,
        selector: (ctx) => ctx.editor.getAttributes('orderedList').listStyle || 'default',
    });

    const isOrderedActive = useEditorState({
        editor,
        selector: (ctx) => ctx.editor.isActive('orderedList'),
    });

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useClickOutside(() => setMenuOpen(false));

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

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex items-center gap-1 p-2 rounded-lg transition-all ${
                    isOrderedActive 
                    ? 'bg-primary dark:bg-primary/10 text-white dark:text-primary' 
                    : 'bg-main-bg text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 border-transparent'
                }`}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {options.find(o => o.id === currentStyle)?.icon}
                </svg>
                <DropdownArrow menuOpen={menuOpen} defaultRotateAngle={0} />
            </button>

            {menuOpen && (
                <div className="absolute z-30 mt-2 p-1.5 bg-main-bg border border-gray-200 dark:border-zinc-800 rounded-xl shadow-2xl flex items-center gap-1 animate-in fade-in zoom-in duration-100 origin-top-left">
                    {options.map((opt) => {
                        const isActive = isOrderedActive && currentStyle === opt.id;
                        return (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => toggleStyle(opt.id)}
                                className={`p-2 rounded-lg transition-all hover:scale-105 active:scale-95 border ${
                                    isActive 
                                    ? 'bg-primary dark:bg-primary/10 text-white dark:text-primary dark:text-blue-300 border-blue-200 dark:border-blue-800' 
                                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400 border-transparent'
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