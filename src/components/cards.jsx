import React from 'react';
import './components.css';

const Card = ({ image, title, description }) => {
return(
    <div className="card">
        <div className="card-image">{image}</div>
        <div className="card-content">
            <h2 className="car-title">{title}</h2>
            <p className="car-description">{description}</p>
        </div>
        
    </div>
)
};
export default Card;