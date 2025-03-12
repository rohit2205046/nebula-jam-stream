
import React from "react";
import { ListMusic, Play, DownloadCloud } from "lucide-react";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import AnimatedButton from "@/components/ui/AnimatedButton";

// Mock data for open source songs
const openSourceSongs = [
  {
    id: "os-1",
    title: "Morning Calm",
    artist: "Ambient Waves",
    duration: "3:24",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "os-2",
    title: "Cyber Dreams",
    artist: "Digital Nomad",
    duration: "4:12",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "os-3",
    title: "Electric Sunset",
    artist: "Neon Collective",
    duration: "2:55",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverImage: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=2298&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "os-4",
    title: "Mountain Echo",
    artist: "Nature Sounds",
    duration: "3:47",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "os-5",
    title: "Digital Raindrops",
    artist: "Byte Runners",
    duration: "4:30",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

interface OpenSourcePlaylistProps {
  title?: string;
  description?: string;
}

const OpenSourcePlaylist: React.FC<OpenSourcePlaylistProps> = ({ 
  title = "Open Source Collection", 
  description = "Freely available music you can listen to, download, and share."
}) => {
  
  const handlePlaySong = (song: typeof openSourceSongs[0]) => {
    window.dispatchEvent(new CustomEvent('play-song', { 
      detail: {
        id: song.id,
        title: song.title,
        artist: song.artist,
        coverImage: song.coverImage,
        audioUrl: song.audioUrl,
        isLiked: false
      }
    }));
  };
  
  const handlePlayAll = () => {
    // Play the first song in the playlist
    if (openSourceSongs.length > 0) {
      handlePlaySong(openSourceSongs[0]);
    }
  };
  
  return (
    <GlassmorphicCard className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-[#FF10F0]/20 flex items-center justify-center">
          <ListMusic size={24} className="text-[#FF10F0]" />
        </div>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="flex justify-end mb-4">
        <AnimatedButton 
          variant="primary" 
          size="sm" 
          className="bg-[#FF10F0]"
          onClick={handlePlayAll}
        >
          <Play size={16} className="mr-2" />
          Play All
        </AnimatedButton>
      </div>
      
      <div className="space-y-2">
        {openSourceSongs.map((song) => (
          <div 
            key={song.id}
            className="flex items-center p-2 rounded-lg hover:bg-[#6A1B9A]/10 transition-colors group cursor-pointer"
            onClick={() => handlePlaySong(song)}
          >
            <div className="w-10 h-10 rounded overflow-hidden mr-3 flex-shrink-0 relative">
              <img 
                src={song.coverImage} 
                alt={song.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play size={16} className="text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{song.title}</p>
              <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
            </div>
            
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-3">{song.duration}</span>
              <button 
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-[#6A1B9A]/20"
                onClick={(e) => {
                  e.stopPropagation();
                  // In a real app, this would download the song
                  console.log(`Downloading: ${song.title}`);
                }}
              >
                <DownloadCloud size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </GlassmorphicCard>
  );
};

export default OpenSourcePlaylist;
