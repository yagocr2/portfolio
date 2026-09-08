# 🕹️ Portfolio 8-bits — Yago Calero

Portfolio interactivo con estética **consola retro** (Game Boy / PS1 / synthwave),
construido con **React + Vite** y animaciones con **GSAP**. Bilingüe ES/EN.

## 🚀 Arranque

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo  -> http://localhost:5173
npm run build    # build de producción     -> /dist
npm run preview  # previsualizar el build
npm run lint     # ESLint
```

## 🧩 Arquitectura

Proyecto **modular** y escalable. Cada componente vive en su carpeta con su CSS
Module colocado al lado.

```
src/
├── main.jsx                 # entrada: monta <App> dentro de <LanguageProvider>
├── App.jsx                  # orquesta boot screen + secciones
├── index.css                # reset global + import de tokens
│
├── styles/
│   └── tokens.css           # 🎨 design tokens (color, tipografía, espaciado)
│
├── data/
│   └── profile.js           # 📊 capa de datos (NO traducible): skills, exp, etc.
│
├── i18n/                    # 🌐 sistema de idiomas propio (ES/EN)
│   ├── context.js           # contexto + constantes
│   ├── LanguageContext.jsx  # provider + función t()
│   ├── useTranslation.js    # hook de acceso
│   └── locales/{es,en}.json # textos traducibles
│
├── lib/
│   └── gsap.js              # registro central de GSAP + ScrollTrigger
│
├── hooks/
│   ├── usePrefersReducedMotion.js
│   └── useScrollSpy.js
│
└── components/
    ├── layout/   CRTScreen · Section · Footer
    ├── background/  ParallaxBackground
    ├── navigation/  GameMenu
    ├── ui/       PixelButton · PixelPanel · StatBar · Typewriter · LanguageSwitcher
    └── sections/ BootScreen · Hero · About · Skills · Experience · Projects · Contact
```

### Principios de diseño

- **Tokens primero**: cambia colores/tipografías en `styles/tokens.css` y se
  propaga a todo.
- **Datos separados del texto**: lo estructural en `data/profile.js`; lo
  traducible en `i18n/locales/`, ambos enlazados por la misma `id`.
- **Accesibilidad**: respeta `prefers-reduced-motion`, roles ARIA y foco visible.

## ✏️ Cómo personalizarlo

1. **Tu foto** → reemplaza `public/avatar.png` por tu retrato (ahora hay un
   placeholder). Recomendado ~512×640.
2. **Tus datos** → edita `src/data/profile.js`. Busca los comentarios
   `// EDITABLE` (fechas, GitHub, niveles de skills, enlaces de proyectos).
3. **Tus textos** → edita `src/i18n/locales/es.json` y `en.json` (bio,
   descripciones de experiencia y proyectos). Cada clave existe en ambos idiomas.
4. **Colores** → `src/styles/tokens.css`.

## 🛠️ Stack

React 19 · Vite 8 · GSAP 3 (+ ScrollTrigger) · CSS Modules · ESLint 9 flat config.
Fuentes: *Press Start 2P* (títulos) y *VT323* (cuerpo).
