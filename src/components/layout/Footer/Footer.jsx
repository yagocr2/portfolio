import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { profile } from '../../../data/profile.js';
import styles from './Footer.module.css';

/**
 * Pie de página con créditos y botón para volver arriba (RESET).
 */
export function Footer() {
  const { t } = useTranslation();
  const { play } = useSound();
  const year = new Date().getFullYear();

  const handleReset = () => {
    play('select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.reset}
          onClick={handleReset}
          onMouseEnter={() => play('hoverButton')}
        >
          ↑ {t('ui.backToTop')}
        </button>
        <p className={styles.credit}>
          © {year} {profile.name} · {t('footer.madeWith')}
        </p>
        <p className={styles.tip}>{t('footer.rights')}</p>
      </div>
    </footer>
  );
}
