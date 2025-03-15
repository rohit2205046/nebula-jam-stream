
import React from 'react';

interface ShootingStarsProps {
  className?: string;
}

const ShootingStars: React.FC<ShootingStarsProps> = ({ className = '' }) => {
  return (
    <div className={`shooting-stars-container ${className}`}>
      <div className="shooting-star-wrapper">
        <div className="shooting-star"></div>
      </div>
      <div className="shooting-star-wrapper" style={{ animationDelay: '2s' }}>
        <div className="shooting-star"></div>
      </div>
      <div className="shooting-star-wrapper" style={{ animationDelay: '4s' }}>
        <div className="shooting-star"></div>
      </div>
      <div className="shooting-star-wrapper" style={{ animationDelay: '6s' }}>
        <div className="shooting-star"></div>
      </div>
      <div className="shooting-star-wrapper" style={{ animationDelay: '8s' }}>
        <div className="shooting-star"></div>
      </div>
      <div className="shooting-star-wrapper" style={{ animationDelay: '10s' }}>
        <div className="shooting-star"></div>
      </div>
    </div>
  );
};

export default ShootingStars;
