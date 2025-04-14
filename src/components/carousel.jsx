import React, { useState, useEffect, useRef } from 'react';
import './components.css';
import Card from './Cards'

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const carouselRef = useRef(null);

  // Medidas del carrusel
  const getItemWidth = () => {
    return carouselRef.current?.children[0]?.offsetWidth || 300;
  };

  const getSpacing = () => 30;

  // Eventos de arrastre
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
    setDragDistance(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX || e.touches[0].clientX;
    const deltaX = currentX - startX;
    setDragDistance(Math.abs(deltaX));
    setTranslateX(-activeIndex * (getItemWidth() + getSpacing()) + deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Solo considerar clic si el arrastre fue menor a 5px
    if (dragDistance < 5) return;

    const delta = translateX + activeIndex * (getItemWidth() + getSpacing());
    const direction = delta > 0 ? -1 : 1;
    const newIndex = Math.max(0, Math.min(activeIndex + direction, items.length - 1));
    
    setActiveIndex(newIndex);
    setTranslateX(-newIndex * (getItemWidth() + getSpacing()));
  };

  // Redirección solo en clic válido
  const handleCardClick = (url) => (e) => {
    if (dragDistance >= 5) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    window.location.href = url;
  };

  return (
    <div className="snap-carousel"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <div
        ref={carouselRef}
        className="carousel-track"
        style={{ 
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {items.map((item, index) => (
          <Card
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            className="carousel-card"
            onClick={handleCardClick(item.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;