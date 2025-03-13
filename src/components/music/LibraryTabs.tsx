
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Clock, ListMusic, Plus, Disc, Upload } from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";
import SongGrid from "./SongGrid";
import { MusicLibraryHook } from "./hooks/useMusicLibrary";

interface LibraryTabsProps {
  library: MusicLibraryHook;
}

const LibraryTabs: React.FC<LibraryTabsProps> = ({ library }) => {
  const {
    songs,
    likedSongs,
    recentlyPlayed,
    activeTab,
    setActiveTab,
    setShowUploadModal,
    handleToggleLike,
    handlePlaySong,
    createPlaylist,
    getFifties
  } = library;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between items-center mb-6">
        <TabsList className="bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <ListMusic size={16} />
            <span className="hidden sm:inline">Your Library</span>
          </TabsTrigger>
          <TabsTrigger value="liked" className="flex items-center gap-2">
            <Heart size={16} />
            <span className="hidden sm:inline">Liked Songs</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock size={16} />
            <span className="hidden sm:inline">Recently Played</span>
          </TabsTrigger>
          <TabsTrigger value="fifties" className="flex items-center gap-2">
            <Disc size={16} />
            <span className="hidden sm:inline">1950s Hits</span>
          </TabsTrigger>
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
          
          <AnimatedButton 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={createPlaylist}
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Playlist</span>
          </AnimatedButton>
        </div>
      </div>
      
      <TabsContent value="all" className="mt-0 animate-fade-in">
        <SongGrid 
          songs={songs}
          onPlay={handlePlaySong}
          onToggleLike={handleToggleLike}
        />
      </TabsContent>
      
      <TabsContent value="liked" className="mt-0 animate-fade-in">
        <SongGrid 
          songs={likedSongs}
          onPlay={handlePlaySong}
          onToggleLike={handleToggleLike}
          emptyMessage="No liked songs yet. Heart a song to add it here!"
        />
      </TabsContent>
      
      <TabsContent value="recent" className="mt-0 animate-fade-in">
        <SongGrid 
          songs={recentlyPlayed}
          onPlay={handlePlaySong}
          onToggleLike={handleToggleLike}
          emptyMessage="Start playing songs to see them here!"
        />
      </TabsContent>

      <TabsContent value="fifties" className="mt-0 animate-fade-in">
        <SongGrid 
          songs={getFifties()}
          onPlay={handlePlaySong}
          onToggleLike={handleToggleLike}
          emptyMessage="No 1950s songs available"
        />
      </TabsContent>
    </Tabs>
  );
};

export default LibraryTabs;
