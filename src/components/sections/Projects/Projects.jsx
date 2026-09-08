import { useTranslation } from '../../../i18n/useTranslation.js';
import { projects } from '../../../data/profile.js';
import { Section } from '../../layout/Section/Section.jsx';
import { PixelPanel } from '../../ui/PixelPanel/PixelPanel.jsx';
import styles from './Projects.module.css';

/** Tarjeta de un proyecto. */
function ProjectCard({ project, t }) {
  const { id, tech, links, featured } = project;

  return (
    <PixelPanel
      as="article"
      title={`${t(`projects.${id}.title`)}`}
      accent={featured ? 'pink' : 'cyan'}
      glow={featured}
      className={styles.card}
      data-reveal
    >
      {featured && <span className={styles.featured}>★ {t('projects.featured')}</span>}
      <p className={styles.desc}>{t(`projects.${id}.desc`)}</p>

      <ul className={styles.tags}>
        {tech.map((techName) => (
          <li key={techName} className={styles.tag}>
            {techName}
          </li>
        ))}
      </ul>

      <div className={styles.links}>
        {links.demo && (
          <a
            className={styles.link}
            href={links.demo}
            target="_blank"
            rel="noreferrer"
          >
            ▶ {t('projects.demo')}
          </a>
        )}
        {links.repo && (
          <a
            className={styles.link}
            href={links.repo}
            target="_blank"
            rel="noreferrer"
          >
            {'</>'} {t('projects.repo')}
          </a>
        )}
      </div>
    </PixelPanel>
  );
}

/**
 * Sección de proyectos en cuadrícula de tarjetas.
 */
export function Projects() {
  const { t } = useTranslation();

  return (
    <Section id="projects" title={t('projects.title')} subtitle={t('projects.subtitle')} accent="cyan">
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} t={t} />
        ))}
      </div>
      <p className={styles.placeholder} data-reveal>
        {t('projects.placeholder')}
      </p>
    </Section>
  );
}
