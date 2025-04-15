import React, { useState, useEffect, useRef } from 'react';
import './timeline.css';

const Timeline = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [positions, setPositions] = useState([]);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const itemRefs = useRef([]);
  const pointRefs = useRef([]);
  const isMobile = useRef(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth <= 768;
      if (!isMobile.current) {
        calculatePositions();
      }
    };

    const calculatePositions = () => {
      // Solo calcular posiciones si no estamos en vista móvil
      if (isMobile.current) return;
      
      const container = timelineRef.current;
      const line = lineRef.current;
      if (!container || !line) return;

      // Para escritorio (timeline vertical)
      const newPositions = itemRefs.current.map((item) => {
        if (!item) return 0;
        const itemRect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const lineRect = line.getBoundingClientRect();
        
        return ((itemRect.top + itemRect.height/2 - containerRect.top) / lineRect.height * 100);
      });

      setPositions(newPositions);
    };

    calculatePositions();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [items]);

  // Manejar clic en un punto del timeline solo en vista desktop
  const handlePointClick = (index) => {
    if (isMobile.current) return; // No hacer nada en vista móvil
    
    setActiveIndex(index);
    
    // Desplazar el elemento de contenido a la vista
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Detector de elementos en viewport solo para desktop
  useEffect(() => {
    if (isMobile.current) {
      // En móvil, hacer que todos los ítems sean activos
      setActiveIndex(-1); // Valor especial para indicar "todos activos"
      return;
    }
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    // Observar cada elemento del timeline
    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      itemRefs.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, [items]);

  return (
    <div className="timeline-container" ref={timelineRef}>
      {/* Timeline line - solo visible en desktop */}
      <div className="timeline-line-container" ref={lineRef}>
        <div className="timeline-line"></div>
        {items.map((item, index) => (
          <div
            key={`point-${index}`}
            ref={el => (pointRefs.current[index] = el)}
            className={`timeline-point ${
              activeIndex === index ? "active" : ""
            }`}
            style={{ 
              top: `${positions[index] || 0}%` 
            }}
            onClick={() => handlePointClick(index)}
            data-point-index={index}
          >
            <div className="timeline-point-inner"></div>
            <div className="timeline-point-label">{item.year}</div>
          </div>
        ))}
      </div>

      {/* Contenido - visible en todas las vistas */}
      <div className="timeline-content">
        {items.map((item, index) => (
          <div
            key={`item-${index}`}
            className={`timeline-item ${
              activeIndex === index || activeIndex === -1 || isMobile.current ? "active" : ""
            }`}
            ref={(el) => (itemRefs.current[index] = el)}
            data-index={index}
          >
            <div className="timeline-card">
              <div className="timeline-header">
                <h3 className="timeline-title">{item.title}</h3>
                <div className="timeline-year">{item.year}</div>
              </div>
              <div className="timeline-subtitle">{item.organization}</div>
              <div className="timeline-description">{item.description}</div>
              {item.skills && (
                <div className="timeline-skills">
                  {item.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="timeline-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;