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
import { useIsMobile } from '../../hooks/useIsMobile';
import SettingsView from './SettingsView';

const SettingsModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    const isMobile = useIsMobile();

    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: onClose,
    });

    // Interaction to close when clicking outside or with ESC
    const dismiss = useDismiss(context, {
        enabled: !isMobile,
        outsidePressEvent: 'mousedown',
    });

    const role = useRole(context);

    const { getFloatingProps } = useInteractions([dismiss, role]);

    if (!isOpen) return null;

    if (isMobile) {
        return (
            <div
                ref={refs.setFloating}
                className="fixed inset-0 z-1000 bg-main-bg pt-7 animate-in slide-in-from-bottom duration-300"
            >
                <SettingsView t={t} onClose={onClose} isMobile={true} />
            </div>
        );
    }

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
                <div
                    ref={refs.setFloating}
                    {...getFloatingProps()}
                    className="relative flex overflow-hidden shadow-2xl transition-all duration-200 bg-main-bg border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 w-[90vw] h-[85vh] max-w-6xl rounded-2xl"
                >
                    <SettingsView t={t} onClose={onClose} isMobile={false} />
                </div>
            </FloatingOverlay>
        </FloatingPortal>
    );
};

export default SettingsModal;