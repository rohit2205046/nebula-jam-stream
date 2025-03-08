
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongCard from "./SongCard";
import AnimatedButton from "../ui/AnimatedButton";
import AddSong from "./AddSong";
import { Heart, Clock, ListMusic, Plus } from "lucide-react";

// Mock data - in a real app this would come from your API/Supabase
const mockSongs = [
  {
    id: "1",
    title: "Cosmic Waves",
    artist: "Stellar Dreams",
    coverImage: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
  },
  {
    id: "2",
    title: "Neon Sunrise",
    artist: "Synthwave Collective",
    coverImage: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
  },
  {
    id: "3",
    title: "Digital Dreams",
    artist: "Byte Runners",
    coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
  },
  {
    id: "4",
    title: "Midnight Protocol",
    artist: "The Algorithm",
    coverImage: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=2298&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
  },
  {
    id: "5",
    title: "Quantum Horizon",
    artist: "Particle Flux",
    coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: true,
  },
  {
    id: "6",
    title: "Astral Journey",
    artist: "Nebula Pathways",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    isLiked: false,
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
    console.log(`Playing song with ID: ${songId}`);
    
    // Add to recently played
    const songToAdd = songs.find(song => song.id === songId);
    if (songToAdd) {
      // Add to the beginning of the array
      setRecentlyPlayed(prev => {
        // Remove the song if it's already in recently played
        const filtered = prev.filter(s => s.id !== songId);
        // Add it to the beginning, limit to 5 songs
        return [songToAdd, ...filtered].slice(0, 5);
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
