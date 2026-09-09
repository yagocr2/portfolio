import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext, SUPPORTED_THEMES, STORAGE_KEY, THEME_COLOR } from './context.js';

/** Detecta el tema inicial: localStorage > 'retro' por defecto. */
function detectInitialTheme() {
  if (typeof window === 'undefined') return 'retro';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_THEMES.includes(stored) ? stored : 'retro';
}

/**
 * Proveedor del tema visual activo (retro 8-bits vs. escritorio XP). Persiste
 * la preferencia en localStorage y refleja el tema en el <html> vía
 * `data-theme`, igual que LanguageProvider hace con `lang`. También mantiene
 * sincronizado el <meta name="theme-color"> del navegador.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(detectInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLOR[theme] ?? THEME_COLOR.retro);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'retro' ? 'xp' : 'retro'));
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
