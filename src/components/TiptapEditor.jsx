import { EditorContent, useEditor } from '@tiptap/react' // EditorContent va entre llaves
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline' // Entre llaves
import { TextStyle } from '@tiptap/extension-text-style' // Entre llaves
import { FontFamily } from '@tiptap/extension-font-family' // Entre llaves
import { Color } from '@tiptap/extension-color'
import Code from '@tiptap/extension-code'

import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import MenuBar from './MenuBar'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // 1. Desactivamos el Code que viene por defecto
        code: false,
      }),
      Underline,
      TextStyle,
      FontFamily,
      Placeholder.configure({
        placeholder: 'Escribe algo increíble...',
        // Esta clase se aplica solo al párrafo vacío
        emptyEditorClass: 'is-editor-empty',
      }),
      Color,
      Highlight.configure({ multicolor: true }),
      Code.extend({
        // Esto permite que el código conviva con el color (TextStyle)
        excludes: [],
      }).configure({
        HTMLAttributes: {
          class: 'rounded-md bg-gray-200 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-sm',
        },
      }),
    ],
    content: '<p>Contenido inicial...</p>',
    editorProps: {
      attributes: {
        // Clases de Tailwind aplicadas directamente al área de escritura
        class: 'prose dark:prose-invert prose-slate max-w-none focus:outline-none p-8 min-h-[500px] transition-colors duration-300',
      },
    },
  })

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-main-bg transition-colors duration-300">
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