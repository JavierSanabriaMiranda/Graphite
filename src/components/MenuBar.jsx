const MenuBar = ({ editor }) => {
  if (!editor) return null;

  // Función para determinar qué título está activo en el dropdown
  const getTextType = () => {
    if (editor.isActive('heading', { level: 1 })) return 'h1';
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    return 'p'; // Párrafo por defecto
  };

  return (
    <div className="menu-bar">
      
      {/* 1. Desplegable de Tipo de Texto */}
      <select 
        value={getTextType()} 
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

      {/* 2. Desplegable de Fuentes */}
      <select 
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
        // Nota: Para que el value sea dinámico aquí, necesitarías una lógica similar a getTextType
      >
        <option value="Inter">Inter (Predeterminada)</option>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>

      <div className="divider" />

      {/* 3. Botones de Formato (Se mantienen como botones por usabilidad) */}
      <button 
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <b>B</b>
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <i>I</i>
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <u>U</u>
      </button>
    </div>
  );
};

export default MenuBar;