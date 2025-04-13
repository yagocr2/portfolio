import React from 'react';
import "./modules.css";
import '../components/typewritter'
import Typewriter from '../components/typewritter';

const Home = () => {
  

  return (
    <section className="section-home">
      <Typewriter
        texts={["Hola, Soy Yago👋", "Soy un desarrollador FullStack"]}
        speed={70}
        pause={1500}
      />
    </section>
  );
};

export default Home;

