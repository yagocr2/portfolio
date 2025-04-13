// components/Typewriter.jsx
import { useState, useEffect } from 'react';

const Typewriter = ({ texts, speed = 50, pause = 1500 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing | pausing | deleting | waiting
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];
    const textLength = currentText.length;
    let timeout;

    switch(phase) {
      case 'typing':
        timeout = setTimeout(() => {
          if (displayText.length < textLength) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setPhase('pausing');
          }
        }, speed + Math.random() * 20); // Pequeña variación natural
        
        break;

      case 'pausing':
        timeout = setTimeout(() => {
          setPhase('deleting');
        }, pause + textLength * 15); // Pausa proporcional al texto
        
        break;

      case 'deleting':
        timeout = setTimeout(() => {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setPhase('waiting');
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }, speed / 2);
        
        break;

      case 'waiting':
        timeout = setTimeout(() => {
          setPhase('typing');
        }, 500);
        
        break;
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, textIndex, texts, speed, pause]);

  return (
    <h1 className="typewriter-heading">
      {displayText}
      <span className={`cursor ${phase === 'pausing' ? 'steady' : ''}`}>|</span>
    </h1>
  );
};

export default Typewriter;