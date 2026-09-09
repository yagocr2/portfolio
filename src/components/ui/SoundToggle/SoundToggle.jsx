import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { PixelToggle } from '../PixelToggle/PixelToggle.jsx';

/**
 * Mando que enciende/apaga los efectos de sonido 8-bits. Envoltorio fino
 * sobre PixelToggle, igual que CrtToggle.
 */
export function SoundToggle() {
  const { t } = useTranslation();
  const { enabled, toggle } = useSound();

  return (
    <PixelToggle
      active={enabled}
      onToggle={toggle}
      label="SFX"
      ariaLabel={t('ui.soundToggle')}
      title={t('ui.soundToggle')}
    />
  );
}
