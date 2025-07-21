import React, { useState, useEffect, useRef } from 'react';
import './timeline.css';

const Timeline = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [positions, setPositions] = useState([]);
  const [timelineHeight, setTimelineHeight] = useState(0);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const itemRefs = useRef([]);
  const pointRefs = useRef([]);
  const contentRef = useRef(null);
  const isMobile = useRef(window.innerWidth <= 768);

  // Calcular altura dinámica basada en el contenido
  const calculateTimelineHeight = () => {
    if (!contentRef.current) return;
    
    const contentHeight = contentRef.current.scrollHeight;
    const minHeight = Math.max(contentHeight, window.innerHeight * 0.8);
    setTimelineHeight(minHeight);
  };

  // Calcular posiciones de los puntos en la línea
  const calculatePositions = () => {
    // Solo calcular posiciones si no estamos en vista móvil
    if (isMobile.current) return;
    
    const container = timelineRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Calcular posiciones basadas en el contenido real
    const newPositions = itemRefs.current.map((item, index) => {
      if (!item) return 0;
      
      const itemRect = item.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      
      // Calcular posición relativa al contenido total
      const itemCenter = itemRect.top + itemRect.height / 2 - contentRect.top;
      const totalContentHeight = content.scrollHeight;
      
      // Convertir a porcentaje con un margen de seguridad
      const percentage = Math.max(5, Math.min(95, (itemCenter / totalContentHeight) * 100));
      
      return percentage;
    });

    setPositions(newPositions);
  };

  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth <= 768;
      if (!isMobile.current) {
        calculatePositions();
        calculateTimelineHeight();
      }
    };

    // Calcular después de que el DOM se haya actualizado
    setTimeout(() => {
      calculateTimelineHeight();
      calculatePositions();
    }, 100);

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [items]);

  // Recalcular cuando cambien los items
  useEffect(() => {
    setTimeout(() => {
      calculateTimelineHeight();
      if (!isMobile.current) {
        calculatePositions();
      }
    }, 100);
  }, [items.length]);

  // Manejar clic en un punto del timeline solo en vista desktop
  const handlePointClick = (index) => {
    if (isMobile.current) return;
    
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
      setActiveIndex(-1); // Valor especial para indicar "todos activos"
      return;
    }
    
    let ticking = false;
    let lastUpdate = 0;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const now = Date.now();
          // Throttle para evitar demasiadas actualizaciones
          if (now - lastUpdate > 50) {
            updateActiveIndex();
            lastUpdate = now;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateActiveIndex = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const centerY = scrollY + windowHeight / 2;
      
      let closestIndex = 0;
      let minDistance = Infinity;
      
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        
        const rect = item.getBoundingClientRect();
        const itemCenterY = scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      
      // Solo actualizar si hay un cambio real y ha pasado suficiente tiempo
      setActiveIndex(prev => {
        if (prev !== closestIndex) {
          return closestIndex;
        }
        return prev;
      });
    };

    // Establecer el índice inicial después de que todo esté renderizado
    const initialTimeout = setTimeout(() => {
      updateActiveIndex();
    }, 200);
    
    // Escuchar scroll con throttle
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(initialTimeout);
    };
  }, [items]);

  // Calcular espaciado dinámico entre elementos
  const getItemSpacing = () => {
    const baseSpacing = 100; // espaciado base en px
    const itemCount = items.length;
    
    if (itemCount <= 2) return baseSpacing * 1.5;
    if (itemCount <= 4) return baseSpacing;
    return Math.max(baseSpacing * 0.7, 60); // Mínimo de 60px
  };

  return (
    <div 
      className="timeline-container" 
      ref={timelineRef}
      style={{ minHeight: `${timelineHeight}px` }}
    >
      {/* Timeline line - solo visible en desktop */}
      <div 
        className="timeline-line-container" 
        ref={lineRef}
        style={{ height: `${timelineHeight * 0.8}px` }}
      >
        <div className="timeline-line"></div>
        {items.map((item, index) => (
          <div
            key={`point-${index}`}
            ref={el => (pointRefs.current[index] = el)}
            className={`timeline-point ${
              activeIndex === index ? "active" : ""
            }`}
            style={{ 
              top: `${positions[index] || (index * (80 / Math.max(items.length - 1, 1)))}%` 
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
      <div 
        className="timeline-content"
        ref={contentRef}
        style={{ gap: `${getItemSpacing()}px` }}
      >
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
              {item.skills && item.skills.length > 0 && (
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