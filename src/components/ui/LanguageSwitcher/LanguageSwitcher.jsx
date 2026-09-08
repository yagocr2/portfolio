import { useTranslation } from '../../../i18n/useTranslation.js';
import { SUPPORTED_LANGS } from '../../../i18n/context.js';
import styles from './LanguageSwitcher.module.css';

/**
 * Selector de idioma ES/EN con aspecto de switch de consola.
 */
export function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useTranslation();

  return (
    <div
      className={[styles.switch, className].filter(Boolean).join(' ')}
      role="group"
      aria-label={t('ui.toggleLang')}
    >
      {SUPPORTED_LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={`${styles.opt} ${lang === code ? styles.active : ''}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
