import { Node } from '@tiptap/core';

/**
 * Title shown in the toggle block
 */
export const ToggleTitle = Node.create({
  name: 'toggleTitle',
  group: 'block',
  content: 'inline*', // Solo texto
  selectable: false, // Se selecciona a través del padre
  parseHTML: () => [{ tag: 'div[data-type="toggle-title"]' }],
  renderHTML: ({ HTMLAttributes }) => ['div', { 'data-type': 'toggle-title' }, 0],
});