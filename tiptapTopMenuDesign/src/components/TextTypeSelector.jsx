import { useTranslation } from "react-i18next";

/**
 * TextTypeSelector component that allows the user to select the text type of the current 
 * block (paragraph, heading 1, heading 2, callout...)
 * 
 * @param {Object} editor - The editor instance
 * @param {Object} state - The state of the menu bar, used to know the current text type
 */
const TextTypeSelector = ({ editor, state }) => {

    const { t } = useTranslation();

    return (
        <select
            value={state.currentTextType}
            onChange={(e) => {
                const val = e.target.value;

                if (val === 'p') {
                    editor.chain().focus().setParagraph().run();
                }
                else if (val === 'callout') {
                    editor.chain().focus().toggleCallout().run();
                }
                else if (val === 'quote') {
                    editor.chain().focus().toggleBlockquote().run();
                }
                else if (val === 'code') {
                    editor.chain().focus().toggleCodeBlock().run();
                }
                else if (val.startsWith('h')) {
                    const level = parseInt(val.replace('h', ''));
                    editor.chain().focus().toggleHeading({ level }).run();
                }
            }}
            className="p-1.5 shadow-sm rounded dark:border dark:border-zinc-700 bg-main-bg text-sm focus:ring-2 focus:ring-primary outline-none dark:text-zinc-200 cursor-pointer"
        >
            <option value="p">{t('editor.toolbar.block_type.normal_text')}</option>
            <option value="h1">{t('editor.toolbar.block_type.h1')}</option>
            <option value="h2">{t('editor.toolbar.block_type.h2')}</option>
            <option value="h3">{t('editor.toolbar.block_type.h3')}</option>
            <option value="quote">{t('editor.toolbar.block_type.quote')}</option>
            <option value="callout">{t('editor.toolbar.block_type.callout')}</option>
            <option value="code">{t('editor.toolbar.block_type.code_block.code_block')}</option>
        </select>
    )

}

export default TextTypeSelector