
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongCard from "./SongCard";
import AnimatedButton from "../ui/AnimatedButton";
import AddSong from "./AddSong";
import UploadSong from "./UploadSong";
import { Heart, Clock, ListMusic, Plus, Disc, Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Expanded mock data with more songs and free music URLs
const mockSongs = [
  {
    id: "1",
    title: "Cosmic Waves",
    artist: "Stellar Dreams",
    coverImage: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Neon Sunrise",
    artist: "Synthwave Collective",
    coverImage: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Digital Dreams",
    artist: "Byte Runners",
    coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "4",
    title: "Midnight Protocol",
    artist: "The Algorithm",
    coverImage: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=2298&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "5",
    title: "Quantum Horizon",
    artist: "Particle Flux",
    coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: "6",
    title: "Astral Journey",
    artist: "Nebula Pathways",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: "7",
    title: "Cybernetic Pulse",
    artist: "Digital Frontier",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    id: "8",
    title: "Ethereal Echoes",
    artist: "Ambient Waves",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    id: "9",
    title: "Retrowave Dreams",
    artist: "Neon Nights",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    id: "10",
    title: "Solar Flares",
    artist: "Cosmic Soundscapes",
    coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
  {
    id: "11",
    title: "Liquid Crystal",
    artist: "Pixel Dreams",
    coverImage: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  },
  {
    id: "12",
    title: "Holographic Memory",
    artist: "Virtual Reality",
    coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
  },
  // Adding more songs
  {
    id: "13",
    title: "Neon Jungle",
    artist: "Electro Tribe",
    coverImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
  },
  {
    id: "14",
    title: "Vapor Dreams",
    artist: "Retro Synthwave",
    coverImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
  },
  {
    id: "15",
    title: "Electric Dreams",
    artist: "Digital Minds",
    coverImage: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
  },
  {
    id: "16",
    title: "Binary Sunset",
    artist: "Code Poets",
    coverImage: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=2570&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
  },
  {
    id: "17",
    title: "Neural Network",
    artist: "AI Symphony",
    coverImage: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=2570&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "18",
    title: "Quantum Leap",
    artist: "Future State",
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2422&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  }
];

// 1950s English free songs
const fifties = [
  {
    id: "f1",
    title: "Rock Around the Clock",
    artist: "Bill Haley & His Comets",
    coverImage: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
  },
  {
    id: "f2",
    title: "Jailhouse Rock",
    artist: "Elvis Presley",
    coverImage: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
  },
  {
    id: "f3",
    title: "Great Balls of Fire",
    artist: "Jerry Lee Lewis",
    coverImage: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
  },
  {
    id: "f4",
    title: "Johnny B. Goode",
    artist: "Chuck Berry",
    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
  },
  {
    id: "f5",
    title: "Blue Suede Shoes",
    artist: "Carl Perkins",
    coverImage: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isLiked: false,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
  }
];

const vintageSongs = [
  {
    id: "v1",
    title: "In The Mood",
    artist: "Glenn Miller Orchestra",
    coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: "v2",
    title: "Take Five",
    artist: "Dave Brubeck",
    coverImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: "v3",
    title: "What A Wonderful World",
    artist: "Louis Armstrong",
    coverImage: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isLiked: true,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const MusicLibrary = () => {
  const [songs, setSongs] = useState([...mockSongs, ...vintageSongs, ...fifties]);
  const [likedSongs, setLikedSongs] = useState(
    songs.filter((song) => song.isLiked)
  );
  const [recentlyPlayed, setRecentlyPlayed] = useState(
    mockSongs.slice(0, 3)
  );
  
  const [activeTab, setActiveTab] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const handleToggleLike = (songId: string) => {
    const updatedSongs = songs.map((song) => {
      if (song.id === songId) {
        return { ...song, isLiked: !song.isLiked };
      }
      return song;
    });
    
    setSongs(updatedSongs);
    setLikedSongs(updatedSongs.filter((song) => song.isLiked));
    
    const song = updatedSongs.find(s => s.id === songId);
    if (song) {
      toast({
        title: song.isLiked ? "Removed from Liked Songs" : "Added to Liked Songs",
        description: `${song.title} by ${song.artist}`,
      });
    }
  };
  
  const handlePlaySong = (songId: string) => {
    const allSongs = [...songs];
    const currentIndex = allSongs.findIndex(song => song.id === songId);
    const songToPlay = allSongs[currentIndex];
    
    if (songToPlay) {
      // Store the current playlist context
      window.sessionStorage.setItem('currentPlaylist', JSON.stringify({
        songs: allSongs,
        currentIndex: currentIndex
      }));
      
      // Add to recently played
      if (!recentlyPlayed.find(song => song.id === songId)) {
        setRecentlyPlayed(prev => [songToPlay, ...prev].slice(0, 6));
      }
      
      // Dispatch the play event
      window.dispatchEvent(new CustomEvent('play-song', { 
        detail: {
          ...songToPlay,
          playlist: {
            songs: allSongs,
            currentIndex: currentIndex
          }
        }
      }));
    }
  };
  
  const handleAddSong = (newSong: any) => {
    setSongs(prevSongs => [...prevSongs, newSong]);
    toast({
      title: "Song added",
      description: `${newSong.title} has been added to your library`,
    });
  };
  
  const handleUploadSong = (newSong: any) => {
    setSongs(prevSongs => [...prevSongs, newSong]);
    toast({
      title: "Song uploaded",
      description: `${newSong.title} has been added to your library`,
    });
  };
  
  const createPlaylist = () => {
    // This would create a new playlist in a real app
    toast({
      title: "Creating new playlist",
      description: "This feature is coming soon!",
    });
  };

  // Filter songs by tab
  const getFifties = () => {
    return songs.filter(song => fifties.some(f => f.id === song.id));
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-32">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-secondary/50 backdrop-blur-sm">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <ListMusic size={16} />
              <span className="hidden sm:inline">Your Library</span>
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center gap-2">
              <Heart size={16} />
              <span className="hidden sm:inline">Liked Songs</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock size={16} />
              <span className="hidden sm:inline">Recently Played</span>
            </TabsTrigger>
            <TabsTrigger value="fifties" className="flex items-center gap-2">
              <Disc size={16} />
              <span className="hidden sm:inline">1950s Hits</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <AnimatedButton 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload size={16} />
              <span className="hidden sm:inline">Upload</span>
            </AnimatedButton>
            
            <AnimatedButton 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={createPlaylist}
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Playlist</span>
            </AnimatedButton>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {songs.map((song) => (
              <SongCard
                key={song.id}
                title={song.title}
                artist={song.artist}
                coverImage={song.coverImage}
                isLiked={song.isLiked}
                onPlay={() => handlePlaySong(song.id)}
                onToggleLike={() => handleToggleLike(song.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="liked" className="mt-0 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {likedSongs.length > 0 ? (
              likedSongs.map((song) => (
                <SongCard
                  key={song.id}
                  title={song.title}
                  artist={song.artist}
                  coverImage={song.coverImage}
                  isLiked={song.isLiked}
                  onPlay={() => handlePlaySong(song.id)}
                  onToggleLike={() => handleToggleLike(song.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No liked songs yet. Heart a song to add it here!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {recentlyPlayed.length > 0 ? (
              recentlyPlayed.map((song) => (
                <SongCard
                  key={song.id}
                  title={song.title}
                  artist={song.artist}
                  coverImage={song.coverImage}
                  isLiked={song.isLiked}
                  onPlay={() => handlePlaySong(song.id)}
                  onToggleLike={() => handleToggleLike(song.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">Start playing songs to see them here!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="fifties" className="mt-0 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {getFifties().length > 0 ? (
              getFifties().map((song) => (
                <SongCard
                  key={song.id}
                  title={song.title}
                  artist={song.artist}
                  coverImage={song.coverImage}
                  isLiked={song.isLiked}
                  onPlay={() => handlePlaySong(song.id)}
                  onToggleLike={() => handleToggleLike(song.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No 1950s songs available</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <AddSong onAddSong={handleAddSong} />
      
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <UploadSong 
            onSongUploaded={handleUploadSong} 
            onClose={() => setShowUploadModal(false)} 
          />
        </div>
      )}
    </div>
  );
};

export default MusicLibrary;
