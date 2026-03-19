import React, { useState, useEffect } from 'react';
import { useEditorState } from '@tiptap/react';
import { useTranslation } from 'react-i18next';
import {
    TriangleAlert, Bold, Italic, Underline, List, CheckSquare, Quote,
    FileText, Strikethrough, Code, CodeXml, Heading1, Heading2, Heading3
} from 'lucide-react';
import { ListOrderedIcon } from 'lucide-react';
import { menuBarStateSelector } from '../util/menuBarStateSelector';
import { ToggleIcon } from '../advanced_blocks/toggle_block/ToggleIcon';
import DropdownArrow from '../util/DropdownArrow';
import { useNote } from '../context/NoteContext';

const MobileFormattingSheet = ({ editor }) => {
    const { t } = useTranslation();
    const { selectNote, createSubnote } = useNote();
    const [isExpanded, setIsExpanded] = useState(false);
    const [bottomOffset, setBottomOffset] = useState(20);
    const state = useEditorState({ editor, selector: menuBarStateSelector });

    // Use effect for adding bottom margin when keyboard has been opened
    useEffect(() => {
        if (!window.visualViewport) return;

        const handleResize = () => {
            const viewportHeight = window.visualViewport.height;
            const windowHeight = window.innerHeight;

            const offset = windowHeight - viewportHeight;
            setBottomOffset(offset > 0 ? bottomOffset + 20 : 20);
        };

        window.visualViewport.addEventListener('resize', handleResize);
        window.visualViewport.addEventListener('scroll', handleResize);

        return () => {
            window.visualViewport.removeEventListener('resize', handleResize);
            window.visualViewport.removeEventListener('scroll', handleResize);
        };
    }, []);

    if (!editor) return null;

    // Function to execute a command and close menu
    const handleGridItemClick = (action) => {
        action();
        setIsExpanded(false);
    }

    // Grid style
    const gridItemClass = (isActive) => `
        flex items-center text-left gap-3 w-full p-4 rounded-xl transition-all active:scale-95
        ${isActive
            ? 'bg-primary/10 text-primary font-bold border border-primary/20'
            : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-transparent'}
    `;

    const quickAccessItemClass = (isActive) => `p-2 rounded-lg ${isActive ? 'bg-primary/10 text-primary' : 'text-text-primary'}`

    return (
        <div
            className="fixed left-0 w-full z-60 flex flex-col pointer-events-none transition-all duration-200 ease-out bottom-16"
        >

            {/* Quickaccess bar */}
            <div className="w-full bg-main-bg backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 p-2 flex items-center justify-around pointer-events-auto"
                style={{ paddingBottom: `${bottomOffset}px` }} >
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

            {/* Menu with 2 columns */}
            {isExpanded && (
                <div className="custom-scrollbar w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 pointer-events-auto animate-in slide-in-from-bottom-full duration-300 ease-out h-87.5 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{t('editor.toolbar.tools')}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Titles */}
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleHeading({ level: 1 }).run())} className={gridItemClass(editor.isActive('heading', { level: 1 }))}>
                            <Heading1 className="w-5 h-5" /> {t('editor.slash.h1.title')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleHeading({ level: 2 }).run())} className={gridItemClass(editor.isActive('heading', { level: 2 }))}>
                            <Heading2 className="w-5 h-5" /> {t('editor.slash.h2.title')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleHeading({ level: 3 }).run())} className={gridItemClass(editor.isActive('heading', { level: 3 }))}>
                            <Heading3 className="w-5 h-5" /> {t('editor.slash.h3.title')}
                        </button>

                        {/* Blocks */}
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleBlockquote().run())} className={gridItemClass(state.currentTextType === 'quote')}>
                            <Quote className="w-4 h-4" /> {t('editor.slash.quote.title')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleCodeBlock().run())} className={gridItemClass(state.currentTextType === 'codeBlock')}>
                            <Code className="w-4 h-4" /> {t('editor.slash.code.title')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleCallout().run())} className={gridItemClass(state.currentTextType === 'callout')}>
                            <TriangleAlert className="w-4 h-4" /> {t('editor.slash.callout.title')}
                        </button>
                        <button onClick={() => handleGridItemClick(async () => {
                            const newNote = await createSubnote();

                            if (newNote) {
                                editor.chain().insertPageBlock(newNote.note_id).run();
                                selectNote(newNote);
                            }
                        })} className={gridItemClass(false)}>
                            <FileText className="w-4 h-4" /> {t('editor.slash.page.title')}
                        </button>

                        {/* Lists */}
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleBulletList().run())} className={gridItemClass(state.isBulletList)}>
                            <List className="w-4 h-4" /> {t('editor.toolbar.bulleted_list.bulleted_list')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleOrderedList().run())} className={gridItemClass(state.isOrderedList)}>
                            <ListOrderedIcon className="w-4 h-4" /> {t('editor.toolbar.ordered_list.ordered_list')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => editor.chain().focus().toggleTaskList().run())} className={gridItemClass(state.isTaskList)}>
                            <CheckSquare className="w-4 h-4" /> {t('editor.toolbar.todo_list')}
                        </button>
                        <button onClick={() => handleGridItemClick(() => state.isToggle ? editor.chain().focus().unsetToggle().run() : editor.chain().focus().setToggle().run())} className={gridItemClass(state.isToggle)}>
                            <ToggleIcon className="w-4 h-4" /> {t('editor.toolbar.toggle_block')}
                        </button>
                    </div>

                    <div className="h-8" />
                </div>
            )}
        </div>
    );
};

export default MobileFormattingSheet;