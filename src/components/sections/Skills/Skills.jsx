import { useMemo } from 'react';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { skills, SKILL_CATEGORIES } from '../../../data/profile.js';
import { Section } from '../../layout/Section/Section.jsx';
import { PixelPanel } from '../../ui/PixelPanel/PixelPanel.jsx';
import { StatBar } from '../../ui/StatBar/StatBar.jsx';
import styles from './Skills.module.css';

const ACCENTS = {
  languages: 'yellow',
  frontend: 'cyan',
  backend: 'green',
  tools: 'pink',
};

/**
 * Sección de habilidades: una ventana por categoría con barras de progreso.
 */
export function Skills() {
  const { t } = useTranslation();

  // Agrupamos las skills por categoría una sola vez.
  const grouped = useMemo(() => {
    return SKILL_CATEGORIES.map((cat) => ({
      category: cat,
      items: skills.filter((s) => s.category === cat),
    }));
  }, []);

  return (
    <Section id="skills" title={t('skills.title')} subtitle={t('skills.subtitle')} accent="green">
      <div className={styles.grid}>
        {grouped.map(({ category, items }) => (
          <PixelPanel
            key={category}
            title={t(`skills.categories.${category}`)}
            accent={ACCENTS[category]}
            className={styles.panel}
            data-reveal
          >
            <div className={styles.bars}>
              {items.map((s) => (
                <StatBar
                  key={s.id}
                  label={t(`skills.names.${s.id}`)}
                  value={s.level}
                  color={s.color}
                />
              ))}
            </div>
          </PixelPanel>
        ))}
      </div>
    </Section>
  );
}
