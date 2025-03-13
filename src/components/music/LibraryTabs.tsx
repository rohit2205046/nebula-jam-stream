
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ListMusic, Plus, Disc, Upload, Music, MoreVertical } from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";
import SongGrid from "./SongGrid";
import { MusicLibraryHook } from "./hooks/useMusicLibrary";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LibraryTabsProps {
  library: MusicLibraryHook;
}

const LibraryTabs: React.FC<LibraryTabsProps> = ({ library }) => {
  const {
    songs,
    recentlyPlayed,
    activeTab,
    isLoading,
    setActiveTab,
    setShowUploadModal,
    handlePlaySong,
    createPlaylist,
    playlists,
    selectedPlaylist,
    setSelectedPlaylist,
    getFifties,
    getPlaylistSongs,
    deletePlaylist,
  } = library;

  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreatePlaylist = () => {
    createPlaylist(newPlaylistName);
    setNewPlaylistName("");
    setIsCreateDialogOpen(false);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between items-center mb-6">
        <TabsList className="bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <ListMusic size={16} />
            <span className="hidden sm:inline">Your Library</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock size={16} />
            <span className="hidden sm:inline">Recently Played</span>
          </TabsTrigger>
          <TabsTrigger value="fifties" className="flex items-center gap-2">
            <Disc size={16} />
            <span className="hidden sm:inline">1950s Hits</span>
          </TabsTrigger>
          {playlists.length > 0 && (
            <TabsTrigger value="playlist" className="flex items-center gap-2">
              <Music size={16} />
              <span className="hidden sm:inline">Playlists</span>
            </TabsTrigger>
          )}
        </TabsList>
        
        <div className="flex gap-2">
          <AnimatedButton 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload size={16} />
            <span className="hidden sm:inline">Upload</span>
          </AnimatedButton>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <AnimatedButton 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">New Playlist</span>
              </AnimatedButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Playlist</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Playlist name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <Button onClick={handleCreatePlaylist}>Create Playlist</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Playlist selector - show when playlist tab is active */}
      {activeTab === 'playlist' && playlists.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {playlists.map(playlist => (
            <div key={playlist.id} className="relative">
              <Button
                variant={selectedPlaylist === playlist.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlaylist(playlist.id)}
                className="pr-8" // Extra padding for the dropdown
              >
                {playlist.name} ({playlist.songs.length})
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-full p-0 absolute right-1 top-0"
                  >
                    <MoreVertical size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => deletePlaylist(playlist.id)}>
                    Delete Playlist
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}
      
      <TabsContent value="all" className="mt-0 animate-fade-in">
        {isLoading ? (
          <div className="text-center py-10">Loading songs...</div>
        ) : (
          <SongGrid 
            songs={songs}
            onPlay={handlePlaySong}
            playlists={playlists}
            library={library}
          />
        )}
      </TabsContent>
      
      <TabsContent value="recent" className="mt-0 animate-fade-in">
        <SongGrid 
          songs={recentlyPlayed}
          onPlay={handlePlaySong}
          playlists={playlists}
          library={library}
          emptyMessage="Start playing songs to see them here!"
        />
      </TabsContent>

      <TabsContent value="fifties" className="mt-0 animate-fade-in">
        <SongGrid 
          songs={getFifties()}
          onPlay={handlePlaySong}
          playlists={playlists}
          library={library}
          emptyMessage="No 1950s songs available"
        />
      </TabsContent>

      <TabsContent value="playlist" className="mt-0 animate-fade-in">
        {selectedPlaylist ? (
          <SongGrid 
            songs={getPlaylistSongs()}
            onPlay={handlePlaySong}
            playlists={playlists}
            library={library}
            currentPlaylistId={selectedPlaylist}
            emptyMessage="No songs in this playlist yet"
          />
        ) : (
          <div className="text-center py-10">Select a playlist</div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default LibraryTabs;
