
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongCard from "./SongCard";
import AnimatedButton from "../ui/AnimatedButton";
import AddSong from "./AddSong";
import { Heart, Clock, ListMusic, Plus } from "lucide-react";

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
];

const MusicLibrary = () => {
  const [songs, setSongs] = useState(mockSongs);
  const [likedSongs, setLikedSongs] = useState(
    mockSongs.filter((song) => song.isLiked)
  );
  const [recentlyPlayed, setRecentlyPlayed] = useState(
    mockSongs.slice(0, 3)
  );
  
  const handleToggleLike = (songId: string) => {
    const updatedSongs = songs.map((song) => {
      if (song.id === songId) {
        return { ...song, isLiked: !song.isLiked };
      }
      return song;
    });
    
    setSongs(updatedSongs);
    setLikedSongs(updatedSongs.filter((song) => song.isLiked));
  };
  
  const handlePlaySong = (songId: string) => {
    const songToPlay = songs.find(song => song.id === songId);
    if (songToPlay) {
      console.log(`Playing song: ${songToPlay.title} by ${songToPlay.artist}`);
      
      // Update currently playing song in MusicPlayer
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('play-song', { 
          detail: songToPlay 
        }));
      }
      
      // Add to recently played
      setRecentlyPlayed(prev => {
        // Remove the song if it's already in recently played
        const filtered = prev.filter(s => s.id !== songId);
        // Add it to the beginning, limit to 5 songs
        return [songToPlay, ...filtered].slice(0, 5);
      });
    }
  };
  
  const handleAddSong = (newSong: any) => {
    setSongs(prevSongs => [...prevSongs, newSong]);
  };
  
  const createPlaylist = () => {
    // This would create a new playlist in a real app
    console.log("Creating new playlist");
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-32">
      <Tabs defaultValue="all" className="w-full">
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
          </TabsList>
          
          <AnimatedButton 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={createPlaylist}
          >
            <Plus size={16} />
            <span>New Playlist</span>
          </AnimatedButton>
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
            {likedSongs.map((song) => (
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
        
        <TabsContent value="recent" className="mt-0 animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {recentlyPlayed.map((song) => (
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
      </Tabs>
      
      <AddSong onAddSong={handleAddSong} />
    </div>
  );
};

export default MusicLibrary;
