
import React from "react";
import Navbar from "@/components/layout/Navbar";
import MusicPlayer from "@/components/layout/MusicPlayer";
import ChatSystem from "@/components/social/ChatSystem";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { MessageSquare } from "lucide-react";

const Chat = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Set initial theme
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-[#f5f3ff]"} text-foreground overflow-x-hidden transition-colors duration-300`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className={`absolute top-[10%] left-[20%] w-72 h-72 rounded-full ${theme === "dark" ? "bg-[#FF10F0]/10" : "bg-[#FF10F0]/5"} blur-[100px] animate-pulse-slow`}></div>
        <div className={`absolute bottom-[30%] right-[10%] w-80 h-80 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/15" : "bg-[#9C27B0]/10"} blur-[120px] animate-pulse-slow animate-delay-300`}></div>
      </div>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="relative z-10 pt-24 pb-32 px-4">
        <h1 className="text-3xl font-bold mb-6 purple-gradient-text">Chat with Friends</h1>
        
        <GlassmorphicCard className="mb-8">
          <div className="flex items-center mb-4">
            <MessageSquare className="mr-3 text-[#FF10F0]" />
            <h2 className="text-xl font-semibold">Nebula Chat</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Chat with your friends and share music in real-time. You can also listen to music together by sharing your referral code.
          </p>
          
          <ChatSystem />
        </GlassmorphicCard>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Chat;
