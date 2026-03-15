import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import DropdownArrow from "../../util/DropdownArrow";

/**
 * Component to wrap content into a hidden structure composed by a title and the hidden content
 */
export const ToggleBlockComponent = ({ node, updateAttributes }) => {
  const { isOpen } = node.attrs;

  return (
    <NodeViewWrapper className={`toggle-block my-2 ${isOpen ? 'is-open' : 'is-closed'}`}>
      <div className="flex items-start">
        <div
          contentEditable={false}
          onClick={() => updateAttributes({ isOpen: !isOpen })}
          className="mt-1 p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer shrink-0"
        >
          <DropdownArrow menuOpen={isOpen} defaultRotateAngle={-90} rotateAngle={0} />
        </div>

        {/* NodeViewContent renderizará ToggleTitle y ToggleContent aquí */}
        <NodeViewContent className="flex-1" />
      </div>
    </NodeViewWrapper>
  );
};

export const ToggleBlock = Node.create({
  name: 'toggleBlock',
  group: 'block',
  content: 'toggleTitle toggleContent',
  allowGapCursor: false,

  addAttributes() {
    return {
      isOpen: {
        default: true,
        parseHTML: element => element.getAttribute('data-open') === 'true',
        renderHTML: attributes => ({ 'data-open': attributes.isOpen }),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div', 
      mergeAttributes(HTMLAttributes, { 'data-type': 'toggle-block', class: 'toggle-block' }), 
      0
    ];
  },

  addCommands() {
    return {
      setToggle: () => ({ state, chain }) => {
        const { $from } = state.selection;

        // Get paragraph limits
        const from = $from.before($from.depth);
        const to = $from.after($from.depth);

        // Copy the paragraph content
        const content = $from.node($from.depth).content.toJSON();

        return chain()
          .focus()
          // Replace whole paragraph with a toggleBlock
          .insertContentAt({ from, to }, {
            type: this.name,
            content: [
              { type: 'toggleTitle', content }, // The copied paragraph now it's the title
              { type: 'toggleContent', content: [{ type: 'paragraph' }] }, // Empty spaces inside
            ],
          })
          .setTextSelection(to) // Move cursor to the end of the title
          .run();
      },
      unsetToggle: () => ({ state, chain }) => {
        const { selection } = state;
        const { $from } = selection;

        // Get paragraph limits
        const from = $from.before($from.depth);

        // Look for toggleBlock in the JSON
        let pos = -1;
        let node = null;
        for (let d = $from.depth; d > 0; d--) {
          if ($from.node(d).type.name === 'toggleBlock') {
            pos = $from.before(d);
            node = $from.node(d);
            break;
          }
        }

        if (!node || pos === -1) return false;

        // Clone the title and content blocks
        const titleContentJSON = node.child(0).content.toJSON();
        const bodyContentJSON = node.child(1).content.toJSON();

        // Create new structure to replace the toggleBlock
        const nodesToInsert = [
          {
            type: 'paragraph',
            content: titleContentJSON, // Title is a normal paragraph
          },
          ...bodyContentJSON,
        ];

        // Replace toggleBlock with it's inside content
        return chain()
          .focus()
          .insertContentAt({
            from: pos,
            to: pos + node.nodeSize
          }, nodesToInsert)
          .setTextSelection(from)
          .run();
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ToggleBlockComponent);
  },
});