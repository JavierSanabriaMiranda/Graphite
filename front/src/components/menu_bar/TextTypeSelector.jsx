import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNote } from '../context/NoteContext';
import SearchablePicker from '../util/SearchablePicker';

const OPTIONS = [
    { id: 'p', label: 'editor.toolbar.block_type.normal_text', icon: 'M4 6h16M4 12h16M4 18h7' },
    {
        id: 'h1',
        label: 'editor.toolbar.block_type.h1',
        icon: 'M17 19h4m-2 0V9l-2 1M4 5v14M5 5H3M5 19H3M12 5v14M11 5h2M11 19h2M4 12h8'
    },
    {
        id: 'h2',
        label: 'editor.toolbar.block_type.h2',
        icon: 'M16 12v-0.5A2.5 2.5 0 0 1 18.5 9h0A2.5 2.5 0 0 1 21 11.5v0.33A2.52 2.52 0 0 1 19.74 14l-1.26 0.72A4.91 4.91 0 0 0 16 19h5M4 5v14M5 5H3M5 19H3M11 5v14M10 5h2M10 19h2M4 12h7'
    },
    {
        id: 'h3',
        label: 'editor.toolbar.block_type.h3',
        icon: 'M16 9h5l-2.75 4H19a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2h0M4 5v14M5 5H3M5 19H3M11 5v14M10 5h2M10 19h2M4 12h7'
    },
    {
        id: 'quote',
        label: 'editor.toolbar.block_type.quote',
        icon: 'M5.315 3.401c-1.61 0-2.916 1.343-2.916 3 0 1.656 1.306 3 2.916 3 2.915 0 .972 5.799-2.916 5.799v1.4c6.939.001 9.658-13.199 2.916-13.199zm8.4 0c-1.609 0-2.915 1.343-2.915 3 0 1.656 1.306 3 2.915 3 2.916 0 .973 5.799-2.915 5.799v1.4c6.938.001 9.657-13.199 2.915-13.199z'
    },
    { id: 'callout', label: 'editor.toolbar.block_type.callout', icon: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01' },
    { id: 'code', label: 'editor.toolbar.block_type.code_block.code_block', icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6' },
    {
        id: 'page',
        label: 'editor.toolbar.block_type.page',
        icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M12 18v-6 M9 15h6'
    },
];

// Generic icon that receives a path
const Icon = ({ d, id, className = "w-4 h-4" }) => (
    <svg
        className={className}
        fill={id === 'quote' ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={id === 'quote' ? "0" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d={d} />
    </svg>
);

/**
 * TextTypeSelector component that allows the user to select the text type of the current 
 * block (paragraph, heading 1, heading 2, callout...). Opens a floating menu to select the text type
 * with a field to search by text
 * 
 * @param {Object} editor - The editor instance
 * @param {Object} state - The state of the menu bar, used to know the current text type
 */
const TextTypeSelector = ({ editor, state }) => {
    const { t } = useTranslation();
    const { selectNote, createSubnote } = useNote();

    const pickerItems = useMemo(() => {
        return OPTIONS.map(opt => ({
            value: opt.id,
            label: t(opt.label),
            icon: <Icon d={opt.icon} id={opt.id} />
        }));
    }, [t]);

    /**
     * Changes the texttype on the editor
     * 
     * @param {String} val that represents the text type
     */
    const handleSelect = async (val) => {
        const chain = editor.chain().focus();
        if (val === 'p') chain.setParagraph().run();
        else if (val.startsWith('h')) chain.toggleHeading({ level: Number.parseInt(val.replace('h', '')) }).run();
        else if (val === 'quote') chain.toggleBlockquote().run();
        else if (val === 'callout') chain.toggleCallout().run();
        else if (val === 'code') chain.toggleCodeBlock().run();
        else if (val === 'page') {
            const newNote = await createSubnote();

            if (newNote) {
                chain.insertPageBlock(newNote.note_id).run();
                selectNote(newNote);
            }
        }
    };

    const currentOption = OPTIONS.find(opt => opt.id === state.currentTextType) || OPTIONS[0];

    return (
        <SearchablePicker
            items={pickerItems}
            value={state.currentTextType}
            onSelect={handleSelect}
            buttonLabel={t(currentOption.label)}
            placeholder={t('editor.toolbar.block_type.search')}
            width="w-64"
            placement="bottom-start"
            buttonClassName="cursor-pointer flex items-center justify-between gap-2 min-w-30 p-1.5 px-3 bg-app-bg border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-text-primary outline-none focus:ring-2 focus:ring-primary/50"
            fontSize="text-sm"
        />
    );
};

export default TextTypeSelector;