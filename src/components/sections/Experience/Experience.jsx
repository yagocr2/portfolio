import { useTranslation } from '../../../i18n/useTranslation.js';
import { experience, education } from '../../../data/profile.js';
import { Section } from '../../layout/Section/Section.jsx';
import { TechBadge } from '../../ui/TechBadge/TechBadge.jsx';
import styles from './Experience.module.css';

/** Formatea el periodo "2024 — Actual" / "2022 — 2024". */
function formatPeriod(period, t) {
  const end = period.end ?? t('experience.currentBadge');
  return `${period.start} — ${end}`;
}

/** Una entrada de la línea temporal (trabajo o formación). */
function TimelineEntry({ ns, entry, t }) {
  const title = t(`${ns}.${entry.id}.title`);
  const org = t(`${ns}.${entry.id}.org`);
  const desc = t(`${ns}.${entry.id}.desc`);

  return (
    <li className={`${styles.entry} ${entry.current ? styles.current : ''}`} data-reveal>
      <span className={styles.node} aria-hidden="true" />
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <p className={styles.period}>{formatPeriod(entry.period, t)}</p>
          {entry.current && <span className={styles.badge}>{t('experience.currentBadge')}</span>}
        </div>
        <h3 className={styles.role}>{title}</h3>
        <p className={styles.org}>{org}</p>
        <p className={styles.desc}>{desc}</p>
        {entry.tech?.length > 0 && (
          <ul className={styles.tags}>
            {entry.tech.map((techId) => (
              <TechBadge key={techId} id={techId} />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/**
 * Sección de experiencia + formación, presentada como una línea temporal
 * con nodos, al estilo de un registro de sistema.
 */
export function Experience() {
  const { t } = useTranslation();

  return (
    <Section
      id="experience"
      title={t('experience.title')}
      subtitle={t('experience.subtitle')}
      accent="yellow"
    >
      <ol className={styles.timeline}>
        {experience.map((entry) => (
          <TimelineEntry key={entry.id} ns="experience" entry={entry} t={t} />
        ))}
      </ol>

      <h3 className={styles.eduTitle} data-reveal>
        ◇ {t('education.title')}
      </h3>
      <ol className={styles.timeline}>
        {education.map((entry) => (
          <TimelineEntry key={entry.id} ns="education" entry={entry} t={t} />
        ))}
      </ol>
    </Section>
  );
}
