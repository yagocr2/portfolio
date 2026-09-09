import { createContext } from 'react';

/**
 * Objeto de contexto del sistema de sonido. Vive en un módulo aparte (sin
 * componentes) para no romper el Fast Refresh, igual que i18n/context.js.
 */
export const SoundContext = createContext(null);
