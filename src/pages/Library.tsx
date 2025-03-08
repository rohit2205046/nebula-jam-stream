
import React from "react";
import Navbar from "@/components/layout/Navbar";
import MusicLibrary from "@/components/music/MusicLibrary";
import MusicPlayer from "@/components/layout/MusicPlayer";

const Library = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Library</h1>
        </div>
        <MusicLibrary />
      </main>
      <MusicPlayer />
    </div>
  );
};

export default Library;
