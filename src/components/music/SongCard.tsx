
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
            onClick={onPlay}
            className="w-12 h-12 bg-nebula-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-nebula-700 hover:scale-105 transition-all duration-300 shadow-glow"
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
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>
    </GlassmorphicCard>
  );
};

export default SongCard;
