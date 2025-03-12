
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, TrendingUp, Sparkles } from "lucide-react";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";

const Explore = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [searchQuery, setSearchQuery] = useState("");
  
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
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-[#f5f3ff]"} text-foreground overflow-hidden transition-colors duration-300`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className={`absolute top-[10%] left-[20%] w-72 h-72 rounded-full ${theme === "dark" ? "bg-[#FF10F0]/10" : "bg-[#FF10F0]/5"} blur-[100px] animate-pulse-slow`}></div>
        <div className={`absolute bottom-[30%] right-[10%] w-80 h-80 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/15" : "bg-[#9C27B0]/10"} blur-[120px] animate-pulse-slow animate-delay-300`}></div>
        <div className={`absolute top-[40%] right-[30%] w-40 h-40 rounded-full ${theme === "dark" ? "bg-[#9C27B0]/10" : "bg-[#6A1B9A]/5"} blur-[80px] animate-pulse-slow animate-delay-500`}></div>
      </div>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="relative z-10 pt-24 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold purple-gradient-text mb-2">Explore</h1>
            <p className="text-muted-foreground">Discover new music, artists, and sounds</p>
          </div>
          
          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for artists, songs, or albums..."
                className="pl-10 py-6 bg-background/50 backdrop-blur-sm rounded-xl border border-[#FF10F0]/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Featured Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <GlassmorphicCard className="p-6 bg-gradient-to-br from-[#FF10F0]/20 to-[#6A1B9A]/20 backdrop-blur-md hover:from-[#FF10F0]/30 hover:to-[#6A1B9A]/30 transition-colors duration-300">
              <TrendingUp className="w-10 h-10 text-[#FF10F0] mb-4" />
              <h3 className="text-xl font-bold mb-2">Trending Now</h3>
              <p className="text-sm text-muted-foreground mb-4">Discover what's popular in the community right now</p>
              <Button variant="outline" className="border-[#FF10F0] text-[#FF10F0] hover:bg-[#FF10F0]/10">Explore Trending</Button>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="p-6 bg-gradient-to-br from-[#6A1B9A]/20 to-[#FF10F0]/20 backdrop-blur-md hover:from-[#6A1B9A]/30 hover:to-[#FF10F0]/30 transition-colors duration-300">
              <Sparkles className="w-10 h-10 text-[#FF10F0] mb-4" />
              <h3 className="text-xl font-bold mb-2">New Releases</h3>
              <p className="text-sm text-muted-foreground mb-4">The latest songs and albums added to our platform</p>
              <Button variant="outline" className="border-[#FF10F0] text-[#FF10F0] hover:bg-[#FF10F0]/10">See New Releases</Button>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="p-6 bg-gradient-to-br from-[#FF10F0]/20 to-[#6A1B9A]/20 backdrop-blur-md hover:from-[#FF10F0]/30 hover:to-[#6A1B9A]/30 transition-colors duration-300">
              <Clock className="w-10 h-10 text-[#FF10F0] mb-4" />
              <h3 className="text-xl font-bold mb-2">Recently Played</h3>
              <p className="text-sm text-muted-foreground mb-4">Pick up where you left off with your recent listens</p>
              <Button variant="outline" className="border-[#FF10F0] text-[#FF10F0] hover:bg-[#FF10F0]/10">View History</Button>
            </GlassmorphicCard>
          </div>
          
          {/* Placeholder content - in a real app, this would be dynamic */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 purple-gradient-text">Genres</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {["Electronic", "Rock", "Hip Hop", "Jazz", "Classical", "Ambient", "Pop", "Indie", "Folk", "R&B", "Metal", "Synthwave"].map((genre, index) => (
                <GlassmorphicCard 
                  key={index} 
                  className="aspect-square flex items-center justify-center text-center p-4 hover:scale-105 transition-transform cursor-pointer"
                  hoverEffect
                >
                  <p className="font-medium">{genre}</p>
                </GlassmorphicCard>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 purple-gradient-text">Moods</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {["Upbeat", "Relaxed", "Focus", "Energy", "Chill", "Workout", "Party", "Sleep"].map((mood, index) => (
                <GlassmorphicCard 
                  key={index} 
                  className="p-6 text-center hover:bg-[#FF10F0]/5 transition-colors cursor-pointer"
                  hoverEffect
                >
                  <p className="font-medium">{mood}</p>
                </GlassmorphicCard>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explore;
