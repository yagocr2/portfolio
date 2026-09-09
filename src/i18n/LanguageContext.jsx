import { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext, SUPPORTED_LANGS, STORAGE_KEY } from './context.js';
import es from './locales/es.json';
import en from './locales/en.json';

const DICTIONARIES = { es, en };

/** Detecta el idioma inicial: localStorage > navegador > 'es' por defecto. */
function detectInitialLang() {
  if (typeof window === 'undefined') return 'es';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const browser = window.navigator.language?.slice(0, 2);
  return SUPPORTED_LANGS.includes(browser) ? browser : 'es';
}

/** Resuelve una clave anidada por puntos ("a.b.c") dentro de un objeto. */
function resolveKey(dict, key) {
  return key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), dict);
}

/** Interpola {variables} dentro de un string usando el objeto de params. */
function interpolate(str, params) {
  if (!params || typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (match, name) =>
    name in params ? String(params[name]) : match,
  );
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  /**
   * Traduce una clave. Si no existe, intenta el fallback en español y, en
   * último caso, devuelve la propia clave para detectar textos faltantes.
   */
  const t = useCallback(
    (key, params) => {
      const value = resolveKey(DICTIONARIES[lang], key) ?? resolveKey(DICTIONARIES.es, key);
      if (value == null) {
        if (import.meta.env.DEV) console.warn(`[i18n] Falta la clave: "${key}"`);
        return key;
      }
      return interpolate(value, params);
    },
    [lang],
  );

  // El <title> y la meta description viven estáticos en index.html (en
  // español, para que un crawler que no ejecute JS siga viendo algo
  // correcto); aquí se actualizan en cliente al cambiar de idioma, igual
  // que ya se hace arriba con documentElement.lang. Los og:*/twitter:*
  // no se tocan: los bots de redes sociales no ejecutan JS, así que solo
  // leerían el valor inicial del HTML servido.
  useEffect(() => {
    document.title = t('seo.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('seo.description'));
  }, [t]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, toggleLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
