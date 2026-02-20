import { useEditorState } from '@tiptap/react';
import { menuBarStateSelector } from './menuBarStateSelector';
import ChangeThemeButton from './ChangeThemeButton';
import ColorPicker from './ColorPicker';
import HighlightPicker from './HighlightPicker';
import AlignmentSelector from './AlignmentSelector';
import BulletSelector from './BulletSelector';
import NumberedListSelector from './NumberedListSelector';
import TodoList from './TodoList';

/**
 * Top menu component that allows the user to edit the written text with the given tools
 * 
 * @param {Object} editor - The editor instance
 */
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const state = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  const getBtnClass = (isActive) => `
    px-3 py-1.5 rounded transition-all duration-200 text-sm font-medium
    ${isActive
      ? 'text-white dark:text-primary bg-primary dark:bg-primary/10 transition-colors'
      : 'bg-main-bg text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'}
  `;

  const getDivisor = () => <div className="w-px h-6 bg-gray-300 dark:bg-zinc-700 mx-1" />; // Divisor

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-main-bg border-b border-gray-300 dark:border-zinc-700 shrink-0">
      <div className="flex-1 invisible md:visible">
        {/* Div to keep the menubar content adjusted in center while keeping changeThemeButton at the side */}
      </div>

      {/* Central group: All the tools */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Text type */}
        <select
          value={state.currentTextType}
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'p') editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: parseInt(val.replace('h', '')) }).run();
          }}
          className="p-1.5 shadow-sm rounded dark:border dark:border-zinc-700 bg-main-bg text-sm focus:ring-2 focus:ring-primary outline-none dark:text-zinc-200"
        >
          <option value="p">Texto Normal</option>
          <option value="h1">Título 1</option>
          <option value="h2">Título 2</option>
          <option value="h3">Título 3</option>
        </select>

        {/* Fonts */}
        <select
          value={state.currentFont}
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="p-1.5 shadow-sm rounded dark:border dark:border-zinc-700 bg-main-bg text-sm focus:ring-2 focus:ring-primary outline-none dark:text-zinc-200"
        >
          <option value="Inter">Inter</option>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>

        {/* Divisor */}
        {getDivisor()}

        {/* Format buttons */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={getBtnClass(state.isBold)}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={getBtnClass(state.isItalic)}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={getBtnClass(state.isUnderline)}
        >
          <u>U</u>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={getBtnClass(state.isStrike)}
        >
          <s className="decoration-2">S</s>
        </button>

        {/* Code button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={getBtnClass(state.isCode)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
        </button>

        {/* Divisor */}
        {getDivisor()} 

        <ColorPicker editor={editor} />
        <HighlightPicker editor={editor} />

        {/* Divisor */}
        {getDivisor()}

        <AlignmentSelector editor={editor} />

        {/* Lists */}
        <BulletSelector editor={editor} />

        <NumberedListSelector editor={editor} />

        <TodoList editor={editor} />
      </div>

      {/* Change theme button at the right side */}
      <div className='flex-1 flex justify-end'>
        <ChangeThemeButton />
      </div>



    </div>
  );
};

export default MenuBar;