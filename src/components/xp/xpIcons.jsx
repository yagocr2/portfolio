import { XP_ICONS } from './xpIconData.jsx';

/** Componente genérico: renderiza el icono XP registrado bajo `name`. */
export function XPIcon({ name, className }) {
  const Cmp = XP_ICONS[name];
  if (!Cmp) return null;
  return (
    <span className={className}>
      <Cmp />
    </span>
  );
}
