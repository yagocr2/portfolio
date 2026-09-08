import { useContext } from 'react';
import { LanguageContext } from './context.js';

/**
 * Hook de acceso al sistema de traducción.
 * Devuelve { t, lang, setLang, toggleLang }.
 */
export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation debe usarse dentro de <LanguageProvider>');
  }
  return ctx;
}
