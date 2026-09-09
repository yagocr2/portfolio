import { createContext } from 'react';

/**
 * Contexto del escritorio XP: reparte el estado del gestor de ventanas
 * (windowManager.js) y sus acciones a XPWindow / XPTaskbar / XPDesktopIcon
 * sin prop drilling. Vive en un módulo aparte, sin componentes, para no
 * romper el Fast Refresh — mismo patrón que src/i18n/context.js.
 */
export const DesktopContext = createContext(null);
