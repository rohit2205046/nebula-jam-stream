
import React from "react";
import { Play, Heart } from "lucide-react";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";

interface SongCardProps {
  title: string;
  artist: string;
  coverImage: string;
  isLiked?: boolean;
  onPlay?: () => void;
  onToggleLike?: () => void;
  audioUrl?: string;
}

const SongCard: React.FC<SongCardProps> = ({
  title,
  artist,
  coverImage,
  isLiked = false,
  onPlay,
  onToggleLike,
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
        audioUrl,
        isLiked
      };
      
      window.dispatchEvent(new CustomEvent('play-song', { 
        detail: songData 
      }));
    }
  };

  return (
    <GlassmorphicCard
      className="w-full h-full transition-all duration-300 group"
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
            className="w-12 h-12 bg-purple-800 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-purple-glow animate-bounce-subtle"
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
        <button
          onClick={onToggleLike}
          className={`mt-1 transition-all duration-300 ${
            isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
          }`}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "animate-pulse" : ""} />
        </button>
      </div>
    </GlassmorphicCard>
  );
};

export default SongCard;
