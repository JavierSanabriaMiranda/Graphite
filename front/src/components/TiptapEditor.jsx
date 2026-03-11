import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react'
import { useEffect, useState, useRef } from 'react'
import i18next, { t } from 'i18next'
import { Trash2 } from 'lucide-react';

import { EditorState } from '@tiptap/pm/state';
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import { Color } from '@tiptap/extension-color'
import Code from '@tiptap/extension-code'
import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { createLowlight } from 'lowlight'
import { Details, DetailsContent, DetailsSummary } from '@tiptap/extension-details'

// Importing languages for syntax highlighting in code blocks
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml'; // HTML is registered as xml in lowlight
import css from 'highlight.js/lib/languages/css';

import { Callout } from './advanced_blocks/Callout'

import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import MenuBar from './MenuBar'
import PathBar from './PathBar';
import CodeBlockComponent from './advanced_blocks/CodeBlockComponent';
import { CustomCodeBlock } from './advanced_blocks/CodeBlockComponent'
import { ToggleBlock } from './advanced_blocks/ToggleBlock/ToggleBlock'
import { ToggleTitle } from './advanced_blocks/ToggleBlock/ToggleTitle'
import { ToggleContent } from './advanced_blocks/ToggleBlock/ToggleContent'
import EmojiPicker from './util/EmojiPicker'
import NoteIcon from './NoteIcon'
import { PageBlock } from './advanced_blocks/PageBlockComponent';
import EmptyState from './EmptyState';

import { noteService } from '../services/db/noteService';
import { useNote } from './context/NoteContext';
import { useToast } from './util/ToastContext';

