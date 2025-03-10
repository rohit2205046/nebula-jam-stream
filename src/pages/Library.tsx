
import React from "react";
import Navbar from "@/components/layout/Navbar";
import MusicLibrary from "@/components/music/MusicLibrary";
import MusicPlayer from "@/components/layout/MusicPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Disc, Radio } from "lucide-react";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";

const Library = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Library</h1>
          
          <Tabs defaultValue="songs" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="songs" className="flex items-center gap-2">
                <Music size={16} />
                <span>Songs</span>
              </TabsTrigger>
              <TabsTrigger value="albums" className="flex items-center gap-2">
                <Disc size={16} />
                <span>Albums</span>
              </TabsTrigger>
              <TabsTrigger value="artists" className="flex items-center gap-2">
                <Radio size={16} />
                <span>Artists</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="songs" className="animate-fade-in">
              <p className="text-muted-foreground mb-6">Manage your music collection and create playlists</p>
              <MusicLibrary />
            </TabsContent>
            
            <TabsContent value="albums" className="animate-fade-in">
              <p className="text-muted-foreground mb-6">Browse your album collection</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <GlassmorphicCard className="p-0 overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Album Cover" 
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">Digital Dreams</h3>
                    <p className="text-sm text-muted-foreground">Byte Runners</p>
                    <p className="text-xs text-muted-foreground mt-2">12 tracks • 48 min</p>
                  </div>
                </GlassmorphicCard>
                
                <GlassmorphicCard className="p-0 overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Album Cover" 
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">Cosmic Journeys</h3>
                    <p className="text-sm text-muted-foreground">Stellar Dreams</p>
                    <p className="text-xs text-muted-foreground mt-2">10 tracks • 42 min</p>
                  </div>
                </GlassmorphicCard>
                
                <GlassmorphicCard className="p-0 overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Album Cover" 
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">Ambient Reflections</h3>
                    <p className="text-sm text-muted-foreground">Ambient Waves</p>
                    <p className="text-xs text-muted-foreground mt-2">8 tracks • 36 min</p>
                  </div>
                </GlassmorphicCard>
              </div>
            </TabsContent>
            
            <TabsContent value="artists" className="animate-fade-in">
              <p className="text-muted-foreground mb-6">Your favorite artists</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <GlassmorphicCard className="p-4 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Artist" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium">Stellar Dreams</h3>
                  <p className="text-xs text-muted-foreground">Electronic</p>
                </GlassmorphicCard>
                
                <GlassmorphicCard className="p-4 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Artist" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium">Byte Runners</h3>
                  <p className="text-xs text-muted-foreground">Synthwave</p>
                </GlassmorphicCard>
                
                <GlassmorphicCard className="p-4 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Artist" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium">Ambient Waves</h3>
                  <p className="text-xs text-muted-foreground">Ambient</p>
                </GlassmorphicCard>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <MusicPlayer />
    </div>
  );
};

export default Library;
