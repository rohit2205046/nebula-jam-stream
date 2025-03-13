
import React from "react";
import SongCard from "./SongCard";
import { Song } from "./data/mockData";

interface SongGridProps {
  songs: Song[];
  onPlay: (songId: string) => void;
  onToggleLike: (songId: string) => void;
  emptyMessage?: string;
}

const SongGrid: React.FC<SongGridProps> = ({ 
  songs, 
  onPlay, 
  onToggleLike, 
  emptyMessage = "No songs available" 
}) => {
  if (songs.length === 0) {
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {songs.map((song) => (
        <SongCard
          key={song.id}
          title={song.title}
          artist={song.artist}
          coverImage={song.coverImage}
          isLiked={song.isLiked}
          onPlay={() => onPlay(song.id)}
          onToggleLike={() => onToggleLike(song.id)}
        />
      ))}
    </div>
  );
};

export default SongGrid;
