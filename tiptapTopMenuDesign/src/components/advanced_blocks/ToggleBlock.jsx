import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import DropdownArrow from "../util/DropdownArrow";

/**
 * 
 * @param {node} param0 
 * @returns 
 */
const ToggleBlockComponent = ({ node, updateAttributes }) => {
  const { isOpen } = node.attrs;

  return (
    <NodeViewWrapper className={`toggle-block group my-2 ${isOpen ? 'is-open' : 'is-closed'}`}>
      <div className="flex items-start">
        {/* Arrow to open or close the toggle */}
        <div
          contentEditable={false}
          onClick={() => updateAttributes({ isOpen: !isOpen })}
          className="mt-1 p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors cursor-pointer flex-shrink-0"
        >
          <DropdownArrow menuOpen={isOpen} defaultRotateAngle={-90} rotateAngle={0} />
        </div>

        {/* Container with the title of the toggle block (first child) and the hidden content */}
        <NodeViewContent className="flex-1 toggle-content-container" />
      </div>
    </NodeViewWrapper>
  );
};

export const ToggleBlock = Node.create({
  name: 'toggleBlock',
  group: 'block',
  content: 'block+', // Makes the toggle block have at least one paragraph (title)
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      isOpen: {
        default: true,
        parseHTML: element => element.getAttribute('data-open') === 'true',
        renderHTML: attributes => ({ 'data-open': attributes.isOpen }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="toggle-block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'toggle-block' }), 0];
  },

  addCommands() {
    return {
      setToggle: () => ({ commands }) => {
        return commands.wrapIn(this.name);
      },
      unsetToggle: () => ({ commands }) => {
        return commands.lift(this.name);
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ToggleBlockComponent);
  },
});