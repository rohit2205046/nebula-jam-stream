
export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "listening";
  song?: {
    title: string;
    artist: string;
  };
  sessionId?: string;
}

export interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
  mutualFriends?: number;
}

export interface FriendSession {
  id: string;
  hostId: string;
  hostName: string;
  songId: string;
  songTitle: string;
  songArtist: string;
  listeners: string[];
  isPrivate: boolean;
  startedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  attachedSong?: {
    id: string;
    title: string;
    artist: string;
    coverUrl: string;
  };
}

export interface Chat {
  id: string;
  participants: Friend[];
  messages: Message[];
  lastReadMessageId?: string;
}

export interface Notification {
  id: string;
  type: "friend_request" | "message" | "song_share" | "listening_invite";
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  actionId?: string;
  actionType?: string;
}
