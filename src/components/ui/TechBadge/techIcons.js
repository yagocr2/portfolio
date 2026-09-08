/**
 * Glifos pixel-art de 16x16 para TechBadge. Cada `path` es un único `d`
 * monocromo (rects unidos, sin solapes) sobre una rejilla 0-15; el color lo
 * pone el badge vía `currentColor`. `shape-rendering="crispEdges"` mantiene
 * los píxeles nítidos a cualquier tamaño.
 */
export const TECH_ICONS = {
  java: { viewBox: '0 0 16 16', path: 'M3 0h2v1h-2zM11 0h2v1h-2zM4 1h2v1h-2zM10 1h2v1h-2zM2 4h12v1h-12zM2 5h2v1h-2zM12 5h2v1h-2zM2 6h2v1h-2zM12 6h2v1h-2zM2 7h2v1h-2zM12 7h2v1h-2zM2 8h2v1h-2zM12 8h2v1h-2zM2 9h2v1h-2zM12 9h2v1h-2zM2 10h2v1h-2zM12 10h2v1h-2zM2 11h12v1h-12zM13 6h2v1h-2zM14 7h2v1h-2zM14 8h2v1h-2zM13 9h2v1h-2z' },
  csharp: { viewBox: '0 0 16 16', path: 'M4 3h2v1h-2zM9 3h2v1h-2zM4 4h2v1h-2zM9 4h2v1h-2zM4 5h2v1h-2zM9 5h2v1h-2zM4 6h2v1h-2zM9 6h2v1h-2zM4 7h2v1h-2zM9 7h2v1h-2zM4 8h2v1h-2zM9 8h2v1h-2zM4 9h2v1h-2zM9 9h2v1h-2zM4 10h2v1h-2zM9 10h2v1h-2zM4 11h2v1h-2zM9 11h2v1h-2zM4 12h2v1h-2zM9 12h2v1h-2zM2 6h12v1h-12zM2 7h12v1h-12zM2 9h12v1h-12zM2 10h12v1h-12z' },
  sql: { viewBox: '0 0 16 16', path: 'M4 2h8v1h-8zM3 3h10v1h-10zM3 4h10v1h-10zM3 6h10v1h-10zM3 7h10v1h-10zM3 8h10v1h-10zM3 10h10v1h-10zM3 11h10v1h-10zM4 12h8v1h-8z' },
  javascript: { viewBox: '0 0 16 16', path: 'M6 3h6v1h-6zM9 4h2v1h-2zM9 5h2v1h-2zM9 6h2v1h-2zM9 7h2v1h-2zM9 8h2v1h-2zM9 9h2v1h-2zM7 10h4v1h-4zM5 11h6v1h-6zM5 12h3v1h-3z' },
  typescript: { viewBox: '0 0 16 16', path: 'M3 3h10v1h-10zM3 4h10v1h-10zM7 5h2v1h-2zM7 6h2v1h-2zM7 7h2v1h-2zM7 8h2v1h-2zM7 9h2v1h-2zM7 10h2v1h-2zM7 11h2v1h-2zM7 12h2v1h-2z' },
  python: { viewBox: '0 0 16 16', path: 'M3 3h10v1h-10zM10 4h3v1h-3zM9 5h3v1h-3zM8 6h3v1h-3zM7 7h3v1h-3zM6 8h3v1h-3zM5 9h3v1h-3zM4 10h3v1h-3zM3 11h10v1h-10z' },
  php: { viewBox: '0 0 16 16', path: 'M9 3h2v1h-2zM8 4h2v1h-2zM7 5h2v1h-2zM6 6h2v1h-2zM5 7h2v1h-2zM5 8h2v1h-2zM6 9h2v1h-2zM7 10h2v1h-2zM8 11h2v1h-2zM9 12h2v1h-2z' },
  kotlin: { viewBox: '0 0 16 16', path: 'M4 3h2v1h-2zM4 4h2v1h-2zM4 5h2v1h-2zM4 6h2v1h-2zM4 7h2v1h-2zM4 8h2v1h-2zM4 9h2v1h-2zM4 10h2v1h-2zM4 11h2v1h-2zM4 12h2v1h-2zM9 3h2v1h-2zM8 4h2v1h-2zM7 5h2v1h-2zM6 6h2v1h-2zM6 7h2v1h-2zM7 8h2v1h-2zM8 9h2v1h-2zM9 10h2v1h-2zM10 11h2v1h-2zM11 12h2v1h-2z' },
  xml: { viewBox: '0 0 16 16', path: 'M5 4h2v1h-2zM9 4h2v1h-2zM4 5h2v1h-2zM10 5h2v1h-2zM3 6h2v1h-2zM11 6h2v1h-2zM2 7h2v1h-2zM12 7h2v1h-2zM2 8h2v1h-2zM12 8h2v1h-2zM3 9h2v1h-2zM11 9h2v1h-2zM4 10h2v1h-2zM10 10h2v1h-2zM5 11h2v1h-2zM9 11h2v1h-2z' },
  react: { viewBox: '0 0 16 16', path: 'M1 7h14v1h-14zM1 1h1v1h-1zM2 2h1v1h-1zM3 3h1v1h-1zM4 4h1v1h-1zM5 5h1v1h-1zM6 6h1v1h-1zM7 7h1v1h-1zM8 8h1v1h-1zM9 9h1v1h-1zM10 10h1v1h-1zM11 11h1v1h-1zM12 12h1v1h-1zM13 13h1v1h-1zM14 14h1v1h-1zM14 1h1v1h-1zM13 2h1v1h-1zM12 3h1v1h-1zM11 4h1v1h-1zM10 5h1v1h-1zM9 6h1v1h-1zM8 7h1v1h-1zM7 8h1v1h-1zM6 9h1v1h-1zM5 10h1v1h-1zM4 11h1v1h-1zM3 12h1v1h-1zM2 13h1v1h-1zM1 14h1v1h-1zM7 7h2v1h-2zM7 8h2v1h-2z' },
  spfx: { viewBox: '0 0 16 16', path: 'M4 3h8v1h-8zM3 4h3v1h-3zM3 5h3v1h-3zM4 6h3v1h-3zM5 7h5v1h-5zM9 8h3v1h-3zM10 9h3v1h-3zM10 10h3v1h-3zM4 11h8v1h-8z' },
  html: { viewBox: '0 0 16 16', path: 'M5 2h6v1h-6zM3 3h10v1h-10zM3 4h10v1h-10zM3 5h10v1h-10zM3 6h10v1h-10zM3 7h10v1h-10zM3 8h10v1h-10zM3 9h10v1h-10zM3 10h10v1h-10zM4 11h8v1h-8zM5 12h6v1h-6zM6 13h4v1h-4zM7 14h2v1h-2z' },
  css: { viewBox: '0 0 16 16', path: 'M5 3h2v1h-2zM9 3h2v1h-2zM4 4h2v1h-2zM10 4h2v1h-2zM3 5h2v1h-2zM11 5h2v1h-2zM2 6h2v1h-2zM12 6h2v1h-2zM0 7h3v1h-3zM13 7h3v1h-3zM0 8h3v1h-3zM13 8h3v1h-3zM2 9h2v1h-2zM12 9h2v1h-2zM3 10h2v1h-2zM11 10h2v1h-2zM4 11h2v1h-2zM10 11h2v1h-2zM5 12h2v1h-2zM9 12h2v1h-2z' },
  tailwind: { viewBox: '0 0 16 16', path: 'M2 5h3v1h-3zM5 6h3v1h-3zM8 5h3v1h-3zM11 6h3v1h-3zM2 9h3v1h-3zM5 10h3v1h-3zM8 9h3v1h-3zM11 10h3v1h-3z' },
  vite: { viewBox: '0 0 16 16', path: 'M8 2h3v1h-3zM7 3h3v1h-3zM6 4h3v1h-3zM5 5h3v1h-3zM4 6h6v1h-6zM7 7h3v1h-3zM8 8h3v1h-3zM9 9h3v1h-3zM10 10h3v1h-3zM11 11h3v1h-3z' },
  gsap: { viewBox: '0 0 16 16', path: 'M4 3h8v1h-8zM3 4h3v1h-3zM3 5h2v1h-2zM3 6h2v1h-2zM3 7h2v1h-2zM8 7h4v1h-4zM3 8h2v1h-2zM9 8h3v1h-3zM3 9h2v1h-2zM9 9h3v1h-3zM3 10h3v1h-3zM4 11h8v1h-8z' },
  spring: { viewBox: '0 0 16 16', path: 'M10 3h2v1h-2zM8 4h4v1h-4zM6 5h5v1h-5zM5 6h5v1h-5zM4 7h5v1h-5zM4 8h5v1h-5zM5 9h5v1h-5zM6 10h5v1h-5zM8 11h4v1h-4zM10 12h2v1h-2z' },
  node: { viewBox: '0 0 16 16', path: 'M6 2h4v1h-4zM4 3h8v1h-8zM3 4h10v1h-10zM3 5h10v1h-10zM3 6h10v1h-10zM3 7h10v1h-10zM3 8h10v1h-10zM3 9h10v1h-10zM3 10h10v1h-10zM3 11h10v1h-10zM4 12h8v1h-8zM6 13h4v1h-4z' },
  dotnet: { viewBox: '0 0 16 16', path: 'M4 5h3v1h-3zM9 5h3v1h-3zM2 6h7v1h-7zM7 6h7v1h-7zM2 7h7v1h-7zM7 7h7v1h-7zM2 8h7v1h-7zM7 8h7v1h-7zM2 9h7v1h-7zM7 9h7v1h-7zM4 10h3v1h-3zM9 10h3v1h-3z' },
  git: { viewBox: '0 0 16 16', path: 'M6 13h4v1h-4zM7 12h2v1h-2zM7 11h2v1h-2zM7 10h2v1h-2zM7 9h2v1h-2zM7 8h2v1h-2zM5 7h2v1h-2zM9 7h2v1h-2zM4 6h2v1h-2zM10 6h2v1h-2zM3 5h2v1h-2zM11 5h2v1h-2zM3 4h3v1h-3zM10 4h3v1h-3z' },
  docker: { viewBox: '0 0 16 16', path: 'M6 4h3v1h-3zM6 5h3v1h-3zM6 6h3v1h-3zM6 7h3v1h-3zM9 4h3v1h-3zM9 5h3v1h-3zM9 6h3v1h-3zM9 7h3v1h-3zM12 4h2v1h-2zM12 5h2v1h-2zM12 6h2v1h-2zM12 7h2v1h-2zM4 8h9v1h-9zM2 9h12v1h-12zM2 10h12v1h-12zM2 11h12v1h-12zM3 12h10v1h-10z' },
  azure: { viewBox: '0 0 16 16', path: 'M7 3h2v1h-2zM6 4h4v1h-4zM6 5h4v1h-4zM5 6h6v1h-6zM5 7h6v1h-6zM4 8h8v1h-8zM4 9h8v1h-8zM3 10h10v1h-10zM3 11h10v1h-10z' },
  databricks: { viewBox: '0 0 16 16', path: 'M1 4h5v1h-5zM7 4h4v1h-4zM12 4h3v1h-3zM1 5h5v1h-5zM7 5h4v1h-4zM12 5h3v1h-3zM1 6h5v1h-5zM7 6h4v1h-4zM12 6h3v1h-3zM1 8h3v1h-3zM5 8h5v1h-5zM11 8h4v1h-4zM1 9h3v1h-3zM5 9h5v1h-5zM11 9h4v1h-4zM1 10h3v1h-3zM5 10h5v1h-5zM11 10h4v1h-4z' },
  linux: { viewBox: '0 0 16 16', path: 'M7 3h3v1h-3zM6 4h5v1h-5zM5 5h7v1h-7zM4 6h9v1h-9zM4 7h9v1h-9zM4 8h9v1h-9zM4 9h9v1h-9zM4 10h9v1h-9zM4 11h3v1h-3zM10 11h3v1h-3z' },
  android: { viewBox: '0 0 16 16', path: 'M4 2h1v1h-1zM11 2h1v1h-1zM4 3h1v1h-1zM11 3h1v1h-1zM5 4h6v1h-6zM4 5h8v1h-8zM3 6h10v1h-10zM3 7h3v1h-3zM7 7h2v1h-2zM10 7h3v1h-3zM3 8h10v1h-10zM3 9h10v1h-10zM3 10h10v1h-10zM4 11h8v1h-8zM5 12h6v1h-6z' },
};
