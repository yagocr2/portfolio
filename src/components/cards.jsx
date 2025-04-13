import React from 'react';
import './components.css';

const Card = ({ image, title, description, onClick }) => {
  return(
    <div className="card">
      <div 
        className="card-image-container"
        onClick={onClick}
        onContextMenu={(e) => e.preventDefault()}
      >
        {React.cloneElement(image, {
          draggable: false,
          className: "card-image",
          style: { pointerEvents: 'none' }
        })}
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;