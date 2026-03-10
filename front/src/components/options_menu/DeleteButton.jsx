import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DeleteButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group"
    >
      <Trash2 className="w-4 h-4" />
      <span className="font-medium">{t('editor.options_menu.delete.label')}</span>
    </button>
  );
};

export default DeleteButton;