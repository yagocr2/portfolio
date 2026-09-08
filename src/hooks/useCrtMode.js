import { useEffect, useState } from 'react';

const STORAGE_KEY = 'yago-portfolio-crt';

/** Lee el estado inicial de localStorage (arranca en `false` si no hay nada). */
function detectInitial() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STORAGE_KEY) === '1';
}

/**
 * Estado del filtro "tele antigua", persistido en localStorage.
 * Devuelve [crtMode, setCrtMode], igual que useState.
 */
export function useCrtMode() {
  const [crtMode, setCrtMode] = useState(detectInitial);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, crtMode ? '1' : '0');
  }, [crtMode]);

  return [crtMode, setCrtMode];
}
