import { useEffect, useState } from 'react';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { SoundToggle } from '../../ui/SoundToggle/SoundToggle.jsx';
import { ThemeToggle } from '../../ui/ThemeToggle/ThemeToggle.jsx';
import { XPIcon } from '../xpIcons.jsx';
import { XPStartMenu } from '../XPStartMenu/XPStartMenu.jsx';
import styles from './XPTaskbar.module.css';

/** Reloj HH:MM, actualizado cada 30s — no hace falta más resolución. */
function useClock(lang) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
}

/**
 * Barra de tareas inferior: botón Inicio + menú, un botón por ventana
 * abierta y la bandeja del sistema (sonido, tema, reloj).
 *
 * @param {object} props
 * @param {{id:string,title:string,iconName:string,minimized:boolean,active:boolean}[]} props.taskWindows
 * @param {(id: string) => void} props.onOpenWindow
 * @param {(id: string) => void} props.onTaskClick
 * @param {() => void} props.onShutDown
 */
export function XPTaskbar({ taskWindows, onOpenWindow, onTaskClick, onShutDown }) {
  const { t, lang } = useTranslation();
  const { play } = useSound();
  const [startOpen, setStartOpen] = useState(false);
  const clock = useClock(lang);

  const toggleStart = () => {
    play('select');
    setStartOpen((v) => !v);
  };

  return (
    <div className={styles.taskbar} role="toolbar" aria-label={t('xp.start')}>
      {startOpen && (
        <XPStartMenu
          onClose={() => setStartOpen(false)}
          onOpenWindow={onOpenWindow}
          onShutDown={() => {
            setStartOpen(false);
            onShutDown();
          }}
        />
      )}

      <button
        type="button"
        className={styles.start}
        aria-expanded={startOpen}
        onClick={toggleStart}
      >
        <span className={styles.flag} aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <rect x="1" y="1" width="6" height="6" fill="#ff5c3c" />
            <rect x="9" y="1" width="6" height="6" fill="#7dc735" />
            <rect x="1" y="9" width="6" height="6" fill="#3ea6ff" />
            <rect x="9" y="9" width="6" height="6" fill="#ffd23c" />
          </svg>
        </span>
        {t('xp.start')}
      </button>

      <div className={styles.tasks}>
        {taskWindows.map((w) => (
          <button
            key={w.id}
            type="button"
            className={`${styles.task} ${w.active && !w.minimized ? styles.taskActive : ''}`}
            aria-pressed={w.active && !w.minimized}
            onClick={() => onTaskClick(w.id)}
          >
            <span className={styles.taskIcon}>
              <XPIcon name={w.iconName} />
            </span>
            <span className={styles.taskLabel}>{w.title}</span>
          </button>
        ))}
      </div>

      <div className={styles.tray}>
        <SoundToggle />
        <ThemeToggle />
        <span className={styles.clock}>{clock}</span>
      </div>
    </div>
  );
}
