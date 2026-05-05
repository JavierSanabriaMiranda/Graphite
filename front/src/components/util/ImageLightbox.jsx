import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { 
  useFloating, 
  useDismiss, 
  useInteractions, 
  FloatingPortal, 
  FloatingOverlay 
} from '@floating-ui/react';

/**
 * ImageLightbox Component
 * Handles the zoomed-in view of images with coordinate-based zooming.
 */
const ImageLightbox = ({ url, fileName, isOpen, onClose }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

    // Reset zoom state when lightbox closes
    useEffect(() => {
        if (!isOpen) {
            setIsZoomed(false);
            setZoomOrigin({ x: 50, y: 50 });
        }
    }, [isOpen]);

    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: onClose,
    });

    const dismiss = useDismiss(context, {
        outsidePress: !isZoomed,
        escapeKey: true,
    });

    const { getFloatingProps } = useInteractions([dismiss]);

    /**
     * Calculates the click coordinates relative to the image to set the transform origin.
     */
    const handleImageClick = (e) => {
        e.stopPropagation();
        if (!isZoomed) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setZoomOrigin({ x, y });
            setIsZoomed(true);
        } else {
            setIsZoomed(false);
        }
    };

    if (!isOpen) return null;

    return (
        <FloatingPortal>
            <FloatingOverlay 
                lockScroll 
                style={{ 
                    background: 'rgba(0, 0, 0, 0.95)', 
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                className="z-20000 p-4 animate-in fade-in duration-200"
            >
                <div 
                    ref={refs.setFloating} 
                    {...getFloatingProps()}
                    className="relative w-full h-full flex items-center justify-center outline-none"
                    onClick={onClose}
                    role='button'
                    tabIndex={0}
                >
                    {/* Close Button */}
                    {!isZoomed && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            className="cursor-pointer absolute top-8 right-8 p-2 text-white/50 hover:text-white transition-colors z-30"
                        >
                            <X size={32} />
                        </button>
                    )}

                    <button 
                        className={`relative transition-all duration-500 ease-out overflow-hidden rounded-lg shadow-2xl ${
                            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                        }`}
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '85vh',
                        }}
                        onClick={handleImageClick}
                    >
                        <img
                            src={url}
                            alt={fileName}
                            className="block w-full h-auto transition-transform duration-500 ease-out"
                            style={{
                                transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                                transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
                            }}
                        />
                    </button>

                    {/* Info Badge */}
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-zinc-900/80 backdrop-blur-xl px-5 py-2.5 rounded-full text-white/90 text-xs border border-white/10 pointer-events-none shadow-2xl">
                        <span className="font-bold tracking-tight">{fileName}</span>
                    </div>
                </div>
            </FloatingOverlay>
        </FloatingPortal>
    );
};

export default ImageLightbox;