import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '../../../lib/gsap.js';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js';
import { useSound } from '../../../hooks/useSound.js';
import { profile } from '../../../data/profile.js';
import { LanguageSwitcher } from '../../ui/LanguageSwitcher/LanguageSwitcher.jsx';
import styles from './BootScreen.module.css';

/**
 * Pantalla de arranque de la "consola". Reproduce una breve secuencia de boot
 * (logo + barra de carga) y luego muestra PRESS START. Al pulsar, llama a
 * onStart() y la pantalla se desvanece para revelar el portfolio.
 */
export function BootScreen({ onStart }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const { play } = useSound();
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Secuencia de arranque (barra de carga -> READY -> PRESS START).
  useGSAP(
    () => {
      if (reduced) {
        gsap.set(barRef.current, { scaleX: 1 });
        setReady(true);
        return;
      }
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: 'steps(12)',
          delay: 0.4,
          onComplete: () => setReady(true),
        },
      );
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  // Pulsar cualquier tecla / clic cuando está listo dispara el inicio.
  const handleStart = () => {
    if (!ready || leaving) return;
    play('start');
    setLeaving(true);
    if (reduced) {
      onStart?.();
      return;
    }
    gsap.to(rootRef.current, {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => onStart?.(),
    });
  };

  useEffect(() => {
    if (!ready) return;
    const onKey = () => handleStart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, leaving]);

  return (
    <div
      className={styles.boot}
      ref={rootRef}
      onClick={handleStart}
      role="button"
      tabIndex={0}
      aria-label={t('boot.pressStart')}
    >
      <div className={styles.lang} onClick={(e) => e.stopPropagation()}>
        <LanguageSwitcher />
      </div>

      <div className={styles.logo}>
        <span className={styles.glitch} data-text={profile.handle}>
          {profile.handle}
        </span>
        <span className={styles.os}>-OS</span>
      </div>
      <p className={styles.system}>{t('boot.system')}</p>

      <div className={styles.loader}>
        <p className={styles.status}>
          {ready ? `> ${t('boot.ready')}` : `> ${t('boot.booting')}`}
        </p>
        <div className={styles.track}>
          <div className={styles.bar} ref={barRef} />
        </div>
      </div>

      {ready && (
        <div className={styles.startWrap}>
          <p className={styles.pressStart}>{t('boot.pressStart')}</p>
          <p className={styles.tip}>{t('boot.tip')}</p>
        </div>
      )}
    </div>
  );
}
