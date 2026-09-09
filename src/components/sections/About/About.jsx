import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { Section } from '../../layout/Section/Section.jsx';
import { PixelPanel } from '../../ui/PixelPanel/PixelPanel.jsx';
import styles from './About.module.css';

const CARD_KEYS = ['role', 'location', 'status', 'focus'];

/**
 * Sección "Sobre mí": bio en una ventana de sistema + tarjetas de datos rápidos.
 */
export function About() {
  const { t } = useTranslation();
  const { play } = useSound();

  return (
    <Section id="about" title={t('about.title')} subtitle={t('about.subtitle')} accent="pink">
      <div className={styles.grid}>
        <PixelPanel
          title={`${t('nav.about')}.txt`}
          accent="pink"
          className={styles.bioPanel}
          data-reveal
        >
          <p className={styles.bio}>{t('about.bio1')}</p>
          <p className={styles.bio}>{t('about.bio2')}</p>
          <p className={styles.bio}>{t('about.bio3')}</p>
        </PixelPanel>

        <ul className={styles.cards}>
          {CARD_KEYS.map((key) => (
            <li
              key={key}
              className={styles.card}
              data-reveal
              onMouseEnter={() => play('hoverCard')}
            >
              <span className={styles.cardLabel}>{t(`about.cards.${key}`)}</span>
              <span className={styles.cardValue}>{t(`about.cards.${key}Value`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
