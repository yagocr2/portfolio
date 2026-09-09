import { useState } from 'react';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { profile } from '../../../data/profile.js';
import { Section } from '../../layout/Section/Section.jsx';
import { PixelButton } from '../../ui/PixelButton/PixelButton.jsx';
import { PixelModal } from '../../ui/PixelModal/PixelModal.jsx';
import { MailComposer } from './MailComposer.jsx';
import styles from './Contact.module.css';

/**
 * Sección de contacto: copia el email al portapapeles, enlaza a redes y
 * abre un modal de composición de correo (mailto: prellenado) al pulsar CTA.
 */
export function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const { email, linkedin, github } = profile.links;

  const closeModal = () => setModalOpen(false);
  const handleSent = () => {
    setModalOpen(false);
    setMailSent(true);
    setTimeout(() => setMailSent(false), 3000);
  };

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
    { key: 'linkedin', label: t('contact.linkedin'), value: '@' + profile.handle, href: linkedin },
    { key: 'github', label: t('contact.github'), value: '@' + profile.handle, href: github },
  ];

  return (
    <Section id="contact" title={t('contact.title')} subtitle={t('contact.subtitle')} accent="pink">
      <div className={styles.wrap}>
        <p className={styles.text} data-reveal>
          {t('contact.text')}
        </p>

        <ul className={styles.channels}>
          {channels.map((c) => {
            const Inner = (
              <>
                <span className={styles.chLabel}>{c.label}</span>
                <span className={styles.chValue}>
                  {c.key === 'email' && copied ? t('contact.copied') : c.value}
                </span>
              </>
            );
            return (
              <li key={c.key} className={styles.channel} data-reveal>
                {c.href ? (
                  <a className={styles.chLink} href={c.href} target="_blank" rel="noreferrer">
                    {Inner}
                  </a>
                ) : (
                  <button type="button" className={styles.chLink} onClick={c.onClick}>
                    {Inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <div className={styles.cta} data-reveal>
          <PixelButton type="button" variant="green" onClick={() => setModalOpen(true)}>
            {t('contact.cta')}
          </PixelButton>
          {mailSent && <p className={styles.sentNotice}>{t('contact.mailOpened')}</p>}
        </div>
      </div>

      <PixelModal open={modalOpen} onClose={closeModal} title={t('contact.modal.title')} accent="green">
        <MailComposer onSent={handleSent} onCancel={closeModal} />
      </PixelModal>
    </Section>
  );
}
