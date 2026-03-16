import { Node } from '@tiptap/core';

/**
 * Title shown in the toggle block
 */
export const ToggleTitle = Node.create({
  name: 'toggleTitle',
  group: 'block',
  content: 'inline*', 
  selectable: false, 
  parseHTML: () => [{ tag: 'div[data-type="toggle-title"]' }],
  renderHTML: ({ HTMLAttributes }) => ['div', { 'data-type': 'toggle-title' }, 0],

  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { selection } = this.editor.state;
        const { $from, empty } = selection;

        const isTitle = $from.parent.type.name === 'toggleTitle';

        // Verify not text selected, cursor at the beginning of the node and is a ToggleTitle
        if (!isTitle || !empty || $from.parentOffset !== 0) {
          return false;
        }

        // If not text selected, cursor at the beginning and toggleTitle, do an unsetToggle
        return this.editor.commands.unsetToggle();
      },
      Enter: () => {
        const { state, chain } = this.editor;
        const { selection } = state;
        const { $from } = selection;

        // Only if it's at the end of the title
        if ($from.parent.type.name !== 'toggleTitle') return false;
        if ($from.parentOffset !== $from.parent.content.size) return false;

        // Get toggle block depth
        const toggleDepth = $from.depth - 1;
        const toggleBlockNode = $from.node(toggleDepth);
        const isOpen = toggleBlockNode.attrs.isOpen;

        if (isOpen) {
          // If open, enter in the content
          return chain().focus($from.after() + 2).run();
        }
      }
    };
  },
});