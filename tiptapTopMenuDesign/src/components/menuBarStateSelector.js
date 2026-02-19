export function menuBarStateSelector(ctx) {
  const { editor } = ctx;

  return {
    // Formato básico
    isBold: editor.isActive('bold'),
    isItalic: editor.isActive('italic'),
    isUnderline: editor.isActive('underline'),
    isStrike: editor.isActive('strike'),
    isCode: editor.isActive('code'),
    isBulletList: ctx.editor.isActive('bulletList'),
    
    // Tipos de bloque (Títulos y Párrafo)
    currentTextType: editor.isActive('heading', { level: 1 }) ? 'h1' 
                   : editor.isActive('heading', { level: 2 }) ? 'h2' 
                   : editor.isActive('heading', { level: 3 }) ? 'h3' 
                   : 'p',

    // Fuentes (Usando getAttributes para mayor precisión)
    currentFont: editor.getAttributes('textStyle').fontFamily || 'Inter',

    // Historial (por si quieres añadir botones de deshacer/rehacer luego)
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
  };
}