import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import {TextStyle} from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import MenuBar from './MenuBar'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontFamily,
    ],
    content: '<p>¡Hola! Empieza a escribir tu TFG aquí...</p>',
  })

  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose-container" />
    </div>
  )
}

export default TiptapEditor