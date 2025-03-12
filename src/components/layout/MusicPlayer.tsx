
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart } from "lucide-react";
import GlassmorphicCard from "../ui/GlassmorphicCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";

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
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [referralCode, setReferralCode] = useState<string>(() => {
    // Generate a unique referral code for this user
    return `NEBULA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  });
  const isMobile = useIsMobile();
  const [currentSong, setCurrentSong] = useState<Song>({
    id: "1",
    title: "Cosmic Waves",
    artist: "Stellar Dreams",
    coverImage: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    isLiked: true,
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Generate a unique session ID for this user's player
  const [sessionId] = useState(() => `user-${Math.random().toString(36).substring(2, 9)}`);

  // Shared listening functionality
  useEffect(() => {
    if (isShared) {
      // Broadcast song changes and play state
      const broadcastSongChange = () => {
        // In a real app, this would use WebSockets or Supabase Realtime
        console.log(`Broadcasting song: ${currentSong.title} to listeners using referral code: ${referralCode}`);
      };
      
      // Listen for song changes from other users
      const handleRemoteSongChange = (event: CustomEvent) => {
        console.log("Received song change from another user");
        // Implementation would use proper data channels in a real app
      };
      
      window.addEventListener('remote-song-change', handleRemoteSongChange as EventListener);
      
      if (isPlaying) {
        broadcastSongChange();
      }
      
      return () => {
        window.removeEventListener('remote-song-change', handleRemoteSongChange as EventListener);
      };
    }
  }, [isShared, isPlaying, currentSong, referralCode]);

  // Optimize audio setup with useCallback
  const setupAudio = useCallback((songUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = songUrl;
      audioRef.current.load();
    } else {
      const audio = new Audio(songUrl);
      audioRef.current = audio;
    }
    
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Create audio element
    setupAudio(currentSong.audioUrl);
    
    const audio = audioRef.current;
    if (!audio) return;
    
    // Set up event listeners
    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleSongEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      
      if (isRepeatOn) {
        // Replay the current song
        audio.currentTime = 0;
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(error => {
            console.error("Replay failed:", error);
          });
      } else if (isShuffleOn) {
        // Play a random song in a real app
        console.log("Would play random song here");
      }
    };
    
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleSongEnd);
    
    // Listen for song change events
    const handleSongChange = (event: CustomEvent) => {
      const song = event.detail;
      setCurrentSong(song);
      setIsPlaying(false);
      setCurrentTime(0);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      setupAudio(song.audioUrl);
      
      if (audioRef.current) {
        // Auto-play when a new song is selected
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          toast({
            title: "Now playing",
            description: `${song.title} by ${song.artist}`,
          });
        }).catch(error => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      }
    };
    
    window.addEventListener('play-song', handleSongChange as EventListener);
    
    // Handle collapse toggle based on scrolling
    const handleScroll = () => {
      if (!isMobile) return;
      
      if (window.scrollY > window.innerHeight) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      // Clean up
      if (audio) {
        audio.pause();
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleSongEnd);
      }
      window.removeEventListener('play-song', handleSongChange as EventListener);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSong.audioUrl, setupAudio, isRepeatOn, isShuffleOn, isMobile]);

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

  const toggleShare = () => {
    setIsShared(!isShared);
    toast({
      title: isShared ? "Shared listening disabled" : "Shared listening enabled",
      description: isShared 
        ? "You're now listening privately" 
        : `Friends can join your session with code: ${referralCode}`,
    });
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

  const toggleLike = () => {
    setCurrentSong(prev => ({
      ...prev,
      isLiked: !prev.isLiked
    }));
    
    toast({
      title: currentSong.isLiked ? "Removed from liked songs" : "Added to liked songs",
      description: `${currentSong.title} by ${currentSong.artist}`,
    });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (isCollapsed && isMobile) {
    // Collapsed mini player for mobile
    return (
      <div 
        ref={playerRef}
        className="fixed bottom-4 right-4 z-40 animate-slide-up will-change-transform"
        onClick={() => setIsCollapsed(false)}
      >
        <GlassmorphicCard className="p-2 rounded-full w-14 h-14 flex items-center justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-10 h-10 rounded-full bg-[#FF10F0] text-white flex items-center justify-center"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
          </button>
        </GlassmorphicCard>
      </div>
    );
  }

  return (
    <div ref={playerRef} className="fixed bottom-0 left-0 right-0 mx-auto max-w-7xl animate-slide-up z-40">
      <GlassmorphicCard className="p-4 will-change-transform">
        <div className="flex flex-col md:flex-row items-center">
          {/* Song Info */}
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-1/4">
            <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0 group relative">
              <img 
                src={currentSong.coverImage} 
                alt={currentSong.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart 
                  size={16} 
                  className={`${currentSong.isLiked ? 'text-[#FF10F0] fill-[#FF10F0]' : 'text-white'} cursor-pointer`}
                  onClick={toggleLike}
                />
              </div>
            </div>
            <div className="truncate">
              <h4 className="font-medium text-sm truncate">{currentSong.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
            </div>
            
            {isShared && (
              <span className="ml-2 text-xs bg-[#FF10F0] text-white px-2 py-0.5 rounded-full animate-pulse">
                Shared
              </span>
            )}
          </div>
          
          {/* Player Controls */}
          <div className="flex flex-col w-full md:w-2/4">
            <div className="flex justify-center items-center space-x-4 mb-3">
              <button 
                className={`text-muted-foreground hover:text-[#FF10F0] transition-colors ${isShuffleOn ? 'text-[#FF10F0]' : ''}`}
                onClick={() => setIsShuffleOn(!isShuffleOn)}
                aria-label="Shuffle"
              >
                <Shuffle size={18} />
              </button>
              <button 
                className="text-muted-foreground hover:text-[#FF10F0] transition-colors"
                aria-label="Previous song"
              >
                <SkipBack size={20} />
              </button>
              <button 
                className="w-10 h-10 rounded-full bg-[#FF10F0] text-white flex items-center justify-center hover:bg-[#FF10F0]/80 hover:shadow-glow transition-all"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
              </button>
              <button 
                className="text-muted-foreground hover:text-[#FF10F0] transition-colors"
                aria-label="Next song"
              >
                <SkipForward size={20} />
              </button>
              <button 
                className={`text-muted-foreground hover:text-[#FF10F0] transition-colors ${isRepeatOn ? 'text-[#FF10F0]' : ''}`}
                onClick={() => setIsRepeatOn(!isRepeatOn)}
                aria-label="Repeat"
              >
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
                className="w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF10F0]"
                aria-label="Seek"
              />
              <span className="text-xs text-muted-foreground w-10 ml-2">
                {formatTime(duration)}
              </span>
            </div>
          </div>
          
          {/* Volume Control - Only on larger screens */}
          <div className="hidden md:flex items-center w-1/4 justify-end">
            <button 
              className={`mr-4 text-xs px-2 py-0.5 rounded-full transition-colors ${
                isShared ? 'bg-[#FF10F0] text-white' : 'bg-secondary text-muted-foreground hover:bg-[#FF10F0]/20'
              }`}
              onClick={toggleShare}
            >
              {isShared ? 'Shared' : 'Share'}
            </button>
            
            <Volume2 size={18} className="text-muted-foreground mr-2" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF10F0]"
              aria-label="Volume"
            />
          </div>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default MusicPlayer;
