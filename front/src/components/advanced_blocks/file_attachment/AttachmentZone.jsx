import React, { useState } from 'react';
import { ReactNodeViewRenderer, Node, NodeViewWrapper } from '@tiptap/react';
import { open } from '@tauri-apps/plugin-dialog';
import { useAttachmentUpload } from "../../../hooks/useAttachmentUpload";
import { useNote } from '../../context/NoteContext';
import { useTranslation } from 'react-i18next';

const AttachmentZone = ({ editor, deleteNode }) => {
  const { t } = useTranslation();
  const { selectedNote } = useNote();
  const { uploadAttachment } = useAttachmentUpload(editor, selectedNote.note_id);

  const [isDragging, setIsDragging] = useState(false);

  const handleAction = async (item) => {
    deleteNode();
    await uploadAttachment(item);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) handleAction(e.dataTransfer.files[0]);
  };

  const handleSelectClick = async (e) => {
    e.stopPropagation();
    const selected = await open({
      multiple: false,
      directory: false
    });
    if (selected) handleAction(selected);
  };

  return (
    <NodeViewWrapper className="attachment-zone-wrapper my-6">
      <div
        onClick={handleSelectClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          cursor-pointer relative group flex flex-col items-center justify-center 
          gap-4 p-10 rounded-2xl border-2 border-dashed transition-all duration-200
          ${isDragging
            ? 'border-primary bg-primary/5 scale-[1.01] shadow-lg'
            : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
          }
        `}
      >
        {/* Icon */}
        <div className={`
          flex items-center justify-center w-14 h-14 rounded-full transition-colors duration-200
          ${isDragging ? 'bg-primary text-white' : 'bg-white dark:bg-zinc-800 text-zinc-500 shadow-sm'}
        `}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-7 h-7 ${isDragging ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>

        {/* Text and instructions */}
        <div className="text-center">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {t('attachment.attachment_zone_title')}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {t('attachment.attachment_zone_description')}
          </p>
        </div>

        {/* Badge for file size limit */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-500 rounded-md">
            Max 5MB
          </span>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default AttachmentZone;

export const AttachmentUploadNode = Node.create({
  name: 'attachmentUpload',
  group: 'block',
  atom: true,

  addCommands() {
    return {
      setAttachmentUpload: () => ({ commands }) => {
        return commands.insertContent({ type: 'attachmentUpload' });
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(AttachmentZone);
  },

  parseHTML() { return [{ tag: 'div[data-type="attachment-upload"]' }]; },
  renderHTML() { return ['div', { 'data-type': 'attachment-upload' }]; },
});