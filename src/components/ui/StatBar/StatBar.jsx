import { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsap.js';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js';
import styles from './StatBar.module.css';

/**
 * Barra de progreso segmentada estilo 8-bits. Se rellena de 0 a `value`%
 * cuando entra en el viewport (o instantánea si se prefiere menos movimiento).
 *
 * @param {object} props
 * @param {string} props.label
 * @param {number} props.value - 0-100.
 * @param {string} [props.color='pink'] - clave de color de tokens (pink|cyan|...).
 * @param {boolean} [props.showValue=true]
 */
export function StatBar({ label, value, color = 'pink', showValue = true }) {
  const rootRef = useRef(null);
  const fillRef = useRef(null);
  const numRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const clamped = Math.max(0, Math.min(100, value));

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(fillRef.current, { width: `${clamped}%` });
        if (numRef.current) numRef.current.textContent = `${clamped}%`;
        return;
      }

      const counter = { v: 0 };
      gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%', once: true },
      })
        .fromTo(
          fillRef.current,
          { width: '0%' },
          { width: `${clamped}%`, duration: 1, ease: 'steps(20)' },
        )
        .to(
          counter,
          {
            v: clamped,
            duration: 1,
            ease: 'steps(20)',
            onUpdate: () => {
              if (numRef.current) {
                numRef.current.textContent = `${Math.round(counter.v)}%`;
              }
            },
          },
          0,
        );
    },
    { scope: rootRef, dependencies: [clamped, reduced] },
  );

  return (
    <div className={styles.row} ref={rootRef}>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        {showValue && (
          <span className={styles.value} ref={numRef}>
            0%
          </span>
        )}
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={styles.fill}
          ref={fillRef}
          style={{ '--bar-color': `var(--c-${color})` }}
        />
      </div>
    </div>
  );
}
