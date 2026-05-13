import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import EmojiPicker from '../util/EmojiPicker';

/**
 * Custom callout component for representing text surrounded by a 
 * rounded square and an icon at the left. 
 * It can be toggled with the "toggleCallout" command, which will wrap the selected text
 * into a callout or take it out if it's already inside one.
 */
export const CalloutComponent = (props) => {
  const { node, updateAttributes } = props;
  const emojiValue = node.attrs.emoji || '💡';
  const isSvg = emojiValue.length > 10;

  const handleEmojiSelect = (newEmoji) => {
    // Updates the internal TipTap state and marks the document as "to save"
    updateAttributes({ emoji: newEmoji });
  };

  return (
    <NodeViewWrapper className="flex gap-3 p-2 my-2 rounded-lg bg-gray-200/50 dark:bg-zinc-800/50 border border-gray-300 dark:border-zinc-700 items-start group">
      {/* Wrap emoji with EmojiPicker */}
      <EmojiPicker onSelect={handleEmojiSelect}>
        <div className="text-xl my-4 ml-2 select-none cursor-pointer hover:scale-110 transition-transform p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 text-zinc-800 dark:text-zinc-100">
          {isSvg ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={emojiValue} />
            </svg>
          ) : (
            <span style={{ fontFamily: 'var(--font-emoji)' }}>{emojiValue}</span>
          )}
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

  renderHTML({ HTMLAttributes, node }) {
    const emojiStr = node.attrs.emoji || '💡';
    const isSvg = emojiStr.includes('M');

    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'callout' }),
      [
        'div',
        { class: 'callout-icon', contenteditable: 'false' },
        isSvg
          ? ['svg', { viewBox: '0 0 24 24', fill: 'currentColor', style: 'width: 24px; height: 24px;' }, ['path', { d: emojiStr }]]
          : emojiStr
      ],
      ['div', { class: 'callout-content' }, 0],
    ];
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