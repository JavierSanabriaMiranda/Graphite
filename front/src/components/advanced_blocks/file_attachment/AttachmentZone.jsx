import React from 'react';
import { ReactNodeViewRenderer, Node, NodeViewWrapper } from '@tiptap/react';
import { open } from '@tauri-apps/plugin-dialog';
import { useAttachmentUpload } from "../../../hooks/useAttachmentUpload";
import { useNote } from '../../context/NoteContext';
import { useTranslation } from 'react-i18next';

const AttachmentZone = ({ editor, deleteNode }) => {
  const { t } = useTranslation()
  const { selectedNote } = useNote();
  const { uploadAttachment } = useAttachmentUpload(editor, selectedNote.note_id);

  const handleAction = async (item) => {
    deleteNode(); // Deletes the component
    await uploadAttachment(item); // Uploads file
  };

  return (
    <NodeViewWrapper>
      <div onClick={async () => {
        const selected = await open({ multiple: false });
        if (selected) handleAction(selected);
      }}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) handleAction(e.dataTransfer.files[0]);
        }}
        className="border-2 border-dashed p-10 rounded-xl cursor-pointer">
        {t('attachment.attachment_zone_description')}
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