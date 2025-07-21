import React, { useState } from "react";
import Timeline from "../components/Timeline";
import "./modules.css";

const Experience = () => {
  // Datos de experiencia laboral
  const workExperience = [
    {
      year: "2025",
      title: "Desarrollador Web en Prácticas",
      organization: "Universidad de Córdoba",
      description:
        "Realicé mis prácticas desarrollando aplicaciones web para la universidad de Córdoba, utilizando PHP y Javascript.",
      skills: ["PHP", "Javascript", "Bootstrap"],
    },
  ];

  // Datos de educación
  const education = [
    {
      year: "2025",
      title: "Grado Superior de Desarrollo de Aplicaciones Multiplataforma",
      organization: "IES Trassierra",
      description:
        "Terminé mi ciclo superior en Desarrollo de Aplicaciones Multiplataforma en el Instituto de Educación Superior Trassierra",
      skills: ["Java", "C#", "MySQL", "HTML", "CSS", "Android"],
    },
    {
      year: "2023",
      title: "Bachillerato",
      organization: "IES Trassierra",
      description:
        "Terminé mi bachillerato en el Instituto de Educación Superior Trassierra",
    },
    {
      year: "2022",
      title: "Curso de Ingles B2",
      organization: "Cámara de Comercio",
      description:
        "Realicé un curso intensivo de inglés B2, mejorando mis habilidades de comunicación y comprensión en el idioma. Complete el curso consiguiedo mi certificado B2 con Oxford.",
    },
  ];

  const [activeTab, setActiveTab] = useState("work");

  return (
    <section className="experience-section">
      <h1 className="section-title">Mi Trayectoria</h1>

      <div className="experience-tabs">
        <button
          className={`tab-button ${activeTab === "work" ? "active" : ""}`}
          onClick={() => setActiveTab("work")}
        >
          Experiencia Laboral
        </button>
        <button
          className={`tab-button ${activeTab === "education" ? "active" : ""}`}
          onClick={() => setActiveTab("education")}
        >
          Formación Académica
        </button>
      </div>

      <div className="timeline-wrapper">
        {activeTab === "work" ? (
          <Timeline items={workExperience} />
        ) : (
          <Timeline items={education} />
        )}
      </div>
    </section>
  );
};

export default Experience;
