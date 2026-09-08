import styles from './PixelButton.module.css';

/**
 * Botón con estética 8-bits (borde duro + sombra que se "hunde" al pulsar).
 * Renderiza un <a> si se le pasa `href`, si no un <button>.
 *
 * @param {object} props
 * @param {'pink'|'cyan'|'green'|'yellow'} [props.variant='pink']
 * @param {'sm'|'md'} [props.size='md']
 * @param {string} [props.href] - si existe, renderiza un enlace.
 */
export function PixelButton({
  children,
  variant = 'pink',
  size = 'md',
  href,
  className = '',
  ...rest
}) {
  const cls = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a className={cls} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
