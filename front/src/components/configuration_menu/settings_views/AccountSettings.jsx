import React from 'react';
import { LogOut } from 'lucide-react';

const AccountSettings = ({ t, onLogoutClick }) => {

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="max-w-full sm:max-w-[65%]">
                    <h4 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {t('settings.account.logout.title')}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-500 mt-1">
                        {t('settings.account.logout.description')}
                    </p>
                </div>
                <button
                    onClick={onLogoutClick}
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl dark:brightness-90 hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-600/20"
                >
                    <LogOut className="w-4 h-4" />
                    {t('settings.account.logout.logout')}
                </button>
            </div>
        </div>
    );
};

export default AccountSettings;