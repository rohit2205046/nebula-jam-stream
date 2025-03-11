
import React, { useState } from "react";
import { UserPlus, Search, Music, X, Check, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "listening";
  song?: {
    title: string;
    artist: string;
  };
}

const FriendsList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [friendRequests, setFriendRequests] = useState<{id: string, name: string, avatar: string}[]>([
    {
      id: "req1",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    }
  ]);
  
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "friend1",
      name: "Jordan Lee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      status: "online"
    },
    {
      id: "friend2",
      name: "Taylor Swift",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      status: "listening",
      song: {
        title: "Midnight Rain",
        artist: "Taylor Swift"
      }
    },
    {
      id: "friend3",
      name: "Rihanna",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      status: "offline"
    }
  ]);

  const addNewFriend = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a username to send a friend request.",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending friend request
    toast({
      title: "Friend Request Sent",
      description: `A friend request has been sent to ${searchQuery}.`,
    });
    
    setSearchQuery("");
  };

  const acceptFriendRequest = (id: string) => {
    const request = friendRequests.find(req => req.id === id);
    if (request) {
      setFriends([...friends, { ...request, status: "online" }]);
      setFriendRequests(friendRequests.filter(req => req.id !== id));
      
      toast({
        title: "Friend Added",
        description: `${request.name} is now your friend!`,
      });
    }
  };

  const declineFriendRequest = (id: string) => {
    setFriendRequests(friendRequests.filter(req => req.id !== id));
  };

  const listenWithFriend = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (friend) {
      toast({
        title: "Listening Session Started",
        description: `You are now listening to music with ${friend.name}.`,
      });
    }
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search or add friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/50"
          />
        </div>
        <Button 
          onClick={addNewFriend}
          className="bg-purple-800 hover:bg-purple-700"
        >
          <UserPlus size={16} />
        </Button>
      </div>

      {friendRequests.length > 0 && (
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
                    onClick={() => acceptFriendRequest(request.id)}
                    className="text-green-500 hover:text-green-600 hover:bg-green-100"
                  >
                    <Check size={16} />
                  </Button>
                  <Button 
                    size="sm"
                    variant="ghost"
                    onClick={() => declineFriendRequest(request.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-100"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Your Friends ({friends.length})</h3>
        {filteredFriends.length > 0 ? (
          <div className="space-y-2">
            {filteredFriends.map(friend => (
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
                    onClick={() => listenWithFriend(friend.id)}
                    className="bg-purple-800 hover:bg-purple-700 text-xs"
                  >
                    <Music size={14} className="mr-1" />
                    Listen Together
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            <UserRoundPlus className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="mb-2">No friends found matching your search</p>
            <Button 
              onClick={addNewFriend}
              className="bg-purple-800 hover:bg-purple-700"
            >
              <UserPlus size={16} className="mr-2" />
              Add New Friend
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
