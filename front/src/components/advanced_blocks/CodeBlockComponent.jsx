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
import SearchablePicker from '../util/SearchablePicker';
import { useToast } from '../context/ToastContext';

/**
 * Custom code block component with syntax highlighting, a language selector and a copy content button
 * 
 * @param {} param0 
 * @returns 
 */
export const CodeBlockComponent = ({ node, updateAttributes, extension, editor }) => {

    const { t } = useTranslation();
    const { language } = node.attrs;
    const { showToast } = useToast();

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(0); // For navigating with arrow keys
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

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

    // Prepare list for SearchablePicker
    const languageItems = useMemo(() => {
        const supportedLanguages = extension.options.lowlight.listLanguages();

        const list = supportedLanguages.map(lang => ({
            value: lang,
            label: languageNames[lang] || lang.charAt(0).toUpperCase() + lang.slice(1)
        })).sort((a, b) => a.label.localeCompare(b.label));

        return [
            { value: null, label: t('editor.toolbar.block_type.code_block.auto_detect') },
            ...list
        ];
    }, [extension, t]);

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

    const currentLabel = language
        ? (languageNames[language] || language.charAt(0).toUpperCase() + language.slice(1))
        : t('editor.toolbar.block_type.code_block.auto_detect');

    return (
        <NodeViewWrapper className="relative group my-8">


            {/* Button container */}
            <div
                contentEditable={false}
                className="absolute right-3 top-3 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
                {/* Select language button */}
                <SearchablePicker
                    items={languageItems}
                    value={language}
                    onSelect={(lang) => {
                        updateAttributes({ language: lang });
                        // Focus to code block editor on selection
                        requestAnimationFrame(() => editor.commands.focus());
                    }}
                    buttonLabel={currentLabel}
                    placeholder={t('editor.toolbar.block_type.code_block.search_language')}
                    placement="bottom-end"
                    width="w-52"
                />
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