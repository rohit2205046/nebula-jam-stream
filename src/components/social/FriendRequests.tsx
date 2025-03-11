
import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FriendRequest } from "./types";
import { useToast } from "@/hooks/use-toast";

interface FriendRequestsProps {
  friendRequests: FriendRequest[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

const FriendRequests = ({ friendRequests, onAccept, onDecline }: FriendRequestsProps) => {
  if (friendRequests.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">Friend Requests</h3>
      <div className="space-y-2">
        {friendRequests.map(request => (
          <div 
            key={request.id} 
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={request.avatar} 
                  alt={request.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium">{request.name}</span>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm"
                variant="ghost"
                onClick={() => onAccept(request.id)}
                className="text-green-500 hover:text-green-600 hover:bg-green-100"
              >
                <Check size={16} />
              </Button>
              <Button 
                size="sm"
                variant="ghost"
                onClick={() => onDecline(request.id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-100"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
