import { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsap.js';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js';
import styles from './Section.module.css';

/**
 * Envoltorio común para cada sección del portfolio. Aporta:
 *  - ancla (id) con scroll-margin para la navegación,
 *  - cabecera opcional (título + subtítulo) con estética consola,
 *  - animación de entrada (los hijos con [data-reveal] aparecen al hacer scroll).
 *
 * @param {object} props
 * @param {string} props.id
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {'pink'|'cyan'|'green'|'yellow'} [props.accent='cyan']
 */
export function Section({ id, title, subtitle, accent = 'cyan', children, className = '' }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const targets = gsap.utils.toArray('[data-reveal]', ref.current);
      if (!targets.length) return;

      if (reduced || typeof IntersectionObserver === 'undefined') {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      // IntersectionObserver en vez de ScrollTrigger: no depende de medidas
      // cacheadas del viewport, así que no falla con el resize de la barra de
      // URL en móvil, la carga tardía de fuentes ni con secciones al final
      // de la página cuyo "top" nunca cruza el umbral de ScrollTrigger.
      gsap.set(targets, { opacity: 0, y: 40 });

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
          });
          observer.disconnect();
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0 },
      );
      observer.observe(ref.current);

      return () => observer.disconnect();
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section
      id={id}
      ref={ref}
      className={[styles.section, className].filter(Boolean).join(' ')}
    >
      {title && (
        <header className={styles.header} data-reveal>
          <h2 className={styles.title} style={{ color: `var(--c-${accent})` }}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>// {subtitle}</p>}
          <span
            className={styles.rule}
            style={{ background: `var(--c-${accent})` }}
            aria-hidden="true"
          />
        </header>
      )}
      {children}
    </section>
  );
}
