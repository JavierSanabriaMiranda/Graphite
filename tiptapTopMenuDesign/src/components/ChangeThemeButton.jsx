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