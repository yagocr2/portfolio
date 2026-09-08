import avatar from '../assets/avatar.jpg';
/**
 * ============================================================
 *  DATOS DEL PORTFOLIO  (capa de datos — única fuente de verdad)
 * ============================================================
 *  Aquí vive lo NO traducible: porcentajes, fechas, tecnologías y enlaces.
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
  },
};

/**
 * SPECS del Hero (barras tipo medidor que aparecen junto a la foto).
 * value: 0-100. color: clave de color de tokens.css (sin var()).
 */
export const stats = [
  { id: 'frontend', value: 80, color: 'pink' },
  { id: 'backend', value: 90, color: 'cyan' },
  { id: 'mobile', value: 70, color: 'green' },
  { id: 'problemSolving', value: 90, color: 'yellow' },
];

/**
 * SKILLS (sección Skills — barras de progreso). Agrupadas por categoría.
 */
export const skills = [
  // --- Lenguajes ---
  { id: 'java', category: 'languages', level: 90, color: 'orange' },
  { id: 'csharp', category: 'languages', level: 85, color: 'purple' },
  { id: 'sql', category: 'languages', level: 78, color: 'pink' },
  { id: 'javascript', category: 'languages', level: 82, color: 'yellow' },
  { id: 'typescript', category: 'languages', level: 80, color: 'cyan' },
  { id: 'python', category: 'languages', level: 75, color: 'blue' },
  // --- Frontend ---
  { id: 'react', category: 'frontend', level: 85, color: 'cyan' },
  { id: 'spfx', category: 'frontend', level: 70, color: 'pink' },
  { id: 'html', category: 'frontend', level: 92, color: 'orange' },
  { id: 'css', category: 'frontend', level: 85, color: 'cyan' },
  { id: 'tailwind', category: 'frontend', level: 80, color: 'pink' },

  // --- Backend ---
  { id: 'spring', category: 'backend', level: 78, color: 'green' },
  { id: 'node', category: 'backend', level: 75, color: 'green' },
  { id: 'dotnet', category: 'backend', level: 80, color: 'purple' },

  // --- Herramientas ---
  { id: 'git', category: 'tools', level: 85, color: 'orange' },
  { id: 'docker', category: 'tools', level: 65, color: 'cyan' },
  { id: 'azure', category: 'tools', level: 60, color: 'blue' },
  { id: 'databricks', category: 'tools', level: 76, color: 'green' },
];

export const SKILL_CATEGORIES = ['languages', 'frontend', 'backend', 'tools'];

/**
 * EXPERIENCIA. Orden cronológico inverso (lo más reciente arriba).
 * `current: true` marca el puesto actual. Textos en los locales bajo experience.<id>.
 */
export const experience = [
  {
    id: 'nter',
    current: true,
    period: { start: '2025', end: null }, // EDITABLE: fechas reales (null = actualidad)
    tech: ['React', 'JavaScript', 'Java', 'Spring', 'SQL', 'Git'], // EDITABLE
  },
  {
    id: 'uco',
    current: false,
    period: { start: '2024', end: '2024' }, // EDITABLE: meses reales de las prácticas
    tech: ['PHP', 'SQL', 'Linux', 'HTML', 'CSS'], // EDITABLE
  },
];

/**
 * FORMACIÓN académica.
 */
export const education = [
  {
    id: 'dam',
    period: { start: '2022', end: '2024' }, // EDITABLE
    tech: ['Java', 'Kotlin', 'SQL', 'XML', 'Android'], // EDITABLE
  },
];

/**
 * PROYECTOS (sección Projects). Rellena con tus proyectos reales.
 * Textos (título, descripción) en los locales bajo projects.<id>.
 */
export const projects = [
  {
    id: 'project1',
    tech: ['React', 'Vite', 'GSAP'],
    links: { demo: '#', repo: '#' },
    featured: true,
  },
  {
    id: 'calculator',
    tech: ['Java', 'Android', 'XML'],
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
