import { useTranslation } from '../../../i18n/useTranslation.js';
import styles from './CrtToggle.module.css';

/**
 * Mando flotante (esquina inferior derecha) que enciende/apaga el filtro de
 * tele antigua. Vive fuera de las capas del filtro para quedar siempre nítido.
 *
 * @param {object} props
 * @param {boolean} props.active
 * @param {() => void} props.onToggle
 */
export function CrtToggle({ active, onToggle }) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className={`${styles.toggle} ${active ? styles.active : ''}`}
      onClick={onToggle}
      aria-pressed={active}
      aria-label={t('ui.crtToggle')}
      title={t('ui.crtToggle')}
    >
      <span className={styles.dot} aria-hidden="true" />
      CRT
    </button>
  );
}
