import { Node } from '@tiptap/core';

/**
 * Content hidden into the ToggleBlock
 */
export const ToggleContent = Node.create({
  name: 'toggleContent',
  group: 'block',
  content: 'block+', // Puede tener párrafos, otros toggles, imágenes...
  selectable: false,
  parseHTML: () => [{ tag: 'div[data-type="toggle-content"]' }],
  renderHTML: ({ HTMLAttributes }) => ['div', { 'data-type': 'toggle-content' }, 0],
});