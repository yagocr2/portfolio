import React from 'react';
import Carousel from "../components/carousel";
import calculadora from '../assets/calculadora.webp';
import inicioSesion from '../assets/InicioSesion.webp';
import navBar from '../assets/NavBar.webp';

const Works = () => {
  const projects = [
    {
      image: <img src={calculadora} alt="Calculadora" />,
      title: "Calculadora",
      description:
        "Desarrollo de una calculadora moderna y funcional en Android Studio",
      url: "https://github.com/yagocr2/Calculadora",
    },
    {
      image: <img src={inicioSesion} alt="Inicio de Sesión" />,
      title: "Login",
      description: "Un pequeño componente de inicio de sesión animado",
      url: "https://yagocr2.github.io/InicioSesion/",
    },
    {
      image: <img src={navBar} alt="NavBar" />,
      title: "NavBar",
      description: "Un componente de barra de navegación animado",
      url: "https://yagocr2.github.io/Barra-Navegacion/",
    },
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