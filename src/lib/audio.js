/**
 * Motor de sonido 8-bits sin archivos de audio: genera ondas cuadradas con
 * Web Audio API. Un único AudioContext, creado de forma perezosa en el
 * primer sonido (la política de autoplay de los navegadores exige que nazca
 * de un gesto del usuario).
 */
let ctx = null;

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

/**
 * Reproduce un tono de onda cuadrada con una envolvente de ganancia corta
 * (evita el "click" de corte al empezar/terminar).
 */
function tone({ freq, duration, volume = 0.05, delay = 0 }) {
  const audioCtx = getContext();
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'square';
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

/** Hover sobre un enlace de navegación (GameMenu). */
export function blip() {
  tone({ freq: 880, duration: 0.04, volume: 0.04 });
}

/** Hover sobre un botón de acción (PixelButton). */
export function hoverButton() {
  tone({ freq: 660, duration: 0.035, volume: 0.035 });
}

/** Hover sobre un interruptor (PixelToggle: CRT, SFX). */
export function hoverToggle() {
  tone({ freq: 440, duration: 0.05, volume: 0.04 });
}

/** Hover sobre un enlace externo (redes, proyectos). */
export function hoverLink() {
  tone({ freq: 1046.5, duration: 0.03, volume: 0.035 });
}

/** Hover sobre una opción del selector de idioma. */
export function hoverLang() {
  tone({ freq: 740, duration: 0.035, volume: 0.035 });
}

/** Hover sobre un badge de tecnología (Skills, Hero, Projects, Experience). */
export function hoverBadge() {
  tone({ freq: 523.25, duration: 0.03, volume: 0.03 });
}

/** Hover sobre una tarjeta de proyecto. */
export function hoverCard() {
  tone({ freq: 330, duration: 0.05, volume: 0.035 });
}

/** Click / selección. */
export function select() {
  tone({ freq: 1320, duration: 0.06, volume: 0.05 });
}

/** Arranque de la consola (pulsar START): pequeño arpegio de 3 notas. */
export function start() {
  tone({ freq: 523.25, duration: 0.09, volume: 0.05 });
  tone({ freq: 659.25, duration: 0.09, volume: 0.05, delay: 0.09 });
  tone({ freq: 783.99, duration: 0.14, volume: 0.05, delay: 0.18 });
}
