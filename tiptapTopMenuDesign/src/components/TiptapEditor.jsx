import { EditorContent, ReactNodeView, ReactNodeViewRenderer, useEditor } from '@tiptap/react'
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
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
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
import { ToggleBlock } from './advanced_blocks/ToggleBlock/ToggleBlock'
import { ToggleTitle } from './advanced_blocks/ToggleBlock/ToggleTitle'
import { ToggleContent } from './advanced_blocks/ToggleBlock/ToggleContent'

const TiptapEditor = () => {

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
      CodeBlockLowlight.extend({
        // Custom node view to use our CodeBlockComponent, which includes the language selector and better styling
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent)
        }
      }).configure({ lowlight }),
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

  return (
    <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-main-bg transition-colors duration-300">
      <MenuBar editor={editor} />

      <div className="grow overflow-y-auto p-4 md:p-8 editor-scrollbar">
        <div className="max-w-4xl mx-auto w-full">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}

export default TiptapEditor