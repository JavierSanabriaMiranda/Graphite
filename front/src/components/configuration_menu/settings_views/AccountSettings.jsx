import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AccountSettings = ({ t }) => {
    const { logout } = useAuth();

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
                    onClick={logout}
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/25 text-red-500 border dark:border-0 border-red-500 text-sm font-bold rounded-2xl transition-all shadow-sm shadow-red-500/20 active:scale-95"
                >
                    <LogOut className="w-4 h-4" />
                    {t('settings.account.logout.logout')}
                </button>
            </div>
        </div>
    );
};

export default AccountSettings;