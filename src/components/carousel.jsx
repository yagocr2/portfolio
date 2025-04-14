import React, { useState, useRef, useEffect } from 'react';
import Card from './Cards';
import './components.css';

const TinderCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Referencias para los elementos actuales y las animaciones
  const cardRefs = useRef([]);
  
  // Configurar las refs para cada tarjeta
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, items.length);
  }, [items]);
  
  // Función para manejar el inicio del arrastre
  const handleDragStart = (clientX) => {
    if (isAnimating) return;
    setIsDragging(true);
    setDragStartX(clientX);
    setDragDelta(0);
    setDirection(null);
  };
  
  // Función para manejar el movimiento durante el arrastre
  const handleDrag = (clientX) => {
    if (!isDragging || isAnimating) return;
    
    const delta = clientX - dragStartX;
    setDragDelta(delta);
    
    // Determinar la dirección del arrastre
    if (delta > 0) {
      setDirection('right');
    } else if (delta < 0) {
      setDirection('left');
    } else {
      setDirection(null);
    }
    
    // Aplicar la transformación a la tarjeta actual
    if (cardRefs.current[currentIndex]) {
      const rotation = delta * 0.1; // Rotación suave basada en el arrastre
      const currentCard = cardRefs.current[currentIndex];
      
      currentCard.style.transform = `translateX(${delta}px) rotate(${rotation}deg)`;
      currentCard.style.opacity = `${1 - Math.abs(delta) / 500}`;
      
      // Mostrar indicador de decisión
      if (delta > 100) {
        currentCard.classList.add('swipe-right-indicator');
        currentCard.classList.remove('swipe-left-indicator');
      } else if (delta < -100) {
        currentCard.classList.add('swipe-left-indicator');
        currentCard.classList.remove('swipe-right-indicator');
      } else {
        currentCard.classList.remove('swipe-left-indicator', 'swipe-right-indicator');
      }
    }
  };
  
  // Función para manejar el final del arrastre
  const handleDragEnd = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);
    
    const currentCard = cardRefs.current[currentIndex];
    
    // Si el arrastre es suficiente en alguna dirección, completar la acción
    if (dragDelta > 100) {
      // Swipe hacia la derecha (like)
      completeSwipe('right', currentCard);
    } else if (dragDelta < -100) {
      // Swipe hacia la izquierda (dislike)
      completeSwipe('left', currentCard);
    } else {
      // No es suficiente, regresar a la posición original
      resetCardPosition(currentCard);
    }
  };
  
  // Función para completar el swipe
  const completeSwipe = (direction, cardElement) => {
    setIsAnimating(true);
    
    // Aplicar animación final
    const xOffset = direction === 'right' ? window.innerWidth + 200 : -window.innerWidth - 200;
    const rotation = direction === 'right' ? 30 : -30;
    
    cardElement.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    cardElement.style.transform = `translateX(${xOffset}px) rotate(${rotation}deg)`;
    cardElement.style.opacity = '0';
    
    // Cambiar al siguiente elemento después de la animación
    setTimeout(() => {
      // Calcular el siguiente índice con efecto circular
      const nextIndex = (currentIndex + 1) % items.length;
      
      // Restablecer la tarjeta actual para futuras apariciones
      cardElement.style.transition = 'none';
      cardElement.style.transform = 'translateX(0) rotate(0deg)';
      cardElement.style.opacity = '0';
      cardElement.style.zIndex = '-1';
      cardElement.classList.remove('swipe-left-indicator', 'swipe-right-indicator');
      
      setCurrentIndex(nextIndex);
      setDragDelta(0);
      setIsAnimating(false);
      
      // Preparar la nueva tarjeta actual
      setTimeout(() => {
        if (cardRefs.current[nextIndex]) {
          cardRefs.current[nextIndex].style.opacity = '1';
          cardRefs.current[nextIndex].style.zIndex = '10';
        }
      }, 50);
    }, 500);
  };
  
  // Función para resetear la posición de la tarjeta
  const resetCardPosition = (cardElement) => {
    setIsAnimating(true);
    
    cardElement.style.transition = 'transform 0.3s ease';
    cardElement.style.transform = 'translateX(0) rotate(0deg)';
    cardElement.style.opacity = '1';
    cardElement.classList.remove('swipe-left-indicator', 'swipe-right-indicator');
    
    setTimeout(() => {
      setIsAnimating(false);
      setDragDelta(0);
    }, 300);
  };
  
  // Funciones para controles manuales
  const swipeLeft = () => {
    if (isAnimating || isDragging) return;
    const currentCard = cardRefs.current[currentIndex];
    if (currentCard) {
      completeSwipe('left', currentCard);
    }
  };
  
  const swipeRight = () => {
    if (isAnimating || isDragging) return;
    const currentCard = cardRefs.current[currentIndex];
    if (currentCard) {
      completeSwipe('right', currentCard);
    }
  };

  return (
    <div className="tinder-carousel">
      <div className="tinder-cards-container">
        {items.map((item, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            className={`tinder-card ${index === currentIndex ? 'active' : ''}`}
            style={{
              zIndex: items.length - index,
              opacity: index === currentIndex ? 1 : 0,
              transform: index > currentIndex ? 'scale(0.95) translateY(15px)' : 'scale(1) translateY(0)',
            }}
            onMouseDown={(e) => index === currentIndex && handleDragStart(e.clientX)}
            onMouseMove={(e) => index === currentIndex && handleDrag(e.clientX)}
            onMouseUp={() => index === currentIndex && handleDragEnd()}
            onMouseLeave={() => index === currentIndex && isDragging && handleDragEnd()}
            onTouchStart={(e) => index === currentIndex && handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => index === currentIndex && handleDrag(e.touches[0].clientX)}
            onTouchEnd={() => index === currentIndex && handleDragEnd()}
          >
            <Card
              image={item.image}
              title={item.title}
              description={item.description}
              className="card-content"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TinderCarousel;