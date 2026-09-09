/**
 * Reducer puro del gestor de ventanas del escritorio XP. No depende de React:
 * XPDesktop lo consume con `useReducer` y lo reparte por contexto
 * (ver desktopContext.js) para evitar prop drilling en XPWindow/XPTaskbar.
 *
 * Estado:
 *   { windows: { [id]: { id, x, y, w, h, minimized, maximized, open } }, order: [id…] }
 *
 * `order` es también la fuente del z-index: la posición en el array define
 * la capa (el último es el que está más arriba), así que no hace falta un
 * contador de z-index que crezca sin fin.
 */

const CASCADE_STEP = 28;
const CASCADE_BASE_X = 80;
const CASCADE_BASE_Y = 56;

export const DEFAULT_SIZE = { w: 640, h: 520 };

export function createInitialWindowState() {
  return { windows: {}, order: [] };
}

/** Calcula una posición en cascada acotada al área visible del escritorio. */
function cascadePosition(index) {
  const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800;
  const maxX = Math.max(viewportW - DEFAULT_SIZE.w - 24, CASCADE_BASE_X);
  const maxY = Math.max(viewportH - DEFAULT_SIZE.h - 96, CASCADE_BASE_Y);
  return {
    x: Math.min(CASCADE_BASE_X + index * CASCADE_STEP, maxX),
    y: Math.min(CASCADE_BASE_Y + index * CASCADE_STEP, maxY),
  };
}

function focusWindow(state, id) {
  if (!state.windows[id]) return state;
  const order = [...state.order.filter((wid) => wid !== id), id];
  return { ...state, order };
}

export function windowReducer(state, action) {
  switch (action.type) {
    case 'OPEN': {
      const { id } = action;
      const existing = state.windows[id];
      if (existing) {
        if (!existing.open || existing.minimized) {
          return focusWindow(
            {
              ...state,
              windows: { ...state.windows, [id]: { ...existing, open: true, minimized: false } },
            },
            id,
          );
        }
        return focusWindow(state, id);
      }
      const pos = cascadePosition(state.order.length);
      const win = {
        id,
        x: pos.x,
        y: pos.y,
        w: DEFAULT_SIZE.w,
        h: DEFAULT_SIZE.h,
        minimized: false,
        maximized: false,
        open: true,
      };
      return focusWindow({ ...state, windows: { ...state.windows, [id]: win } }, id);
    }

    case 'CLOSE': {
      const { id } = action;
      if (!state.windows[id]) return state;
      const windows = { ...state.windows };
      delete windows[id];
      return { windows, order: state.order.filter((wid) => wid !== id) };
    }

    case 'FOCUS':
      return focusWindow(state, action.id);

    case 'MINIMIZE': {
      const win = state.windows[action.id];
      if (!win) return state;
      return { ...state, windows: { ...state.windows, [action.id]: { ...win, minimized: true } } };
    }

    case 'RESTORE': {
      const win = state.windows[action.id];
      if (!win) return state;
      return focusWindow(
        { ...state, windows: { ...state.windows, [action.id]: { ...win, minimized: false } } },
        action.id,
      );
    }

    case 'TOGGLE_MAXIMIZE': {
      const win = state.windows[action.id];
      if (!win) return state;
      return focusWindow(
        {
          ...state,
          windows: { ...state.windows, [action.id]: { ...win, maximized: !win.maximized } },
        },
        action.id,
      );
    }

    case 'MOVE': {
      const win = state.windows[action.id];
      if (!win || win.maximized) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...win, x: action.x, y: action.y } },
      };
    }

    case 'MINIMIZE_ALL': {
      const windows = { ...state.windows };
      for (const id of state.order) {
        if (windows[id]) windows[id] = { ...windows[id], minimized: true };
      }
      return { ...state, windows };
    }

    default:
      return state;
  }
}
