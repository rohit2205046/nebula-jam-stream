
import React from "react";
import Navbar from "@/components/layout/Navbar";
import MusicPlayer from "@/components/layout/MusicPlayer";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { ArrowRight, TrendingUp, Zap, Radio, PlayCircle } from "lucide-react";

const Explore = () => {
  // Sample genres for exploration
  const genres = [
    { name: "Electronic", icon: <Zap size={24} />, color: "from-purple-500 to-blue-500" },
    { name: "Hip Hop", icon: <Radio size={24} />, color: "from-red-500 to-orange-500" },
    { name: "Ambient", icon: <TrendingUp size={24} />, color: "from-green-500 to-teal-500" },
    { name: "Rock", icon: <Radio size={24} />, color: "from-blue-500 to-indigo-500" }
  ];

  // Sample trending songs
  const trendingSongs = [
    {
      id: "t1",
      title: "Digital Dawn",
      artist: "Cyberwave",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: "t2",
      title: "Neon Streets",
      artist: "Urban Echo",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: "t3",
      title: "Future Nostalgia",
      artist: "Retronica",
      cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
      id: "t4",
      title: "Synth Revival",
      artist: "Analog Dreams",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
      id: "t5",
      title: "Crystal Heights",
      artist: "Pixel Wave",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
      id: "t6",
      title: "Stellar Voyage",
      artist: "Cosmic Beat",
      cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    }
  ];

  const handlePlaySong = (song: any) => {
    // Dispatch event to play the song
    window.dispatchEvent(new CustomEvent('play-song', { 
      detail: {
        id: song.id,
        title: song.title,
        artist: song.artist,
        coverImage: song.cover,
        audioUrl: song.audioUrl,
        isLiked: false
      }
    }));
  };

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
            {trendingSongs.map((song) => (
              <GlassmorphicCard key={song.id} hoverEffect className="p-0 overflow-hidden group">
                <div className="relative">
                  <img 
                    src={song.cover} 
                    alt={song.title} 
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => handlePlaySong(song)}
                      className="w-12 h-12 bg-nebula-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-glow"
                    >
                      <PlayCircle size={24} />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{song.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                </div>
              </GlassmorphicCard>
            ))}
          </div>
        </section>
        
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Featured Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassmorphicCard className="p-0 overflow-hidden group">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Focus Playlist" 
                  className="w-full aspect-[3/2] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg font-bold">Focus Mode</h3>
                  <p className="text-white/80 text-sm">Ambient tracks to boost productivity</p>
                </div>
              </div>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="p-0 overflow-hidden group">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Party Mix" 
                  className="w-full aspect-[3/2] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg font-bold">Party Mix</h3>
                  <p className="text-white/80 text-sm">High energy tracks for your next event</p>
                </div>
              </div>
            </GlassmorphicCard>
            
            <GlassmorphicCard className="p-0 overflow-hidden group">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Chill Vibes" 
                  className="w-full aspect-[3/2] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg font-bold">Chill Vibes</h3>
                  <p className="text-white/80 text-sm">Relaxing beats for your downtime</p>
                </div>
              </div>
            </GlassmorphicCard>
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
