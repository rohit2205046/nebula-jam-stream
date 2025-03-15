
import React, { useEffect } from "react";
import LibraryTabs from "./LibraryTabs";
import AddSong from "./AddSong";
import UploadSong from "./UploadSong";
import { useMusicLibrary } from "./hooks/useMusicLibrary";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const MusicLibrary = () => {
  const libraryHook = useMusicLibrary();
  const { 
    showUploadModal, 
    setShowUploadModal, 
    handleAddSong, 
    handleUploadSong, 
    refreshSongs 
  } = libraryHook;
  
  // Fetch songs from Supabase on component mount
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Check if the songs table exists in the database
        const { data: songs, error } = await supabase
          .from('songs')
          .select('*')
          .limit(50);
          
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
          
          // Add songs to library state
          formattedSongs.forEach(song => {
            handleAddSong(song);
          });
          
          console.log(`Loaded ${formattedSongs.length} songs from Supabase`);
        }
      } catch (err) {
        console.error("Failed to fetch songs:", err);
        toast({
          title: "Error loading songs",
          description: "There was a problem loading your songs",
          variant: "destructive"
        });
      }
    };
    
    fetchSongs();
  }, []);
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-32">
      <LibraryTabs library={libraryHook} />
      
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
