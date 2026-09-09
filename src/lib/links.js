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

/**
 * Último segmento de una URL de perfil (p. ej. de profile.links.github),
 * para mostrar "@usuario" derivado del enlace real en vez de duplicar el
 * nombre de usuario a mano en otro sitio (y desincronizarse si cambia).
 */
export function handleFromUrl(url) {
  if (!hasLink(url)) return '';
  return url.replace(/\/+$/, '').split('/').pop();
}
