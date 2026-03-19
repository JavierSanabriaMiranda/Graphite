import React, { useState } from 'react';
import { useEditorState } from '@tiptap/react';
import { useTranslation } from 'react-i18next';
import {
    Type, Bold, Italic, Underline, List, CheckSquare,
    ChevronUp, Palette, Highlighter, AlignLeft, Strikethrough, Code, CodeXml, Heading1, Heading2, Heading3
} from 'lucide-react';
import { ListOrderedIcon } from 'lucide-react';
import { menuBarStateSelector } from '../util/menuBarStateSelector';
import DropdownArrow from '../util/DropdownArrow';

const MobileFormattingSheet = ({ editor }) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const state = useEditorState({ editor, selector: menuBarStateSelector });

    if (!editor) return null;

    // Función para ejecutar comando y cerrar si es necesario
    const run = (callback) => {
        callback();
        // Opcional: setIsExpanded(false); 
    };

    const handleGridItemClick = (action) => {
        action();
        setIsExpanded(false);
    }

    // Estilo para los items de la cuadrícula
    const gridItemClass = (isActive) => `
        flex items-center text-left gap-3 w-full p-4 rounded-xl transition-all active:scale-95
        ${isActive
            ? 'bg-primary/10 text-primary font-bold border border-primary/20'
            : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-transparent'}
    `;

    const quickAccessItemClass = (isActive) => `p-2 rounded-lg ${isActive ? 'bg-primary/10 text-primary' : 'text-text-primary'}`

    return (
        <div className="fixed bottom-5 left-0 w-full z-60 flex flex-col pointer-events-none">

            {/* 1. BARRA DE ACCESO RÁPIDO (Sticky above keyboard area) */}
            <div className="w-full bg-main-bg backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 p-2 flex items-center justify-around pointer-events-auto">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={quickAccessItemClass(state.isBold)}>
                    <Bold className="w-4 h-4" />
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={quickAccessItemClass(state.isItalic)}>
                    <Italic className="w-4 h-4" />
                </button>
                <button onClick={() => run(() => editor.chain().focus().toggleUnderline().run())} className={quickAccessItemClass(state.isUnderline)}>
                    <Underline className="w-4 h-4" />
                </button>
                <button onClick={() => run(() => editor.chain().focus().toggleStrike().run())} className={quickAccessItemClass(state.isStrike)}>
                    <Strikethrough className="w-4 h-4" />
                </button>
                <button onClick={() => run(() => editor.chain().focus().toggleCode().run())} className={quickAccessItemClass(state.isCode)}>
                    <CodeXml className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1" />
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`p-2 rounded-xl transition-transform ${isExpanded ? 'bg-primary/10 text-primary' : 'bg-main-bg text-text-primary'}`}
                >
                    <DropdownArrow menuOpen={isExpanded} defaultRotateAngle={180} rotateAngle={0} />
                </button>
            </div>

            {/* 2. CAJÓN DE FORMATO (Grid 2 columnas) */}
            {isExpanded && (
                <div className="custom-scrollbar w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 pointer-events-auto animate-in slide-in-from-bottom-full duration-300 ease-out h-[350px] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{t('editor.toolbar.tools')}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Grupo Títulos */}
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}  className={gridItemClass(editor.isActive('heading', { level: 1 }))}>
                            <Heading1 className="w-5 h-5" /> {t('editor.slash.h1.title')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleHeading({ level: 2 }).run())} className={gridItemClass(editor.isActive('heading', { level: 2 }))}>
                            <Heading2 className="w-5 h-5" /> {t('editor.slash.h2.title')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleHeading({ level: 3 }).run())} className={gridItemClass(editor.isActive('heading', { level: 3 }))}>
                            <Heading3 className="w-5 h-5" /> {t('editor.slash.h3.title')}
                        </button>

                        {/* Grupo Bloques */}
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleCodeBlock().run())} className={gridItemClass(state.isCodeBlock)}>
                            <Code className="w-4 h-4" /> {t('editor.slash.code.title')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleTaskList().run())} className={gridItemClass(state.isTaskList)}>
                            <CheckSquare className="w-4 h-4" /> {t('editor.toolbar.todo_list')}
                        </button>

                        {/* Grupo Listas */}
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleBulletList().run())} className={gridItemClass(state.isBulletList)}>
                            <List className="w-4 h-4" /> {t('editor.toolbar.bulleted_list.bulleted_list')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleOrderedList().run())} className={gridItemClass(state.isOrderedList)}>
                            <ListOrderedIcon className="w-4 h-4" /> {t('editor.toolbar.ordered_list.ordered_list')}
                        </button>
                    </div>

                    {/* Espaciador inferior para evitar que el sistema de navegación del móvil tape botones */}
                    <div className="h-8" />
                </div>
            )}
        </div>
    );
};

export default MobileFormattingSheet;