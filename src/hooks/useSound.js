import { useContext } from 'react';
import { SoundContext } from '../audio/context.js';

/**
 * Hook de acceso al sistema de sonido 8-bits.
 * Devuelve { enabled, toggle, play }.
 */
export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error('useSound debe usarse dentro de <SoundProvider>');
  }
  return ctx;
}
