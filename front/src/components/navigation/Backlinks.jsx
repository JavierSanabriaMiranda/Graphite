import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as LinkIcon } from 'lucide-react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import { useNote } from '../context/NoteContext';
import NoteIcon from '../util/NoteIcon';
import DropdownArrow from '../util/DropdownArrow';

const Backlinks = ({ backlinks }) => {
  const { t } = useTranslation();
  const { selectNote } = useNote();
  const [isOpen, setIsOpen] = useState(false);

  // Configuración de Floating-UI
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
        offset(10), 
        flip({ fallbackAxisSideDirection: 'end' }), 
        shift()
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  if (backlinks.length === 0) return null;

  return (
    <>
      {/* Trigger button */}
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer border ${
          isOpen
            ? 'bg-primary/10 border-primary/20 text-primary'
            : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 border-transparent text-zinc-500 dark:text-zinc-400'
        }`}
      >
        <LinkIcon className="w-4 h-4 opacity-70" />
        <span className="text-xs font-bold">
          {backlinks.length} {t('editor.info_bar.backlinks')}
        </span>
        <DropdownArrow menuOpen={isOpen} defaultRotateAngle={0} rotateAngle={180} />
      </button>

      {/* Menú Flotante */}
      <FloatingPortal>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, visibility: isOpen ? 'visible' : 'hidden' }}
              {...getFloatingProps()}
              className="w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-[9999] p-2 animate-in fade-in zoom-in-95 duration-100 outline-none"
            >
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                {t('editor.info_bar.backlinks')}
              </p>
              
              <div className="max-h-56 overflow-y-auto custom-scrollbar">
                {backlinks.map((link) => (
                  <button
                    key={link.note_id}
                    onClick={() => {
                      selectNote(link);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left transition-colors cursor-pointer group outline-none"
                  >
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <NoteIcon iconChar={link.icon || '📄'} />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-xs text-zinc-700 dark:text-zinc-200 truncate font-bold">
                        {link.title || t('editor.untitled_note')}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {new Date(link.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};

export default Backlinks;