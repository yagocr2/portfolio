import React from 'react';
import Carousel from '../components/carousel';
import yo from '../assets/yo.jpg';

const Works = () => {
    const projects = [
      {
        image: <img src={yo} alt="Proyecto 1" />,
        title: "Portfolio React",
        description: "Desarrollo de un portfolio moderno con efectos glassmorphism",
        url: "/portfolio-react" // Añadir URL
        
      },
      {
        image: <img src={yo} alt="Proyecto 2" />,
        title: "E-commerce",
        description: "Plataforma de ventas con carrito dinámico",
        url: "/e-commerce" // Añadir URL
      },
    ];

  return (
    <section className="works">
      <h1>Mis Proyectos</h1>
      <Carousel items={projects} />
    </section>
  );
};

export default Works;