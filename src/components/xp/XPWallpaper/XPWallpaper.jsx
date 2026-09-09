import styles from './XPWallpaper.module.css';

/**
 * Recreación en CSS puro del wallpaper clásico "colina verde bajo cielo
 * azul" (sin usar la foto real de Microsoft): cielo degradado, un par de
 * nubes difuminadas y una colina con degradado elíptico. Mismo enfoque de
 * CSS art que ya usa ParallaxBackground para el fondo synthwave del tema
 * retro.
 */
export function XPWallpaper() {
  return (
    <div className={styles.wallpaper} aria-hidden="true">
      <div className={styles.sky} />
      <div className={`${styles.cloud} ${styles.cloud1}`} />
      <div className={`${styles.cloud} ${styles.cloud2}`} />
      <div className={`${styles.cloud} ${styles.cloud3}`} />
      <div className={styles.hillBack} />
      <div className={styles.hillFront} />
    </div>
  );
}
