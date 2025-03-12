import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import MusicLibrary from "@/components/music/MusicLibrary";
import MusicPlayer from "@/components/layout/MusicPlayer";
import { MessageSquare, Music, Play, Search, Clock, Heart, Disc, Star, Crown } from "lucide-react";
import ChatModal from "@/components/social/ChatModal";
import { Input } from "@/components/ui/input";
import AnimatedButton from "@/components/ui/AnimatedButton";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

// Featured albums data
const featuredAlbums = [
  {
    id: 1,
    title: "Ethereal Echoes",
    artist: "Ambient Waves",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    title: "Digital Dreams",
    artist: "Byte Runners",
    coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3", 
  },
  {
    id: 3,
    title: "Cybernetic Pulse",
    artist: "Digital Frontier",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    title: "Astral Journey",
    artist: "Nebula Pathways",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
  }
];

// Trending playlists
const trendingPlaylists = [
  {
    id: 1,
    title: "Cosmic Chill",
    coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    songCount: 12,
  },
  {
    id: 2,
    title: "Synthwave Nights",
    coverImage: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    songCount: 8,
  },
  {
    id: 3,
    title: "Digital Meditation",
    coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    songCount: 15,
  }
];

// Open source music collections
const openSourceCollections = [
  {
    id: 1,
    title: "Free Ambient",
    description: "Royalty-free ambient tracks for your projects",
    coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    tracks: 24,
  },
  {
    id: 2,
    title: "CC Synthwave",
    description: "Creative Commons licensed synthwave music",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    tracks: 18,
  },
  {
    id: 3,
    title: "Public Domain Classics",
    description: "Classic tracks now in the public domain",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    tracks: 32,
  }
];

