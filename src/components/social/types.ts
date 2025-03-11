
export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "listening";
  song?: {
    title: string;
    artist: string;
  };
}

export interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
}
