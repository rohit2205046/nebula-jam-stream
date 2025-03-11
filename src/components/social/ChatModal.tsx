
import React, { useState } from "react";
import { X, UserPlus } from "lucide-react";
import ChatSystem from "@/components/social/ChatSystem";
import FriendsList from "@/components/social/FriendsList"; 
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <GlassmorphicCard 
        className="w-full max-w-3xl z-10 relative max-h-[85vh] overflow-hidden flex flex-col"
        variant="dark"
      >
        <div className="flex justify-between items-center p-4 border-b border-[#6A1B9A]/30">
          <h2 className="text-xl font-bold purple-gradient-text">Nebula Connect</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#6A1B9A]/20 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-2 bg-[#403E43]/60 p-1">
            <TabsTrigger value="chat" className="data-[state=active]:bg-[#6A1B9A] data-[state=active]:text-white">
              Chat
            </TabsTrigger>
            <TabsTrigger value="friends" className="data-[state=active]:bg-[#6A1B9A] data-[state=active]:text-white">
              Friends
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-0">
            <div className="flex-1 overflow-hidden">
              <ChatSystem />
            </div>
          </TabsContent>
          
          <TabsContent value="friends" className="mt-0 p-4">
            <FriendsList />
          </TabsContent>
        </Tabs>
      </GlassmorphicCard>
    </div>
  );
};

export default ChatModal;
