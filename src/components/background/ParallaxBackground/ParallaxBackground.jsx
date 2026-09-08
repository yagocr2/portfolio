import { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsap.js';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js';
import styles from './ParallaxBackground.module.css';

/**
 * Fondo parallax pixelado (synthwave): estrellas en varias capas, sol retro,
 * montañas y una rejilla de suelo. Se desplaza a distintas velocidades con el
 * scroll y reacciona levemente al ratón. Es puramente decorativo.
 */
export function ParallaxBackground() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(ref);

      // --- Parallax por scroll: cada capa a su ritmo ---
      const layers = [
        ['.starsFar', -40],
        ['.starsNear', -120],
        ['.sun', -60],
        ['.mountains', -90],
        ['.grid', 80],
      ];
      layers.forEach(([sel, y]) => {
        gsap.to(q(sel), {
          yPercent: y,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      });

      // --- Parallax por ratón (muy sutil) ---
      const onMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(q('.starsNear'), { x: x * 18, y: y * 12, duration: 0.6 });
        gsap.to(q('.starsFar'), { x: x * 8, y: y * 6, duration: 0.6 });
        gsap.to(q('.sun'), { x: x * -10, duration: 0.8 });
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div className={styles.bg} ref={ref} aria-hidden="true">
      <div className={`${styles.layer} ${styles.starsFar} starsFar`} />
      <div className={`${styles.layer} ${styles.starsNear} starsNear`} />
      <div className={`${styles.sun} sun`} />
      <div className={`${styles.mountains} mountains`} />
      <div className={`${styles.grid} grid`} />
    </div>
  );
}