// Shooting stars component
const ShootingStars = () => {
  return (
    <div className="shooting-stars-container">
      <div className="shooting-star shooting-star-1"></div>
      <div className="shooting-star shooting-star-2"></div>
      <div className="shooting-star shooting-star-3"></div>
      <div className="shooting-star shooting-star-4"></div>
      <div className="shooting-star shooting-star-5"></div>
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
          top: 35%;
          left: -100px;
          transform: rotate(15deg);
          animation: shootingstar 8s 5s infinite;
        }
        .shooting-star-3 {
          top: 55%;
          left: -100px;
          transform: rotate(35deg);
          animation: shootingstar 6s 1s infinite;
        }
        .shooting-star-4 {
          top: 70%;
          left: -100px;
          transform: rotate(20deg);
          animation: shootingstar 9s 3s infinite;
        }
        .shooting-star-5 {
          top: 10%;
          left: -100px;
          transform: rotate(10deg);
          animation: shootingstar 7.5s 6s infinite;
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

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeCategory, setActiveCategory] = useState("featured");
  const isMobile = useIsMobile();

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

  // Generate random gradients for cards
  const getRandomGradient = () => {
    const gradients = [
      "from-[#6A1B9A] to-[#FF10F0]",
      "from-[#FF10F0] to-[#9C27B0]",
      "from-[#6A1B9A] to-[#FF10F0]",
      "from-[#9C27B0] to-[#FF10F0]"
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const handlePlayAlbum = (id: number, title: string, artist: string) => {
    // Find a song from the album and play it
    const mockSongs = [
      {
        id: `album-${id}-song-1`,
        title: `${title} - Track 1`,
        artist: artist,
        coverImage: featuredAlbums.find(album => album.id === id)?.coverImage || "",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        isLiked: false
      }
    ];

    if (mockSongs.length > 0) {
      window.dispatchEvent(new CustomEvent('play-song', { 
        detail: mockSongs[0]
      }));
    }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-[#f5f3ff]"} text-foreground overflow-x-hidden transition-colors duration-300`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className={`absolute top-[10%] left-[20%] w-72 h-72 rounded-full ${theme === "dark" ? "bg-[#FF10F0]/10" : "bg-[#FF10F0]/5"} blur-[100px] animate-pulse-slow`}></div>
        <div className={`absolute bottom-[30%] right-[10%] w-80 h-80 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/15" : "bg-[#9C27B0]/10"} blur-[120px] animate-pulse-slow animate-delay-300`}></div>
        <div className={`absolute top-[40%] right-[30%] w-40 h-40 rounded-full ${theme === "dark" ? "bg-[#9C27B0]/10" : "bg-[#6A1B9A]/5"} blur-[80px] animate-pulse-slow animate-delay-500`}></div>
        <div className={`absolute bottom-[10%] left-[5%] w-60 h-60 rounded-full ${theme === "dark" ? "bg-[#FF10F0]/15" : "bg-[#FF10F0]/5"} blur-[90px] animate-pulse-slow animate-delay-200`}></div>
        
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
      
      <main className="relative z-10 pt-24 pb-32 px-4">
        {/* Hero Section */}
        <section className="mb-8 relative overflow-hidden">
          <GlassmorphicCard className="bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] py-10 px-6 text-white">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Sound</h1>
              <p className="text-xl opacity-90 mb-6 max-w-xl">Explore thousands of open-source songs and share your musical journey with friends in real-time.</p>
              <div className="flex flex-wrap gap-4">
                <AnimatedButton variant="secondary" className="bg-white text-[#FF10F0] hover:bg-white/90">
                  <Disc className="mr-2 h-5 w-5" /> Browse Library
                </AnimatedButton>
                <AnimatedButton variant="outline" className="border-white text-white hover:bg-white/10">
                  <Star className="mr-2 h-5 w-5" /> Featured Artists
                </AnimatedButton>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#FF10F0]/30 blur-3xl"></div>
          </GlassmorphicCard>
        </section>

        {/* Search Bar */}
        <section className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for songs, artists or playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-9 ${theme === "dark" ? "bg-[#403E43]/60 backdrop-blur-md text-white" : "bg-white/80 backdrop-blur-md text-gray-800"} rounded-full border border-[#FF10F0]/20 focus:border-[#FF10F0] focus:ring-1 focus:ring-[#FF10F0]`}
            />
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="mb-12">
          <h1 className="text-2xl font-bold mb-4 purple-gradient-text">Quick Access</h1>
          <div className="grid grid-cols-2 gap-3">
            <div 
              className={`${theme === "dark" ? "bg-[#403E43]/60" : "bg-white/70"} backdrop-blur-md p-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-[#403E43]/80 transition-colors group`}
              onClick={() => window.dispatchEvent(new CustomEvent('play-song', { 
                detail: {
                  id: "liked-playlist",
                  title: "Liked Songs Playlist",
                  artist: "Various Artists",
                  coverImage: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
                  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                  isLiked: true
                }
              }))}
            >
              <div className="w-12 h-12 rounded bg-[#FF10F0]/50 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-medium">Liked Songs</span>
            </div>
            <div 
              className={`${theme === "dark" ? "bg-[#403E43]/60" : "bg-white/70"} backdrop-blur-md p-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-[#403E43]/80 transition-colors group`}
              onClick={() => window.dispatchEvent(new CustomEvent('play-song', { 
                detail: {
                  id: "recent-playlist",
                  title: "Recently Played",
                  artist: "Various Artists",
                  coverImage: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=2298&auto=format&fit=crop&ixlib=rb-4.0.3",
                  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
                  isLiked: false
                }
              }))}
            >
              <div className="w-12 h-12 rounded bg-gradient-to-br from-[#6A1B9A] to-[#FF10F0] flex items-center justify-center">
                <Clock className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-medium">Recently Played</span>
            </div>
          </div>
        </section>

        {/* Category Selector */}
        <section className="mb-6">
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-none">
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === 'featured' ? 'bg-[#FF10F0] text-white' : 'bg-secondary hover:bg-[#FF10F0]/20'}`}
              onClick={() => setActiveCategory('featured')}
            >
              Featured Albums
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === 'trending' ? 'bg-[#FF10F0] text-white' : 'bg-secondary hover:bg-[#FF10F0]/20'}`}
              onClick={() => setActiveCategory('trending')}
            >
              Trending Playlists
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === 'open-source' ? 'bg-[#FF10F0] text-white' : 'bg-secondary hover:bg-[#FF10F0]/20'}`}
              onClick={() => setActiveCategory('open-source')}
            >
              Open Source
            </button>
          </div>
        </section>

        {/* Albums Section - Conditionally rendered based on selected category */}
        {activeCategory === 'featured' && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 purple-gradient-text">Featured Albums</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {featuredAlbums.map((album) => (
                <div key={album.id} className="flex flex-col items-center text-center">
                  <div className="w-full aspect-square bg-[#403E43]/60 backdrop-blur-md rounded-lg mb-2 overflow-hidden group relative cursor-pointer">
                    <img 
                      src={album.coverImage} 
                      alt={album.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                      <div 
                        className="w-12 h-12 rounded-full bg-[#FF10F0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0"
                        onClick={() => handlePlayAlbum(album.id, album.title, album.artist)}
                      >
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm">{album.title}</h3>
                  <p className="text-xs text-gray-400">{album.artist}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trending Playlists - Conditionally rendered */}
        {activeCategory === 'trending' && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 purple-gradient-text">Trending Playlists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {trendingPlaylists.map((playlist) => (
                <GlassmorphicCard key={playlist.id} className="overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={playlist.coverImage} 
                      alt={playlist.title} 
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">{playlist.title}</h3>
                        <p className="text-sm text-white/80">{playlist.songCount} songs</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-12 h-12 rounded-full bg-[#FF10F0] flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </button>
                    </div>
                  </div>
                </GlassmorphicCard>
              ))}
            </div>
          </section>
        )}

        {/* Open Source Collections - Conditionally rendered */}
        {activeCategory === 'open-source' && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 purple-gradient-text">Open Source Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {openSourceCollections.map((collection) => (
                <GlassmorphicCard key={collection.id} className="flex flex-col">
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={collection.coverImage} 
                      alt={collection.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 right-2 bg-[#FF10F0] text-white text-xs px-2 py-1 rounded-full">
                      Free
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{collection.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{collection.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">{collection.tracks} tracks</span>
                      <AnimatedButton variant="outline" size="sm" className="border-[#FF10F0] text-[#FF10F0]">
                        Browse
                      </AnimatedButton>
                    </div>
                  </div>
                </GlassmorphicCard>
              ))}
            </div>
          </section>
        )}

        {/* Premium Feature - Shared Listening */}
        <section className="mb-16">
          <GlassmorphicCard className={`p-6 border border-[#FF10F0]/20 ${theme === "dark" ? "bg-[#403E43]/30" : "bg-white/60"}`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <div className="flex items-center mb-2">
                  <Crown className="w-5 h-5 text-[#FF10F0] mr-2" />
                  <h3 className="text-lg font-bold purple-gradient-text">Share Your Music Journey</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4 max-w-xl">
                  Listen to songs together with friends in real-time. Share your favorite tracks and experience music together, no matter where you are.
                </p>
                <AnimatedButton 
                  variant="default" 
                  className="bg-[#FF10F0] hover:bg-[#FF10F0]/80 text-white"
                  onClick={() => {
                    setChatOpen(true);
                  }}
                >
                  Try Shared Listening
                </AnimatedButton>
              </div>
              <div className="flex-shrink-0 relative w-40 h-40">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] animate-rotate-slow opacity-70"></div>
                <div className="absolute inset-0 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1517911463479-bd637e0a4f16?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Shared listening" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        </section>
        
        <MusicLibrary />
      </main>
      
      <button 
        onClick={() => setChatOpen(true)}
        className="fixed bottom-24 right-6 z-30 w-14 h-14 rounded-full bg-[#FF10F0] flex items-center justify-center shadow-lg shadow-[#FF10F0]/30 hover:scale-110 transition-transform love-pulse"
      >
        <MessageSquare className="text-white" />
      </button>
      
      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      
      <MusicPlayer />
    </div>
  );
};

export default Index;
