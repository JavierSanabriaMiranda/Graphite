import { NodeViewWrapper } from '@tiptap/react'
import { FileText, AlertTriangle } from 'lucide-react'
import { useNote } from '../context/NoteContext'
import NoteIcon from '../util/NoteIcon'
import { t } from 'i18next'

/**
 * Component used to render the noteLink node, showing a link to the linked note with its title and icon
 */
const NoteLinkComponent = ({ node, extension }) => {
  const { noteId } = node.attrs
  const { selectNote, allNotes } = useNote()
  
  const linkedNote = allNotes.find(n => n.note_id === noteId)

  const handleClick = () => {
    if (linkedNote) selectNote(linkedNote)
  }

  if (!linkedNote) {
    return (
      <NodeViewWrapper as="span" className="inline-block opacity-50">
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400 italic text-sm border border-zinc-200 dark:border-zinc-700">
          <AlertTriangle size={12} />
          {t('note_link.broken_link')}
        </span>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper as="span" className="inline-block">
      <button
        onClick={handleClick}
        className="cursor-pointer inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors border-b border-primary/30"
      >
        <span className="w-4 h-4 flex items-center justify-center shrink-0">
          {linkedNote.icon ? (
            <NoteIcon iconChar={linkedNote.icon} />
          ) : (
            <FileText className="w-full h-full" />
          )}
        </span>
        
        <span className="truncate max-w-50">
            {linkedNote.title || 'Untitled Note'}
        </span>
      </button>
    </NodeViewWrapper>
  )
}

export default NoteLinkComponent