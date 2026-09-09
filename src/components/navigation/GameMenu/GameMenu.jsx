import { useCallback, useMemo, useRef, useState } from 'react';
import { gsap, useGSAP } from '../../../lib/gsap.js';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { useScrollSpy } from '../../../hooks/useScrollSpy.js';
import { useSound } from '../../../hooks/useSound.js';
import { sections, profile } from '../../../data/profile.js';
import { LanguageSwitcher } from '../../ui/LanguageSwitcher/LanguageSwitcher.jsx';
import styles from './GameMenu.module.css';

/**
 * Barra de navegación superior con estética de "menú de sistema" de consola.
 * Resalta la sección activa (scrollspy), hace scroll suave a cada ancla y
 * despliega un menú a pantalla completa en móvil.
 */
export function GameMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const { play } = useSound();

  // Todas las secciones se observan; en el menú mostramos las marcadas + Inicio.
  const sectionIds = useMemo(() => sections.map((s) => s.id), []);
  const navItems = useMemo(() => sections, []);
  const activeId = useScrollSpy(sectionIds);

  const goTo = useCallback(
    (id) => {
      setOpen(false);
      play('select');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [play],
  );

  // Animación de apertura/cierre del overlay móvil.
  useGSAP(
    () => {
      if (!overlayRef.current) return;
      if (open) {
        gsap.set(overlayRef.current, { display: 'flex' });
        gsap.fromTo(
          overlayRef.current,
          { autoAlpha: 0, y: -20 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        );
        gsap.fromTo(
          overlayRef.current.querySelectorAll('[data-menu-item]'),
          { autoAlpha: 0, x: -30 },
          { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.06, delay: 0.1 },
        );
      } else {
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.25,
          onComplete: () => gsap.set(overlayRef.current, { display: 'none' }),
        });
      }
    },
    { dependencies: [open] },
  );

  return (
    <header className={styles.bar}>
      <button
        className={styles.brand}
        onClick={() => goTo('hero')}
        onMouseEnter={() => play('blip')}
        type="button"
      >
        <span className={styles.power} aria-hidden="true" />
        {profile.handle}
        <span className={styles.os}>.os</span>
      </button>

      {/* Navegación desktop */}
      <nav className={styles.desktopNav} aria-label={t('nav.menu')}>
        <ul>
          {navItems.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className={`${styles.link} ${activeId === s.id ? styles.active : ''}`}
                onClick={() => goTo(s.id)}
                onMouseEnter={() => play('blip')}
                aria-current={activeId === s.id ? 'true' : undefined}
              >
                <span className={styles.icon} aria-hidden="true">
                  {s.icon}
                </span>
                {t(`nav.${s.id}`)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.right}>
        <LanguageSwitcher className={styles.lang} />
        <button
          type="button"
          className={styles.burger}
          aria-label={t('nav.menu')}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => play('hoverToggle')}
        >
          {open ? '✕' : '≡'}
        </button>
      </div>

      {/* Overlay móvil */}
      <div className={styles.overlay} ref={overlayRef}>
        <ul className={styles.overlayList}>
          {navItems.map((s) => (
            <li key={s.id} data-menu-item>
              <button
                type="button"
                className={`${styles.overlayLink} ${activeId === s.id ? styles.active : ''}`}
                onClick={() => goTo(s.id)}
              >
                <span className={styles.icon} aria-hidden="true">
                  {s.icon}
                </span>
                {t(`nav.${s.id}`)}
              </button>
            </li>
          ))}
        </ul>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
