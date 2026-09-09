/**
 * Motor de sonido sin archivos de audio: genera ondas con Web Audio API. Un
 * único AudioContext, creado de forma perezosa en el primer sonido (la
 * política de autoplay de los navegadores exige que nazca de un gesto del
 * usuario).
 *
 * Cada efecto (blip, select, start…) tiene una "receta" distinta por tema
 * visual — ondas cuadradas y agudas para el tema retro 8-bits, ondas más
 * suaves (sine/triangle) y contenidas para el escritorio XP, donde Windows
 * clásico no pita en cada hover. `setSoundTheme()` cambia la receta activa;
 * los exports nombrados (blip, select…) no cambian de firma, así que ningún
 * punto de llamada (SoundProvider, componentes) necesita tocarse.
 */
let ctx = null;
let currentTheme = 'retro';

function getContext() {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!ctx) ctx = new AudioContextClass();
  return ctx;
}

/** Reanuda el AudioContext si el navegador lo creó suspendido. */
export function resumeAudio() {
  const audioCtx = getContext();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

/** Cambia el tema de sonido activo ('retro' | 'xp'). Ver ThemeProvider. */
export function setSoundTheme(theme) {
  currentTheme = theme === 'xp' ? 'xp' : 'retro';
}

/**
 * Reproduce un tono con una envolvente de ganancia corta (evita el "click"
 * de corte al empezar/terminar).
 */
function tone({ freq, duration, volume = 0.05, delay = 0, type = 'square' }) {
  const audioCtx = getContext();
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;

  const startTime = audioCtx.currentTime + delay;
  const endTime = startTime + duration;

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.005);
  gain.gain.linearRampToValueAtTime(0, endTime);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(startTime);
  osc.stop(endTime + 0.01);
}

/** No reproduce nada: usado para silenciar hovers ruidosos bajo el tema XP. */
function silent() {}

/**
 * Recetas por tema. Cada clave es una función `() => void` que reproduce el
 * efecto correspondiente. El tema retro conserva las ondas cuadradas
 * originales (idénticas a como estaban antes de esta capa).
 */
const RECIPES = {
  retro: {
    blip: () => tone({ freq: 880, duration: 0.04, volume: 0.04 }),
    hoverButton: () => tone({ freq: 660, duration: 0.035, volume: 0.035 }),
    hoverToggle: () => tone({ freq: 440, duration: 0.05, volume: 0.04 }),
    hoverLink: () => tone({ freq: 1046.5, duration: 0.03, volume: 0.035 }),
    hoverLang: () => tone({ freq: 740, duration: 0.035, volume: 0.035 }),
    hoverBadge: () => tone({ freq: 523.25, duration: 0.03, volume: 0.03 }),
    hoverCard: () => tone({ freq: 330, duration: 0.05, volume: 0.035 }),
    select: () => tone({ freq: 1320, duration: 0.06, volume: 0.05 }),
    start: () => {
      tone({ freq: 523.25, duration: 0.09, volume: 0.05 });
      tone({ freq: 659.25, duration: 0.09, volume: 0.05, delay: 0.09 });
      tone({ freq: 783.99, duration: 0.14, volume: 0.05, delay: 0.18 });
    },
    ding: () => tone({ freq: 987.77, duration: 0.12, volume: 0.05, type: 'sine' }),
    error: () => {
      tone({ freq: 220, duration: 0.1, volume: 0.05 });
      tone({ freq: 165, duration: 0.14, volume: 0.05, delay: 0.1 });
    },
  },

  // Sonidos tipo Windows clásico: ondas sine/triangle, más suaves y cortas.
  // Windows no reproduce nada al pasar el ratón, así que la mayoría de
  // hovers quedan en silencio para no romper la ilusión.
  xp: {
    blip: silent,
    hoverButton: silent,
    hoverToggle: silent,
    hoverLink: silent,
    hoverLang: silent,
    hoverBadge: silent,
    hoverCard: silent,
    select: () => tone({ freq: 1400, duration: 0.025, volume: 0.04, type: 'triangle' }),
    start: () => {
      // Campanilla de inicio de sesión de Windows: acorde ascendente de 4 notas.
      tone({ freq: 261.63, duration: 0.22, volume: 0.045, type: 'sine' });
      tone({ freq: 329.63, duration: 0.22, volume: 0.045, type: 'sine', delay: 0.12 });
      tone({ freq: 392.0, duration: 0.22, volume: 0.045, type: 'sine', delay: 0.24 });
      tone({ freq: 523.25, duration: 0.35, volume: 0.045, type: 'sine', delay: 0.36 });
    },
    ding: () => tone({ freq: 880, duration: 0.15, volume: 0.045, type: 'sine' }),
    error: () => {
      tone({ freq: 220, duration: 0.09, volume: 0.05, type: 'triangle' });
      tone({ freq: 220, duration: 0.09, volume: 0.05, type: 'triangle', delay: 0.11 });
    },
  },
};

function play(name) {
  const recipe = RECIPES[currentTheme]?.[name] ?? RECIPES.retro[name];
  recipe?.();
}

export function blip() {
  play('blip');
}
export function hoverButton() {
  play('hoverButton');
}
export function hoverToggle() {
  play('hoverToggle');
}
export function hoverLink() {
  play('hoverLink');
}
export function hoverLang() {
  play('hoverLang');
}
export function hoverBadge() {
  play('hoverBadge');
}
export function hoverCard() {
  play('hoverCard');
}
export function select() {
  play('select');
}
export function start() {
  play('start');
}
/** Aviso corto (cerrar ventana, notificación). */
export function ding() {
  play('ding');
}
/** Aviso de error (Papelera, acción no disponible). */
export function error() {
  play('error');
}
