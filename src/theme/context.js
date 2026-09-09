import { createContext } from 'react';

/**
 * Objeto de contexto y constantes del sistema de temas. Vive en un módulo
 * aparte (sin componentes) para no romper el Fast Refresh, igual que
 * src/i18n/context.js y src/audio/context.js.
 */
export const ThemeContext = createContext(null);
export const SUPPORTED_THEMES = ['retro', 'xp'];
export const STORAGE_KEY = 'yago-portfolio-theme';

/** Color de la barra del navegador (meta theme-color) por tema. */
export const THEME_COLOR = {
  retro: '#0d0221',
  xp: '#3a6ea5',
};
