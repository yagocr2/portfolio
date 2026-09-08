import styles from './CRTScreen.module.css';

/**
 * Envoltorio que aplica el "look" de una pantalla CRT sobre todo el contenido:
 * líneas de barrido (scanlines), viñeta en los bordes y un parpadeo muy sutil.
 * El overlay es decorativo y no captura clics (pointer-events: none).
 */
export function CRTScreen({ children }) {
  return (
    <div className={styles.crt}>
      {children}
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.flicker} aria-hidden="true" />
    </div>
  );
}
