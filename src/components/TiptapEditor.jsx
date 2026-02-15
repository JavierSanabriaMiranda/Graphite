import { EditorContent, useEditor } from '@tiptap/react' // EditorContent va entre llaves
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline' // Entre llaves
import { TextStyle } from '@tiptap/extension-text-style' // Entre llaves
import { FontFamily } from '@tiptap/extension-font-family' // Entre llaves
import MenuBar from './MenuBar'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontFamily,
    ],
    content: '<p>Contenido inicial...</p>',
    // NO necesitas onUpdate ni onSelectionUpdate vacíos. 
    // useEditor ya se encarga de re-renderizar el componente 
    // donde se declara cada vez que hay un cambio.
  })

  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose-container" />
    </div>
  )
}

export default TiptapEditor