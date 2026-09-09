import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { TECH_COLORS } from '../../../data/profile.js';
import { TECH_ICONS } from './techIcons.js';
import styles from './TechBadge.module.css';

/**
 * Badge plano de tecnología: logo + nombre, sin nivel ni jerarquía. Resuelve
 * nombre (i18n), color e icono a partir del `id` (registro `TECH_COLORS` en
 * profile.js e iconos en `techIcons.js`). Se usa como `<li>` dentro de listas
 * de tecnologías (Hero, Skills, Projects, Experience).
 *
 * @param {object} props
 * @param {string} props.id - id del registro de tecnologías.
 * @param {React.ElementType} [props.as='li']
 */
export function TechBadge({ id, as: Tag = 'li', className = '' }) {
  const { t } = useTranslation();
  const { play } = useSound();
  const label = t(`skills.names.${id}`);
  const color = TECH_COLORS[id] ?? 'cyan';
  const icon = TECH_ICONS[id];
  const cls = [styles.badge, className].filter(Boolean).join(' ');

  return (
    <Tag
      className={cls}
      style={{ '--badge-color': `var(--c-${color})` }}
      onMouseEnter={() => play('hoverBadge')}
    >
      {icon && (
        <svg
          className={styles.icon}
          viewBox={icon.viewBox}
          fill="currentColor"
          shapeRendering={icon.pixel ? 'crispEdges' : undefined}
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      )}
      {label}
    </Tag>
  );
}
