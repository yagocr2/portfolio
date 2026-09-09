import { useTranslation } from '../../../i18n/useTranslation.js';
import { SUPPORTED_LANGS } from '../../../i18n/context.js';
import { useSound } from '../../../hooks/useSound.js';
import styles from './LanguageSwitcher.module.css';

/**
 * Selector de idioma ES/EN con aspecto de switch de consola.
 */
export function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useTranslation();
  const { play } = useSound();

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
          onClick={() => {
            play('select');
            setLang(code);
          }}
          onMouseEnter={() => play('hoverLang')}
          aria-pressed={lang === code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
