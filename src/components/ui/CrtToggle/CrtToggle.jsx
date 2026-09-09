import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { PixelToggle } from '../PixelToggle/PixelToggle.jsx';

/**
 * Mando que enciende/apaga el filtro de tele antigua. Envoltorio fino sobre
 * PixelToggle; vive fuera de las capas del filtro para quedar siempre nítido.
 *
 * @param {object} props
 * @param {boolean} props.active
 * @param {() => void} props.onToggle
 */
export function CrtToggle({ active, onToggle }) {
  const { t } = useTranslation();
  const { play } = useSound();

  const handleToggle = () => {
    play('blip');
    onToggle();
  };

  return (
    <PixelToggle
      active={active}
      onToggle={handleToggle}
      label="CRT"
      ariaLabel={t('ui.crtToggle')}
      title={t('ui.crtToggle')}
    />
  );
}
