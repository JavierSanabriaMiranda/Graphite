import { X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import {
    useFloating,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal,
    FloatingOverlay,
} from '@floating-ui/react';

const SettingsModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: onClose,
    });

    // Interaction to close when clicking outside or with ESC
    const dismiss = useDismiss(context, {
        outsidePressEvent: 'mousedown',
    });

    const role = useRole(context);

    const { getFloatingProps } = useInteractions([dismiss, role]);

    if (!isOpen) return null;

    return (
        <FloatingPortal>
            <FloatingOverlay
                lockScroll // Block body scroll automatically
                style={{
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(4px)'
                }}
                className="animate-in fade-in duration-200"
            >
                {/* Modal Container */}
                <div
                    ref={refs.setFloating}
                    {...getFloatingProps()}
                    className={`
                        relative flex overflow-hidden shadow-2xl transition-all duration-200
                        bg-main-bg border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95
                        
                        /* Adaptabilidad: Pantalla completa en móvil, Modal en escritorio */
                        w-full h-full 
                        md:w-[90vw] md:h-[85vh] md:max-w-6xl md:rounded-2xl
                    `}
                >
                    {/* Sidebar */}
                    <div className="hidden sm:flex w-56 md:w-64 bg-main-bg border-r border-zinc-200 dark:border-zinc-800 p-5 flex-col shrink-0">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-2 mb-4">
                            {t('settings.title')}
                        </h3>
                        <button
                            type="button"
                            className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl bg-primary/10 text-primary transition-all active:scale-95"
                        >
                            <Globe className="w-4.5 h-4.5" />
                            {t('settings.general')}
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950/20">

                        {/* Header */}
                        <div className="flex items-center justify-between p-5 md:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-main-bg">
                            <div className="flex flex-col">
                                <h2 className="font-bold text-lg md:text-xl text-zinc-900 dark:text-zinc-100">
                                    {t('settings.general')}
                                </h2>
                                <p className="sm:hidden text-xs text-zinc-500 uppercase font-bold tracking-tighter">
                                    {t('settings.title')}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all active:rotate-90"
                                aria-label={t('common.close')}
                            >
                                <X className="w-6 h-6 text-zinc-500" />
                            </button>
                        </div>

                        {/* Scroll zone for setting */}
                        <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                            <div className="max-w-3xl mx-auto">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-colors">
                                    <div className="max-w-full sm:max-w-[65%]">
                                        <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                                            {t('settings.language.title')}
                                        </h4>
                                        <p className="text-xs md:text-sm text-zinc-500 mt-1 leading-relaxed">
                                            {t('settings.language.description')}
                                        </p>
                                    </div>

                                    <div className="w-full sm:w-auto flex justify-end">
                                        <LanguageSelector />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FloatingOverlay>
        </FloatingPortal>
    );
};

export default SettingsModal;