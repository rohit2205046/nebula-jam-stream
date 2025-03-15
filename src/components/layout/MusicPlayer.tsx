
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart, Search, List, MusicIcon } from "lucide-react";
import GlassmorphicCard from "../ui/GlassmorphicCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
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
  
  // Sample playlist for demo purposes
  const [playlist, setPlaylist] = useState([
    {
      id: "1",
      title: "Cosmic Waves",
      artist: "Stellar Dreams",
      coverImage: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      isLiked: true,
    },
    {
      id: "2",
      title: "Digital Horizon",
      artist: "Cyber Flow",
      coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      isLiked: false,
    },
    {
      id: "3",
      title: "Nebula Dreams",
      artist: "Astral Projection",
      coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      isLiked: true,
    },
  ]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Generate a unique session ID for this user's player
  const [sessionId] = useState(() => `user-${Math.random().toString(36).substring(2, 9)}`);

  const [currentPlaylist, setCurrentPlaylist] = useState<{
    songs: Song[];
    currentIndex: number;
  } | null>({
    songs: playlist,
    currentIndex: 0
  });

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

  const playNextSong = () => {
    if (currentPlaylist && currentPlaylist.currentIndex < currentPlaylist.songs.length - 1) {
      const nextIndex = currentPlaylist.currentIndex + 1;
      const nextSong = currentPlaylist.songs[nextIndex];
      
      setCurrentPlaylist({
        ...currentPlaylist,
        currentIndex: nextIndex
      });
      
      if (audioRef.current) {
        audioRef.current.src = nextSong.audioUrl;
        audioRef.current.load();
        audioRef.current.play()
          .then(() => {
            setCurrentSong(nextSong);
            setIsPlaying(true);
            
            toast({
              title: "Now playing",
              description: `${nextSong.title} by ${nextSong.artist}`,
            });
          })
          .catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    } else if (isRepeatOn && currentPlaylist) {
      // If repeat is on and we're at the end, go back to the first song
      const firstSong = currentPlaylist.songs[0];
      
      setCurrentPlaylist({
        ...currentPlaylist,
        currentIndex: 0
      });
      
      if (audioRef.current) {
        audioRef.current.src = firstSong.audioUrl;
        audioRef.current.load();
        audioRef.current.play()
          .then(() => {
            setCurrentSong(firstSong);
            setIsPlaying(true);
            
            toast({
              title: "Playlist restarted",
              description: `${firstSong.title} by ${firstSong.artist}`,
            });
          })
          .catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const playPreviousSong = () => {
    if (currentPlaylist && currentPlaylist.currentIndex > 0) {
      const prevIndex = currentPlaylist.currentIndex - 1;
      const prevSong = currentPlaylist.songs[prevIndex];
      
      setCurrentPlaylist({
        ...currentPlaylist,
        currentIndex: prevIndex
      });
      
      if (audioRef.current) {
        audioRef.current.src = prevSong.audioUrl;
        audioRef.current.load();
        audioRef.current.play()
          .then(() => {
            setCurrentSong(prevSong);
            setIsPlaying(true);
            
            toast({
              title: "Now playing",
              description: `${prevSong.title} by ${prevSong.artist}`,
            });
          })
          .catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    } else if (isRepeatOn && currentPlaylist) {
      // If repeat is on and we're at the beginning, go to the last song
      const lastIndex = currentPlaylist.songs.length - 1;
      const lastSong = currentPlaylist.songs[lastIndex];
      
      setCurrentPlaylist({
        ...currentPlaylist,
        currentIndex: lastIndex
      });
      
      if (audioRef.current) {
        audioRef.current.src = lastSong.audioUrl;
        audioRef.current.load();
        audioRef.current.play()
          .then(() => {
            setCurrentSong(lastSong);
            setIsPlaying(true);
            
            toast({
              title: "Playing last track",
              description: `${lastSong.title} by ${lastSong.artist}`,
            });
          })
          .catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const playSpecificSong = (songIndex: number) => {
    if (currentPlaylist && songIndex >= 0 && songIndex < currentPlaylist.songs.length) {
      const song = currentPlaylist.songs[songIndex];
      
      setCurrentPlaylist({
        ...currentPlaylist,
        currentIndex: songIndex
      });
      
      if (audioRef.current) {
        audioRef.current.src = song.audioUrl;
        audioRef.current.load();
        audioRef.current.play()
          .then(() => {
            setCurrentSong(song);
            setIsPlaying(true);
            
            toast({
              title: "Now playing",
              description: `${song.title} by ${song.artist}`,
            });
          })
          .catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

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
      } else if (isShuffleOn && currentPlaylist) {
        // Play a random song from playlist
        const randomIndex = Math.floor(Math.random() * currentPlaylist.songs.length);
        playSpecificSong(randomIndex);
      } else {
        // Play next song
        playNextSong();
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
      
      if (song.playlist) {
        setCurrentPlaylist(song.playlist);
      }
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      setupAudio(song.audioUrl);
      
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            toast({
              title: "Now playing",
              description: `${song.title} by ${song.artist}`,
            });
          })
          .catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    };
    
    window.addEventListener('play-song', handleSongChange as EventListener);
    
    // Handle sticky player as user scrolls
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
  }, [currentSong.audioUrl, setupAudio, isRepeatOn, isShuffleOn, isMobile, playNextSong]);

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
    // Collapsed mini player for mobile - improved with thumbnail
    return (
      <div 
        ref={playerRef}
        className="fixed bottom-4 right-4 z-50 animate-slide-up will-change-transform"
        onClick={() => setIsCollapsed(false)}
      >
        <GlassmorphicCard className="p-2 rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-xl bg-[#403E43]/90 border border-[#FF10F0]/30 shadow-lg shadow-[#FF10F0]/20">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <img 
              src={currentSong.coverImage} 
              alt={currentSong.title}
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-10 h-10 rounded-full bg-[#FF10F0] text-white flex items-center justify-center"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
              </button>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    );
  }

  return (
    <div ref={playerRef} className="fixed bottom-0 left-0 right-0 mx-auto max-w-7xl animate-slide-up z-50">
      <GlassmorphicCard className="p-4 will-change-transform backdrop-blur-xl bg-[#403E43]/90 border-t border-t-[#FF10F0]/30 shadow-lg shadow-[#FF10F0]/20">
        {/* Search Bar - Conditionally Rendered */}
        {isSearchOpen && (
          <div className="mb-3 px-2">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3 text-[#FF10F0]" />
              <input
                type="text"
                placeholder="Search your music..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#333]/80 text-white border border-[#FF10F0]/30 focus:outline-none focus:border-[#FF10F0]"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 text-white"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        {/* Playlist View - Conditionally Rendered */}
        {isPlaylistOpen && (
          <div className="max-h-60 overflow-y-auto mb-3 p-2 bg-[#333]/80 rounded-md border border-[#FF10F0]/20">
            <h3 className="text-white font-medium mb-2 flex items-center">
              <MusicIcon size={16} className="mr-2 text-[#FF10F0]" />
              Current Playlist
            </h3>
            <ul className="space-y-2">
              {currentPlaylist && currentPlaylist.songs.map((song, index) => (
                <li 
                  key={song.id} 
                  className={`flex items-center py-1 px-2 rounded ${currentPlaylist.currentIndex === index ? 'bg-[#FF10F0]/30' : 'hover:bg-[#444]'} cursor-pointer transition-colors`}
                  onClick={() => playSpecificSong(index)}
                >
                  <div className="h-10 w-10 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={song.coverImage} 
                      alt={song.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-white text-sm truncate font-medium">{song.title}</p>
                    <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                  </div>
                  {currentPlaylist.currentIndex === index && isPlaying && (
                    <div className="ml-auto">
                      <div className="w-3 h-3 rounded-full bg-[#FF10F0] animate-pulse"></div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row items-center">
          {/* Song Info */}
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-1/4">
            <div className="relative group w-16 h-16 rounded-lg overflow-hidden mr-3 flex-shrink-0 shadow-lg shadow-[#FF10F0]/10 border border-[#FF10F0]/20">
              <img 
                src={currentSong.coverImage} 
                alt={currentSong.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart 
                  size={16} 
                  className={`${currentSong.isLiked ? 'text-[#FF10F0] fill-[#FF10F0]' : 'text-white'} cursor-pointer`}
                  onClick={toggleLike}
                />
              </div>
            </div>
            <div className="truncate">
              <h4 className="font-medium text-sm truncate text-white">{currentSong.title}</h4>
              <p className="text-xs text-gray-300 truncate">{currentSong.artist}</p>
              
              {isShared && (
                <span className="text-xs bg-[#FF10F0] text-white px-2 py-0.5 rounded-full animate-pulse inline-block mt-1">
                  Shared
                </span>
              )}
            </div>
          </div>
          
          {/* Player Controls */}
          <div className="flex flex-col w-full md:w-2/4">
            <div className="flex justify-center items-center space-x-5 mb-3">
              <button 
                className={`text-gray-300 hover:text-[#FF10F0] transition-colors ${isShuffleOn ? 'text-[#FF10F0]' : ''}`}
                onClick={() => setIsShuffleOn(!isShuffleOn)}
                aria-label="Shuffle"
              >
                <Shuffle size={18} />
              </button>
              <button 
                className="text-gray-300 hover:text-[#FF10F0] transition-colors"
                aria-label="Previous song"
                onClick={playPreviousSong}
              >
                <SkipBack size={22} />
              </button>
              <button 
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] text-white flex items-center justify-center hover:shadow-glow transition-all transform hover:scale-105"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
              </button>
              <button 
                className="text-gray-300 hover:text-[#FF10F0] transition-colors"
                aria-label="Next song"
                onClick={playNextSong}
              >
                <SkipForward size={22} />
              </button>
              <button 
                className={`text-gray-300 hover:text-[#FF10F0] transition-colors ${isRepeatOn ? 'text-[#FF10F0]' : ''}`}
                onClick={() => setIsRepeatOn(!isRepeatOn)}
                aria-label="Repeat"
              >
                <Repeat size={18} />
              </button>
            </div>
            
            <div className="flex items-center w-full">
              <span className="text-xs text-gray-300 w-10 text-right mr-2">
                {formatTime(currentTime)}
              </span>
              <div className="relative w-full h-2 bg-[#333] rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={seekTo}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Seek"
                />
              </div>
              <span className="text-xs text-gray-300 w-10 ml-2">
                {formatTime(duration)}
              </span>
            </div>
          </div>
          
          {/* Extra Controls */}
          <div className="hidden md:flex items-center w-1/4 justify-end space-x-4">
            <button 
              className="text-gray-300 hover:text-[#FF10F0] transition-colors p-1"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            
            <button 
              className="text-gray-300 hover:text-[#FF10F0] transition-colors p-1"
              onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
              aria-label="Playlist"
            >
              <List size={18} />
            </button>
            
            <button 
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                isShared ? 'bg-[#FF10F0] text-white' : 'bg-[#333] text-gray-300 hover:bg-[#FF10F0]/20'
              }`}
              onClick={toggleShare}
            >
              {isShared ? 'Shared' : 'Share'}
            </button>
            
            <div className="flex items-center">
              <Volume2 size={18} className="text-gray-300 mr-2" />
              <div className="relative w-20 h-1 bg-[#333] rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#FF10F0] rounded-full"
                  style={{ width: `${volume * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default MusicPlayer;
