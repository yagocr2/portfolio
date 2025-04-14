import React from 'react';
import './components.css';

const SocialLink = ({ url, icon, label }) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="social-link"
      aria-label={label}
      alt={label}
    >
      <div className="social-icon">
        {icon}
      </div>
    </a>
  );
};

export default SocialLink;