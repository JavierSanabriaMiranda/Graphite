import { EditorContent, useEditor } from '@tiptap/react'
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef, useCallback } from 'react'
import { Trash2, AlertTriangle } from 'lucide-react';

import { EditorState } from '@tiptap/pm/state';

import MenuBar from './menu_bar/MenuBar'
import PathBar from './PathBar';
import EmojiPicker from './util/EmojiPicker'
import NoteIcon from './util/NoteIcon'
import EmptyState from './util/EmptyState';
import MobileFormattingSheet from './menu_bar/MobileFormattingSheet';
import ChangeThemeButton from './util/ChangeThemeButton';
import ConflictResolver from './views/ConflictResolver';

import { noteService } from '../services/db/noteService';
import { useAuth } from './context/AuthContext';
import { syncService } from '../services/db/syncService';
import { useNote } from './context/NoteContext';
import { useToast } from './context/ToastContext';
import { useIsMobile } from '../hooks/useIsMobile'

import { SyncStatus } from '../util/SyncStatus';
import { useWorkspace } from './context/WorkspaceContext.';
import { useEditorConfig } from '../hooks/useEditorConfig';

const EMPTY_DOC = {
  type: 'doc',
  content: [{ type: 'paragraph' }]
};

const TiptapEditor = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { dek, isAuthenticated } = useAuth();

  const { selectedNote: activeNote, triggerRefresh: onNoteUpdate, createRootNote, createSubnote, selectNote, isSyncing, syncStatus, refreshCurrentNote } = useNote();
  const { activeWorkspace } = useWorkspace();

  const isMobile = useIsMobile();
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [saveStatus, setSaveStatus] = useState('saved');
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isResolvingConflict, setIsResolvingConflict] = useState(false);
  const [emojiPickerRef, setEmojiPickerRef] = useState(null);

  const saveTimeoutRef = useRef(null);
  const isProgrammaticRef = useRef(false); // Flag to indicate if content change is programmatic (to avoid save loops)
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const currentNoteIdRef = useRef(null);
  // References to context functions
  const createSubnoteRef = useRef(createSubnote);
  const selectNoteRef = useRef(selectNote);

  useEffect(() => {
    createSubnoteRef.current = createSubnote;
    selectNoteRef.current = selectNote;
  }, [createSubnote, selectNote]);

  const handleEmojiCommand = () => {
    // Get cursor coords
    const { view } = editor;
    const { selection } = view.state;
    const coords = view.coordsAtPos(selection.from);

    // create virtual element for floating-ui
    const virtualElement = {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        x: coords.left,
        y: coords.top,
        top: coords.top,
        left: coords.left,
        right: coords.left,
        bottom: coords.bottom,
      }),
    };

    setEmojiPickerRef({
      element: virtualElement,
      onClose: () => setEmojiPickerRef(null)
    });
  };

  const handleKeyDown = (view, event) => {
    if(event.key === 'ArrowUp') {
    const { state } = view;
    const { selection } = state;
    const { $from } = selection;

    // Check if cursor is at first block
    // $from.pos <= 1 means we are at beginning of page
    if ($from.pos <= 1) {
      titleRef.current?.focus();
      // Selects the title for easy change
      titleRef.current?.select();
      return true;
    }
  }
  return false;
};

