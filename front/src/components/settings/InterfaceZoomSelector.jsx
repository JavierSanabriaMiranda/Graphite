import React, { useState, useEffect } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from 'react-i18next';

/**
 * Slider component to control the global interface zoom
 */
const InterfaceZoomSelector = () => {
    const { t } = useTranslation();
    const { zoomIndex, setZoomIndex, ZOOM_LEVELS } = useSettings();

    // localIndex is used to control the slider position while dragging, 
    // without applying the zoom until the user releases the mouse or touch
    const [localIndex, setLocalIndex] = useState(zoomIndex);

    // If zoomIndex changes from outside (e.g. by shortcut keys), 
    // update localIndex to reflect that in the slider
    useEffect(() => {
        setLocalIndex(zoomIndex);
    }, [zoomIndex]);

    const percentage = Math.round((ZOOM_LEVELS[localIndex] / 16) * 100);
    const isDefault = ZOOM_LEVELS[localIndex] === 16;

    return (
        <div className="flex flex-col items-center gap-1 w-full sm:w-72">
            <div className="relative w-full flex items-center justify-center h-8">
                <span className={`text-xs font-black px-2.5 py-1 rounded-full transition-all ${
                    isDefault ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500' : 'bg-primary/10 text-primary shadow-sm scale-110'
                }`}>
                    {percentage}%
                </span>
                
                {!isDefault && (
                    <button 
                        onClick={() => setZoomIndex(2)}
                        className="absolute right-0 cursor-pointer p-1.5 text-zinc-400 hover:text-primary transition-all"
                        title={t('settings.general.zoom.reset')}
                    >
                        <RotateCcw size={14} />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3 w-full">
                <button 
                    onClick={() => setZoomIndex(prev => Math.max(prev - 1, 0))}
                    disabled={localIndex === 0}
                    className="cursor-pointer p-1.5 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg disabled:opacity-20"
                    title={t('settings.general.zoom.decrease')}
                >
                    <Minus size={16} />
                </button>

                <input
                    type="range"
                    min="0"
                    max={ZOOM_LEVELS.length - 1}
                    step="1"
                    value={localIndex}
                    onChange={(e) => setLocalIndex(parseInt(e.target.value))}
                    onMouseUp={() => setZoomIndex(localIndex)}
                    onTouchEnd={() => setZoomIndex(localIndex)}
                    className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <button 
                    onClick={() => setZoomIndex(prev => Math.min(prev + 1, ZOOM_LEVELS.length - 1))}
                    disabled={localIndex === ZOOM_LEVELS.length - 1}
                    className="cursor-pointer p-1.5 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg disabled:opacity-20"
                    title={t('settings.general.zoom.increase')}
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    );
};

export default InterfaceZoomSelector;