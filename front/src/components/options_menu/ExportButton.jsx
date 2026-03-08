import { useTranslation } from "react-i18next";

/**
 * Button with export symbol that opens the export modal when clicked.
 * 
 * @param {Function} onOpenModal - Callback function to open the export modal
 */
const ExportButton = ({ onOpenModal }) => {

  const { t } = useTranslation();

  return (
    <>
      <button 
        onClick={onOpenModal}
        className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-left rounded-lg hover:bg-hover-primary-bg text-text-primary transition-colors w-full"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {t('editor.options_menu.export.export')}
      </button>
    </>
  );
};

export default ExportButton;