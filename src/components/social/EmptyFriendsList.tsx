
import React from "react";
import { UserRoundPlus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyFriendsListProps {
  onAddNewFriend: () => void;
}

const EmptyFriendsList = ({ onAddNewFriend }: EmptyFriendsListProps) => {
  return (
    <div className="text-center p-8 text-muted-foreground">
      <UserRoundPlus className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
      <p className="mb-2">No friends found matching your search</p>
      <Button 
        onClick={onAddNewFriend}
        className="bg-purple-800 hover:bg-purple-700"
      >
        <UserPlus size={16} className="mr-2" />
        Add New Friend
      </Button>
    </div>
  );
};

export default EmptyFriendsList;
