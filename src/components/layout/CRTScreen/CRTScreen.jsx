import { useCrtMode } from '../../../hooks/useCrtMode.js';
import { CrtToggle } from '../../ui/CrtToggle/CrtToggle.jsx';
import { SoundToggle } from '../../ui/SoundToggle/SoundToggle.jsx';
import styles from './CRTScreen.module.css';

/**
 * Envoltorio que aplica el "look" de una pantalla CRT sobre todo el contenido:
 * líneas de barrido (scanlines), viñeta en los bordes y un parpadeo muy sutil.
 * El overlay es decorativo y no captura clics (pointer-events: none).
 *
 * Incluye además el filtro conmutable de "tele antigua" (desenfoque + fleco de
 * color + banda rodante), apagado por defecto y persistido en localStorage.
 * Se implementa con `backdrop-filter` en capas fijas por encima del contenido,
 * no con `filter` sobre el contenedor: un ancestro con `filter` se convierte en
 * el bloque contenedor de sus descendientes `position: fixed` (la barra de
 * navegación, el fondo parallax…), lo que rompería su posicionamiento.
 */
export function CRTScreen({ children }) {
  const [crtMode, setCrtMode] = useCrtMode();

  return (
    <div className={`${styles.crt} ${crtMode ? styles.tvOn : ''}`}>
      {/* Filtro SVG de aberración cromática, usado por .tvBlur vía backdrop-filter. */}
      <svg className={styles.svgDefs} aria-hidden="true" focusable="false">
        <filter id="crt-ghost" x="-20%" y="-20%" width="140%" height="140%">
          <feOffset in="SourceGraphic" dx="-1" dy="0" result="off-r" />
          <feColorMatrix
            in="off-r"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="red"
          />
          <feOffset in="SourceGraphic" dx="1" dy="0" result="off-b" />
          <feColorMatrix
            in="off-b"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="blue"
          />
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="green"
          />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" />
        </filter>
      </svg>

      {children}

      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.flicker} aria-hidden="true" />

      {crtMode && (
        <>
          <div className={styles.tvBlur} aria-hidden="true" />
          <div className={styles.tvMask} aria-hidden="true" />
          <div className={styles.tvRoll} aria-hidden="true" />
        </>
      )}

      <div className={styles.tools}>
        <SoundToggle />
        <CrtToggle active={crtMode} onToggle={() => setCrtMode((v) => !v)} />
      </div>
    </div>
  );
}
