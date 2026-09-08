import { useTranslation } from '../../../i18n/useTranslation.js';
import { profile } from '../../../data/profile.js';
import styles from './Footer.module.css';

/**
 * Pie de página con créditos y botón para volver arriba (RESET).
 */
export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.reset}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
