
import React from "react";
import { Play } from "lucide-react";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";

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
  const handlePlay = () => {
    if (onPlay) {
      onPlay();
    } else if (audioUrl) {
      // Create a custom event to play this song directly
      const songData = {
        id: Math.random().toString(36).substring(2, 9), // Generate random ID if not provided
        title,
        artist,
        coverImage,
        audioUrl
      };
      
      console.log("Dispatching play-song event with data:", songData);
      window.dispatchEvent(new CustomEvent('play-song', { 
        detail: songData 
      }));
    }
  };

  return (
    <GlassmorphicCard
      className="w-full h-full transition-all duration-300 group love-pulse"
      hoverEffect={true}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
        <img
          src={coverImage}
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="w-12 h-12 bg-[#6A1B9A] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-[#6A1B9A]/80 hover:scale-105 transition-all duration-300 shadow-[#6A1B9A]/40 shadow-md animate-bounce-subtle"
          >
            <Play size={20} className="ml-1" />
          </button>
        </div>
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
