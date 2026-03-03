import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Tool to change the theme of the editor.
 * It toggles between light and dark mode, and saves the preference in localStorage.
 */
const ChangeThemeButton = () => {

    const { t } = useTranslation();

    // Initialize the theme based on localStorage or system preference
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button 
            type="button"
            onClick={() => setIsDark(!isDark)} 
            className="flex items-center justify-center w-9 h-9 rounded-lg 
                       transition-all duration-300 cursor-pointer
                       bg-main-bg
                       hover:bg-hover-primary-bg
                       text-xl"
            title={isDark ? t('editor.toolbar.change_light_theme') : t('editor.toolbar.change_dark_theme')}>
            {isDark ? '☀️' : '🌙'}
        </button>
    );
}

export default ChangeThemeButton;