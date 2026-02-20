import { useState } from 'react';
import { useEditorState } from '@tiptap/react';
import DropdownArrow from './DropdownArrow';
import { useClickOutside } from '../hooks/useClickOutside';

/**
 * Tool that allows to select the bullet style for the bullet list.
 * 
 * @param {Object} editor - The editor instance 
 */
const BulletSelector = ({ editor }) => {
    if (!editor) return null;

    // Icons for the different bullet styles
    const options = [
        { 
            id: 'default', 
            name: 'Dots', 
            icon: (
                <g fill="currentColor">
                    <circle cx="4" cy="5" r="2.5" />
                    <circle cx="4" cy="12" r="2.5" />
                    <circle cx="4" cy="19" r="2.5" />
                    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7">
                        <line x1="10" y1="5" x2="21" y2="5" />
                        <line x1="10" y1="12" x2="21" y2="12" />
                        <line x1="10" y1="19" x2="21" y2="19" />
                    </g>
                </g>
            ) 
        },
        { 
            id: 'circle', 
            name: 'Circles', 
            icon: (
                <g fill="none" stroke="currentColor" strokeLinecap="round">
                    <circle cx="4" cy="5" r="2.5" strokeWidth="1.5" />
                    <circle cx="4" cy="12" r="2.5" strokeWidth="1.5" />
                    <circle cx="4" cy="19" r="2.5" strokeWidth="1.5" />
                    <g strokeWidth="2" opacity="0.7">
                        <line x1="10" y1="5" x2="21" y2="5" />
                        <line x1="10" y1="12" x2="21" y2="12" />
                        <line x1="10" y1="19" x2="21" y2="19" />
                    </g>
                </g>
            ) 
        },
        { 
            id: 'square', 
            name: 'Squares', 
            icon: (
                <g fill="currentColor">
                    <rect x="2" y="3.5" width="4.5" height="4.5" />
                    <rect x="2" y="10" width="4.5" height="4.5" />
                    <rect x="2" y="16.5" width="4.5" height="4.5" />
                    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7">
                        <line x1="10" y1="5.5" x2="21" y2="5.5" />
                        <line x1="10" y1="12.5" x2="21" y2="12.5" />
                        <line x1="10" y1="19.5" x2="21" y2="19.5" />
                    </g>
                </g>
            ) 
        },
        { 
            id: 'mix', 
            name: 'Mix', 
            icon: (
                <g stroke="currentColor" strokeLinecap="round">
                    {/* Nivel 1: Disco */}
                    <circle cx="4" cy="5" r="2.5" fill="currentColor" stroke="none"/>
                    <line x1="10" y1="5" x2="21" y2="5" strokeWidth="2" />
                    
                    {/* Nivel 2: Círculo hueco */}
                    <circle cx="4" cy="12" r="2.3" fill="none" strokeWidth="1.5"/>
                    <line x1="10" y1="12" x2="21" y2="12" strokeWidth="2" opacity="0.7" />
                    
                    {/* Nivel 3: Cuadrado */}
                    <rect x="1.75" y="16.75" width="4.5" height="4.5" fill="currentColor" stroke="none"/>
                    <line x1="10" y1="19" x2="21" y2="19" strokeWidth="2" opacity="0.4" />
                </g>
            )
        },
    ];

    const currentStyle = useEditorState({
        editor,
        selector: (ctx) => ctx.editor.getAttributes('bulletList').listStyle || 'default',
    });

    const isBulletActive = useEditorState({
        editor,
        selector: (ctx) => ctx.editor.isActive('bulletList'),
    });

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useClickOutside(() => setMenuOpen(false));

    const toggleStyle = (styleId) => {
        if (!isBulletActive) {
            editor.chain().focus().toggleBulletList().updateAttributes('bulletList', { listStyle: styleId }).run();
        } else if (currentStyle === styleId) {
            editor.chain().focus().toggleBulletList().run();
        } else {
            editor.chain().focus().updateAttributes('bulletList', { listStyle: styleId }).run();
        }
        setMenuOpen(false);
    };

    return (
        <div className="relative inline-block" ref={menuRef}>
            {/* Main button */}
            <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex items-center gap-1 p-2 rounded-lg transition-all ${
                    isBulletActive 
                    ? 'bg-primary dark:bg-primary/10 text-white dark:text-primary shadow-md' 
                    : 'bg-main-bg text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                }`}
                title="Lista de viñetas"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Shows the default or the selected option icon */}
                    {options.find(o => o.id === currentStyle)?.icon || options[0].icon}
                </svg>
                <DropdownArrow menuOpen={menuOpen} defaultRotateAngle={0} />
            </button>

            {/* Selection menu */}
            {menuOpen && (
                <div className="absolute z-30 mt-2 p-1.5 bg-main-bg border border-gray-200 dark:border-zinc-700 rounded-xl shadow-2xl flex items-center gap-1 animate-in fade-in zoom-in duration-150">
                    {options.map((opt) => (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleStyle(opt.id)}
                            className={`p-2 rounded-lg transition-all hover:scale-105 active:scale-95 ${
                                isBulletActive && currentStyle === opt.id 
                                ? 'bg-primary dark:bg-primary/10 text-white dark:text-primary' 
                                : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-800 dark:text-gray-300'
                            }`}
                            title={opt.name}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {opt.icon}
                            </svg>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BulletSelector;