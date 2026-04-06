import { useTranslation } from 'react-i18next';
import { useEditor, EditorContent } from '@tiptap/react';
import { X, Monitor, Globe, AlertCircle, FileText, Trash2 } from 'lucide-react';
import { noteService } from '../../services/db/noteService';

import { useState, useRef } from 'react';
import { useNote } from '../context/NoteContext';
import { useIsMobile } from '../../hooks/useIsMobile'
import { useEditorConfig } from '../../hooks/useEditorConfig';

import EmojiPicker from '../util/EmojiPicker';
import NoteIcon from '../util/NoteIcon';


const ConflictResolver = ({ note, onClose, onResolved }) => {
  const { t } = useTranslation();
  const { createSubnote, selectNote } = useNote();
  const isMobile = useIsMobile();

  const [mobileTab, setMobileTab] = useState('local');
  const [localTitle, setLocalTitle] = useState(note.title || '');
  const [localIcon, setLocalIcon] = useState(note.icon || '');
  const titleRef = useRef(null);

  const conflictClass = `prose dark:prose-invert prose-sm max-w-none focus:outline-none ${isMobile ? 'p-4' : 'p-8'} min-h-full`;

  const localConfig = useEditorConfig({
    createSubnote,
    selectNote,
    customClass: conflictClass,
    extraProps: {
      panelRole: 'conflict-local',
      allowDeleted: true,
    }
  });

  // Left editor: Local version
  const localEditor = useEditor({
    ...localConfig,
    content: typeof note.content === 'string' ? JSON.parse(note.content) : note.content,
  });

  const remoteConfig = useEditorConfig({
    createSubnote,
    selectNote,
    customClass: conflictClass,
    extraProps: {
      panelRole: 'conflict-remote',
      localEditor: localEditor,
      allowDeleted: true
    }
  });

  // Right editor: Cloud version (remote)
  const remoteEditor = useEditor({
    ...remoteConfig,
    content: typeof note.conflict_content === 'string' ? JSON.parse(note.conflict_content) : note.conflict_content,
    editable: false,
  });

  const handleResolve = async (source) => {
    let finalTitle, finalIcon, finalContent;
    if (source === 'local') {
      finalTitle = localTitle;
      finalIcon = localIcon;
      finalContent = localEditor.getJSON();
    } else {
      finalTitle = note.conflict_title;
      finalIcon = note.conflict_icon;
      finalContent = typeof note.conflict_content === 'string'
        ? JSON.parse(note.conflict_content)
        : note.conflict_content;
    }

    try {
      // Save resolved content and update the id to the version the server is expecting
      await noteService.resolveConflict(note.note_id,
        finalTitle,
        finalIcon,
        finalContent,
        note.remote_version
      );
      onResolved();
    } catch (error) {
      console.error("Error while resolving conflict:", error);
    }
  };

  if (!localEditor || !remoteEditor) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-main-bg flex flex-col animate-in fade-in duration-200">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-main-bg gap-4">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors shrink-0">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-lg font-black text-text-primary flex items-center gap-2 leading-none truncate">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0" />
              {t('conflict.resolve_title', { name: note.title })}
            </h2>
            {!isMobile && <p className="text-xs text-zinc-500 mt-1 font-medium">{t('conflict.resolve_desc')}</p>}
          </div>
        </div>

        {/* Main action buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleResolve('local')}
            className="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-[10px] sm:text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="truncate">{isMobile ? t('conflict.keep_local_short') : t('conflict.keep_local')}</span>
          </button>
          <button
            onClick={() => handleResolve('remote')}
            className="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 text-[10px] sm:text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="truncate">{isMobile ? t('conflict.keep_remote_short') : t('conflict.keep_remote')}</span>
          </button>
        </div>
      </header>

      {/* Phone tabs */}
      {isMobile && (
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <button
            onClick={() => setMobileTab('local')}
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${mobileTab === 'local' ? 'text-primary border-b-2 border-primary bg-white dark:bg-main-bg' : 'text-zinc-500'}`}
          >
            <Monitor className="w-3 h-3" /> {t('conflict.local_label')}
          </button>
          <button
            onClick={() => setMobileTab('remote')}
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${mobileTab === 'remote' ? 'text-zinc-500 border-b-2 border-zinc-500 bg-white dark:bg-main-bg' : 'text-zinc-500/50'}`}
          >
            <Globe className="w-3 h-3" /> {t('conflict.remote_label')}
          </button>
        </div>
      )}

      {/* Editors */}
      <div className="flex flex-1 overflow-hidden">
        {/* Local panel */}
        <div className={`flex-1 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-main-bg ${isMobile && mobileTab !== 'local' ? 'hidden' : 'flex'}`}>
          {!isMobile && (
            <div className="px-8 py-3 bg-primary/5 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Monitor className="w-3.5 h-3.5" /> {t('conflict.local_label')}
              </span>
            </div>
          )}

          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-12 pt-6 sm:pt-10">
            <div className="max-w-3xl mx-auto">
              {/* Metadata Local */}
              <div className="group mb-4 ml-0 sm:ml-7">
                <div className="relative w-fit group/icon-wrapper">
                  <EmojiPicker onSelect={(char) => setLocalIcon(char)}>
                    <div className="text-4xl sm:text-6xl mb-4 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors bg-zinc-50 dark:bg-zinc-900/30">
                      {localIcon ? <NoteIcon iconChar={localIcon} /> : <div className="text-zinc-300 dark:text-zinc-700">+</div>}
                    </div>
                  </EmojiPicker>
                  {localIcon && (
                    <button onClick={(e) => { e.stopPropagation(); setLocalIcon(''); }} className="cursor-pointer absolute -top-2 -right-2 p-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                  )}
                </div>
                <textarea
                  ref={titleRef}
                  value={localTitle}
                  onChange={(e) => setLocalTitle(e.target.value)}
                  className="w-full text-2xl sm:text-4xl font-bold bg-transparent border-none outline-none text-text-primary resize-none py-2 leading-tight"
                  rows={1}
                  style={{ fieldSizing: 'content' }}
                />
              </div>
              <EditorContent editor={localEditor} />
            </div>
          </div>
        </div>

        {/* Remote panel */}
        <div className={`flex-1 flex-col bg-zinc-50/20 dark:bg-zinc-900/10 ${isMobile && mobileTab !== 'remote' ? 'hidden' : 'flex'}`}>
          {!isMobile && (
            <div className="px-8 py-3 bg-zinc-100/50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> {t('conflict.remote_label')}
              </span>
            </div>
          )}

          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-12 pt-6 sm:pt-10 opacity-80 sm:opacity-70">
            <div className="max-w-3xl mx-auto">
              <div className="ml-0 sm:ml-7 mb-4">
                <div className="text-4xl sm:text-6xl mb-4 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/30">
                  {note.conflict_icon ? <NoteIcon iconChar={note.conflict_icon} /> : <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-400" />}
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-text-primary wrap-break-word leading-tight">
                  {note.conflict_title || t('editor.untitled_note')}
                </h1>
              </div>
              <EditorContent editor={remoteEditor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictResolver;