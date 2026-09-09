import { useContext } from 'react';
import { ThemeContext } from './context.js';

/**
 * Hook de acceso al sistema de temas.
 * Devuelve { theme, setTheme, toggleTheme }.
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  }
  return ctx;
}
