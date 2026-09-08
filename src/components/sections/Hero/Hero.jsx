import { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsap.js';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js';
import { profile, heroStack } from '../../../data/profile.js';
import { TechBadge } from '../../ui/TechBadge/TechBadge.jsx';
import { PixelButton } from '../../ui/PixelButton/PixelButton.jsx';
import { Typewriter } from '../../ui/Typewriter/Typewriter.jsx';
import styles from './Hero.module.css';

/**
 * Sección de portada. Muestra la "ficha" del desarrollador: foto enmarcada,
 * nombre, rol, tagline (typewriter) y un panel de SPECS con barras animadas.
 */
export function Hero({ active }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  // Animación de entrada en cascada cuando la consola arranca (active=true).
  useGSAP(
    () => {
      if (!active) return;
      const items = gsap.utils.toArray('[data-hero]', ref.current);
      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0, scale: 1 });
        return;
      }
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(1.4)',
      });
      // Flotación continua de la foto.
      gsap.to('[data-float]', {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: ref, dependencies: [active, reduced] },
  );

  const { t } = useTranslation();

  return (
    <section id="hero" className={styles.hero} ref={ref}>
      <div className={styles.inner}>
        {/* Columna foto / ficha */}
        <div className={styles.cardCol} data-hero>
          <div className={styles.avatarFrame} data-float>
            <span className={styles.cornerTL} aria-hidden="true" />
            <span className={styles.cornerBR} aria-hidden="true" />
            <img
              className={styles.avatar}
              src={profile.avatar}
              alt={profile.name}
              width="320"
              height="400"
            />
            <div className={styles.nameplate}>
              <span className={styles.name}>{profile.name}</span>
              <span className={styles.lvl}>#{String(profile.level).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Columna contenido */}
        <div className={styles.content}>
          <p className={styles.greeting} data-hero>
            ▸ {profile.handle}.exe
          </p>
          <div className={styles.introPanel} data-hero>
            <h1 className={styles.role}>{t('hero.role')}</h1>
            <p className={styles.tagline}>
              {active ? (
                <Typewriter text={t('hero.tagline')} startDelay={700} speed={35} />
              ) : (
                t('hero.tagline')
              )}
            </p>
          </div>

          <div className={styles.specs} data-hero>
            <p className={styles.specsTitle}>{t('hero.specsTitle')}</p>
            <ul className={styles.stackList}>
              {heroStack.map((id) => (
                <TechBadge key={id} id={id} />
              ))}
            </ul>
          </div>

          <div className={styles.actions} data-hero>
            <PixelButton
              variant="cyan"
              onClick={() =>
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t('hero.cta')}
            </PixelButton>
            <PixelButton variant="pink" href={`mailto:${profile.links.email}`}>
              {t('nav.contact')}
            </PixelButton>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.scroll}
        onClick={() =>
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }
        aria-label={t('hero.scroll')}
      >
        {t('hero.scroll')}
        <span className={styles.arrow} aria-hidden="true">
          ▼
        </span>
      </button>
    </section>
  );
}
