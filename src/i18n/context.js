import { createContext } from 'react';

/**
 * Objeto de contexto y constantes del sistema i18n.
 * Vive en un módulo aparte (sin componentes) para no romper el Fast Refresh.
 */
export const LanguageContext = createContext(null);
export const SUPPORTED_LANGS = ['es', 'en'];
export const STORAGE_KEY = 'yago-portfolio-lang';
