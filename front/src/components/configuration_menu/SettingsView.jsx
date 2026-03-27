import { useState } from 'react';
import { Globe, X, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '../context/AuthContext';

const SettingsView = ({ t, onClose, isMobile }) => {
    const [activeTab, setActiveTab] = useState('general');
    const { logout } = useAuth();

    const getTabClass = (tabId) => {
        const baseClass = "cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ";
        return activeTab === tabId
            ? baseClass + "bg-primary/10 text-primary shadow-sm shadow-primary/5"
            : baseClass + "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100";
    };

    return (
        <div className="flex h-full w-full bg-main-bg overflow-hidden transition-all duration-200">
            {/* Sidebar - Desktop & Tablet */}
            <div className="hidden sm:flex w-56 md:w-64 bg-main-bg border-r border-zinc-200 dark:border-zinc-800 p-5 flex-col shrink-0">
                <div className="flex-1 space-y-6">
                    {/* Sección General */}
                    <div>
                        <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] px-3 mb-3">
                            {t('settings.title')}
                        </h3>
                        <div className="space-y-1">
                            <button
                                onClick={() => setActiveTab('general')}
                                className={getTabClass('general')}
                            >
                                <Globe className="w-4.5 h-4.5" />
                                {t('settings.general')}
                            </button>
                        </div>
                    </div>

                    {/* Sección Cuenta */}
                    <div>
                        <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] px-3 mb-3">
                            {t('settings.account_section')} {/* Añade esta clave a tu i18n */}
                        </h3>
                        <div className="space-y-1">
                            <button
                                onClick={() => setActiveTab('account')}
                                className={getTabClass('account')}
                            >
                                <User className="w-4.5 h-4.5" />
                                {t('settings.account')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Logout button at sidebar end */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={logout}
                        className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200 group"
                    >
                        <LogOut className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
                        {t('settings.logout.logout')}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950/20">
                {/* Dynamic Header */}
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-main-bg">
                    <div className="flex flex-col">
                        <h2 className="font-bold text-lg md:text-xl text-zinc-900 dark:text-zinc-100 capitalize">
                            {activeTab === 'general' ? t('settings.general') : t('settings.account')}
                        </h2>
                        {isMobile && (
                            <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">
                                Graphite System
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

                {/* Settings Content Switch */}
                <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">

                        {activeTab === 'general' && (
                            <div className="space-y-6">
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
                                {/* Puedes añadir más opciones generales aquí */}
                            </div>
                        )}

                        {activeTab === 'account' && (
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                    <div className="max-w-full sm:max-w-[65%]">
                                        <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                                            {t('settings.logout.title')}
                                        </h4>
                                        <p className="text-xs md:text-sm text-zinc-500 mt-1">
                                            {t('settings.logout.description')}
                                        </p>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-red-500/20 active:scale-95"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        {t('settings.logout.logout')}
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView