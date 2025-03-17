
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewMenu from "@/components/layout/NewMenu";
import MusicPlayer from "@/components/layout/MusicPlayer";
import ShootingStars from "@/components/ui/ShootingStars";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Compass, Music, Share2, MessageSquare, Crown, Headphones } from "lucide-react";
import Hero from "@/components/home/Hero";
import SongCard from "@/components/music/SongCard";
import { mockSongs } from "@/components/music/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import OpenSourcePlaylist from "@/components/music/OpenSourcePlaylist";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const isMobile = useIsMobile();
  const [featuredSongs, setFeaturedSongs] = useState(mockSongs.slice(0, isMobile ? 4 : 6));
  
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
  
  // Fetch uploaded songs for homepage
  useEffect(() => {
    const fetchUploadedSongs = async () => {
      try {
        const { data: songs, error } = await supabase
          .from('songs')
          .select('*')
          .limit(isMobile ? 4 : 6);
          
        if (error) {
          console.error("Error fetching songs:", error);
          return;
        }
        
        if (songs && songs.length > 0) {
          // Process songs into the format our app expects
          const formattedSongs = songs.map(song => ({
            id: song.id,
            title: song.title,
            artist: song.artist,
            coverImage: song.cover_url || 'https://images.unsplash.com/photo-1614149162883-504ce4d13909',
            audioUrl: song.audio_url,
            isLiked: false
          }));
          
          setFeaturedSongs(formattedSongs);
        }
      } catch (err) {
        console.error("Failed to fetch songs:", err);
      }
    };
    
    fetchUploadedSongs();
  }, [isMobile]);
  
  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-[#f5f3ff]"} overflow-hidden relative transition-colors duration-300`}>
      {/* Background elements */}
      <ShootingStars className="fixed inset-0 z-0" />
      
      <NewMenu theme={theme} toggleTheme={toggleTheme} />
      
      <Hero />
      
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Featured Songs Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold flex items-center">
              <Headphones className="w-6 h-6 text-[#FF10F0] mr-2" />
              Featured Songs
            </h2>
            <Link to="/library" className="text-sm text-[#FF10F0] hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredSongs.map((song) => (
              <SongCard
                key={song.id}
                title={song.title}
                artist={song.artist}
                coverImage={song.coverImage}
                audioUrl={song.audioUrl}
              />
            ))}
          </div>
        </div>
        
        {/* Open Source Music Section */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
            <Music className="w-6 h-6 text-[#FF10F0] mr-2" />
            Open Source Music
          </h2>
          
          <OpenSourcePlaylist />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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
