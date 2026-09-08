import { useState } from 'react';
import { CRTScreen } from './components/layout/CRTScreen/CRTScreen.jsx';
import { ParallaxBackground } from './components/background/ParallaxBackground/ParallaxBackground.jsx';
import { GameMenu } from './components/navigation/GameMenu/GameMenu.jsx';
import { Footer } from './components/layout/Footer/Footer.jsx';
import { BootScreen } from './components/sections/BootScreen/BootScreen.jsx';
import { Hero } from './components/sections/Hero/Hero.jsx';
import { About } from './components/sections/About/About.jsx';
import { Skills } from './components/sections/Skills/Skills.jsx';
import { Experience } from './components/sections/Experience/Experience.jsx';
import { Projects } from './components/sections/Projects/Projects.jsx';
import { Contact } from './components/sections/Contact/Contact.jsx';

/**
 * Raíz de la aplicación. Mientras la "consola" no ha arrancado mostramos la
 * BootScreen por encima; al pulsar START se revela el portfolio y se dispara
 * la animación de entrada del Hero (prop `started`).
 */
export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <CRTScreen>
      <ParallaxBackground />

      {!started && <BootScreen onStart={() => setStarted(true)} />}

      <GameMenu />

      <main>
        <Hero active={started} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </CRTScreen>
  );
}
