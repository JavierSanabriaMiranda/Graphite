import React from 'react';
import { PenLine, Search, Folder, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BottomNavbar = ({ activeTab = 'editor', onTabChange }) => {
    const { t } = useTranslation();

    const tabs = [
        { id: 'editor', label: t('nav.editor'), icon: <PenLine size={20} /> },
        { id: 'search', label: t('nav.search'), icon: <Search size={20} /> },
        { id: 'browse', label: t('nav.browse'), icon: <Folder size={20} /> },
        { id: 'settings', label: t('nav.settings'), icon: <Settings size={20} /> },
    ];

    return (

        <nav className="fixed bottom-0 left-0 w-full h-16 bg-main-bg border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-around z-50 px-2 pb-safe">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange?.(tab.id)}
                    className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${activeTab === tab.id
                        ? 'text-primary'
                        : 'text-zinc-500 dark:text-zinc-400'
                        }`}
                >
                    <div className={`${activeTab === tab.id ? 'animate-in zoom-in duration-200' : ''}`}>
                        {tab.icon}
                    </div>
                    <span className="text-[10px] font-medium tracking-wide">
                        {tab.label}
                    </span>
                </button>
            ))}
        </nav>

    );
};

export default BottomNavbar;