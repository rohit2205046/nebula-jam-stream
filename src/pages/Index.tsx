
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewMenu from "@/components/layout/NewMenu";
import MusicPlayer from "@/components/layout/MusicPlayer";
import ShootingStars from "@/components/ui/ShootingStars";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Compass, Music, Share2, MessageSquare, Crown } from "lucide-react";
import Hero from "@/components/home/Hero";

const Index = () => {
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
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-[#f5f3ff]"} overflow-hidden relative transition-colors duration-300`}>
      {/* Background elements */}
      <ShootingStars className="fixed inset-0 z-0" />
      
      <NewMenu theme={theme} toggleTheme={toggleTheme} />
      
      <Hero />
      
      <div className="max-w-6xl mx-auto px-4 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Link to="/explore" className="transform transition-all duration-300 hover:-translate-y-2">
            <div className="h-full bg-[#6A1B9A]/10 backdrop-blur-md border border-[#6A1B9A]/20 rounded-xl p-6 flex flex-col items-center text-center">
              <Compass className="w-12 h-12 text-[#FF10F0] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Explore</h3>
              <p className="text-sm text-muted-foreground">Discover new music and trending playlists</p>
            </div>
          </Link>
          
          <Link to="/library" className="transform transition-all duration-300 hover:-translate-y-2">
            <div className="h-full bg-[#6A1B9A]/10 backdrop-blur-md border border-[#6A1B9A]/20 rounded-xl p-6 flex flex-col items-center text-center">
              <Music className="w-12 h-12 text-[#FF10F0] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Library</h3>
              <p className="text-sm text-muted-foreground">Access your songs, albums and playlists</p>
            </div>
          </Link>
          
          <Link to="/referral" className="transform transition-all duration-300 hover:-translate-y-2">
            <div className="h-full bg-[#6A1B9A]/10 backdrop-blur-md border border-[#6A1B9A]/20 rounded-xl p-6 flex flex-col items-center text-center">
              <Share2 className="w-12 h-12 text-[#FF10F0] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Refer Friends</h3>
              <p className="text-sm text-muted-foreground">Share music and earn rewards together</p>
            </div>
          </Link>
          
          <Link to="/chat" className="transform transition-all duration-300 hover:-translate-y-2">
            <div className="h-full bg-[#6A1B9A]/10 backdrop-blur-md border border-[#6A1B9A]/20 rounded-xl p-6 flex flex-col items-center text-center">
              <MessageSquare className="w-12 h-12 text-[#FF10F0] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chat</h3>
              <p className="text-sm text-muted-foreground">Connect with friends and discuss music</p>
            </div>
          </Link>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Upgrade Your Experience</h2>
          <Link to="/premium">
            <AnimatedButton
              size="lg"
              className="bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] text-white px-8"
            >
              <Crown className="mr-2 h-5 w-5" /> Go Premium
            </AnimatedButton>
          </Link>
        </div>
      </div>
      
      <MusicPlayer />
    </div>
  );
};

export default Index;
