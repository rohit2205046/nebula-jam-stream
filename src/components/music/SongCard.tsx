import React, { useState } from "react";
import { Play, AlertCircle } from "lucide-react";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { toast } from "@/components/ui/use-toast";

interface SongCardProps {
    title: string;
    artist: string;
    coverImage: string;
    onPlay?: () => void;
    onAddToPlaylist?: React.ReactNode;
    onRemoveFromPlaylist?: React.ReactNode;
    audioUrl?: string;
}

const SongCard: React.FC<SongCardProps> = ({
    title,
    artist,
    coverImage,
    onPlay,
    onAddToPlaylist,
    onRemoveFromPlaylist,
    audioUrl,
}) => {
    const [imageError, setImageError] = useState(false);
    const [audioError, setAudioError] = useState(false);

    const handlePlay = () => {
          if (audioError) {
                  toast({
                            title: "Playback Error",
                            description: "This song cannot be played. The audio file might be missing or inaccessible.",
                            variant: "destructive"
                  });
                  return;
          }

          if (onPlay) {
                  onPlay();
          } else if (audioUrl) {
                  // Check if the audio URL is valid
            fetch(audioUrl, { method: 'HEAD' })
                    .then(response => {
                                if (!response.ok) {
                                              throw new Error('Audio file not accessible');
                                }
                                // Create a unique ID for this song if it's played directly
                                    const songId = `song-${Math.random().toString(36).substring(2, 9)}`;
                                // Create a song object for the player
                                    const songData = {
                                                  id: songId,
                                                  title,
                                                  artist,
                                                  coverImage: imageError ? 'https://images.unsplash.com/photo-1614149162883-504ce4d13909' : (coverImage || 'https://images.unsplash.com/photo-1614149162883-504ce4d13909'),
                                                  audioUrl,
                                                  isLiked: false,
                                                  // Add a simple playlist context for next/previous functionality
                                                  playlist: {
                                                                  songs: [{
                                                                                    id: songId,
                                                                                    title,
                                                                                    artist,
                                                                                    coverImage: imageError ? 'https://images.unsplash.com/photo-1614149162883-504ce4d13909' : (coverImage || 'https://images.unsplash.com/photo-1614149162883-504ce4d13909'),
                                                                                    audioUrl,
                                                                                    isLiked: false,
                                                                  }],
                                                                  currentIndex: 0
                                                  }
                                    };
                                console.log("Dispatching play-song event with data:", songData);
                                // Dispatch event to play this song
                                    window.dispatchEvent(new CustomEvent('play-song', { detail: songData }));
                    })
                    .catch(error => {
                                setAudioError(true);
                                toast({
                                              title: "Audio Error",
                                              description: `Error accessing audio file: ${error.message}`,
                                              variant: "destructive"
                                });
                    });
          }
    };

    return (
          <GlassmorphicCard>
            {/* UI components and event handlers for playing songs */}
          </GlassmorphicCard>
        );
};

export default SongCard;</GlassmorphicCard>
