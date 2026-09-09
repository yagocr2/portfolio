import { useSound } from '../../../hooks/useSound.js';
import styles from './PixelToggle.module.css';

/**
 * Botón interruptor genérico con estética 8-bits (etiqueta + punto indicador
 * que se enciende en verde cuando está activo). Base visual compartida por
 * CrtToggle y SoundToggle; el sonido de hover se resuelve aquí una sola vez.
 *
 * @param {object} props
 * @param {boolean} props.active
 * @param {() => void} props.onToggle
 * @param {string} props.label - texto corto (p. ej. "CRT", "SFX").
 * @param {string} props.ariaLabel
 * @param {string} [props.title]
 */
export function PixelToggle({ active, onToggle, label, ariaLabel, title }) {
  const { play } = useSound();

  return (
    <button
      type="button"
      className={`${styles.toggle} ${active ? styles.active : ''}`}
      onClick={onToggle}
      onMouseEnter={() => play('hoverToggle')}
      aria-pressed={active}
      aria-label={ariaLabel}
      title={title}
    >
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </button>
  );
}
