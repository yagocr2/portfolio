import { useSound } from '../../../hooks/useSound.js';
import styles from './PixelButton.module.css';

/**
 * Botón con estética 8-bits (borde duro + sombra que se "hunde" al pulsar).
 * Renderiza un <a> si se le pasa `href`, si no un <button>. Reproduce un
 * sonido de hover y otro de selección al pulsar (silenciosos si el sonido
 * está desactivado).
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
  onClick,
  onMouseEnter,
  className = '',
  ...rest
}) {
  const { play } = useSound();
  const cls = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e) => {
    play('select');
    onClick?.(e);
  };

  const handleMouseEnter = (e) => {
    play('hoverButton');
    onMouseEnter?.(e);
  };

  if (href) {
    return (
      <a className={cls} href={href} onClick={handleClick} onMouseEnter={handleMouseEnter} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={handleClick} onMouseEnter={handleMouseEnter} {...rest}>
      {children}
    </button>
  );
}
