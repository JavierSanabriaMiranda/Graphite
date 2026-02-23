/**
 * TextTypeSelector component that allows the user to select the text type of the current 
 * block (paragraph, heading 1, heading 2, callout...)
 * 
 * @param {Object} editor - The editor instance
 * @param {Object} state - The state of the menu bar, used to know the current text type
 */
const TextTypeSelector = ({ editor, state }) => {

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
                else if (val.startsWith('h')) {
                    const level = parseInt(val.replace('h', ''));
                    editor.chain().focus().toggleHeading({ level }).run();
                }
            }}
            className="p-1.5 shadow-sm rounded dark:border dark:border-zinc-700 bg-main-bg text-sm focus:ring-2 focus:ring-primary outline-none dark:text-zinc-200 cursor-pointer"
        >
            <option value="p">Texto Normal</option>
            <option value="h1">Título 1</option>
            <option value="h2">Título 2</option>
            <option value="h3">Título 3</option>
            <option value="callout">Callout</option>
        </select>
    )

}

export default TextTypeSelector