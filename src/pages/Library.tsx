
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import MusicLibrary from "@/components/music/MusicLibrary";
import MusicPlayer from "@/components/layout/MusicPlayer";

// Shooting stars component
const ShootingStars = () => {
  return (
    <div className="shooting-stars-container">
      <div className="shooting-star shooting-star-1"></div>
      <div className="shooting-star shooting-star-2"></div>
      <div className="shooting-star shooting-star-3"></div>
      <style jsx>{`
        .shooting-stars-container {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .shooting-star {
          position: absolute;
          width: 100px;
          height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.8) 50%, rgba(255,255,255,0));
          border-radius: 50%;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          opacity: 0;
        }
        .shooting-star::before {
          content: '';
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.4);
          transform: translateY(-50%);
          right: 0;
        }
        .shooting-star-1 {
          top: 15%;
          left: -100px;
          transform: rotate(25deg);
          animation: shootingstar 7s 2s infinite;
        }
        .shooting-star-2 {
          top: 45%;
          left: -100px;
          transform: rotate(15deg);
          animation: shootingstar 8s 4s infinite;
        }
        .shooting-star-3 {
          top: 75%;
          left: -100px;
          transform: rotate(35deg);
          animation: shootingstar 6s 1s infinite;
        }
        @keyframes shootingstar {
          0% {
            transform: translateX(0) rotate(var(--rotation, 25deg));
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          25% {
            transform: translateX(50vw) rotate(var(--rotation, 25deg));
            opacity: 1;
          }
          50% {
            transform: translateX(100vw) rotate(var(--rotation, 25deg));
            opacity: 0;
          }
          100% {
            transform: translateX(0) rotate(var(--rotation, 25deg));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

const Library = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Set initial theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-[#f5f3ff]"} text-foreground`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className={`absolute top-[10%] left-[20%] w-72 h-72 rounded-full ${theme === "dark" ? "bg-[#FF10F0]/10" : "bg-[#FF10F0]/5"} blur-[100px] animate-pulse-slow`}></div>
        <div className={`absolute bottom-[30%] right-[10%] w-80 h-80 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/15" : "bg-[#9C27B0]/10"} blur-[120px] animate-pulse-slow animate-delay-300`}></div>
        <div className={`absolute top-[40%] right-[30%] w-40 h-40 rounded-full ${theme === "dark" ? "bg-[#9C27B0]/10" : "bg-[#6A1B9A]/5"} blur-[80px] animate-pulse-slow animate-delay-500`}></div>
        
        {/* Star-like elements - only in dark theme */}
        {theme === "dark" && (
          <>
            <div className="absolute top-[15%] left-[40%] w-1 h-1 rounded-full bg-white animate-pulse-slow"></div>
            <div className="absolute top-[25%] left-[80%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-300"></div>
            <div className="absolute top-[60%] left-[30%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-400"></div>
            <div className="absolute top-[75%] left-[70%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-200"></div>
            <div className="absolute top-[85%] left-[20%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-100"></div>
          </>
        )}
        
        {/* Add shooting stars - only in dark theme */}
        {theme === "dark" && <ShootingStars />}
      </div>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <div className="relative z-10 pt-24">
        <MusicLibrary />
      </div>
      
      <MusicPlayer />
    </div>
  );
};

export default Library;
