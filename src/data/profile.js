import avatar from '../assets/avatar.jpg';
/**
 * ============================================================
 *  DATOS DEL PORTFOLIO  (capa de datos — única fuente de verdad)
 * ============================================================
 *  Aquí vive lo NO traducible: fechas, tecnologías y enlaces.
 *  Los textos traducibles (títulos, descripciones) están en
 *  src/i18n/locales/{es,en}.json bajo la misma `id`.
 *
 *  👉 Revisa los campos marcados con  // EDITABLE  y ajústalos a tu realidad.
 */

export const profile = {
  name: 'Yago Calero',
  handle: 'yagocr2',
  level: 23, 
  avatar: avatar,

  // Enlaces de contacto / redes
  links: {
    email: 'yagocaleroroldan02@gmail.com',
    linkedin: 'https://www.linkedin.com/in/yagocr/',
    github: 'https://github.com/yagocr2',
    cv: '/CV_Yago_Calero.pdf',
  },
};

/**
 * Registro de tecnologías: color de acento por id (badges, en toda la web).
 * El nombre visible vive en i18n (skills.names.<id>) y el icono en
 * components/ui/TechBadge/techIcons.js.
 */
export const TECH_COLORS = {
  // lenguajes
  java: 'orange',
  csharp: 'purple',
  sql: 'pink',
  javascript: 'yellow',
  typescript: 'cyan',
  python: 'blue',
  php: 'purple',
  kotlin: 'orange',
  xml: 'green',
  // frontend
  react: 'cyan',
  spfx: 'pink',
  html: 'orange',
  css: 'cyan',
  tailwind: 'pink',
  vite: 'yellow',
  gsap: 'green',
  // backend
  spring: 'green',
  node: 'green',
  dotnet: 'purple',
  // herramientas / plataformas
  git: 'orange',
  docker: 'cyan',
  azure: 'blue',
  databricks: 'green',
  linux: 'yellow',
  android: 'green',
};

/**
 * SKILLS (sección Skills — badges de tecnología). Agrupadas por categoría.
 */
export const skills = [
  // --- Lenguajes ---
  { id: 'java', category: 'languages' },
  { id: 'csharp', category: 'languages' },
  { id: 'sql', category: 'languages' },
  { id: 'javascript', category: 'languages' },
  { id: 'typescript', category: 'languages' },
  { id: 'python', category: 'languages' },
  // --- Frontend ---
  { id: 'react', category: 'frontend' },
  { id: 'spfx', category: 'frontend' },
  { id: 'html', category: 'frontend' },
  { id: 'css', category: 'frontend' },
  { id: 'tailwind', category: 'frontend' },

  // --- Backend ---
  { id: 'spring', category: 'backend' },
  { id: 'node', category: 'backend' },
  { id: 'dotnet', category: 'backend' },

  // --- Herramientas ---
  { id: 'git', category: 'tools' },
  { id: 'docker', category: 'tools' },
  { id: 'azure', category: 'tools' },
  { id: 'databricks', category: 'tools' },
];

export const SKILL_CATEGORIES = ['languages', 'frontend', 'backend', 'tools'];

/** Stack destacado que aparece en el Hero (ids de `skills`). */
export const heroStack = ['react', 'java', 'spring', 'typescript', 'sql', 'azure'];

/**
 * EXPERIENCIA. Orden cronológico inverso (lo más reciente arriba).
 * `current: true` marca el puesto actual. Textos en los locales bajo experience.<id>.
 */
export const experience = [
  {
    id: 'nter',
    current: true,
    period: { start: '2025', end: null }, // EDITABLE: fechas reales (null = actualidad)
    tech: ['react', 'javascript', 'java', 'spring', 'sql', 'git'], // EDITABLE
  },
  {
    id: 'uco',
    current: false,
    period: { start: '2024', end: '2024' }, // EDITABLE: meses reales de las prácticas
    tech: ['php', 'sql', 'linux', 'html', 'css'], // EDITABLE
  },
];

/**
 * FORMACIÓN académica.
 */
export const education = [
  {
    id: 'dam',
    period: { start: '2022', end: '2024' }, // EDITABLE
    tech: ['java', 'kotlin', 'sql', 'xml', 'android'], // EDITABLE
  },
];

/**
 * PROYECTOS (sección Projects). Rellena con tus proyectos reales.
 * Textos (título, descripción) en los locales bajo projects.<id>.
 */
export const projects = [
  {
    id: 'project1',
    tech: ['react', 'vite', 'gsap'],
    links: { demo: '#', repo: '#' },
    featured: true,
  },
  {
    id: 'calculator',
    tech: ['java', 'android', 'xml'],
    links: { demo: '#', repo: 'https://github.com/yagocr2/Calculadora' },
    featured: false,
  }
];

/**
 * Orden y metadatos de las secciones navegables (el menú de sistema).
 * `icon` es un símbolo simple; la etiqueta visible viene del i18n (nav.<id>).
 */
export const sections = [
  { id: 'hero', icon: '▶', menu: false },
  { id: 'about', icon: '◆', menu: true },
  { id: 'skills', icon: '★', menu: true },
  { id: 'experience', icon: '■', menu: true },
  { id: 'projects', icon: '●', menu: true },
  { id: 'contact', icon: '✉', menu: true },
];
