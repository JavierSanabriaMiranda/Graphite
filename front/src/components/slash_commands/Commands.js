import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import getSuggestionConfig from './suggestions';

/**
 * Tiptap Extension that enables "Slash Commands"
 * It listens for a trigger character (defaulting to '/') to provide a filtered 
 * list of block-level actions and commands.
 * @property {string} name - Unique identifier for the extension.
 * @option {Object} suggestion - Configuration for the suggestion behavior.
 * @option {string} suggestion.char - The character that triggers the command menu.
 * @option {Function} suggestion.command - The handler that executes when an item is selected, 
 * responsible for removing the query and running the command.
 */
export const Commands = Extension.create({
  name: 'commands',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});