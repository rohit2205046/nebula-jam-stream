
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { mockSongs, fifties, vintageSongs, Song } from "../data/mockData";

export const useMusicLibrary = () => {
  const [songs, setSongs] = useState<Song[]>([...mockSongs, ...vintageSongs, ...fifties]);
  const [likedSongs, setLikedSongs] = useState<Song[]>(
    songs.filter((song) => song.isLiked)
  );
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>(
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
        title: song.isLiked ? "Added to Liked Songs" : "Removed from Liked Songs",
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
  
  const handleAddSong = (newSong: Song) => {
    setSongs(prevSongs => [...prevSongs, newSong]);
    toast({
      title: "Song added",
      description: `${newSong.title} has been added to your library`,
    });
  };
  
  const handleUploadSong = (newSong: Song) => {
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

  return {
    songs,
    likedSongs,
    recentlyPlayed,
    activeTab,
    showUploadModal,
    setActiveTab,
    setShowUploadModal,
    handleToggleLike,
    handlePlaySong,
    handleAddSong,
    handleUploadSong,
    createPlaylist,
    getFifties
  };
};

export type MusicLibraryHook = ReturnType<typeof useMusicLibrary>;
