import { useEffect, useState } from 'react';

/**
 * Observa una lista de ids de sección y devuelve la que está activa en
 * pantalla. Sirve para resaltar el ítem actual en el menú del juego.
 *
 * @param {string[]} sectionIds - ids de los <section> a observar.
 * @param {object} [options] - opciones del IntersectionObserver.
 */
export function useScrollSpy(sectionIds, options) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Nos quedamos con la sección visible más cercana al centro.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0, ...options },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, options]);

  return activeId;
}
