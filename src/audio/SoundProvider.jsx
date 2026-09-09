import { useCallback, useEffect, useMemo, useState } from 'react';
import { SoundContext } from './context.js';
import * as sfx from '../lib/audio.js';

const STORAGE_KEY = 'yago-portfolio-sound';

/** Lee el estado inicial de localStorage (arranca en `false` si no hay nada). */
function detectInitial() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STORAGE_KEY) === '1';
}

/**
 * Proveedor de sonido 8-bits. Arranca silenciado (nunca sonido inesperado al
 * cargar la página) y persiste la preferencia en localStorage, igual que
 * useCrtMode. Expone { enabled, toggle, play } por contexto.
 */
export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(detectInitial);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
  }, [enabled]);

  const toggle = useCallback(() => {
    // El efecto secundario va fuera del updater de setState (StrictMode lo
    // invoca dos veces en dev; un efecto ahí sonaría duplicado). Al activar,
    // crea/reanuda el AudioContext dentro del propio gesto de clic y da una
    // confirmación audible inmediata.
    const next = !enabled;
    if (next) {
      sfx.resumeAudio();
      sfx.blip();
    }
    setEnabled(next);
  }, [enabled]);

  const play = useCallback(
    (name) => {
      if (!enabled) return;
      sfx[name]?.();
    },
    [enabled],
  );

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}
