import { useState } from 'react';
import { XPIcon } from '../xpIcons.jsx';
import styles from './XPDesktopIcon.module.css';

/**
 * Icono de escritorio. Un clic selecciona (fondo azul + caption invertida);
 * doble clic abre. En pantallas táctiles (sin hover de precisión) un solo
 * toque abre directamente, porque ahí no hay noción de "doble clic".
 *
 * @param {object} props
 * @param {string} props.iconName - clave registrada en xpIcons.jsx.
 * @param {string} props.label
 * @param {() => void} props.onOpen
 */
export function XPDesktopIcon({ iconName, label, onOpen }) {
  const [selected, setSelected] = useState(false);

  const isCoarsePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const handleClick = () => {
    if (isCoarsePointer) {
      onOpen();
      return;
    }
    setSelected(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <button
      type="button"
      className={`${styles.icon} ${selected ? styles.selected : ''}`}
      onClick={handleClick}
      onDoubleClick={onOpen}
      onKeyDown={handleKeyDown}
      onBlur={() => setSelected(false)}
    >
      <span className={styles.glyph}>
        <XPIcon name={iconName} />
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
