import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { useTheme } from '../../../theme/useTheme.js';
import { PixelToggle } from '../PixelToggle/PixelToggle.jsx';

/**
 * Mando que alterna entre el tema retro 8-bits y el escritorio XP. Envoltorio
 * fino sobre PixelToggle, igual que CrtToggle/SoundToggle.
 */
export function ThemeToggle() {
  const { t } = useTranslation();
  const { play } = useSound();
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    play('select');
    toggleTheme();
  };

  return (
    <PixelToggle
      active={theme === 'xp'}
      onToggle={handleToggle}
      label="XP"
      ariaLabel={t('ui.themeToggle')}
      title={t('ui.themeToggle')}
    />
  );
}
