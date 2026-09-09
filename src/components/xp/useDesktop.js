import { useContext } from 'react';
import { DesktopContext } from './desktopContext.js';

/** Hook de acceso al estado del escritorio XP. Devuelve { state, dispatch }. */
export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) {
    throw new Error('useDesktop debe usarse dentro de <XPDesktop>');
  }
  return ctx;
}
