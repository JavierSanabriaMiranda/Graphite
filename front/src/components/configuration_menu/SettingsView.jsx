import { Globe, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const SettingsView = ({ t, onClose, isMobile }) => {
    return (
        <div className="flex h-full w-full bg-main-bg overflow-hidden transition-all duration-200">
            {/* Sidebar just for desktop and tablets */}
            <div className="hidden sm:flex w-56 md:w-64 bg-main-bg border-r border-zinc-200 dark:border-zinc-800 p-5 flex-col shrink-0">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-2 mb-4">
                    {t('settings.title')}
                </h3>
                <button className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl bg-primary/10 text-primary transition-all">
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
                        {isMobile && (
                            <p className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">
                                {t('settings.title')}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all active:scale-90"
                    >
                        <X className="w-6 h-6 text-zinc-500" />
                    </button>
                </div>

                {/* Settings zone */}
                <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                            <div className="max-w-full sm:max-w-[65%]">
                                <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                                    {t('settings.language.title')}
                                </h4>
                                <p className="text-xs md:text-sm text-zinc-500 mt-1">
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
    );
};

export default SettingsView