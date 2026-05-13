import React from 'react';
import LanguageSelector from '../LanguageSelector';
import DefaultFontSelector from '../DefaultFontSelector';
import InterfaceZoomSelector from '../InterfaceZoomSelector';

/**
 * View that represents the general tab settings
 * 
 * @param {Function} t - i18n function to use internationalized strings 
 */
const GeneralSettings = ({ t }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Language Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="max-w-full sm:max-w-[65%]">
                    <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {t('settings.general.language.title')}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-500 mt-1">
                        {t('settings.general.language.description')}
                    </p>
                </div>
                <div className="w-full sm:w-auto flex justify-end">
                    <LanguageSelector />
                </div>
            </div>
            {/* Zoom Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="max-w-full sm:max-w-[65%]">
                    <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {t('settings.general.zoom.title') || "Interface Zoom"}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-500 mt-1">
                        {t('settings.general.zoom.description') || "Adjust the scale of the entire application interface."}
                    </p>
                </div>
                <div className="w-full sm:w-auto flex justify-end">
                    <InterfaceZoomSelector />
                </div>
            </div>
            {/* Font Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="max-w-full sm:max-w-[65%]">
                    <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {t('settings.general.font.title') || "Default Editor Font"}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-500 mt-1">
                        {t('settings.general.font.description') || "Choose the font that will be used by default in your notes."}
                    </p>
                </div>
                <div className="w-full sm:w-auto flex justify-end">
                    <DefaultFontSelector />
                </div>
            </div>
        </div>
    );
};

export default GeneralSettings;