
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
          window.dispatchEvent(new CustomEvent('play-song', { 
            detail: songData 
          }));
        })
        .catch(error => {
          console.error("Error checking audio URL:", error);
          setAudioError(true);
          toast({
            title: "Playback Error",
            description: "This song cannot be played. The audio file might be missing or inaccessible.",
            variant: "destructive"
          });
        });
    }
  };

  // Preload audio to check if it's playable
  React.useEffect(() => {
    if (audioUrl) {
      const audio = new Audio();
      audio.addEventListener('error', () => {
        console.error("Audio load error for:", audioUrl);
        setAudioError(true);
      });
      audio.src = audioUrl;
      
      return () => {
        audio.removeEventListener('error', () => {
          setAudioError(true);
        });
        audio.remove();
      };
    }
  }, [audioUrl]);

  return (
    <GlassmorphicCard
      className="w-full h-full transition-all duration-300 group love-pulse"
      hoverEffect={true}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1614149162883-504ce4d13909' : (coverImage || 'https://images.unsplash.com/photo-1614149162883-504ce4d13909')}
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => {
            setImageError(true);
          }}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handlePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md ${
              audioError 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-[#6A1B9A] hover:bg-[#6A1B9A]/80 hover:scale-105 shadow-[#6A1B9A]/40 animate-bounce-subtle'
            }`}
          >
            {audioError ? <AlertCircle size={20} /> : <Play size={20} className="ml-1" />}
          </button>
        </div>
        
        {audioError && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-500/70 text-white text-xs py-1 px-2 text-center">
            Audio Unavailable
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm truncate">{title}</h3>
          <p className="text-xs text-muted-foreground truncate">{artist}</p>
        </div>
        <div className="flex gap-1">
          {onAddToPlaylist}
          {onRemoveFromPlaylist}
        </div>
      </div>
    </GlassmorphicCard>
  );
};

export default SongCard;
