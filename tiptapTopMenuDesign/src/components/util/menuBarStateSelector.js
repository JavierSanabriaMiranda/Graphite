/**
 * Allows the menuBar items to know the selected text properties
 * 
 * @param {Context} ctx - Editor context and state
 * @returns 
 */
export function menuBarStateSelector(ctx) {
  const { editor } = ctx;

  return {
    /* Formats */
    isBold: editor.isActive('bold'),
    isItalic: editor.isActive('italic'),
    isUnderline: editor.isActive('underline'),
    isStrike: editor.isActive('strike'),
    isCode: editor.isActive('code'),
    isBulletList: ctx.editor.isActive('bulletList'),
    
    // Text types
    currentTextType: editor.isActive('heading', { level: 1 }) ? 'h1' 
                   : editor.isActive('heading', { level: 2 }) ? 'h2' 
                   : editor.isActive('heading', { level: 3 }) ? 'h3' 
                   : editor.isActive('callout') ? 'callout'
                   : editor.isActive('blockquote') ? 'quote'
                   : 'p',

    // Fonts
    currentFont: editor.getAttributes('textStyle').fontFamily || 'Inter',

    // History
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
  };
}