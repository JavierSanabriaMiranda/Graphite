import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import EmojiPicker from '../util/EmojiPicker';

/**
 * Custom callout component for representing text surrounded by a 
 * rounded square and an icon at the left. 
 * It can be toggled with the "toggleCallout" command, which will wrap the selected text
 * into a callout or take it out if it's already inside one.
 */
const CalloutComponent = (props) => {
  const { node, updateAttributes } = props;

  const handleEmojiSelect = (newEmoji) => {
    // Updates the internal TipTap state and marks the document as "to save"
    updateAttributes({ emoji: newEmoji });
  };

  return (
    <NodeViewWrapper className="flex gap-3 p-2 my-2 rounded-lg bg-gray-200 dark:bg-zinc-800/50 border border-gray-300 dark:border-zinc-700 items-start group">
      {/* Wrap emoji with EmojiPicker */}
      <EmojiPicker onSelect={handleEmojiSelect}>
        <div
          className="text-xl my-4 ml-2 select-none cursor-pointer hover:scale-110 transition-transform p-1 rounded hover:bg-black/5 dark:hover:bg-white/10"
          contentEditable={false}
        >
          {node.attrs.emoji}
        </div>
      </EmojiPicker>
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

  addAttributes() {
    return {
      emoji: {
        default: '💡', // Default emoji
        // How to store emoji on html (for persistance)
        parseHTML: element => element.getAttribute('data-emoji'),
        renderHTML: attributes => ({ 'data-emoji': attributes.emoji }),
      },
    };
  },

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