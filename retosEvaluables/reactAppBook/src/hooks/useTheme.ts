// hooks/useTheme.ts
import { useState, useEffect } from 'react';

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        // Leer tema guardado o usar preferencia del sistema
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        // Aplicar tema al documento
        document.documentElement.className = theme;
        
        // Guardar en localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return { theme, setTheme, toggleTheme };
}