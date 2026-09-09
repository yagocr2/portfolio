import { useMemo, useReducer } from 'react';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { useTheme } from '../../../theme/useTheme.js';
import { sections } from '../../../data/profile.js';
import { Hero } from '../../sections/Hero/Hero.jsx';
import { About } from '../../sections/About/About.jsx';
import { Skills } from '../../sections/Skills/Skills.jsx';
import { Experience } from '../../sections/Experience/Experience.jsx';
import { Projects } from '../../sections/Projects/Projects.jsx';
import { Contact } from '../../sections/Contact/Contact.jsx';
import { DesktopContext } from '../desktopContext.js';
import { windowReducer, createInitialWindowState } from '../windowManager.js';
import { XPWallpaper } from '../XPWallpaper/XPWallpaper.jsx';
import { XPDesktopIcon } from '../XPDesktopIcon/XPDesktopIcon.jsx';
import { XPWindow } from '../XPWindow/XPWindow.jsx';
import { XPTaskbar } from '../XPTaskbar/XPTaskbar.jsx';
import { XPBootScreen } from '../XPBootScreen/XPBootScreen.jsx';
import styles from './XPDesktop.module.css';

/** Componente que renderiza cada ventana, por id de sección. `hero` incluido. */
const WINDOW_CONTENT = {
  hero: () => <Hero active />,
  about: About,
  skills: Skills,
  experience: Experience,
  projects: Projects,
  contact: Contact,
};

/** Iconos del escritorio: todas las secciones + la Papelera de reciclaje. */
const DESKTOP_ITEMS = [...sections.map((s) => s.id), 'recycleBin'];

/**
 * Shell del tema Windows XP: escritorio completo con iconos, ventanas
 * arrastrables y barra de tareas. Reemplaza por completo a CRTScreen/GameMenu/
 * ParallaxBackground/Footer cuando el tema activo es 'xp' (ver App.jsx) — no
 * los reutiliza, para no tener que apagar a medias su lógica retro.
 *
 * @param {object} props
 * @param {boolean} props.started
 * @param {() => void} props.onStart
 */
export function XPDesktop({ started, onStart }) {
  const [state, dispatch] = useReducer(windowReducer, undefined, createInitialWindowState);
  const { t } = useTranslation();
  const { play } = useSound();
  const { setTheme } = useTheme();

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  const openWindow = (id) => {
    if (id === 'recycleBin') {
      play('error');
      return;
    }
    dispatch({ type: 'OPEN', id });
  };

  const handleTaskClick = (id) => {
    const win = state.windows[id];
    if (!win) return;
    if (win.minimized) {
      dispatch({ type: 'RESTORE', id });
    } else if (state.order[state.order.length - 1] === id) {
      dispatch({ type: 'MINIMIZE', id });
    } else {
      dispatch({ type: 'FOCUS', id });
    }
  };

  const taskWindows = state.order.map((id) => ({
    id,
    title: t(`xp.window.${id}`),
    iconName: id,
    minimized: state.windows[id].minimized,
    active: state.order[state.order.length - 1] === id,
  }));

  if (!started) {
    return <XPBootScreen onStart={onStart} />;
  }

  return (
    <DesktopContext.Provider value={contextValue}>
      <div className={styles.desktop}>
        <div className={styles.surface}>
          <XPWallpaper />

          <div className={styles.icons}>
            {DESKTOP_ITEMS.map((id) => (
              <XPDesktopIcon
                key={id}
                iconName={id}
                label={id === 'recycleBin' ? t('xp.desktop.recycleBin') : t(`nav.${id}`)}
                onOpen={() => openWindow(id)}
              />
            ))}
          </div>

          {state.order.map((id) => {
            const Content = WINDOW_CONTENT[id];
            if (!Content) return null;
            return (
              <XPWindow key={id} id={id} title={t(`xp.window.${id}`)} iconName={id}>
                <Content />
              </XPWindow>
            );
          })}
        </div>

        <XPTaskbar
          taskWindows={taskWindows}
          onOpenWindow={openWindow}
          onTaskClick={handleTaskClick}
          onShutDown={() => setTheme('retro')}
        />
      </div>
    </DesktopContext.Provider>
  );
}