const editorConfig = useEditorConfig({
  onUpdate: ({ editor }) => {
    // Clean timeout if the user keeps typing
    if (isProgrammaticRef.current) {
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Program when the user stops typing for 1 second
    saveTimeoutRef.current = setTimeout(() => {
      setSaveStatus('saving');
      const jsonContent = editor.getJSON();
      saveContentToDB(jsonContent);
    }, 2000);
  },
  handleEmojiCommand: handleEmojiCommand,
  createSubnote: async (parentId) => await createSubnoteRef.current(parentId),
  selectNote: (note) => selectNoteRef.current(note),
  handleKeyDownProp: handleKeyDown
});

const editor = useEditor(editorConfig);

// Function to inject content into the editor
const injectContentToEditor = useCallback((content, callback = null) => {
  if (!editor || editor.isDestroyed) return;

  let json;
  try {
    json = typeof content === 'string' ? JSON.parse(content) : content;
  } catch (e) {
    console.error("Error al parsear contenido:", e);
    return;
  }

  setTimeout(() => {
    if (!editor || editor.isDestroyed) return;

    try {
      const newState = EditorState.create({
        doc: editor.schema.nodeFromJSON(json),
        plugins: editor.state.plugins,
      });
      isProgrammaticRef.current = true;
      editor.view.updateState(newState);
      isProgrammaticRef.current = false;

      if (callback) callback();
    } catch (e) {
      console.error("Error inyectando contenido en el editor:", e);
      isProgrammaticRef.current = false;
      if (callback) callback();
    }
  }, 0);
}, [editor]);

// Effect to load selected note
useEffect(() => {
  if (!editor || editor.isDestroyed) return;

  // NO NOTE SELECTED: Clear editor
  if (!activeNote) {
    editor.commands.setContent('', false);
    currentNoteIdRef.current = null;
    setIsPageLoading(false);
    return;
  }

  const isDifferentNote = activeNote.note_id !== currentNoteIdRef.current;

  // CHANGING FROM NOTE A -> B
  if (isDifferentNote) {
    setIsPageLoading(true);
    currentNoteIdRef.current = activeNote.note_id;

    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    // If there's content (optimistic loading) load it inmediately
    if (activeNote.content) {
      injectContentToEditor(activeNote.content, () => setIsPageLoading(false));
    }
    // If no content and is syncing, we are in loading state, 
    // show skeleton and wait for sync to update the content when it arrives
    else if (isSyncing && syncStatus === SyncStatus.LOADING) {
      injectContentToEditor(EMPTY_DOC, () => setIsPageLoading(false));
    }
    return;
  }

  // SILECENSE UPDATE (Same note, content might have changed due to sync)
  // Just update if user is not typing (saveStatus === 'saved')
  if (!isDifferentNote && !isSyncing && activeNote.content) {
    const currentJSON = JSON.stringify(editor.getJSON());
    const incomingJSON = typeof activeNote.content === 'string'
      ? activeNote.content
      : JSON.stringify(activeNote.content);

    if (saveStatus === 'saved' && currentJSON !== incomingJSON) {
      injectContentToEditor(activeNote.content);
    }
    setIsPageLoading(false);
  }

}, [activeNote?.note_id, activeNote?.content, isSyncing, syncStatus, editor, injectContentToEditor]);

// Sync title when note changes
useEffect(() => {
  if (activeNote) {
    setTitle(activeNote.title || '');
    setIcon(activeNote.icon || '');
  } else {
    setTitle('');
    setIcon('');
  }
}, [activeNote]);

// Force save note content when changing note
useEffect(() => {
  const noteIdAtEffectTime = activeNote?.note_id;

  return () => {
    // If the note is still syncing or is empty offline (we don't have content in local and we are offline), 
    // we should not save to avoid overwriting content with empty or outdated data
    if (saveTimeoutRef.current && noteIdAtEffectTime && !isSyncing && syncStatus !== SyncStatus.OFFLINE_EMPTY && !isResolvingConflict) {
      clearTimeout(saveTimeoutRef.current);
      const currentContent = editor?.getJSON();
      if (currentContent) {
        saveContentToDB(currentContent, noteIdAtEffectTime);
      }
    } else {
      clearTimeout(saveTimeoutRef.current);
    }
  };
}, [activeNote?.note_id, isSyncing, syncStatus]);

/**
 * Helper function to trigger the remote sync process.
 * It only runs if the user is authenticated and the device is online.
 */
const triggerRemoteSync = async () => {
  if (navigator.onLine && isAuthenticated && dek) {
    // We don't await this to keep the UI snappy (Optimistic)
    syncService.syncPendingData(dek).catch(err =>
      console.error("Background sync failed:", err)
    );
  }
};

// Save changes on db and tells the sidebar
const handleTitleChange = async (e) => {
  const newTitle = e.target.value;
  setTitle(newTitle);
};

// When pressing Enter or ArrowDown on title, goes to the start of editor
const handleTitleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === 'ArrowDown') {
    e.preventDefault();
    editor.commands.focus('start'); // Goes to start of editor
  }
};

// Saves title on db
const saveTitle = async () => {
  if (activeNote && title.trim() !== '' && title !== activeNote.title && !isSyncing && syncStatus !== SyncStatus.OFFLINE_EMPTY && !isResolvingConflict) {
    const result = await noteService.update(activeNote.note_id, { title: title, is_dirty: 1 });

    if (result?.error === 'COLLISION') {
      // Feedback to user
      showToast(t('editor.errors.name_collision'), "error");

      // Revert title change
      setTitle(activeNote.title);
      return;
    }

    // If everything goes fine, update sidebar
    onNoteUpdate();
    triggerRemoteSync();
  } else if (title.trim() === '') {
    // If title is empty, revert
    setTitle(activeNote.title);
  }
};

// Handles the page icon selection
const handleIconSelect = async (char) => {
  if (!activeNote) return;

  setIcon(char)
  // Update on db
  await noteService.update(activeNote.note_id, { icon: char, is_dirty: 1 });

  // Notifies App.jsx to update sidebar
  onNoteUpdate();
  triggerRemoteSync();
};

// Handles when the page icon is removed
const handleRemoveIcon = async (e) => {
  e.stopPropagation(); // Avoids emoji picker for opening
  if (!activeNote) return;

  setIcon('');
  await noteService.update(activeNote.note_id, { icon: null });

  onNoteUpdate();
};

// Saves the current note content to DB
// This automatically triggers when user stops typing for 1 second
const saveContentToDB = async (content, id = null) => {
  const targetId = id || activeNote?.note_id;

  if (!targetId || !activeNote || isSyncing || syncStatus === SyncStatus.OFFLINE_EMPTY || isResolvingConflict) return;
  await noteService.update(targetId, {
    content: content,
    is_dirty: 1 // Mark for cloud sync
  });

  saveTimeoutRef.current = null;
  onNoteUpdate();
  triggerRemoteSync();

  setTimeout(() => {
    setSaveStatus('saved');
  }, 1000);
};

