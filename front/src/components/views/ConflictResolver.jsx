import { useTranslation } from 'react-i18next';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { X, Monitor, Globe, AlertCircle, FileText, Trash2 } from 'lucide-react';
import { noteService } from '../../services/db/noteService';
import i18next from 'i18next'
import { useState, useRef } from 'react';

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

import { Callout } from '../advanced_blocks/Callout'

import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'

import CodeBlockComponent, { CustomCodeBlock } from '../advanced_blocks/CodeBlockComponent';
import { ToggleBlock } from '../advanced_blocks/toggle_block/ToggleBlock'
import { ToggleTitle } from '../advanced_blocks/toggle_block/ToggleTitle'
import { ToggleContent } from '../advanced_blocks/toggle_block/ToggleContent'

import { PageBlock } from '../advanced_blocks/PageBlockComponent';

import { BlockMoving } from '../extensions/BlockMoving';
import { Commands } from '../slash_commands/Commands';
import getSuggestionConfig from '../slash_commands/suggestions';
import { useNote } from '../context/NoteContext';

import EmojiPicker from '../util/EmojiPicker';
import NoteIcon from '../util/NoteIcon';


const ConflictResolver = ({ note, onClose, onResolved }) => {
  const { t } = useTranslation();

  const { createSubnote, selectNote } = useNote();

  const [localTitle, setLocalTitle] = useState(note.title || '');
  const [localIcon, setLocalIcon] = useState(note.icon || '');
  const titleRef = useRef(null);

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

  // Extensions for comparison editors
  const extensions = [
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
    BlockMoving,
    Commands.configure({
      suggestion: getSuggestionConfig(t, createSubnote, selectNote),
    }),
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
  ];

  // Left editor: Local version
  const localEditor = useEditor({
    extensions,
    content: typeof note.content === 'string' ? JSON.parse(note.content) : note.content,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm max-w-none focus:outline-none p-8 min-h-full',
      },
    },
  });

  // Right editor: Cloud version (remote)
  const remoteEditor = useEditor({
    extensions,
    content: typeof note.conflict_content === 'string' ? JSON.parse(note.conflict_content) : note.conflict_content,
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm max-w-none focus:outline-none p-8 min-h-full',
      },
    },
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
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-main-bg">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
          <div>
            <h2 className="text-lg font-black text-text-primary flex items-center gap-2 leading-none">
              <AlertCircle className="w-5 h-5 text-red-500" />
              {t('conflict.resolve_title', { name: note.title })}
            </h2>
            <p className="text-xs text-zinc-500 mt-1 font-medium">
              {t('conflict.resolve_desc')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleResolve('local')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-primary/20"
          >
            <Monitor className="w-4 h-4" />
            {t('conflict.keep_local')}
          </button>
          <button
            onClick={() => handleResolve('remote')}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-bold rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-lg"
          >
            <Globe className="w-4 h-4" />
            {t('conflict.keep_remote')}
          </button>
        </div>
      </header>

      {/* Editors */}
      <div className="flex flex-1 overflow-hidden">
        {/* Local panel */}
        <div className="flex-1 flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-main-bg">
          <div className="flex items-center justify-between px-8 py-3 bg-primary/5 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-primary">
              <Monitor className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">{t('conflict.local_label')}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-12 pt-10">
            <div className="max-w-3xl mx-auto">
              {/* Local metadata */}
              <div className="group mb-4 ml-7">
                <div className="relative w-fit group/icon-wrapper">
                  <EmojiPicker onSelect={(char) => setLocalIcon(char)}>
                    <div className="text-6xl mb-4 w-20 h-20 flex items-center justify-center rounded-xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
                      {localIcon ? <NoteIcon iconChar={localIcon} /> : <div className="text-zinc-300 dark:text-zinc-700">+</div>}
                    </div>
                  </EmojiPicker>
                  {localIcon && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setLocalIcon(''); }}
                      className="cursor-pointer absolute -top-2 -right-2 p-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm opacity-0 group-hover/icon-wrapper:opacity-100 transition-opacity hover:text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <textarea
                  ref={titleRef}
                  value={localTitle}
                  onChange={(e) => setLocalTitle(e.target.value)}
                  placeholder={t('editor.no_title_placeholder')}
                  className="w-full text-4xl font-bold bg-transparent border-none outline-none text-text-primary resize-none py-2 leading-tight placeholder:opacity-20"
                  rows={1}
                  style={{ fieldSizing: 'content' }}
                />
              </div>
              <EditorContent editor={localEditor} />
            </div>
          </div>
        </div>

        {/* Remote panel */}
        <div className="flex-1 flex flex-col bg-zinc-50/20 dark:bg-zinc-900/10">
          <div className="flex items-center justify-between px-8 py-3 bg-zinc-100/50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-500">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">{t('conflict.remote_label')}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-12 pt-10 opacity-70">
            <div className="max-w-3xl mx-auto">
              <div className="ml-7 mb-4">
                <div className="text-6xl mb-4 w-20 h-20 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/30">
                  {note.conflict_icon ? <NoteIcon iconChar={note.conflict_icon} /> : <FileText className="w-10 h-10 text-zinc-400" />}
                </div>
                <h1 className="text-4xl font-bold text-text-primary break-words leading-tight">
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