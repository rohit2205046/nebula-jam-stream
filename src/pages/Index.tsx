
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MusicLibrary from "@/components/music/MusicLibrary";
import MusicPlayer from "@/components/layout/MusicPlayer";
import { MessageSquare } from "lucide-react";
import ChatModal from "@/components/social/ChatModal";

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[10%] left-[20%] w-72 h-72 rounded-full bg-[#6A1B9A]/10 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[30%] right-[10%] w-80 h-80 rounded-full bg-[#6A1B9A]/15 blur-[120px] animate-pulse-slow animate-delay-300"></div>
        <div className="absolute top-[40%] right-[30%] w-40 h-40 rounded-full bg-[#9C27B0]/10 blur-[80px] animate-pulse-slow animate-delay-500"></div>
        <div className="absolute bottom-[10%] left-[5%] w-60 h-60 rounded-full bg-[#6A1B9A]/10 blur-[90px] animate-pulse-slow animate-delay-200"></div>
        
        {/* Star-like elements */}
        <div className="absolute top-[15%] left-[40%] w-1 h-1 rounded-full bg-white animate-pulse-slow"></div>
        <div className="absolute top-[25%] left-[80%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-300"></div>
        <div className="absolute top-[60%] left-[30%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-400"></div>
        <div className="absolute top-[75%] left-[70%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-200"></div>
        <div className="absolute top-[85%] left-[20%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-100"></div>
      </div>
      
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-32 px-4">
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Good evening</h1>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#403E43]/60 backdrop-blur-md p-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-[#403E43]/80 transition-colors">
              <div className="w-12 h-12 rounded bg-purple-800/50 flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="font-medium">Liked Songs</span>
            </div>
            <div className="bg-[#403E43]/60 backdrop-blur-md p-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-[#403E43]/80 transition-colors">
              <div className="w-12 h-12 rounded bg-gradient-to-br from-[#6A1B9A] to-[#9C27B0] flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="font-medium">Your Playlist</span>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Recently played</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col items-center text-center">
                <div className="w-full aspect-square bg-[#403E43]/60 backdrop-blur-md rounded-lg mb-2 overflow-hidden group relative cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#6A1B9A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-sm">Album Name</h3>
                <p className="text-xs text-gray-400">Artist Name</p>
              </div>
            ))}
          </div>
        </section>
        
        <MusicLibrary />
      </main>
      
      <button 
        onClick={() => setChatOpen(true)}
        className="fixed bottom-24 right-6 z-30 w-14 h-14 rounded-full bg-[#6A1B9A] flex items-center justify-center shadow-lg shadow-[#6A1B9A]/30 hover:scale-110 transition-transform love-pulse"
      >
        <MessageSquare className="text-white" />
      </button>
      
      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      
      <MusicPlayer />
    </div>
  );
};

export default Index;
