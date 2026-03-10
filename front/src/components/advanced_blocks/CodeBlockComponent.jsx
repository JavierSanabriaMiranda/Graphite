import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { mergeAttributes } from '@tiptap/core'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    useFloating,
    offset,
    flip,
    shift,
    autoUpdate,
    useInteractions,
    useClick,
    useDismiss,
    FloatingPortal
} from '@floating-ui/react';
import DropdownArrow from '../util/DropdownArrow';
import { useToast } from '../util/ToastContext';

/**
 * Custom code block component with syntax highlighting, a language selector and a copy content button
 * 
 * @param {} param0 
 * @returns 
 */
const CodeBlockComponent = ({ node, updateAttributes, extension, editor }) => {

    const { t } = useTranslation();
    const { language } = node.attrs;
    const { showToast } = useToast();

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(0); // For navigating with arrow keys
    const inputRef = useRef(null);

    // Supported languages for syntax highlighting, obtained from the lowlight instance of the CodeBlockLowlight extension
    const languages = extension.options.lowlight.listLanguages();

    const languageNames = {
        'c': 'C',
        'csharp': 'C#',
        'bash': 'Bash',
        'html': 'HTML',
        'css': 'CSS',
        'cpp': 'C++',
        'java': 'Java',
        'javascript': 'JavaScript',
        'python': 'Python',
    };

    /**
     * Logic for copying the code block content to the clipboard. 
     * It uses the Clipboard API to write the text content of the code block to the 
     * clipboard and shows a toast notification on success.
     */
    const copyToClipboard = () => {
        const code = node.textContent;
        navigator.clipboard.writeText(code).then(() => {
            showToast(t('editor.toolbar.block_type.code_block.copy_success'), "success");
        });
    };

    // Floating UI setup for the language selector dropdown
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-end',
        middleware: [offset(8), flip(), shift({ padding: 10 })],
        whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useDismiss(context),
    ]);

    const filteredLanguages = useMemo(() => {
        return languages
            .filter(lang => lang.toLowerCase().includes(search.toLowerCase()))
            .sort();
    }, [languages, search]);

    // Make the searching field get the focus when opening the language menu
    useEffect(() => {
        if (isOpen) {
            setActiveIndex(0);
            // Timeout to make sure the Floating-UI portal has been mounted
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [isOpen]);

    // Function to select a language from the list using the ENTER key
    const selectLanguage = (lang) => {
        updateAttributes({ language: lang });
        setIsOpen(false);
        setSearch('');

        requestAnimationFrame(() => {
            editor.commands.focus();
        });
    };

    /**
     * Function to move on the menu options with arrow keys
     * 
     * @param {Event} e - Keydown event to handle
     */
    const handleSearchKeyDown = (e) => {
        const maxIndex = filteredLanguages.length;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev < maxIndex ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex === 0) {
                selectLanguage(null); // Auto-detect option
            } else {
                selectLanguage(filteredLanguages[activeIndex - 1]); // Adjust index
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            editor.commands.focus();
        }
    };

    const currentLabel = languageNames[language] || (language ? language.charAt(0).toUpperCase() + language.slice(1) : t('editor.toolbar.block_type.code_block.auto_detect'));

    return (
        <NodeViewWrapper className="relative group my-8">


            {/* Button container */}
            <div
                contentEditable={false}
                className="absolute right-3 top-3 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
                {/* Select language button */}
                <button
                    ref={refs.setReference}
                    {...getReferenceProps()}
                    contentEditable={false}
                    className="cursor-pointer flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-md 
                     bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400
                     border border-zinc-200 dark:border-zinc-700
                     hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100
                     shadow-sm transition-colors"
                >
                    <span>{currentLabel}</span>
                    <DropdownArrow menuOpen={isOpen} defaultRotateAngle={0} />
                </button>
                {/* Copy code button */}
                <button
                    onClick={copyToClipboard}
                    title={t('editor.toolbar.block_type.code_block.copy_content')}
                    className="cursor-pointer flex items-center justify-center p-1.5 rounded-md
                     bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400
                     border border-zinc-200 dark:border-zinc-700
                     hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100
                     shadow-sm transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                    </svg>
                </button>
            </div>

            {/* Floating menu */}

            <FloatingPortal style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
                <div
                    ref={refs.setFloating}
                    style={{ ...floatingStyles, visibility: isOpen ? 'visible' : 'hidden' }}
                    {...getFloatingProps()}
                    className="z-1000 w-52 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-150"
                >
                    {/* Searching zone */}
                    <div className="p-2 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="relative">
                            <svg className="absolute left-2 top-2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                ref={inputRef}
                                autoFocus
                                placeholder={t('editor.toolbar.block_type.code_block.search_language')}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                                className="w-full pl-7 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border-none rounded-md focus:ring-1 focus:ring-primary outline-none dark:text-zinc-200"
                            />
                        </div>
                    </div>

                    {/* Language list */}
                    <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                        <button
                            onClick={() => selectLanguage(null)}
                            onMouseEnter={() => setActiveIndex(0)}
                            className={`cursor-pointer w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${!language ? 'bg-primary/10 text-primary' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}
                        >
                            {t('editor.toolbar.block_type.code_block.auto_detect')}
                        </button>

                        <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />

                        {filteredLanguages.length > 0 ? (
                            filteredLanguages.map((lang, index) => {
                                const visualIndex = index + 1;
                                return (
                                    <button
                                        key={lang}
                                        onClick={() => selectLanguage(lang)}
                                        onMouseEnter={() => setActiveIndex(visualIndex)}
                                        className={`cursor-pointer w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between 
                                            ${activeIndex === visualIndex ? 'bg-zinc-100 dark:bg-zinc-800' : ''}
                                            ${language === lang ? 'bg-primary dark:bg-primary/10 text-white dark:text-primary font-bold' : 'text-zinc-600 dark:text-zinc-400'}`}
                                    >
                                        {languageNames[lang] || lang}
                                        {language === lang && <span className="text-[10px]">●</span>}
                                    </button>
                                )
                            })
                        ) : (
                            <div className="px-3 py-4 text-center text-xs text-zinc-400 italic">{t('editor.toolbar.block_type.code_block.no_results')}</div>
                        )}
                    </div>
                </div>
            </FloatingPortal>


            {/* Code area */}
            <pre className="rounded-xl overflow-hidden shadow-2xs bg-zinc-950 p-5 pt-14 font-mono text-sm leading-relaxed border border-zinc-800">
                <NodeViewContent as="code" className={language ? `language-${language}` : ''} />
            </pre>
        </NodeViewWrapper>
    );
};

export default CodeBlockComponent;

export const CustomCodeBlock = CodeBlockLowlight.extend({
    priority: 1000,

    renderHTML({ node, HTMLAttributes }) {
        return [
            'pre', 
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 
            [
                'code', 
                { 
                    class: node.attrs.language 
                        ? `language-${node.attrs.language}` 
                        : null 
                }, 
                0
            ]
        ]
    },

    addKeyboardShortcuts() {
        return {
            // Tab for inserting a '\t'
            Tab: () => {
                if (!this.editor.isActive('codeBlock')) return false
                return this.editor.commands.insertContent('\t')
            },

            // ENTER: Keeps the previous line indenting
            Enter: () => {
                if (!this.editor.isActive('codeBlock')) return false

                const { state } = this.editor
                const { selection } = state
                const { $from } = selection

                const currentLineText = $from.nodeBefore?.text?.split('\n').pop() || ''
                const indentMatch = currentLineText.match(/^(\s+)/)
                const indent = indentMatch ? indentMatch[1] : ''

                // Insert same tabs as the previous line
                return this.editor.commands.insertContent('\n' + indent)
            },
        }
    },
})