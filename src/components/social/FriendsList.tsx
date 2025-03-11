
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FriendSearch from "./FriendSearch";
import FriendRequests from "./FriendRequests";
import FriendItem from "./FriendItem";
import EmptyFriendsList from "./EmptyFriendsList";
import { Friend, FriendRequest } from "./types";

const FriendsList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <FriendSearch 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAddNewFriend={addNewFriend}
      />

      <FriendRequests 
        friendRequests={friendRequests}
        onAccept={acceptFriendRequest}
        onDecline={declineFriendRequest}
      />

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Your Friends ({friends.length})</h3>
        {filteredFriends.length > 0 ? (
          <div className="space-y-2">
            {filteredFriends.map(friend => (
              <FriendItem 
                key={friend.id}
                friend={friend}
                onListenTogether={listenWithFriend}
              />
            ))}
          </div>
        ) : (
          <EmptyFriendsList onAddNewFriend={addNewFriend} />
        )}
      </div>
    </div>
  );
};

export default FriendsList;
