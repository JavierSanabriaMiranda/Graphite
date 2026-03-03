import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../util/ToastContext';

/**
 * Component to import a JSON file with the content of the editor and set it as the current content. 
 * It uses a hidden file input to trigger the file selection dialog and read the selected file.
 * 
 * @param {Object} editor - The editor instance to set the content with the imported file
 * @param {Function} onDone - Callback function to call after the import is done (to close the menu) 
 */
const ImportButton = ({ editor, onDone }) => {

  const { t } = useTranslation();

  const fileRef = useRef(null);
  const { showToast } = useToast();

  /**
   * Handles the file input change event, reads the selected file, parses it as JSON and sets it as the editor content.
   * If the file is not a valid JSON, it shows an alert to the user.
   */
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        editor.commands.insertContent(JSON.parse(event.target.result));
        e.target.value = ""; // Reset file input to allow importing the same file again if needed

        showToast(t('editor.options_menu.import_success'), "success");
        onDone();
      } catch (err) { 
        showToast("Error al importar el documento. Asegúrate de que el archivo es un JSON válido.", "error");
        e.target.value = ""; // Reset file input to allow importing the same file again if needed
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <input type="file" ref={fileRef} className="hidden" accept=".json" onChange={handleImport} />
      <button 
        onClick={() => fileRef.current.click()}
        className="flex items-center gap-2 px-3 py-2 text-sm text-left rounded-lg hover:bg-hover-primary-bg text-gray-700 dark:text-zinc-300 transition-colors w-full"
      >
        <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {t('editor.options_menu.import')}
      </button>
    </>
  );
};

export default ImportButton;