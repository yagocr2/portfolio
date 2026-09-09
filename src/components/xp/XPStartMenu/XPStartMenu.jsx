import { useEffect, useRef } from 'react';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { profile, sections } from '../../../data/profile.js';
import { hasLink } from '../../../lib/links.js';
import { SOCIAL_ICONS } from '../../ui/socialIcons.js';
import { XPIcon } from '../xpIcons.jsx';
import styles from './XPStartMenu.module.css';

const LINKS = [
  { key: 'github', href: profile.links.github },
  { key: 'linkedin', href: profile.links.linkedin },
  { key: 'cv', href: profile.links.cv, download: true },
  { key: 'email', href: `mailto:${profile.links.email}` },
];

/**
 * Menú Inicio: cabecera con avatar + nombre, columna izquierda con las
 * secciones navegables (abren su ventana) y columna derecha con enlaces
 * externos. Se cierra con Escape o con un clic fuera.
 *
 * @param {object} props
 * @param {() => void} props.onClose
 * @param {(id: string) => void} props.onOpenWindow
 * @param {() => void} props.onShutDown - vuelve al tema retro.
 */
export function XPStartMenu({ onClose, onOpenWindow, onShutDown }) {
  const { t } = useTranslation();
  const { play } = useSound();
  const ref = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [onClose]);

  const openSection = (id) => {
    play('select');
    onOpenWindow(id);
    onClose();
  };

  return (
    <div className={styles.menu} ref={ref} role="menu" aria-label={t('xp.start')}>
      <div className={styles.header}>
        <img className={styles.avatar} src={profile.avatar} alt="" aria-hidden="true" />
        <span className={styles.name}>{profile.name}</span>
      </div>

      <div className={styles.body}>
        <ul className={styles.programs} role="none">
          <li role="none">
            <button type="button" role="menuitem" className={styles.item} onClick={() => openSection('hero')}>
              <span className={styles.itemIcon}>
                <XPIcon name="hero" />
              </span>
              {t('nav.hero')}
            </button>
          </li>
          {sections
            .filter((s) => s.menu)
            .map((s) => (
              <li key={s.id} role="none">
                <button type="button" role="menuitem" className={styles.item} onClick={() => openSection(s.id)}>
                  <span className={styles.itemIcon}>
                    <XPIcon name={s.id} />
                  </span>
                  {t(`nav.${s.id}`)}
                </button>
              </li>
            ))}
        </ul>

        <ul className={styles.links} role="none">
          <li className={styles.linksTitle} role="none" aria-hidden="true">
            {t('xp.startMenu.links')}
          </li>
          {LINKS.filter((l) => hasLink(l.href)).map((l) => {
            const icon = SOCIAL_ICONS[l.key];
            return (
              <li key={l.key} role="none">
                <a
                  role="menuitem"
                  className={styles.linkItem}
                  href={l.href}
                  target={l.download ? undefined : '_blank'}
                  rel={l.download ? undefined : 'noreferrer'}
                  download={l.download}
                  onClick={() => play('select')}
                >
                  {icon && (
                    <svg className={styles.linkIcon} viewBox={icon.viewBox} fill="currentColor" aria-hidden="true">
                      <path d={icon.path} />
                    </svg>
                  )}
                  {t(`contact.${l.key}`)}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.footerBtn} onClick={onClose}>
          {t('xp.startMenu.logOff')}
        </button>
        <button type="button" className={styles.footerBtn} onClick={onShutDown}>
          {t('xp.startMenu.shutDown')}
        </button>
      </div>
    </div>
  );
}
