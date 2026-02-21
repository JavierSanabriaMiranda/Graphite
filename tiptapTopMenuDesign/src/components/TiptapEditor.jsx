import { EditorContent, useEditor } from '@tiptap/react' // EditorContent va entre llaves
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline' // Entre llaves
import { TextStyle } from '@tiptap/extension-text-style' // Entre llaves
import { FontFamily } from '@tiptap/extension-font-family' // Entre llaves
import { Color } from '@tiptap/extension-color'
import Code from '@tiptap/extension-code'
import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import MenuBar from './MenuBar'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable default code to custom it
        code: false,
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
      Placeholder.configure({
        placeholder: 'Escribe algo increíble...',
        emptyEditorClass: 'is-editor-empty',
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

      <div className="grow overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}

export default TiptapEditor