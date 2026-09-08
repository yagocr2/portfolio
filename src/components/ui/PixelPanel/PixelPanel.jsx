import styles from './PixelPanel.module.css';

/**
 * Panel/ventana con marco pixelado y sombra dura. Opcionalmente muestra una
 * barra de título superior (como una ventana de sistema retro).
 *
 * @param {object} props
 * @param {string} [props.title] - texto de la barra de título.
 * @param {'pink'|'cyan'|'green'|'yellow'|'purple'} [props.accent='cyan']
 * @param {boolean} [props.glow=false] - añade resplandor de neón al borde.
 * @param {React.ElementType} [props.as='div']
 */
export function PixelPanel({
  title,
  accent = 'cyan',
  glow = false,
  as: Tag = 'div',
  children,
  className = '',
  ...rest
}) {
  const cls = [styles.panel, styles[accent], glow ? styles.glow : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={cls} {...rest}>
      {title && (
        <div className={styles.titlebar}>
          <span className={styles.dots} aria-hidden="true">
            ● ● ●
          </span>
          <span className={styles.title}>{title}</span>
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </Tag>
  );
}
