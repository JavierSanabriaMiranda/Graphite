import { useState } from 'react';
import { FloatingPortal } from '@floating-ui/react';
import { useToast } from '../util/ToastContext';

/**
 * Modal component that allows the user to export the content of the editor in different formats (JSON or HTML).
 * 
 * @param {boolean} isOpen - Whether the modal is open or not
 * @param {Function} onClose - Callback function to close the modal
 * @param {Object} editor - The editor instance to get the content for export
 */
const ExportModal = ({ isOpen, onClose, editor }) => {
  const [selectedFormat, setSelectedFormat] = useState('json');
  const { showToast } = useToast();

  if (!isOpen) return null;

  /**
   * Function to download the editor content in the selected format. 
   * It creates a blob with the content and triggers a download. 
   * (supported by browsers, review with tauri if it works correctly there)
   */
  const downloadFile = () => {
    const content = selectedFormat === 'json'
      ? JSON.stringify(editor.getJSON(), null, 2)
      : editor.getHTML();

    const blob = new Blob([content], { type: selectedFormat === 'json' ? 'application/json' : 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `documento.${selectedFormat}`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("¡Documento exportado con éxito!", "success");
    onClose(); // Close modal after download
  };

  return (
    <FloatingPortal>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-main-bg border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 w-full max-w-md p-6 rounded-2xl shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-xl font-bold mb-4">Exportar Documento</h3>
          <p className="text-gray-500 dark:text-zinc-400 mb-6">Selecciona el formato deseado:</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {['json', 'html'].map((format) => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedFormat === format ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-gray-100 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-600'
                  }`}
              >
                <span className="text-2xl">{format === 'json' ? '{ }' : '🌐'}</span>
                <span className="font-bold uppercase">{format}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
              Cancelar
            </button>
            <button onClick={downloadFile} className="px-6 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg">
              Exportar ahora
            </button>
          </div>
        </div>
      </div>
    </FloatingPortal>
  );
};

export default ExportModal;