import React from 'react';
import LanguageSelector from '../LanguageSelector';

const GeneralSettings = ({ t }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
        </div>
    );
};

export default GeneralSettings;