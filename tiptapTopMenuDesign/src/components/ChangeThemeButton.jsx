import { useState, useEffect } from 'react';

/**
 * Tool to change the theme of the editor.
 * It toggles between light and dark mode, and saves the preference in localStorage.
 */
const ChangeThemeButton = () => {

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
                       hover:bg-gray-200 dark:hover:bg-zinc-700
                       text-xl"
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
            {isDark ? '☀️' : '🌙'}
        </button>
    );
}

export default ChangeThemeButton;