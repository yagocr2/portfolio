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
      calculatePositions();
    };

    const calculatePositions = () => {
      const container = timelineRef.current;
      const line = lineRef.current;
      if (!container || !line) return;

      // Set dynamic positions for timeline points
      if (isMobile.current) {
        // For mobile (horizontal timeline)
        const lineWidth = line.getBoundingClientRect().width;
        const pointSpacing = lineWidth / (items.length - 1 || 1);
        
        const newPositions = items.map((_, index) => {
          // Calculate percent along the line (10% padding on each side)
          return 10 + ((index / (items.length - 1 || 1)) * 80);
        });
        
        setPositions(newPositions);
        
        // Set the CSS variable for each point
        pointRefs.current.forEach((point, index) => {
          if (point) {
            point.style.setProperty('--index', index);
          }
        });
      } else {
        // For desktop (vertical timeline)
        const newPositions = itemRefs.current.map((item) => {
          if (!item) return 0;
          const itemRect = item.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const lineRect = line.getBoundingClientRect();
          
          return ((itemRect.top + itemRect.height/2 - containerRect.top) / lineRect.height * 100);
        });

        setPositions(newPositions);
      }
    };

    calculatePositions();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [items]);

  // Handle clicking on a timeline point
  const handlePointClick = (index) => {
    setActiveIndex(index);
    
    if (isMobile.current) {
      // For mobile, scroll the timeline point into view
      if (pointRefs.current[index]) {
        pointRefs.current[index].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    }
    
    // Scroll the content item into view
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Detect when an element is in the viewport
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
          
          // For mobile, scroll the corresponding point into view
          if (isMobile.current && pointRefs.current[index]) {
            pointRefs.current[index].scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center'
            });
          }
        }
      });
    }, observerOptions);

    // Observe each element of the timeline
    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      itemRefs.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, [items]);

  // Add horizontal scroll with mouse wheel for mobile timeline
  useEffect(() => {
    const handleWheel = (e) => {
      if (isMobile.current && lineRef.current) {
        e.preventDefault();
        lineRef.current.scrollLeft += e.deltaY;
      }
    };

    const lineContainer = lineRef.current;
    if (lineContainer) {
      lineContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (lineContainer) {
        lineContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="timeline-container" ref={timelineRef}>
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
              left: isMobile.current ? `${positions[index] || 0}%` : 'auto', 
              top: !isMobile.current ? `${positions[index] || 0}%` : '50%' 
            }}
            onClick={() => handlePointClick(index)}
            data-point-index={index}
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