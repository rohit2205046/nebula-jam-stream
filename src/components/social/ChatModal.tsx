
import React, { useState } from "react";
import { X } from "lucide-react";
import ChatSystem from "@/components/social/ChatSystem";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";

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
        className="w-full max-w-3xl z-10 relative max-h-[80vh] overflow-hidden flex flex-col"
        variant="dark"
      >
        <div className="flex justify-between items-center p-4 border-b border-[#6A1B9A]/30">
          <h2 className="text-xl font-bold purple-gradient-text">Chat with Friends</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#6A1B9A]/20 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatSystem />
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default ChatModal;
