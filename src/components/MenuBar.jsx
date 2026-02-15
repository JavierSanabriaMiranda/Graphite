import { useEditorState } from '@tiptap/react';
import { menuBarStateSelector } from './menuBarStateSelector';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const state = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  return (
    <div className="menu-bar">
      {/* Select de Tipo de Texto */}
      <select 
        value={state.currentTextType} 
        onChange={(e) => {
          const val = e.target.value;
          if (val === 'p') editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: parseInt(val.replace('h', '')) }).run();
        }}
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
      >
        <option value="Inter">Inter</option>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>

      <div className="divider" />

      {/* Botones de Formato con isActive() nativo */}
      <button 
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={state.isBold ? 'is-active' : ''}
      >
        <b>B</b>
      </button>
      <button 
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={state.isItalic ? 'is-active' : ''}
      >
        <i>I</i>
      </button>
      <button 
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={state.isUnderline ? 'is-active' : ''}
      >
        <u>U</u>
      </button>
    </div>
  );
};

export default MenuBar;