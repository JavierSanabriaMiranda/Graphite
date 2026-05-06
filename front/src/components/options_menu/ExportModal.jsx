import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FloatingPortal } from '@floating-ui/react';
import { useToast } from '../context/ToastContext';
import { exportNoteToHtml } from './export/exportNoteToHtml';
import { exportNoteToPdf } from './export/exportNoteToPdf';
import { useNote } from '../context/NoteContext';
import { Sun, Moon, FileJson, Globe, FileText } from 'lucide-react';

/**
 * Utility to save JSON files (standard browser/tauri download)
 */
const saveAsFile = (content, fileName, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

const normalizeText = (text) => {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replaceAll(/[\u0300-\u036f]/g, "");
};

/**
 * Modal component that allows the user to export the content of the editor in different formats (JSON or HTML).
 * 
 * @param {boolean} isOpen - Whether the modal is open or not
 * @param {Function} onClose - Callback function to close the modal
 * @param {Object} editor - The editor instance to get the content for export
 */
const ExportModal = ({ isOpen, onClose, editor }) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { selectedNote } = useNote()

  // State for the selected format and theme
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [exportTheme, setExportTheme] = useState('light');

  if (!isOpen) return null;

  /**
   * Orchestrates the export process based on user selection.
   */
  const downloadFile = async () => {
    try {
      const filename = selectedNote?.title || 'Graphite_Document';


      if (selectedFormat === 'pdf') {
        showToast(t('editor.options_menu.export.preparing_pdf'), "info");
        await exportNoteToPdf(editor, filename, 'light');
      }
      else if (selectedFormat === 'html') {
        await exportNoteToHtml(editor, filename, exportTheme);
      }
      else {
        // JSON Export
        const content = JSON.stringify(editor.getJSON(), null, 2);
        saveAsFile(content, `${filename}.json`, 'application/json');
      }

      showToast(t('editor.options_menu.export.export_success'), "success");
      onClose();
    } catch (error) {
      console.error("Export process failed:", error);
      showToast(t('editor.options_menu.export.export_failed'), "error");
    }
  };

  const formats = [
    { id: 'json', icon: <FileJson size={24} />, label: 'JSON' },
    { id: 'html', icon: <Globe size={24} />, label: 'HTML' },
    { id: 'pdf', icon: <FileText size={24} />, label: 'PDF' },
  ];

  return (
    <FloatingPortal>
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 w-full max-w-md p-6 rounded-2xl shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-300">

          <h3 className="text-xl font-bold mb-2">{t('editor.options_menu.export.modal_title')}</h3>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6 text-sm">{t('editor.options_menu.export.modal_instructions')}</p>

          {/* Format Selection Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedFormat === format.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    : 'border-gray-100 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700'
                  }`}
              >
                {format.icon}
                <span className="font-bold text-xs uppercase">{format.label}</span>
              </button>
            ))}
          </div>

          {/* Theme Selector (Only for HTML and PDF) */}
          {(selectedFormat === 'html') && (
            <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3 block">
                {t('editor.options_menu.export.select_theme')}
              </label>
              <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl gap-1">
                <button
                  onClick={() => setExportTheme('light')}
                  className={`cursor-pointer flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${exportTheme === 'light' ? 'bg-white dark:bg-zinc-700 shadow-sm' : 'text-zinc-500'
                    }`}
                >
                  <Sun size={16} /> {t('editor.options_menu.export.theme_light')}
                </button>
                <button
                  onClick={() => setExportTheme('dark')}
                  className={`cursor-pointer flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${exportTheme === 'dark' ? 'bg-white dark:bg-zinc-700 shadow-sm' : 'text-zinc-500'
                    }`}
                >
                  <Moon size={16} /> {t('editor.options_menu.export.theme_dark')}
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {t('editor.options_menu.export.modal_cancel')}
            </button>
            <button
              onClick={downloadFile}
              className="cursor-pointer px-6 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              {t('editor.options_menu.export.modal_export')}
            </button>
          </div>
        </div>
      </div>
    </FloatingPortal>
  );
};

export default ExportModal;