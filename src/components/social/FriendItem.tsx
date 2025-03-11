
import React from "react";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Friend } from "./types";

interface FriendItemProps {
  friend: Friend;
  onListenTogether: (friendId: string) => void;
}

const FriendItem = ({ friend, onListenTogether }: FriendItemProps) => {
  return (
    <div 
      key={friend.id} 
      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={friend.avatar} 
              alt={friend.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
            friend.status === 'online' ? 'bg-green-500' : 
            friend.status === 'listening' ? 'bg-purple-500 animate-pulse' : 
            'bg-gray-400'
          }`}></span>
        </div>
        <div>
          <div className="font-medium">{friend.name}</div>
          {friend.status === 'listening' && friend.song && (
            <div className="text-xs text-muted-foreground flex items-center">
              <Music size={10} className="mr-1" />
              {friend.song.title} - {friend.song.artist}
            </div>
          )}
          {friend.status === 'online' && (
            <div className="text-xs text-green-500">Online</div>
          )}
          {friend.status === 'offline' && (
            <div className="text-xs text-muted-foreground">Offline</div>
          )}
        </div>
      </div>
      
      {friend.status !== 'offline' && (
        <Button 
          size="sm" 
          onClick={() => onListenTogether(friend.id)}
          className="bg-purple-800 hover:bg-purple-700 text-xs"
        >
          <Music size={14} className="mr-1" />
          Listen Together
        </Button>
      )}
    </div>
  );
};

export default FriendItem;
