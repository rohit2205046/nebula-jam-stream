
import React from "react";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FriendSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNewFriend: () => void;
}

const FriendSearch = ({ searchQuery, onSearchChange, onAddNewFriend }: FriendSearchProps) => {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search or add friends..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-secondary/50"
        />
      </div>
      <Button 
        onClick={onAddNewFriend}
        className="bg-purple-800 hover:bg-purple-700"
      >
        <UserPlus size={16} />
      </Button>
    </div>
  );
};

export default FriendSearch;
