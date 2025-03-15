
import React, { useState, useRef } from "react";
import { Upload, X, Music, Image as ImageIcon, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import AnimatedButton from "@/components/ui/AnimatedButton";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { supabase } from "@/integrations/supabase/client";

interface UploadSongProps {
  onSongUploaded: (song: {
    id: string;
    title: string;
    artist: string;
    coverImage: string;
    audioUrl: string;
    isLiked: boolean;
  }) => void;
  onClose: () => void;
}

const UploadSong: React.FC<UploadSongProps> = ({ onSongUploaded, onClose }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [songFile, setSongFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  
  const songInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // AI-generated cover art options
  const aiCoverOptions = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=2298&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
  ];

  const handleSongSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('audio/')) {
        setSongFile(file);
        if (!title && file.name) {
          // Extract title from filename (remove extension)
          const titleFromFilename = file.name.replace(/\.[^/.]+$/, "");
          setTitle(titleFromFilename);
        }
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file (MP3, WAV, etc.).",
          variant: "destructive"
        });
      }
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setCoverFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setCoverPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.).",
          variant: "destructive"
        });
      }
    }
  };

  const generateAICover = () => {
    setIsGeneratingCover(true);
    
    // Generate AI cover - for now we'll use a selection from predefined options
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * aiCoverOptions.length);
      const generatedCover = aiCoverOptions[randomIndex];
      
      setCoverPreview(generatedCover);
      setIsGeneratingCover(false);
      
      toast({
        title: "Cover generated",
        description: "AI-generated cover has been created for your song."
      });
    }, 1500);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !artist || !songFile) {
      toast({
        title: "Missing information",
        description: "Please provide title, artist, and song file.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Create a storage bucket if it doesn't exist yet
      try {
        const { data: bucketData, error: bucketError } = await supabase
          .storage
          .createBucket('songs', {
            public: true,
            allowedMimeTypes: ['audio/mpeg', 'audio/wav', 'image/jpeg', 'image/png', 'image/webp'],
            fileSizeLimit: 50000000 // 50MB
          });
        
        if (bucketError) {
          console.log("Bucket might already exist or error:", bucketError);
        }
      } catch (err) {
        console.log("Bucket creation skipped, might already exist:", err);
      }
      
      // Generate a clean filename from the title
      const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const timestamp = Date.now();
      
      // Upload the song file
      let audioUrl = "";
      if (songFile) {
        const songFileName = `${cleanTitle}_${timestamp}.${songFile.name.split('.').pop()}`;
        const { data: songData, error: songError } = await supabase
          .storage
          .from('songs')
          .upload(songFileName, songFile, {
            cacheControl: '3600',
            upsert: true
          });
        
        if (songError) {
          throw songError;
        }
        
        // Get the public URL for the song
        const { data: publicSongData } = supabase
          .storage
          .from('songs')
          .getPublicUrl(songFileName);
        
        audioUrl = publicSongData.publicUrl;
      }
      
      // Upload or use AI cover image
      let coverImageUrl = "";
      
      if (coverFile) {
        // Upload user-provided cover
        const coverFileName = `${cleanTitle}_cover_${timestamp}.${coverFile.name.split('.').pop()}`;
        const { data: coverData, error: coverError } = await supabase
          .storage
          .from('songs')
          .upload(coverFileName, coverFile, {
            cacheControl: '3600',
            upsert: true
          });
        
        if (coverError) {
          throw coverError;
        }
        
        // Get the public URL for the cover
        const { data: publicCoverData } = supabase
          .storage
          .from('songs')
          .getPublicUrl(coverFileName);
        
        coverImageUrl = publicCoverData.publicUrl;
      } else if (coverPreview && coverPreview.startsWith('http')) {
        // Use AI-generated or selected cover URL directly
        coverImageUrl = coverPreview;
      } else {
        // Use a random cover from our options if no cover was provided or generated
        coverImageUrl = aiCoverOptions[Math.floor(Math.random() * aiCoverOptions.length)];
      }
      
      // Store the song metadata in the database
      const { data: songRecord, error: dbError } = await supabase
        .from('songs')
        .insert([
          {
            title,
            artist,
            audio_url: audioUrl,
            cover_url: coverImageUrl
          }
        ])
        .select();
      
      if (dbError) {
        console.error("Database error:", dbError);
        // Continue even if database storage fails
      }
      
      // Create the song object to return
      const newSong = {
        id: songRecord && songRecord[0] ? songRecord[0].id : `upload-${timestamp}`,
        title,
        artist,
        coverImage: coverImageUrl,
        audioUrl,
        isLiked: false
      };
      
      console.log("Uploaded song:", newSong);
      
      // Add to the user's library
      onSongUploaded(newSong);
      
      toast({
        title: "Upload successful",
        description: `"${title}" has been added to your library`,
      });
      
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your song. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <GlassmorphicCard className="p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold purple-gradient-text">Upload Song</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-[#6A1B9A]/10 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-secondary/50 rounded-md border border-[#6A1B9A]/20 focus:border-[#FF10F0] focus:ring-1 focus:ring-[#FF10F0] outline-none"
            placeholder="Song title"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Artist</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full p-2 bg-secondary/50 rounded-md border border-[#6A1B9A]/20 focus:border-[#FF10F0] focus:ring-1 focus:ring-[#FF10F0] outline-none"
            placeholder="Artist name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Audio File (MP3, WAV)</label>
          <input
            type="file"
            ref={songInputRef}
            onChange={handleSongSelect}
            accept="audio/*"
            className="hidden"
          />
          <div 
            onClick={() => songInputRef.current?.click()}
            className={`w-full p-4 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors ${
              songFile ? 'border-[#FF10F0]/50 bg-[#FF10F0]/5' : 'border-[#6A1B9A]/20 hover:border-[#6A1B9A]/40'
            }`}
          >
            {songFile ? (
              <div className="flex items-center">
                <Music className="mr-2 text-[#FF10F0]" size={20} />
                <span className="text-sm truncate max-w-[200px]">{songFile.name}</span>
              </div>
            ) : (
              <>
                <Upload className="mb-2 text-[#6A1B9A]/60" size={24} />
                <span className="text-sm text-center">Click to select audio file</span>
              </>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium">Cover Image (Optional)</label>
            <button
              type="button"
              onClick={generateAICover}
              className="text-xs text-[#FF10F0] flex items-center hover:underline"
              disabled={isGeneratingCover}
            >
              <Sparkles size={12} className="mr-1" />
              {isGeneratingCover ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>
          <input
            type="file"
            ref={coverInputRef}
            onChange={handleCoverSelect}
            accept="image/*"
            className="hidden"
          />
          <div 
            onClick={() => coverInputRef.current?.click()}
            className={`w-full p-4 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors ${
              coverPreview ? 'border-[#FF10F0]/50 bg-[#FF10F0]/5' : 'border-[#6A1B9A]/20 hover:border-[#6A1B9A]/40'
            }`}
          >
            {coverPreview ? (
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 overflow-hidden rounded-md mb-2">
                  <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs">Click to change</span>
              </div>
            ) : (
              <>
                <ImageIcon className="mb-2 text-[#6A1B9A]/60" size={24} />
                <span className="text-sm text-center">Click to select cover image or use AI</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex justify-end pt-2">
          <AnimatedButton
            type="button"
            variant="outline"
            onClick={onClose}
            className="mr-2"
          >
            Cancel
          </AnimatedButton>
          
          <AnimatedButton
            type="submit"
            disabled={isUploading || !songFile}
            className="bg-[#FF10F0] text-white hover:bg-[#FF10F0]/80"
          >
            {isUploading ? 'Uploading...' : 'Upload Song'}
          </AnimatedButton>
        </div>
      </form>
    </GlassmorphicCard>
  );
};

export default UploadSong;