if (!activeNote) {
  return (
    <div className="h-screen w-full bg-main-bg flex flex-col">
      <div className={`flex items-center justify-between px-4 py-2 border-b border-gray-300 dark:border-zinc-800 bg-main-bg h-10 shrink-0 ${isMobile ? 'mt-10' : ''}`}>
        <div />
        <ChangeThemeButton />
      </div>

      <div className="grow">
        <EmptyState onCreateNote={createRootNote} />
      </div>
    </div>
  );
}

return (
  <div className="relative flex flex-col h-screen w-full overflow-hidden bg-main-bg transition-colors duration-300">
    <PathBar
      saveStatus={saveStatus}
      editor={editor}
      onResolveConflict={() => setIsResolvingConflict(true)}
    />
    {isMobile ? <MobileFormattingSheet editor={editor} /> : <MenuBar editor={editor} />}

    {syncStatus === SyncStatus.CONFLICT && (
      <div className="mx-8 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm font-bold text-red-900 dark:text-red-100">
              {t('conflict.conflict_detected_title')}
            </p>
            <p className="text-xs text-red-700 dark:text-red-300">
              {t('conflict.conflict_detected_desc')}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsResolvingConflict(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
        >
          {t('conflict.resolve_conflict')}
        </button>
      </div>
    )}

    {/* Resolution view */}
    {isResolvingConflict && (
      <ConflictResolver
        note={activeNote}
        onClose={() => setIsResolvingConflict(false)}
        onResolved={() => {
          refreshCurrentNote();
          triggerRemoteSync();
          setIsResolvingConflict(false);
        }}
      />
    )}

    <div ref={scrollContainerRef} className="grow overflow-y-auto editor-scrollbar">
      <div className={`max-w-5xl mx-auto w-ful px-8 pb-16 ${icon !== '' ? 'pt-8' : ''}`}>

        {/* Header */}
        <div className="group mb-8 ml-7">
          <div className="relative w-fit group/icon-wrapper">
            {/* Page icon */}
            <EmojiPicker onSelect={handleIconSelect}>
              <div className="text-7xl mb-4 hover:bg-zinc-200 dark:hover:bg-zinc-800/50 w-24 h-24 mt-4 flex items-center justify-center rounded-xl cursor-pointer transition-colors group/icon">
                {icon ? (
                  <div className="w-20 h-20 text-text-primary">
                    <NoteIcon iconChar={icon} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-4xl">+</span>
                    <span className="text-xs font-medium uppercase tracking-tighter">{t('editor.add_icon')}</span>
                  </div>
                )}
              </div>
            </EmojiPicker>

            {icon && (
              <button
                onClick={handleRemoveIcon}
                className="absolute -top-2 -right-2 p-1.5 text-text-primary bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm opacity-0 group-hover/icon-wrapper:opacity-100 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900 transition-all z-10"
                title={t('editor.remove_icon') || "Quitar icono"}
              >
                <Trash2 className="cursor-pointer w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Title */}
          <textarea
            ref={titleRef}
            rows={1} // Start with just one row
            value={title}
            onChange={handleTitleChange}
            onBlur={saveTitle}
            onKeyDown={handleTitleKeyDown}
            placeholder={t('editor.no_title_placeholder')}
            className="w-full text-5xl font-bold bg-transparent border-none outline-none text-text-primary placeholder:opacity-20 transition-all resize-none overflow-hidden py-2 leading-tight"
            style={{ fieldSizing: 'content' }}
          />
        </div>

        {/* Editor body */}
        <div className="tiptap-container relative">
          {/* Skeleton for page loading */}
          {(isPageLoading || (isSyncing && !activeNote.content)) && (
            <div className="absolute inset-0 z-10 bg-main-bg">
              <div className="animate-pulse space-y-4 pt-4">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
              </div>
            </div>
          )}


          {/* SYNC ERROR (No local content + Offline) */}
          {!activeNote.content && syncStatus === SyncStatus.OFFLINE_EMPTY && !isSyncing ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <div className="text-zinc-400 mb-4 text-4xl">🌐</div>
              <h3 className="font-bold text-text-primary">{t('editor.offline_empty_title')}</h3>
              <p className="text-sm text-zinc-500 max-w-xs mt-2">
                {t('editor.offline_empty_desc')}
              </p>
              <button
                onClick={() => selectNote(activeNote)}
                className="mt-6 px-4 py-2 bg-primary text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
              >
                {t('common.retry')}
              </button>
            </div>
          ) : (
            /* Normal editor (Local content + Offline or Online) */
            <div className={`grow overflow-y-auto editor-scrollbar ${isMobile ? 'pb-32' : 'pb-16'}`}>
              <EditorContent editor={editor} />
            </div>
          )}

        </div>
      </div>
    </div>
    {emojiPickerRef && (
      <EmojiPicker
        showIconsMenu={false}
        externalReference={emojiPickerRef}
        onSelect={(emoji) => {
          editor.chain().focus().insertContent(emoji).run();
        }}
      />
    )}
  </div>
)
}

export default TiptapEditor