/**
 * Determina si una URL de enlace es "real": no vacía, no solo espacios y
 * distinta del placeholder '#' usado para enlaces pendientes de rellenar.
 * Úsalo para no renderizar botones que apuntarían a un enlace muerto.
 */
export function hasLink(url) {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed !== '' && trimmed !== '#';
}
