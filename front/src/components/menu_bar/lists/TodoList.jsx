import { useEditorState } from '@tiptap/react';
import { useTranslation } from 'react-i18next';

export const TodoIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
        >
            {/* ROW 1: Tick for finished task */}
            <path
                d="M3 8l2.5 2.5L9 5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="currentColor"
            />
            <line x1="14" y1="8.5" x2="21" y2="8.5" strokeLinecap="round" opacity="0.6" />

            {/* ROW 2: Pending task */}
            <rect x="3.75" y="14.75" width="4.5" height="4.5" rx="1.2" />
            <line x1="14" y1="17.5" x2="19" y2="17.5" strokeLinecap="round" />
        </svg>
    )
}

/**
 * Todo list button component for toggling task lists in the editor.
 * 
 * @param {Object} editor - The editor instance
 */
const TodoList = ({ editor }) => {
    const { t } = useTranslation();

    const isTodoListActive = useEditorState({
        editor,
        selector: (ctx) => ctx.editor.isActive('taskList'),
    });

    if (!editor) return null;

    return (
        <button
            type="button"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`cursor-pointer p-2 rounded-lg transition-colors ${isTodoListActive
                ? 'text-white dark:text-primary bg-primary dark:bg-primary/10 shadow-md'
                : 'text-black dark:text-white hover:bg-hover-primary-bg'}`}
            title={t('editor.toolbar.todo_list')}
        >
            <TodoIcon />
        </button>
    );
}

export default TodoList;