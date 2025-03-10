
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from "lucide-react";
import GlassmorphicCard from "../ui/GlassmorphicCard";

interface Song {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  audioUrl: string;
  isLiked: boolean;
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentSong, setCurrentSong] = useState<Song>({
    id: "1",
    title: "Cosmic Waves",
    artist: "Stellar Dreams",
    coverImage: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    isLiked: true,
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(currentSong.audioUrl);
    audioRef.current = audio;
    audio.volume = volume;
    
    // Set up event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    
    // Listen for song change events
    const handleSongChange = (event: CustomEvent) => {
      const song = event.detail;
      setCurrentSong(song);
      setIsPlaying(false);
      setCurrentTime(0);
      
      // We need to recreate the audio element when the song changes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("loadedmetadata", () => {});
        audioRef.current.removeEventListener("ended", () => {});
      }
      
      const newAudio = new Audio(song.audioUrl);
      newAudio.volume = volume;
      audioRef.current = newAudio;
      
      newAudio.addEventListener("timeupdate", updateProgress);
      newAudio.addEventListener("loadedmetadata", () => {
        setDuration(newAudio.duration);
      });
      newAudio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      
      // Auto-play when a new song is selected
      newAudio.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    };
    
    window.addEventListener('play-song', handleSongChange as EventListener);
    
    return () => {
      // Clean up
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("loadedmetadata", () => {});
        audioRef.current.removeEventListener("ended", () => {});
      }
      window.removeEventListener('play-song', handleSongChange as EventListener);
    };
  }, [currentSong.audioUrl, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error);
        // Handle autoplay restrictions
        setIsPlaying(false);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const seekTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <GlassmorphicCard className="fixed bottom-0 left-0 right-0 p-4 mx-auto max-w-7xl animate-slide-up">
      <div className="flex flex-col md:flex-row items-center">
        {/* Song Info */}
        <div className="flex items-center mb-4 md:mb-0 w-full md:w-1/4">
          <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
            <img 
              src={currentSong.coverImage} 
              alt={currentSong.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="truncate">
            <h4 className="font-medium text-sm truncate">{currentSong.title}</h4>
            <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
          </div>
        </div>
        
        {/* Player Controls */}
        <div className="flex flex-col w-full md:w-2/4">
          <div className="flex justify-center items-center space-x-4 mb-3">
            <button className="text-muted-foreground hover:text-nebula-600 transition-colors">
              <Shuffle size={18} />
            </button>
            <button className="text-muted-foreground hover:text-nebula-600 transition-colors">
              <SkipBack size={20} />
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-nebula-600 text-white flex items-center justify-center hover:bg-nebula-700 hover:shadow-glow transition-all"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
            </button>
            <button className="text-muted-foreground hover:text-nebula-600 transition-colors">
              <SkipForward size={20} />
            </button>
            <button className="text-muted-foreground hover:text-nebula-600 transition-colors">
              <Repeat size={18} />
            </button>
          </div>
          
          <div className="flex items-center w-full">
            <span className="text-xs text-muted-foreground w-10 text-right mr-2">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={seekTo}
              className="w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-nebula-600"
            />
            <span className="text-xs text-muted-foreground w-10 ml-2">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* Volume Control - Only on larger screens */}
        <div className="hidden md:flex items-center w-1/4 justify-end">
          <Volume2 size={18} className="text-muted-foreground mr-2" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-nebula-600"
          />
        </div>
      </div>
    </GlassmorphicCard>
  );
};

export default MusicPlayer;
