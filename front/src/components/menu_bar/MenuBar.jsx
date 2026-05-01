import { useEditorState } from '@tiptap/react';
import { useTranslation } from 'react-i18next';
import { menuBarStateSelector } from '../util/menuBarStateSelector';
import ColorPicker from './colors/ColorPicker';
import HighlightPicker from './colors/HighlightPicker';
import AlignmentSelector from './AlignmentSelector';
import BulletSelector from './lists/BulletSelector';
import NumberedListSelector from './lists/NumberedListSelector';
import TodoList from './lists/TodoList';
import TextTypeSelector from './TextTypeSelector';
import FontSelector from './FontSelector';
import { ToggleIcon } from '../advanced_blocks/toggle_block/ToggleIcon';
import { useNote } from '../context/NoteContext';
import { FilePlusCorner } from 'lucide-react';

/**
 * Top menu component that allows the user to edit the written text with the given tools
 * 
 * @param {Object} editor - The editor instance
 */
const MenuBar = ({ editor }) => {
  const { t } = useTranslation();
  const { selectNote, createSubnote } = useNote();

  const state = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  const getBtnClass = (isActive) => `
    cursor-pointer px-3 py-1.5 rounded transition-all duration-200 text-sm font-medium
    ${isActive
      ? 'text-white dark:text-primary bg-primary dark:bg-primary/10 transition-colors'
      : 'bg-main-bg text-text-primary hover:bg-hover-primary-bg'}
  `;

  const getDivisor = () => <div className="w-px h-6 bg-gray-300 dark:bg-zinc-700 mx-1" />; // Divisor

  const createNewSubnote = async () => {
    const chain = editor.chain().focus();
    const newNote = await createSubnote();

            if (newNote) {
              chain.insertPageBlock(newNote.note_id).run();
              selectNote(newNote);
            }
  };

  if (!editor) return null;

  return (
    <div className="flex items-center justify-center gap-2 p-2 bg-main-bg border-b border-gray-300 dark:border-zinc-700 shrink-0">
      {/* All tools centered */}
      <div className="flex flex-wrap items-center justify-center gap-2">

        <div className="flex items-center gap-2 flex-nowrap">
          <button type="button" onClick={createNewSubnote} className={getBtnClass(false)} title={t('editor.toolbar.new_subnote')}>
            <FilePlusCorner className="w-5 h-5" />
          </button>
        </div>

        {getDivisor()}

        { /* Text type and font selectors group */}
        <div className="flex items-center gap-2 flex-nowrap">
          <TextTypeSelector editor={editor} state={state} />
          <FontSelector editor={editor} state={state} />
        </div>

        {getDivisor()}

        { /* Format buttons group */}
        <div className="flex items-center gap-2 flex-nowrap">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={getBtnClass(state.isBold)} title={t('editor.toolbar.bold')}><b>B</b></button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={getBtnClass(state.isItalic)} title={t('editor.toolbar.italic')}><i>I</i></button>
          <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={getBtnClass(state.isUnderline)} title={t('editor.toolbar.underline')}><u>U</u></button>
          <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={getBtnClass(state.isStrike)} title={t('editor.toolbar.strikethrough')}><s className="decoration-2">S</s></button>
          <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={getBtnClass(state.isCode)} title={t('editor.toolbar.code')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          </button>
        </div>

        {getDivisor()}

        { /* Colors group */}
        <div className="flex items-center gap-2 flex-nowrap">
          <ColorPicker editor={editor} />
          <HighlightPicker editor={editor} />
        </div>

        {getDivisor()}

        { /* Text position and lists group */}
        <div className="flex items-center gap-2 flex-nowrap">
          <AlignmentSelector editor={editor} />
          <BulletSelector editor={editor} />
          <NumberedListSelector editor={editor} />
          <TodoList editor={editor} />
          <button
            onClick={() => state.isToggle ? editor.chain().focus().unsetToggle().run() : editor.chain().focus().setToggle().run()}
            className={getBtnClass(state.isToggle)}
            title={t('editor.toolbar.toggle_block')}
          >
            <ToggleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;