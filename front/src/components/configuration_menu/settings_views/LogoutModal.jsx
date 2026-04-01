import { useTranslation } from 'react-i18next';
import { LogOut, AlertTriangle } from 'lucide-react';
import {
    FloatingPortal,
    FloatingOverlay,
    useFloating,
    useDismiss,
    useRole,
    useInteractions
} from '@floating-ui/react';

const LogoutModal = ({ isOpen, onClose, onConfirm, isUnsynced }) => {
    const { t } = useTranslation();

    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: onClose,
    });

    const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
    const role = useRole(context, { role: 'alertdialog' });
    const { getFloatingProps } = useInteractions([dismiss, role]);

    if (!isOpen) return null;

    return (
        <FloatingPortal>
            <FloatingOverlay
                lockScroll
                style={{
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                }}
                className="animate-in fade-in duration-200"
            >
                <div
                    ref={refs.setFloating}
                    {...getFloatingProps()}
                    className="relative w-full max-w-sm bg-main-bg border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200"
                >
                    <div className="flex flex-col items-center text-center">
                        {/* Icon */}
                        {isUnsynced ? (
                            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center mb-4 animate-bounce-slow">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                        ) : (
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mb-4">
                                <LogOut className="w-6 h-6" />
                            </div>
                        )}

                        {/* Title and description */}
                        <h3 className="text-lg font-bold text-text-primary mb-2">
                            {isUnsynced 
                                ? (t('settings.account.logout.unsynced_title') || "Cambios sin guardar")
                                : (t('settings.account.logout.confirm_title') || "¿Cerrar sesión?")
                            }
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                            {isUnsynced 
                                ? (t('settings.account.logout.unsynced_description') || "Hay notas o espacios que aún no se han sincronizado con la nube. Si cierras sesión ahora, perderás estos cambios permanentemente.")
                                : (t('settings.account.logout.confirm_description') || "Tu sesión finalizará y tendrás que volver a introducir tus credenciales.")
                            }
                        </p>

                        <div className="flex gap-3 w-full">
                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer flex-1 px-4 py-2.5 text-sm font-medium text-text-primary bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors outline-none"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="cursor-pointer flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:brightness-90 rounded-xl transition-colors shadow-lg shadow-red-600/20 outline-none"
                            >
                                {t('settings.account.logout.logout')}
                            </button>
                        </div>
                    </div>
                </div>
            </FloatingOverlay>
        </FloatingPortal>
    );
};

export default LogoutModal;