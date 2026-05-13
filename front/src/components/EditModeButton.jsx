import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Button component to toggle the edit mode of a note. It displays a lock or unlock icon
 * based on the current state and provides a tooltip with a description.
 */
const EditModeButton = ({ isEditable, onToggle }) => {
    const { t } = useTranslation();

    return (
        <button
            onClick={onToggle}
            className={`
                group relative p-1.5 rounded-lg transition-all cursor-pointer
                ${isEditable
                    ? 'text-zinc-700 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary'
                    : 'text-primary bg-primary/10 hover:bg-primary/20'}
            `}
            title={isEditable ? t('editor.lock_note') : t('editor.unlock_note')}
        >
            {isEditable ? (
                <Unlock className="w-4 h-4" />
            ) : (
                <Lock className="w-4 h-4" />
            )}
        </button>
    );
};

export default EditModeButton;