const TiptapEditor = () => {
  const { showToast } = useToast();

  const { selectedNote: activeNote, triggerRefresh: onNoteUpdate, selectNote: onNoteSelect } = useNote();

  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [saveStatus, setSaveStatus] = useState('saved');
  const [isPageLoading, setIsPageLoading] = useState(false);

  const saveTimeoutRef = useRef(null);

  // Instance for syntax highlighting in code blocks
  const lowlight = createLowlight()
  lowlight.register('java', java)
  lowlight.register('javascript', javascript)
  lowlight.register('python', python)
  lowlight.register('c', c)
  lowlight.register('cpp', cpp)
  lowlight.register('csharp', csharp);
  lowlight.register('bash', bash);
  lowlight.register('html', xml); // Register as HTML but lowlight uses 'xml' for it
  lowlight.register('css', css);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable default code to custom it
        code: false,
        codeBlock: false,
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
      CustomCodeBlock.configure({
        lowlight,
      }).extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent)
        }
      }),
      Callout,
      Details.configure({
        persist: true, // Maintains the open/closed state of details blocks even after re-rendering
        HTMLAttributes: {
          class: 'details-wrapper',
        },
      }),
      ToggleBlock,
      ToggleTitle,
      ToggleContent,
      DetailsSummary,
      DetailsContent,
      PageBlock,
      Placeholder.configure({
        includeChildren: true,
        placeholder: ({ node, editor, pos }) => {
          const { state } = editor;
          const $pos = state.doc.resolve(pos);

          // Placeholder for toggle title
          if (node.type.name === 'toggleTitle') {
            return i18next.t('editor.toggle_title');
          }

          // Placeholder for toggle content
          if (node.type.name === 'paragraph' && $pos.parent.type.name === 'toggleContent') {
            return i18next.t('editor.toggle_empty');
          }

          // Global placeholder (when editor is empty)
          if (editor.isEmpty && node.type.name === 'paragraph') {
            return i18next.t('editor.placeholder');
          }

          return '';
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      // Clean timeout if the user keeps typing
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
    content: '',
    editorProps: {
      attributes: {
        // Tailwind classes for the editor content area
        class: 'prose dark:prose-invert prose-slate max-w-none focus:outline-none p-8 min-h-[500px] transition-colors duration-300',
      },
    },
  })

  // Effect to load selected note
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;

    if (!activeNote) {
      editor.commands.setContent('', false);
      return;
    }

    // Start loading
    setIsPageLoading(true);

    const timer = setTimeout(() => {
      try {
        let contentToSet = activeNote.content;
        if (typeof contentToSet === 'string' && contentToSet.trim() !== '') {
          try {
            contentToSet = JSON.parse(contentToSet);
          } catch (e) {
            // If the content is not a valid JSON put a basic paragraph with the text
            contentToSet = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: activeNote.content }] }] };
          }
        }

        // Reset undo history when changing note
        const newState = EditorState.create({
          doc: editor.schema.nodeFromJSON(contentToSet),
          plugins: editor.state.plugins,
        });

        editor.view.updateState(newState);

        setIsPageLoading(false)

      } catch (error) {
        console.error("Critical error while loading:", error);
        setIsPageLoading(false);
      }
    }, 5); // Delay to let ProseMirror load

    return () => clearTimeout(timer);
  }, [activeNote?.note_id, editor]);

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
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        const currentContent = editor?.getJSON();
        if (currentContent) {
          saveContentToDB(currentContent);
        }
      }
    };
  }, [activeNote]);

  // Save changes on db and tells the sidebar
  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  // Saves title on db
  const saveTitle = async () => {
    if (activeNote && title.trim() !== '' && title !== activeNote.title) {
      const result = await noteService.update(activeNote.note_id, { title: title });

      if (result?.error === 'COLLISION') {
        // Feedback to user
        showToast(t('editor.errors.name_collision') || "Ya existe una nota con ese nombre en esta ubicación", "error");

        // Revert title change
        setTitle(activeNote.title);
        return;
      }

      // If everything goes fine, update sidebar
      onNoteUpdate();
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
    await noteService.update(activeNote.note_id, { icon: char });

    // Notifies App.jsx to update sidebar
    onNoteUpdate();
  };

  // Handles when the page icon is removed
  const handleRemoveIcon = async (e) => {
    e.stopPropagation(); // Avoids emoji picker for opening
    if (!activeNote) return;

    setIcon('');
    // Actualizamos a null en la DB
    await noteService.update(activeNote.note_id, { icon: null });

    onNoteUpdate();
  };

  // Saves the current note content to DB
  // This automatically triggers when user stops typing for 1 second
  const saveContentToDB = async (content) => {
    if (!activeNote) return;
    await noteService.update(activeNote.note_id, {
      content: content,
      is_dirty: 1 // Mark for cloud sync
    });

    onNoteUpdate();

    setTimeout(() => {
      setSaveStatus('saved');
    }, 1000);
  };

  if (!activeNote) {
    return (
      <div className="h-screen w-full bg-main-bg flex flex-col">
        <PathBar
          saveStatus={saveStatus}
          editor={editor}
        />
        <MenuBar editor={editor} />
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300 dark:border-zinc-800 bg-main-bg h-10 shrink-0" />

        <div className="grow">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden bg-main-bg transition-colors duration-300">
      <PathBar
        saveStatus={saveStatus}
        editor={editor}
      />
      <MenuBar editor={editor} />

      <div className="grow overflow-y-auto editor-scrollbar">
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
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Title */}
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={saveTitle} // Save when losing focus
              onKeyDown={(e) => e.key === 'Enter' && e.target.blur()} // Save using enter
              placeholder={t('editor.no_title_placeholder')}
              className="w-full text-5xl font-bold bg-transparent border-none outline-none text-text-primary placeholder:opacity-20 transition-all"
            />
          </div>

          {/* Editor body */}
          <div className="tiptap-container relative">
            {/* Skeleton for page loading */}
            {isPageLoading && (
              <div className="absolute inset-0 z-10 bg-main-bg">
                <div className="animate-pulse space-y-4 pt-4">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                </div>
              </div>
            )}

            <div className={isPageLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TiptapEditor