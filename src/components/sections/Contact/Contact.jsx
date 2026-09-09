import { useState } from 'react';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { profile } from '../../../data/profile.js';
import { hasLink, handleFromUrl } from '../../../lib/links.js';
import { Section } from '../../layout/Section/Section.jsx';
import { PixelButton } from '../../ui/PixelButton/PixelButton.jsx';
import { SOCIAL_ICONS } from '../../ui/socialIcons.js';
import styles from './Contact.module.css';

/**
 * Sección de contacto: copia el email al portapapeles y enlaza a redes.
 */
export function Contact() {
  const { t } = useTranslation();
  const { play } = useSound();
  const [copied, setCopied] = useState(false);
  const { email, linkedin, github } = profile.links;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Si falla el portapapeles, abrimos el cliente de correo como fallback.
      window.location.href = `mailto:${email}`;
    }
  };

  const channels = [
    { key: 'email', label: t('contact.email'), value: email, onClick: copyEmail },
    { key: 'linkedin', label: t('contact.linkedin'), value: '@' + handleFromUrl(linkedin), href: linkedin },
    { key: 'github', label: t('contact.github'), value: '@' + handleFromUrl(github), href: github },
  ];

  return (
    <Section id="contact" title={t('contact.title')} subtitle={t('contact.subtitle')} accent="pink">
      <div className={styles.wrap}>
        <p className={styles.text} data-reveal>
          {t('contact.text')}
        </p>

        <ul className={styles.channels}>
          {channels.map((c) => {
            const icon = SOCIAL_ICONS[c.key];
            const Inner = (
              <>
                <span className={styles.chMeta}>
                  {icon && (
                    <svg className={styles.chIcon} viewBox={icon.viewBox} fill="currentColor" aria-hidden="true">
                      <path d={icon.path} />
                    </svg>
                  )}
                  <span className={styles.chLabel}>{c.label}</span>
                </span>
                <span className={styles.chValue}>
                  {c.key === 'email' && copied ? t('contact.copied') : c.value}
                </span>
              </>
            );
            return (
              <li key={c.key} className={styles.channel} data-reveal>
                {c.href ? (
                  <a
                    className={styles.chLink}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => play('hoverLink')}
                  >
                    {Inner}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={styles.chLink}
                    onClick={c.onClick}
                    onMouseEnter={() => play('hoverLink')}
                  >
                    {Inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <div className={styles.cta} data-reveal>
          <PixelButton variant="green" href={`mailto:${email}`}>
            {t('contact.cta')}
          </PixelButton>
          {hasLink(profile.links.cv) && (
            <PixelButton variant="yellow" href={profile.links.cv} download>
              {t('contact.cv')}
            </PixelButton>
          )}
        </div>
      </div>
    </Section>
  );
}
