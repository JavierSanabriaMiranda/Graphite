import { useState, useEffect } from 'react';

const ChangeThemeButton = () => {

    // Inicializamos el estado mirando si ya había una preferencia guardada
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark' || 
               (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
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
            className="flex items-center justify-center w-9 h-9 rounded-lg border 
                       transition-all duration-300 cursor-pointer
                       bg-white dark:bg-zinc-800 
                       border-gray-200 dark:border-zinc-700
                       hover:bg-gray-50 dark:hover:bg-zinc-700
                       text-xl shadow-sm"
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
            {isDark ? '☀️' : '🌙'}
        </button>
    );
}

export default ChangeThemeButton;