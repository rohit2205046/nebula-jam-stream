
import React, { useEffect, useState } from "react";
import LibraryTabs from "./LibraryTabs";
import AddSong from "./AddSong";
import UploadSong from "./UploadSong";
import { useMusicLibrary } from "./hooks/useMusicLibrary";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";

const MusicLibrary = () => {
  const { user } = useUser();
  const libraryHook = useMusicLibrary();
  const { 
    showUploadModal, 
    setShowUploadModal, 
    handleAddSong, 
    handleUploadSong, 
    refreshSongs 
  } = libraryHook;
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to create storage bucket if it doesn't exist
  const ensureStorageBucket = async () => {
    try {
      // First check if the bucket exists
      const { data: bucketExists, error: bucketError } = await supabase
        .storage
        .getBucket('songs');
        
      if (bucketError) {
        console.log("Bucket might not exist:", bucketError);
        
        // Try to create the bucket
        const { data: newBucket, error: createError } = await supabase
          .storage
          .createBucket('songs', {
            public: true,
            allowedMimeTypes: ['audio/mpeg', 'audio/wav', 'image/jpeg', 'image/png', 'image/webp'],
            fileSizeLimit: 50000000 // 50MB
          });
          
        if (createError) {
          console.error("Error creating bucket:", createError);
          return false;
        }
        
        console.log("Created storage bucket 'songs'");
        return true;
      }
      
      console.log("Storage bucket 'songs' exists");
      return true;
    } catch (err) {
      console.error("Error ensuring storage bucket exists:", err);
      return false;
    }
  };
  
  // Fetch songs from Supabase on component mount
  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        // Ensure storage bucket exists
        await ensureStorageBucket();
        
        // Check if the songs table exists in the database
        const { data: songs, error } = await supabase
          .from('songs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
          
        if (error) {
          console.error("Error fetching songs:", error);
          return;
        }
        
        if (songs && songs.length > 0) {
          console.log("Fetched songs from Supabase:", songs);
          
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
        } else {
          console.log("No songs found in Supabase");
        }
        
        // Also check for songs in storage bucket
        try {
          const { data: files, error: storageError } = await supabase
            .storage
            .from('songs')
            .list();
            
          if (storageError) {
            console.error("Error listing files in storage:", storageError);
          } else if (files && files.length > 0) {
            console.log("Found files in storage:", files);
            
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
              
              // Check if this song is already in our library by URL
              const songExists = libraryHook.songs.some(song => song.audioUrl === audioUrl);
              
              if (!songExists) {
                // Extract song name from filename
                const songName = file.name.split('.')[0].replace(/_/g, ' ');
                
                // Create a song object
                const newSong = {
                  id: `storage-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                  title: songName.charAt(0).toUpperCase() + songName.slice(1), // Capitalize first letter
                  artist: 'Uploaded Song',
                  coverImage: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909',
                  audioUrl,
                  isLiked: false
                };
                
                handleAddSong(newSong);
                console.log("Added song from storage:", newSong);
              }
            }
          }
        } catch (storageError) {
          console.error("Error checking storage:", storageError);
        }
      } catch (err) {
        console.error("Failed to fetch songs:", err);
        toast({
          title: "Error loading songs",
          description: "There was a problem loading your songs",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSongs();
  }, [refreshSongs, handleAddSong, libraryHook.songs]);
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-32">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-[#FF10F0] animate-spin mb-4" />
          <p className="text-muted-foreground">Loading your music library...</p>
        </div>
      ) : (
        <>
          <LibraryTabs library={libraryHook} />
          
          <AddSong onAddSong={handleAddSong} />
        </>
      )}
      
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
