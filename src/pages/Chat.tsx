import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import MusicPlayer from "@/components/layout/MusicPlayer";
import ChatSystem from "@/components/social/ChatSystem";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { MessageSquare, Users, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FriendsList from "@/components/social/FriendsList";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ShootingStars from "@/components/ui/ShootingStars";

const Chat = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeTab, setActiveTab] = useState("messages");
  const [listeningTogether, setListeningTogether] = useState(false);
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);
  
  const handleStartListeningTogether = () => {
    setListeningTogether(true);
    toast({
      title: "Listening together activated!",
      description: "Your friends can now see what you're listening to."
    });
  };
  
  const handleStopListeningTogether = () => {
    setListeningTogether(false);
    toast({
      description: "Listening together deactivated"
    });
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-[#f5f3ff]"} text-foreground overflow-x-hidden transition-colors duration-300`}>
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className={`absolute top-[10%] left-[20%] w-72 h-72 rounded-full ${theme === "dark" ? "bg-[#FF10F0]/10" : "bg-[#FF10F0]/5"} blur-[100px] animate-pulse-slow`}></div>
        <div className={`absolute bottom-[30%] right-[10%] w-80 h-80 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/15" : "bg-[#9C27B0]/10"} blur-[120px] animate-pulse-slow animate-delay-300`}></div>
        
        {theme === "dark" && (
          <>
            <div className="absolute top-[15%] left-[40%] w-1 h-1 rounded-full bg-white animate-pulse-slow"></div>
            <div className="absolute top-[25%] left-[80%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-300"></div>
            <div className="absolute top-[60%] left-[30%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-400"></div>
            <div className="absolute top-[75%] left-[70%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-200"></div>
            <div className="absolute top-[85%] left-[20%] w-1 h-1 rounded-full bg-white animate-pulse-slow animate-delay-100"></div>
          </>
        )}
        
        {theme === "dark" && <ShootingStars />}
      </div>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="relative z-10 pt-24 pb-32 px-4">
        <h1 className="text-3xl font-bold mb-6 purple-gradient-text">Chat with Friends</h1>
        
        <div className="mb-4">
          {listeningTogether ? (
            <div className="flex items-center space-x-4 mb-6">
              <GlassmorphicCard className="flex-1 p-4 bg-[#FF10F0]/20">
                <div className="flex items-center">
                  <Music className="mr-3 text-[#FF10F0]" />
                  <div>
                    <h3 className="font-medium">Currently Listening Together</h3>
                    <p className="text-sm text-muted-foreground">Your friends can see your music in real-time</p>
                  </div>
                </div>
              </GlassmorphicCard>
              <Button 
                variant="secondary" 
                className="whitespace-nowrap"
                onClick={handleStopListeningTogether}
              >
                Stop Sharing
              </Button>
            </div>
          ) : (
            <Button 
              variant="secondary"
              className="mb-6 bg-[#FF10F0]/60 hover:bg-[#FF10F0]/80 text-white"
              onClick={handleStartListeningTogether}
            >
              <Music className="mr-2 h-4 w-4" />
              Start Listening Together
            </Button>
          )}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-secondary/50 backdrop-blur-sm mb-6">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Users size={16} />
              <span className="hidden sm:inline">Friends</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="mt-0 animate-fade-in">
            <GlassmorphicCard className="mb-8">
              <div className="flex items-center mb-4">
                <MessageSquare className="mr-3 text-[#FF10F0]" />
                <h2 className="text-xl font-semibold">Nebula Chat</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Chat with your friends and share music in real-time. You can also listen to music together with your friends.
              </p>
              
              <ChatSystem />
            </GlassmorphicCard>
          </TabsContent>
          
          <TabsContent value="friends" className="mt-0 animate-fade-in">
            <GlassmorphicCard className="mb-8">
              <div className="flex items-center mb-4">
                <Users className="mr-3 text-[#FF10F0]" />
                <h2 className="text-xl font-semibold">Your Friends</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Manage your friends list and see who's online. Add new friends using their referral code.
              </p>
              
              <FriendsList />
            </GlassmorphicCard>
          </TabsContent>
        </Tabs>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Chat;
