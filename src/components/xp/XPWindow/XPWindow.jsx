import { useRef, useState } from 'react';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { useSound } from '../../../hooks/useSound.js';
import { useDesktop } from '../useDesktop.js';
import { XPIcon } from '../xpIcons.jsx';
import styles from './XPWindow.module.css';

const MOBILE_QUERY = '(max-width: 768px)';

function isMobile() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;
}

/**
 * Ventana arrastrable del escritorio XP. Lee su propio registro del estado
 * del gestor de ventanas (windowManager.js) vía contexto y no renderiza nada
 * si está cerrada o minimizada — así el contenido (Hero/About/…) solo se
 * monta mientras la ventana está realmente visible.
 *
 * Arrastre sin dependencias externas: acumula el delta del puntero y lo
 * aplica con `transform` mientras se arrastra (barato, sin relayout);
 * al soltar, confirma la posición final en el estado con la acción MOVE.
 * Desactivado si la ventana está maximizada o en pantallas móviles, donde
 * las ventanas van siempre a pantalla completa (ver XPWindow.module.css).
 */
export function XPWindow({ id, title, iconName, children }) {
  const { state, dispatch } = useDesktop();
  const { t } = useTranslation();
  const { play } = useSound();
  const rootRef = useRef(null);
  const dragState = useRef(null);
  const [dragging, setDragging] = useState(false);

  const win = state.windows[id];
  if (!win || !win.open || win.minimized) return null;

  const zIndex = state.order.indexOf(id);
  const isActive = state.order[state.order.length - 1] === id;

  const handleFocus = () => {
    if (!isActive) dispatch({ type: 'FOCUS', id });
  };

  const handleTitlebarPointerDown = (e) => {
    if (win.maximized || isMobile()) {
      handleFocus();
      return;
    }
    handleFocus();
    dragState.current = { startX: e.clientX, startY: e.clientY, originX: win.x, originY: win.y };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const handleTitlebarPointerMove = (e) => {
    if (!dragState.current || !rootRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    dragState.current.dx = dx;
    dragState.current.dy = dy;
    rootRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleTitlebarPointerUp = (e) => {
    if (!dragState.current) return;
    const { originX, originY, dx = 0, dy = 0 } = dragState.current;
    if (rootRef.current) rootRef.current.style.transform = '';
    dispatch({ type: 'MOVE', id, x: Math.max(0, originX + dx), y: Math.max(0, originY + dy) });
    dragState.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleClose = () => {
    play('ding');
    dispatch({ type: 'CLOSE', id });
  };
  const handleMinimize = () => {
    play('select');
    dispatch({ type: 'MINIMIZE', id });
  };
  const handleMaximize = () => {
    play('select');
    dispatch({ type: 'TOGGLE_MAXIMIZE', id });
  };
  // Los botones de control no deben iniciar un arrastre de ventana.
  const stopDrag = (e) => e.stopPropagation();

  const style = win.maximized ? { zIndex: 10 + zIndex } : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: 10 + zIndex };

  return (
    <div
      ref={rootRef}
      className={[
        styles.window,
        win.maximized ? styles.maximized : '',
        isActive ? styles.active : '',
        dragging ? styles.dragging : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      role="dialog"
      aria-label={title}
      onMouseDown={handleFocus}
    >
      <div
        className={styles.titlebar}
        onPointerDown={handleTitlebarPointerDown}
        onPointerMove={handleTitlebarPointerMove}
        onPointerUp={handleTitlebarPointerUp}
        onDoubleClick={handleMaximize}
      >
        <span className={styles.titleIcon}>{iconName && <XPIcon name={iconName} />}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.controls}>
          <button
            type="button"
            className={styles.ctrlBtn}
            onPointerDown={stopDrag}
            onClick={handleMinimize}
            aria-label={t('xp.windowControls.minimize')}
          >
            <span aria-hidden="true">_</span>
          </button>
          <button
            type="button"
            className={`${styles.ctrlBtn} ${styles.maximizeBtn}`}
            onPointerDown={stopDrag}
            onClick={handleMaximize}
            aria-label={t(win.maximized ? 'xp.windowControls.restore' : 'xp.windowControls.maximize')}
          >
            <span aria-hidden="true">{win.maximized ? '❐' : '□'}</span>
          </button>
          <button
            type="button"
            className={`${styles.ctrlBtn} ${styles.closeBtn}`}
            onPointerDown={stopDrag}
            onClick={handleClose}
            aria-label={t('xp.windowControls.close')}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
