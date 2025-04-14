import React from 'react';
import Carousel from '../components/Carousel';
import yo from '../assets/yo.jpg';

const Works = () => {
  const projects = [
    {
      image: <img src={yo} alt="Proyecto 1" />,
      title: "Portfolio React",
      description: "Desarrollo de un portfolio moderno con efectos glassmorphism",
      url: "/portfolio-react"
    },
    {
      image: <img src={yo} alt="Proyecto 2" />,
      title: "E-commerce",
      description: "Plataforma de ventas con carrito dinámico",
      url: "/e-commerce"
    },
    {
      image: <img src={yo} alt="Proyecto 3" />,
      title: "App de Tareas",
      description: "Aplicación para gestionar tareas diarias con recordatorios",
      url: "/task-app"
    },
    {
      image: <img src={yo} alt="Proyecto 4" />,
      title: "Blog Personal",
      description: "Blog minimalista con sistema de comentarios",
      url: "/blog"
    }
  ];

  return (
    <section className="works">
      <h1>Mis Proyectos</h1>
      <p className="works-subtitle">Desliza las tarjetas para ver todos mis proyectos</p>
      <Carousel items={projects} />
    </section>
  );
};

export default Works;