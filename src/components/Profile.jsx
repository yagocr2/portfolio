import React from 'react';
import './components.css';

const ProfilePhoto = ({ imageSrc, altText }) => {
  return (
    <div className="profile-container">
      <div className="profile-frame">
        <img 
          src={imageSrc} 
          alt={altText}
          className="profile-image"
          onContextMenu={(e) => e.preventDefault()}
          draggable="false"
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;