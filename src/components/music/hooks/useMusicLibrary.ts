import { useState, useEffect, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { mockSongs, fifties, vintageSongs, Song } from "../data/mockData";
import { supabase } from "@/integrations/supabase/client";

export const useMusicLibrary = () => {
  const [songs, setSongs] = useState<Song[]>([...mockSongs, ...vintageSongs, ...fifties]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>(
    mockSongs.slice(0, 3)
  );
  const [playlists, setPlaylists] = useState<{id: string, name: string, songs: Song[]}[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to refresh songs from Supabase
  const refreshSongs = useCallback(async () => {
    setIsLoading(true);
    try {
      // First check if the 'songs' table exists
      const { data: tableCheck, error: tableError } = await supabase
        .from('songs')
        .select('id')
        .limit(1);
      
      if (tableError) {
        console.log("Songs table might not exist yet:", tableError);
        setIsLoading(false);
        return;
      }
      
      // Fetch songs from the database
      const { data: dbSongs, error: dbError } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (dbError) {
        console.error("Error fetching songs from database:", dbError);
        throw dbError;
      }
      
      if (dbSongs && dbSongs.length > 0) {
        console.log("Found songs in database:", dbSongs.length);
        
        // Process the database songs
        const processedSongs = dbSongs.map(song => ({
          id: song.id,
          title: song.title,
          artist: song.artist,
          coverImage: song.cover_url || 'https://images.unsplash.com/photo-1614149162883-504ce4d13909',
          audioUrl: song.audio_url,
          isLiked: false
        }));
        
        // Update the songs state, avoiding duplicates by id
        setSongs(prevSongs => {
          const existingIds = new Set(prevSongs.map(s => s.id));
          const newSongs = processedSongs.filter(s => !existingIds.has(s.id));
          
          if (newSongs.length > 0) {
            console.log(`Adding ${newSongs.length} new songs from database`);
            return [...newSongs, ...prevSongs];
          }
          
          return prevSongs;
        });
      }
      
      // Then check for songs in storage as a fallback
      try {
        // Check if the 'songs' storage bucket exists
        const { data: bucketData, error: bucketError } = await supabase
          .storage
          .getBucket('songs');
        
        if (bucketError) {
          console.log("Songs bucket might not exist yet:", bucketError);
          return;
        }
        
        // List files in the bucket
        const { data: files, error: listError } = await supabase
          .storage
          .from('songs')
          .list();
        
        if (listError) {
          console.error("Error listing files in storage:", listError);
          return;
        }
        
        if (files && files.length > 0) {
          console.log("Found files in storage:", files.length);
          
          // Process audio files
          const audioFiles = files.filter(file => 
            file.name.endsWith('.mp3') || 
            file.name.endsWith('.wav') || 
            file.name.endsWith('.m4a')
          );
          
          for (const file of audioFiles) {
            // Get the public URL
            const { data: publicUrlData } = supabase
              .storage
              .from('songs')
              .getPublicUrl(file.name);
            
            const audioUrl = publicUrlData.publicUrl;
            
            // Look for a matching cover image
            const baseName = file.name.substring(0, file.name.lastIndexOf('.'));
            let coverUrl = null;
            
            // Try to find a cover image with similar name
            const possibleCoverFile = files.find(f => 
              f.name.startsWith(baseName) && 
              (f.name.endsWith('.jpg') || f.name.endsWith('.png') || f.name.endsWith('.webp'))
            );
            
            if (possibleCoverFile) {
              const { data: coverUrlData } = supabase
                .storage
                .from('songs')
                .getPublicUrl(possibleCoverFile.name);
              
              coverUrl = coverUrlData.publicUrl;
            }
            
            // Create a song object
            const songName = baseName.split('_')[0].replace(/_/g, ' ');
            const newSong = {
              id: `storage-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              title: songName.charAt(0).toUpperCase() + songName.slice(1), // Capitalize first letter
              artist: 'Unknown Artist',
              coverImage: coverUrl || 'https://images.unsplash.com/photo-1614149162883-504ce4d13909',
              audioUrl,
              isLiked: false
            };
            
            // Add to songs if not already present
            setSongs(prevSongs => {
              // Check if we already have this song by audio URL
              if (!prevSongs.some(s => s.audioUrl === audioUrl)) {
                return [...prevSongs, newSong];
              }
              return prevSongs;
            });
          }
        }
      } catch (storageError) {
        console.error("Error processing storage songs:", storageError);
      }
      
    } catch (error) {
      console.error('Error refreshing songs:', error);
      toast({
        title: "Error loading songs",
        description: "Could not load your music library",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch songs when component mounts
  useEffect(() => {
    refreshSongs();
  }, [refreshSongs]);
  
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
    // Check if song already exists to avoid duplicates
    setSongs(prevSongs => {
      if (!prevSongs.some(song => song.id === newSong.id)) {
        return [newSong, ...prevSongs];
      }
      return prevSongs;
    });
  };
  
  const handleUploadSong = (newSong: Song) => {
    setSongs(prevSongs => [newSong, ...prevSongs]);
    
    toast({
      title: "Song uploaded",
      description: `${newSong.title} has been added to your library`,
    });
    
    // Refresh the song list after upload
    refreshSongs();
  };
  
  const createPlaylist = (name: string) => {
    if (!name.trim()) {
      toast({
        title: "Playlist name required",
        description: "Please enter a name for your playlist",
      });
      return;
    }
    
    const newPlaylist = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      songs: []
    };
    
    setPlaylists(prev => [...prev, newPlaylist]);
    toast({
      title: "Playlist created",
      description: `"${name}" has been created`,
    });
    
    // Switch to the new playlist
    setSelectedPlaylist(newPlaylist.id);
    setActiveTab('playlist');
  };

  const addToPlaylist = (songId: string, playlistId: string) => {
    if (!playlistId) return;
    
    setPlaylists(prevPlaylists => 
      prevPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
          const songToAdd = songs.find(s => s.id === songId);
          if (songToAdd && !playlist.songs.some(s => s.id === songId)) {
            console.log(`Adding song ${songId} to playlist ${playlistId}`);
            return {
              ...playlist,
              songs: [...playlist.songs, songToAdd]
            };
          }
        }
        return playlist;
      })
    );
    
    const playlistName = playlists.find(p => p.id === playlistId)?.name;
    toast({
      title: "Added to playlist",
      description: `Song added to "${playlistName}"`,
    });
  };

  const removeFromPlaylist = (songId: string, playlistId: string) => {
    setPlaylists(prevPlaylists => 
      prevPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songs: playlist.songs.filter(song => song.id !== songId)
          };
        }
        return playlist;
      })
    );
    
    const playlistName = playlists.find(p => p.id === playlistId)?.name;
    toast({
      title: "Removed from playlist",
      description: `Song removed from "${playlistName}"`,
    });
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
    
    if (selectedPlaylist === playlistId) {
      setSelectedPlaylist(null);
      setActiveTab('all');
    }
    
    toast({
      title: "Playlist deleted",
      description: "Playlist has been deleted",
    });
  };

  // Filter songs by tab
  const getFifties = () => {
    return songs.filter(song => fifties.some(f => f.id === song.id));
  };

  // Get current playlist's songs
  const getPlaylistSongs = () => {
    if (!selectedPlaylist) return [];
    const playlist = playlists.find(p => p.id === selectedPlaylist);
    return playlist ? playlist.songs : [];
  };

  return {
    songs,
    recentlyPlayed,
    activeTab,
    showUploadModal,
    isLoading,
    playlists,
    selectedPlaylist,
    setActiveTab,
    setShowUploadModal,
    setSelectedPlaylist,
    handlePlaySong,
    handleAddSong,
    handleUploadSong,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
    refreshSongs,
    getFifties,
    getPlaylistSongs
  };
};

export type MusicLibraryHook = ReturnType<typeof useMusicLibrary>;
