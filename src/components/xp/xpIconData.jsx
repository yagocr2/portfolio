/* eslint-disable react-refresh/only-export-components -- este módulo es un
   registro de datos (XP_ICONS), no un componente de UI; las funciones de
   abajo son SVG multicolor, imposibles de expresar como el `path` plano de
   techIcons.js. No se edita en caliente durante el desarrollo, así que
   perder Fast Refresh aquí no tiene coste real. */
/**
 * Registro de iconos de escritorio XP. A diferencia de techIcons.js (un
 * `path` monocromo pintado con currentColor) estos son pequeños SVG
 * multicolor dibujados a mano — formas simples y genéricas (carpeta,
 * documento, monitor, sobre, maletín, papelera), sin replicar el iconset
 * real de Microsoft. Cada entrada es un componente `() => <svg>…</svg>`
 * para poder mezclar libremente rects, paths y gradientes por icono.
 *
 * Vive separado de xpIcons.jsx (que solo exporta el componente `XPIcon`)
 * para que ese archivo sí cumpla la convención de Fast Refresh.
 */

function Folder() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M3 9c0-1.1.9-2 2-2h7l2.4 2.6H27c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2z" fill="#ffd75e" stroke="#c99a2e" strokeWidth="1" />
      <path d="M3 12h26v11c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2z" fill="#ffe08a" stroke="#c99a2e" strokeWidth="1" />
    </svg>
  );
}

function Document() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 3h12l5 5v21a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="#ffffff" stroke="#8c8c8c" strokeWidth="1" />
      <path d="M20 3v5h5z" fill="#d9d9d9" stroke="#8c8c8c" strokeWidth="1" />
      <path d="M10 14h12M10 18h12M10 22h8" stroke="#3a6ea5" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function Monitor() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="5" width="26" height="17" rx="1.5" fill="#ece9d8" stroke="#7a7a6c" strokeWidth="1" />
      <rect x="6" y="8" width="20" height="11" fill="#0058e6" />
      <path d="M13 22h6l1.4 5h-8.8z" fill="#c9c6b8" stroke="#7a7a6c" strokeWidth="1" />
      <rect x="8" y="27" width="16" height="2" rx="1" fill="#a6a390" />
    </svg>
  );
}

function Briefcase() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M12 6h8a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h4V8a2 2 0 0 1 2-2z" fill="#c56a00" stroke="#8a4b00" strokeWidth="1" />
      <path d="M12 8h8v2h-8z" fill="#ece9d8" stroke="#8a4b00" strokeWidth="1" />
      <rect x="4" y="15" width="24" height="6" fill="#e08b2e" />
      <rect x="14" y="15" width="4" height="4" fill="#ece9d8" stroke="#8a4b00" strokeWidth="0.8" />
    </svg>
  );
}

function Envelope() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="8" width="26" height="18" rx="1.5" fill="#ffffff" stroke="#3a6ea5" strokeWidth="1" />
      <path d="M3 9l13 10 13-10" fill="none" stroke="#3a6ea5" strokeWidth="1.4" />
    </svg>
  );
}

function RecycleBin() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M9 10h14l-1.4 17a2 2 0 0 1-2 1.8H12.4a2 2 0 0 1-2-1.8z" fill="#e7e3d6" stroke="#7a7a6c" strokeWidth="1" />
      <path d="M7 10h18v2H7z" fill="#a6a390" stroke="#7a7a6c" strokeWidth="1" />
      <path d="M12 7h8l1 3h-10z" fill="#c9c6b8" stroke="#7a7a6c" strokeWidth="1" />
      <path d="M13 13.5l1 12M16 13.5v12M19 13.5l-1 12" stroke="#7a7a6c" strokeWidth="1" />
    </svg>
  );
}

function MyComputer() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="5" width="19" height="14" rx="1" fill="#ece9d8" stroke="#7a7a6c" strokeWidth="1" />
      <rect x="4" y="7" width="15" height="9" fill="#3a6ea5" />
      <rect x="9" y="19" width="5" height="2" fill="#c9c6b8" />
      <rect x="15" y="10" width="14" height="18" rx="1" fill="#d4d0c8" stroke="#7a7a6c" strokeWidth="1" />
      <rect x="17.5" y="12.5" width="9" height="9" fill="#ffffff" stroke="#7a7a6c" strokeWidth="0.6" />
      <circle cx="26" cy="24" r="1.1" fill="#3a6ea5" />
    </svg>
  );
}

export const XP_ICONS = {
  hero: MyComputer,
  about: Document,
  skills: Monitor,
  experience: Briefcase,
  projects: Folder,
  contact: Envelope,
  recycleBin: RecycleBin,
};
