
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import MusicLibrary from "@/components/music/MusicLibrary";
import MusicPlayer from "@/components/layout/MusicPlayer";
import ShootingStars from "@/components/ui/ShootingStars";

const Library = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-[#f5f3ff]"} text-foreground`}>
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className={`absolute top-[10%] left-[20%] w-72 h-72 rounded-full ${theme === "dark" ? "bg-[#FF10F0]/10" : "bg-[#FF10F0]/5"} blur-[100px] animate-pulse-slow`}></div>
        <div className={`absolute bottom-[30%] right-[10%] w-80 h-80 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/15" : "bg-[#9C27B0]/10"} blur-[120px] animate-pulse-slow animate-delay-300`}></div>
        <div className={`absolute top-[40%] right-[30%] w-40 h-40 rounded-full ${theme === "dark" ? "bg-[#9C27B0]/10" : "bg-[#6A1B9A]/5"} blur-[80px] animate-pulse-slow animate-delay-500`}></div>
        
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
