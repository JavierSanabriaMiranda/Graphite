import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';
import { noteService } from '../../services/db/noteService';
import { useNote } from '../context/NoteContext';
import { useToast } from '../context/ToastContext';
import { FloatingPortal } from '@floating-ui/react';

const DeleteConfirmModal = ({ isOpen, onClose, noteToDelete, onConfirm }) => {
    const { t } = useTranslation();
    const { selectedNote, selectNote, triggerRefresh } = useNote();
    const { showToast } = useToast();

    if (!isOpen) return null;

    // Note specified on prop has more priority than current note
    const targetNote = noteToDelete || selectedNote;

    const handleDelete = async () => {
        if (!selectedNote) return;

        try {
            await noteService.delete(targetNote.note_id);

            showToast(t('editor.options_menu.delete.success'), "success");

            // If deleting current note, clear editor
            if (selectedNote?.note_id === targetNote.note_id) {
                selectNote(null);
            }

            // If there's callback, execute it
            if (onConfirm) onConfirm();

            triggerRefresh();
            onClose();
        } catch (error) {
            console.error("Error deleting note:", error);
            showToast(t('editor.options_menu.delete.error'), "error");
        }
    };

    return (
        <FloatingPortal>

            <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

                {/* Modal */}
                <div className="relative w-full max-w-sm bg-main-bg border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mb-4">
                            <AlertTriangle className="w-6 h-6" />
                        </div>

                        <h3 className="text-lg font-bold text-text-primary mb-2">
                            {t('editor.options_menu.delete.confirm_title')}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                            {t('editor.options_menu.delete.confirm_description', { title: targetNote?.title })}
                        </p>

                        <div className="flex gap-3 w-full">
                            <button
                                onClick={onClose}
                                className="cursor-pointer flex-1 px-4 py-2.5 text-sm font-medium text-text-primary bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={handleDelete}
                                className="cursor-pointer flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-lg shadow-red-600/20"
                            >
                                {t('common.delete')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </FloatingPortal>
    );
};

export default DeleteConfirmModal;