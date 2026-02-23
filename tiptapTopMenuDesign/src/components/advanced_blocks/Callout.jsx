import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewContent, NodeViewWrapper } from '@tiptap/react';

const CalloutComponent = () => {
  return (
    <NodeViewWrapper className="flex gap-3 p-4 my-4 rounded-lg bg-gray-200 dark:bg-zinc-800/50 border border-gray-300 dark:border-zinc-700 items-start group">
      <div className="text-xl select-none" contentEditable={false}>
        💡
      </div>
      {/* NodeViewContent where paragraphs will be */}
      <NodeViewContent className="flex-1 outline-none callout-content" />
    </NodeViewWrapper>
  );
};

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+', // Allow paragraphs inside
  defining: true,

  parseHTML() {
    return [{ tag: 'div[data-type="callout"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'callout' }), 0];
  },

  addCommands() {
    return {
      toggleCallout: () => ({ commands, editor }) => {
        // Use editor.isActive to know if cursor is inside
        if (editor.isActive('callout')) {
          // If it's already in a callout, lift the block (take it out of container)
          return commands.lift('callout');
        }
        // If it's not in a callout, wrap the selected paragraphs into a new callout
        return commands.wrapIn('callout');
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },
});