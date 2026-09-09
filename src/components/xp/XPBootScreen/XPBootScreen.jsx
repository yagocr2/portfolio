import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../../../lib/gsap.js';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js';
import { useSound } from '../../../hooks/useSound.js';
import { profile } from '../../../data/profile.js';
import { LanguageSwitcher } from '../../ui/LanguageSwitcher/LanguageSwitcher.jsx';
import styles from './XPBootScreen.module.css';

const BOOT_DURATION = 2.2;

/**
 * Arranque del escritorio XP: pantalla negra con la barra de carga clásica
 * (tres bloques deslizándose en bucle sobre un canal hundido) y, tras un
 * tiempo fijo, una pantalla de bienvenida con la tarjeta de usuario. Sigue
 * el mismo contrato que BootScreen (prop `onStart`) pero es un componente
 * separado: el marcado y la animación no tienen nada en común.
 */
export function XPBootScreen({ onStart }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const { play } = useSound();
  const [stage, setStage] = useState(reduced ? 'welcome' : 'booting');
  const [leaving, setLeaving] = useState(false);

  useGSAP(
    () => {
      if (stage !== 'booting' || reduced) return;
      gsap.fromTo(
        barRef.current,
        { x: '-100%' },
        { x: '430%', duration: 1, ease: 'power1.inOut', repeat: -1 },
      );
      const timer = setTimeout(() => setStage('welcome'), BOOT_DURATION * 1000);
      return () => clearTimeout(timer);
    },
    { scope: rootRef, dependencies: [stage, reduced] },
  );

  const handleEnter = () => {
    if (leaving) return;
    play('start');
    setLeaving(true);
    if (reduced) {
      onStart?.();
      return;
    }
    gsap.to(rootRef.current, {
      autoAlpha: 0,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => onStart?.(),
    });
  };

  return (
    <div className={styles.boot} ref={rootRef}>
      {stage === 'booting' ? (
        <div className={styles.bootStage}>
          <div className={styles.flagLogo} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className={styles.brand}>{t('xp.boot.starting')}</p>
          <div className={styles.track}>
            <div className={styles.bar} ref={barRef} />
          </div>
        </div>
      ) : (
        <div
          className={styles.welcomeStage}
          onClick={handleEnter}
          role="button"
          tabIndex={0}
          aria-label={t('xp.boot.clickToBegin')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleEnter()}
        >
          <div className={styles.lang} onClick={(e) => e.stopPropagation()}>
            <LanguageSwitcher />
          </div>
          <div className={styles.welcomeInner}>
            <p className={styles.welcomeTitle}>
              {t('xp.boot.welcomeTitle')} <span className={styles.edition}>{t('xp.boot.welcomeEdition')}</span>
            </p>
            <div className={styles.userCard}>
              <img className={styles.userAvatar} src={profile.avatar} alt={profile.name} />
              <span className={styles.userName}>{profile.name}</span>
            </div>
            <p className={styles.hint}>{t('xp.boot.clickToBegin')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
