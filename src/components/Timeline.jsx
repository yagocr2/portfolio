import React, { useState, useEffect, useRef } from 'react';
import './timeline.css';

const Timeline = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [positions, setPositions] = useState([]);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const calculatePositions = () => {
      const container = timelineRef.current;
      const line = lineRef.current;
      if (!container || !line) return;

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
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, [items]);

  // Manejar el clic en un punto de la línea de tiempo
  const handlePointClick = (index) => {
    setActiveIndex(index);
    
    // Scroll automático para centrar el elemento seleccionado
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Detectar cuando un elemento está en el viewport
  useEffect(() => {
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

    // Observar cada elemento de la timeline
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
      <div className="timeline-line-container" ref={lineRef}>
        <div className="timeline-line"></div>
        {items.map((item, index) => (
          <div
            key={`point-${index}`}
            className={`timeline-point ${
              activeIndex === index ? "active" : ""
            }`}
            style={{ top: `${(positions[index] || 0)}%` }}
            onClick={() => handlePointClick(index)}
          >
            <div className="timeline-point-inner"></div>
            <div className="timeline-point-label">{item.year}</div>
          </div>
        ))}
      </div>

      <div className="timeline-content">
        {items.map((item, index) => (
          <div
            key={`item-${index}`}
            className={`timeline-item ${activeIndex === index ? "active" : ""}`}
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