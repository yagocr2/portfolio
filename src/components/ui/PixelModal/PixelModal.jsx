import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap, useGSAP } from '../../../lib/gsap.js';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js';
import styles from './PixelModal.module.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Ventana modal genérica con estética 8-bits (misma barra de título que
 * PixelPanel). Gestiona portal, backdrop, cierre por Escape/click-fuera,
 * bloqueo de scroll, foco atrapado y devolución de foco al cerrar.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} [props.title]
 * @param {'pink'|'cyan'|'green'|'yellow'|'purple'} [props.accent='cyan']
 */
export function PixelModal({ open, onClose, title, accent = 'cyan', children }) {
  const dialogRef = useRef(null);
  const cardRef = useRef(null);
  const previousFocusRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  // Abrir: recuerda quién tenía el foco, bloquea el scroll del body y mueve
  // el foco dentro del modal. Cerrar: restaura ambos.
  useEffect(() => {
    if (!open) return undefined;

    previousFocusRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const firstFocusable = dialogRef.current?.querySelector(FOCUSABLE);
    (firstFocusable ?? dialogRef.current)?.focus();

    return () => {
      document.body.style.overflow = overflow;
      previousFocusRef.current?.focus?.();
    };
  }, [open]);

  // Escape para cerrar + trampa de foco (Tab no debe escapar del modal).
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = Array.from(dialogRef.current?.querySelectorAll(FOCUSABLE) ?? []);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useGSAP(
    () => {
      if (!open || !cardRef.current) return;
      if (reduced) {
        gsap.set(cardRef.current, { opacity: 1, scale: 1 });
        return;
      }
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'steps(6)' },
      );
    },
    { dependencies: [open, reduced] },
  );

  if (!open) return null;

  return createPortal(
    <div className={styles.backdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'pixel-modal-title' : undefined}
        tabIndex={-1}
      >
        <div ref={cardRef} className={[styles.card, styles[accent]].filter(Boolean).join(' ')}>
          {title && (
            <div className={styles.titlebar}>
              <span className={styles.dots} aria-hidden="true">
                ● ● ●
              </span>
              <span id="pixel-modal-title" className={styles.title}>
                {title}
              </span>
              <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
                ✕
              </button>
            </div>
          )}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
