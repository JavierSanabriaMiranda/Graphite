import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFloating, offset, flip, shift, useInteractions, useClick, useDismiss, autoUpdate, FloatingPortal } from '@floating-ui/react';
import ExportButton from './ExportButton';
import ImportButton from './ImportButton';
import ExportModal from './ExportModal';

/**
 * Button that opens a menu with multiple options related to the editor, such as exporting or importing content.
 * 
 * @param {Object} editor - The editor instance 
 */
const OptionsMenu = ({ editor }) => {

  const { t } = useTranslation(); 

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Floating UI setup for the options menu
  const { refs, floatingStyles, context } = useFloating({
    open: menuOpen,
    onOpenChange: setMenuOpen,
    placement: 'bottom-start',
    middleware: [offset(8), flip(), shift({ padding: 10 })],
    whileElementsMounted: autoUpdate,
  });

  // Interactions for click and dismiss
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex items-center justify-center w-9 h-9 rounded-lg transition-all bg-main-bg hover:bg-hover-primary-bg text-gray-600 dark:text-zinc-400"
        title={t('editor.options_menu.options_menu')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm9 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm9 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
        </svg>
      </button>

      
        <FloatingPortal style={{visibility: menuOpen ? 'visible' : 'hidden'}}>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, visibility: menuOpen ? 'visible' : 'hidden'}}
            {...getFloatingProps()}
            className={`z-[9999] min-w-[160px] p-1 bg-main-bg border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl flex flex-col `}
          >
            <ExportButton onOpenModal={() => {
              setModalOpen(true); // Open export modal
              setMenuOpen(false); // Close options menu
            }} />
            <ImportButton editor={editor} onDone={() => setMenuOpen(false)} />
          </div>
        </FloatingPortal>
      
      <ExportModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        editor={editor} 
      />
    </>
  );
};

export default OptionsMenu;