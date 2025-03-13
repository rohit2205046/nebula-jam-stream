
import { useState, useEffect } from "react";
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

  // Fetch songs from Supabase
  useEffect(() => {
    const fetchSongsFromSupabase = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .storage
          .from('Music')
          .list('songs', {
            sortBy: { column: 'name', order: 'asc' },
          });

        if (error) {
          throw error;
        }

        if (data) {
          // Process the files and add them to the songs list
          const supabaseSongs = await Promise.all(
            data
              .filter(file => file.name.endsWith('.mp3'))
              .map(async (file) => {
                // Get public URL for the song
                const { data: songUrl } = supabase.storage
                  .from('Music')
                  .getPublicUrl(`songs/${file.name}`);

                // Try to find a matching image file (same name but with image extension)
                const songName = file.name.replace('.mp3', '');
                const possibleImageExts = ['.jpg', '.jpeg', '.png', '.webp'];
                let coverImageUrl = 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3';
                
                for (const ext of possibleImageExts) {
                  const { data: fileExists } = await supabase.storage
                    .from('Music')
                    .list('songs', {
                      search: `${songName}${ext}`
                    });
                  
                  if (fileExists && fileExists.length > 0) {
                    const { data: imageUrl } = supabase.storage
                      .from('Music')
                      .getPublicUrl(`songs/${songName}${ext}`);
                    
                    coverImageUrl = imageUrl.publicUrl;
                    break;
                  }
                }

                return {
                  id: file.id,
                  title: songName.replace(/_/g, ' '),
                  artist: 'Unknown Artist',
                  audioUrl: songUrl.publicUrl,
                  coverImage: coverImageUrl,
                  isLiked: false
                };
              })
          );

          setSongs(prevSongs => {
            // Combine with existing mock songs but avoid duplicates
            const allSongs = [...prevSongs];
            supabaseSongs.forEach(newSong => {
              if (!allSongs.some(song => song.title === newSong.title)) {
                allSongs.push(newSong);
              }
            });
            return allSongs;
          });
        }
      } catch (error) {
        console.error('Error fetching songs from Supabase:', error);
        toast({
          title: "Error loading songs",
          description: "Could not load songs from storage",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongsFromSupabase();
  }, []);
  
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
    getFifties,
    getPlaylistSongs
  };
};

export type MusicLibraryHook = ReturnType<typeof useMusicLibrary>;
