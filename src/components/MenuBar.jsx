import { useEditorState } from '@tiptap/react';
import { menuBarStateSelector } from './menuBarStateSelector';
import ChangeThemeButton from './ChangeThemeButton';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const state = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  const getBtnClass = (isActive) => `
    px-3 py-1.5 rounded border transition-all duration-200 text-sm font-medium
    ${isActive 
      ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
      : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700'}
  `;

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 shrink-0">
      {/* Select de Tipo de Texto */}
      <select 
        value={state.currentTextType} 
        onChange={(e) => {
          const val = e.target.value;
          if (val === 'p') editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: parseInt(val.replace('h', '')) }).run();
        }}
        className="p-1.5 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-zinc-200"
      >
        <option value="p">Texto Normal</option>
        <option value="h1">Título 1</option>
        <option value="h2">Título 2</option>
        <option value="h3">Título 3</option>
      </select>

      {/* Select de Fuentes */}
      <select 
        value={state.currentFont}
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
        className="p-1.5 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-zinc-200"
      >
        <option value="Inter">Inter</option>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>

      {/* Divisor Visual */}
      <div className="w-px h-6 bg-gray-200 dark:bg-zinc-700 mx-1" /> {/* Divisor */}

      {/* Botones de Formato con isActive() nativo */}
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
      
      <ChangeThemeButton />
    </div>
  );
};

export default MenuBar;