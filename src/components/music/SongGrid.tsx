
import React from "react";
import SongCard from "./SongCard";
import { Song } from "./data/mockData";
import { MusicLibraryHook } from "./hooks/useMusicLibrary";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface SongGridProps {
  songs: Song[];
  onPlay: (songId: string) => void;
  emptyMessage?: string;
  playlists: {id: string, name: string}[];
  library: MusicLibraryHook;
  currentPlaylistId?: string;
}

const SongGrid: React.FC<SongGridProps> = ({ 
  songs, 
  onPlay, 
  emptyMessage = "No songs available",
  playlists,
  library,
  currentPlaylistId
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
          onPlay={() => onPlay(song.id)}
          onAddToPlaylist={
            playlists.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {playlists.map(playlist => (
                    <DropdownMenuItem 
                      key={playlist.id}
                      onClick={() => library.addToPlaylist(song.id, playlist.id)}
                    >
                      {playlist.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null
          }
          onRemoveFromPlaylist={
            currentPlaylistId ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-red-500"
                onClick={() => library.removeFromPlaylist(song.id, currentPlaylistId)}
              >
                <Trash size={16} />
              </Button>
            ) : null
          }
          audioUrl={song.audioUrl}
        />
      ))}
    </div>
  );
};

export default SongGrid;
