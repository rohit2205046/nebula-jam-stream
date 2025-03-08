
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { Plus, Music } from "lucide-react";

interface AddSongProps {
  onAddSong: (song: { 
    id: string; 
    title: string; 
    artist: string; 
    coverImage: string;
    isLiked: boolean;
  }) => void;
}

const AddSong: React.FC<AddSongProps> = ({ onAddSong }) => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [coverImage, setCoverImage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use a default cover image if none is provided
    const finalCoverImage = coverImage || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3";
    
    // Generate a random ID
    const newId = Date.now().toString();
    
    // Create the new song object
    const newSong = {
      id: newId,
      title,
      artist,
      coverImage: finalCoverImage,
      isLiked: false,
    };
    
    // Add the song
    onAddSong(newSong);
    
    // Reset form
    setTitle("");
    setArtist("");
    setCoverImage("");
    setIsFormOpen(false);
    
    // Show success toast
    toast({
      title: "Song Added!",
      description: `${title} by ${artist} has been added to your library.`,
    });
  };
  
  if (!isFormOpen) {
    return (
      <Button 
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-24 right-6 z-10 p-4 rounded-full bg-nebula-600 hover:bg-nebula-700 shadow-glow"
      >
        <Plus size={24} />
      </Button>
    );
  }
  
  return (
    <GlassmorphicCard className="fixed bottom-24 right-6 z-10 p-6 w-[320px] animate-fade-in">
      <div className="flex items-center mb-4">
        <Music className="mr-2 text-nebula-600" size={20} />
        <h3 className="text-lg font-semibold">Add New Song</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full"
          />
        </div>
        
        <div>
          <Input
            placeholder="Artist name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
            className="w-full"
          />
        </div>
        
        <div>
          <Input
            placeholder="Cover image URL (optional)"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsFormOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex-1 bg-nebula-600 hover:bg-nebula-700"
          >
            Add Song
          </Button>
        </div>
      </form>
    </GlassmorphicCard>
  );
};

export default AddSong;
