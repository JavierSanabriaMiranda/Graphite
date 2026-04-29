import { ReactRenderer } from '@tiptap/react';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import { Quote, Heading1, Heading2, Heading3, FileText, Code, Smile } from 'lucide-react';
import { ToggleIcon } from '../advanced_blocks/toggle_block/ToggleIcon';
import { TodoIcon } from '../menu_bar/lists/TodoList';
import { NumberedListIcon } from '../menu_bar/lists/NumberedListSelector';
import { BulletedListIcon } from '../menu_bar/lists/BulletSelector';
import SlashMenuList from './SlashMenuList';

/**
 * Generates the configuration for the Tiptap Suggestion utility.
 * This factory function injects external dependencies needed for item localization 
 * and specific business logic, such as sub-page creation.
 *
 * @param {Function} t - The i18next translation function for localizing titles and search terms.
 * @param {Function} createSubnote - Asynchronous function to handle the creation of sub-pages in the database.
 * @param {Function} selectNote - Function to handle changing note
 * @returns {Object} A configuration object containing 'items' (filtering logic) and 'render' (UI/Floating UI logic).
 */
const getSuggestionConfig = (t, createSubnote, selectNote, onEmojiCommand) => ({
  items: ({ query }) => {
    const items = [
      {
        title: t('editor.slash.normal_text.title'),
        searchTerms: t('editor.slash.normal_text.search').split(','),
        icon: 'M4 6h16M4 12h16M4 18h7',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setParagraph().run();
        },
      },
      {
        title: t('editor.slash.h1.title'),
        searchTerms: t('editor.slash.h1.search').split(','),
        icon: Heading1,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
        },
      },
      {
        title: t('editor.slash.h2.title'),
        searchTerms: t('editor.slash.h2.search').split(','),
        icon: Heading2,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
        },
      },
      {
        title: t('editor.slash.h3.title'),
        searchTerms: t('editor.slash.h3.search').split(','),
        icon: Heading3,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
        },
      },
      {
        title: t('editor.slash.page.title'),
        searchTerms: t('editor.slash.page.search').split(','),
        icon: FileText,
        command: async ({ editor, range }) => {
          const newNote = await createSubnote();
          if (newNote) {
            editor.chain().focus().deleteRange(range).insertPageBlock(newNote.note_id).run();
            if (selectNote) {
              selectNote(newNote);
            }
          }
        },
      },
      {
        title: t('editor.slash.code.title'),
        searchTerms: t('editor.slash.code.search').split(','),
        icon: Code,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
        },
      },
      {
        title: t('editor.slash.quote.title'),
        searchTerms: t('editor.slash.quote.search').split(','),
        icon: Quote,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
      },
      {
        title: t('editor.slash.callout.title'),
        searchTerms: t('editor.slash.callout.search').split(','),
        icon: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCallout().run();
        },
      },
      {
        title: t('editor.slash.toggle.title'),
        searchTerms: t('editor.slash.toggle.search').split(','),
        icon: ToggleIcon,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setToggle().run();
        },
      },
      {
        title: t('editor.slash.to-do.title'),
        searchTerms: t('editor.slash.to-do.search').split(','),
        icon: TodoIcon,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
      },
      {
        title: t('editor.slash.bulleted_list.title'),
        searchTerms: t('editor.slash.bulleted_list.search').split(','),
        icon: BulletedListIcon,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().updateAttributes('bulletList', { listStyle: "default" }).run();
        },
      },
      {
        title: t('editor.slash.numbered_list.title'),
        searchTerms: t('editor.slash.numbered_list.search').split(','),
        icon: NumberedListIcon,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().updateAttributes('orderedList', { listStyle: "default" }).run();
        },
      },
      {
        title: t('editor.slash.emoji.title'),
        searchTerms: t('editor.slash.emoji.search').split(','),
        icon: Smile,
        command: ({ editor, range }) => {
          // Remove slash command text ("/emoji")
          editor.chain().focus().deleteRange(range).run();
          
          // Call function that will open EmojiPicker
          if (onEmojiCommand) {
            onEmojiCommand();
          }
        },
      },
    ];

    return items
      .filter(item => {
        const queryLower = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(queryLower) ||
          item.searchTerms.some(term => term.includes(queryLower))
        );
      })
      .slice(0, 20);
  },

  render: () => {
    let component;
    let container;

    const updatePosition = async (clientRect, element) => {
      if (!clientRect || !element) return;
      const { x, y } = await computePosition(
        { getBoundingClientRect: clientRect },
        element,
        {
          placement: 'bottom-start',
          middleware: [offset(8), flip(), shift({ padding: 10 })],
        }
      );
      Object.assign(element.style, { left: `${x}px`, top: `${y}px` });
    };

    return {
      onStart: props => {
        component = new ReactRenderer(SlashMenuList, {
          props,
          editor: props.editor,
        });

        container = component.element;
        Object.assign(container.style, {
          position: 'fixed',
          visibility: 'visible',
          top: '0',
          left: '0',
          zIndex: '9999',
        });

        document.body.appendChild(container);
        updatePosition(props.clientRect, container);
      },
      onUpdate(props) {
        component.updateProps(props);
        updatePosition(props.clientRect, container);
      },
      onKeyDown(props) {
        if (props.event.key === 'Escape') return true;
        return component.ref?.onKeyDown(props);
      },
      onExit() {
        if (container && document.body.contains(container)) {
          document.body.removeChild(container);
        }
        component.destroy();
      },
    };
  },
});

export default getSuggestionConfig;