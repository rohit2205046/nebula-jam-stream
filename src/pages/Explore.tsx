
import React from "react";
import Navbar from "@/components/layout/Navbar";
import MusicPlayer from "@/components/layout/MusicPlayer";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { ArrowRight, TrendingUp, Zap, Radio } from "lucide-react";

const Explore = () => {
  // Sample genres for exploration
  const genres = [
    { name: "Electronic", icon: <Zap size={24} />, color: "from-purple-500 to-blue-500" },
    { name: "Hip Hop", icon: <Radio size={24} />, color: "from-red-500 to-orange-500" },
    { name: "Ambient", icon: <TrendingUp size={24} />, color: "from-green-500 to-teal-500" },
    { name: "Rock", icon: <Radio size={24} />, color: "from-blue-500 to-indigo-500" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-32">
        <h1 className="text-3xl font-bold mb-8">Explore</h1>
        
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Trending Now</h2>
            <button className="text-nebula-600 flex items-center text-sm">
              See all <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <GlassmorphicCard key={i} hoverEffect className="p-0 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${1490000 + i}-${100000 + i}?auto=format&fit=crop&w=800&q=80`} 
                  alt="Trending music" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">Trending Track {i+1}</h3>
                  <p className="text-xs text-muted-foreground truncate">Artist {i+1}</p>
                </div>
              </GlassmorphicCard>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {genres.map((genre, index) => (
              <GlassmorphicCard 
                key={index} 
                hoverEffect 
                className="flex items-center p-6"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${genre.color} flex items-center justify-center text-white mr-3`}>
                  {genre.icon}
                </div>
                <span className="font-medium">{genre.name}</span>
              </GlassmorphicCard>
            ))}
          </div>
        </section>
      </main>
      <MusicPlayer />
    </div>
  );
};

export default Explore;
