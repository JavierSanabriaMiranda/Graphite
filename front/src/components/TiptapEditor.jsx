import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import i18next from 'i18next'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import { Color } from '@tiptap/extension-color'
import Code from '@tiptap/extension-code'
import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { createLowlight } from 'lowlight'
import { Details, DetailsContent, DetailsSummary } from '@tiptap/extension-details'

// Importing languages for syntax highlighting in code blocks
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml'; // HTML is registered as xml in lowlight
import css from 'highlight.js/lib/languages/css';

import { Callout } from './advanced_blocks/Callout'

import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import MenuBar from './MenuBar'
import CodeBlockComponent from './advanced_blocks/CodeBlockComponent';
import { CustomCodeBlock } from './advanced_blocks/CodeBlockComponent'
import { ToggleBlock } from './advanced_blocks/ToggleBlock/ToggleBlock'
import { ToggleTitle } from './advanced_blocks/ToggleBlock/ToggleTitle'
import { ToggleContent } from './advanced_blocks/ToggleBlock/ToggleContent'

import { noteService } from '../services/db/noteService';

const TiptapEditor = ({ activeNote, onNoteUpdate }) => {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');

  // Instance for syntax highlighting in code blocks
  const lowlight = createLowlight()
  lowlight.register('java', java)
  lowlight.register('javascript', javascript)
  lowlight.register('python', python)
  lowlight.register('c', c)
  lowlight.register('cpp', cpp)
  lowlight.register('csharp', csharp);
  lowlight.register('bash', bash);
  lowlight.register('html', xml); // Register as HTML but lowlight uses 'xml' for it
  lowlight.register('css', css);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable default code to custom it
        code: false,
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'], // Specifies when text can be aligned
      }),
      BulletList.extend({
        addAttributes() {
          return {
            listStyle: {
              default: 'default', // Default style
              parseHTML: element => element.getAttribute('data-list-style'),
              renderHTML: attributes => ({ 'data-list-style': attributes.listStyle }),
            },
          }
        },
      }),
      OrderedList.extend({
        addAttributes() {
          return {
            listStyle: {
              default: 'default', // Default style
              parseHTML: element => element.getAttribute('data-list-style'),
              renderHTML: attributes => ({ 'data-list-style': attributes.listStyle }),
            },
          }
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true, // Allows tasks to be nested inside other tasks
      }),
      Color,
      Highlight.configure({ multicolor: true }),
      Code.extend({
        // Allows code blocks to be styled with Tailwind classes, while keeping inline code simple
        excludes: [],
      }).configure({
        HTMLAttributes: {
          class: 'rounded-md bg-gray-200 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-sm',
        },
      }),
      CustomCodeBlock.configure({
        lowlight,
      }).extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent)
        }
      }),
      Callout,
      Details.configure({
        persist: true, // Maintains the open/closed state of details blocks even after re-rendering
        HTMLAttributes: {
          class: 'details-wrapper',
        },
      }),
      ToggleBlock,
      ToggleTitle,
      ToggleContent,
      DetailsSummary,
      DetailsContent,
      Placeholder.configure({
        includeChildren: true,
        placeholder: ({ node, editor, pos }) => {
          const { state } = editor;
          const $pos = state.doc.resolve(pos);

          // Placeholder for toggle title
          if (node.type.name === 'toggleTitle') {
            return i18next.t('editor.toggle_title');
          }

          // Placeholder for toggle content
          if (node.type.name === 'paragraph' && $pos.parent.type.name === 'toggleContent') {
            return i18next.t('editor.toggle_empty');
          }

          // Global placeholder (when editor is empty)
          if (editor.isEmpty && node.type.name === 'paragraph') {
            return i18next.t('editor.placeholder');
          }

          return '';
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        // Tailwind classes for the editor content area
        class: 'prose dark:prose-invert prose-slate max-w-none focus:outline-none p-8 min-h-[500px] transition-colors duration-300',
      },
    },
  })

  // Effect to load selected note
  useEffect(() => {
    if (editor && activeNote) {
      try {
        const content = JSON.parse(activeNote.content);
        editor.commands.setContent(content);
      } catch (e) {
        editor.commands.setContent(activeNote.content || '');
      }
    } else if (editor && !activeNote) {
      editor.commands.setContent('');
    }
  }, [activeNote, editor]);

  // Sync title when note changes
  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title || '');
      setIcon(activeNote.icon || '');
    } else {
      setTitle('');
      setIcon('');
    }
  }, [activeNote]);

  // Save changes on db and tells the sidebar
  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle); // Actualización visual inmediata en el input
  };

  const saveTitle = async () => {
    if (activeNote && title !== activeNote.title) {
      // Update on DB
      await noteService.update(activeNote.note_id, { title: title });

      // Tells the App.jsx component to update the sidebar
      if (onNoteUpdate) onNoteUpdate();
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden bg-main-bg transition-colors duration-300">
      <MenuBar editor={editor} />

      <div className="grow overflow-y-auto editor-scrollbar">
        <div className={`max-w-3xl mx-auto w-ful px-8 pb-16 ${icon !== '' ? 'pt-8' : ''}`}>

          {/* Header */}
          <div className="group mb-8">
            {/* Page icon */}
            <div className="text-7xl mb-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 w-fit p-2 rounded-xl cursor-pointer transition-colors min-h-[1.2em]">
              {icon || <span className="opacity-0 group-hover:opacity-30 text-4xl text-zinc-400">add_icon</span>}
            </div>

            {/* Title */}
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={saveTitle} // Save when losing focus
              onKeyDown={(e) => e.key === 'Enter' && e.target.blur()} // Save using enter
              placeholder="Sin título"
              className="w-full text-5xl font-bold bg-transparent border-none outline-none text-text-primary placeholder:opacity-20 transition-all"
            />
          </div>

          {/* Editor body */}
          <div className="tiptap-container">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TiptapEditor