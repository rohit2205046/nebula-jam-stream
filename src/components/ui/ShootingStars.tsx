
import React from 'react';

interface ShootingStarsProps {
  className?: string;
}

const ShootingStars: React.FC<ShootingStarsProps> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      <style>
        {`
          .shooting-star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 4px 1px white;
            opacity: 0;
          }
          
          .shooting-star::after {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 1px;
            background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
          }
          
          .star-1 {
            right: 10%;
            animation: shootUp 4s linear infinite;
            animation-delay: 0s;
          }
          
          .star-2 {
            right: 30%;
            animation: shootUp 4s linear infinite;
            animation-delay: 1s;
          }
          
          .star-3 {
            right: 50%;
            animation: shootUp 4s linear infinite;
            animation-delay: 2s;
          }
          
          .star-4 {
            right: 70%;
            animation: shootUp 4s linear infinite;
            animation-delay: 3s;
          }
          
          @keyframes shootUp {
            0% {
              transform: translateY(100vh) rotate(-45deg);
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            40% {
              opacity: 1;
            }
            60% {
              opacity: 0;
            }
            100% {
              transform: translateY(-100px) rotate(-45deg);
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="shooting-star star-1"></div>
      <div className="shooting-star star-2"></div>
      <div className="shooting-star star-3"></div>
      <div className="shooting-star star-4"></div>
    </div>
  );
};

export default ShootingStars;
