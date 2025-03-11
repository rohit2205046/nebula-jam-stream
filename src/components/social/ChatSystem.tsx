
import React, { useState, useRef, useEffect } from "react";
import { Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isMe: boolean;
}

const ChatSystem = () => {
  const [currentChat, setCurrentChat] = useState<string>("friend1");
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock chat data
  const [chats, setChats] = useState<{
    [key: string]: {
      friend: {
        id: string;
        name: string;
        avatar: string;
        status: "online" | "offline" | "listening";
      },
      messages: Message[]
    }
  }>({
    friend1: {
      friend: {
        id: "friend1",
        name: "Jordan Lee",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        status: "online"
      },
      messages: [
        {
          id: "1",
          sender: "Jordan Lee",
          content: "Hey, what are you listening to?",
          timestamp: new Date(Date.now() - 3600000),
          isMe: false
        },
        {
          id: "2",
          sender: "You",
          content: "Just checking out the new Weeknd album. It's awesome!",
          timestamp: new Date(Date.now() - 3000000),
          isMe: true
        },
        {
          id: "3",
          sender: "Jordan Lee",
          content: "Nice! Want to listen together?",
          timestamp: new Date(Date.now() - 2400000),
          isMe: false
        },
        {
          id: "4",
          sender: "You",
          content: "Sure! I'll send you a referral code.",
          timestamp: new Date(Date.now() - 1800000),
          isMe: true
        }
      ]
    },
    friend2: {
      friend: {
        id: "friend2",
        name: "Taylor Swift",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        status: "listening"
      },
      messages: [
        {
          id: "1",
          sender: "Taylor Swift",
          content: "Have you heard my new single?",
          timestamp: new Date(Date.now() - 86400000),
          isMe: false
        },
        {
          id: "2",
          sender: "You",
          content: "Yes! It's amazing!",
          timestamp: new Date(Date.now() - 80000000),
          isMe: true
        }
      ]
    },
    friend3: {
      friend: {
        id: "friend3",
        name: "Rihanna",
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        status: "offline"
      },
      messages: [
        {
          id: "1",
          sender: "Rihanna",
          content: "Let me know when you're free to jam!",
          timestamp: new Date(Date.now() - 432000000),
          isMe: false
        }
      ]
    }
  });

  useEffect(() => {
    scrollToBottom();
  }, [currentChat, chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: message,
      timestamp: new Date(),
      isMe: true
    };

    setChats(prevChats => ({
      ...prevChats,
      [currentChat]: {
        ...prevChats[currentChat],
        messages: [...prevChats[currentChat].messages, newMessage]
      }
    }));

    setMessage("");

    // Simulate a reply after 1-3 seconds
    setTimeout(() => {
      const friend = chats[currentChat].friend;
      if (friend.status === "online" || friend.status === "listening") {
        const replies = [
          "That sounds great!",
          "Cool! Let's do it.",
          "I'm listening to some new music right now. Want to join?",
          "Have you checked out the new playlist on Nebula?",
          "Thanks for sharing that song earlier. I loved it!"
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyMessage: Message = {
          id: Date.now().toString(),
          sender: friend.name,
          content: randomReply,
          timestamp: new Date(),
          isMe: false
        };
        
        setChats(prevChats => ({
          ...prevChats,
          [currentChat]: {
            ...prevChats[currentChat],
            messages: [...prevChats[currentChat].messages, replyMessage]
          }
        }));
      }
    }, Math.random() * 2000 + 1000);
  };

  return (
    <div className="flex h-[60vh] max-h-[600px]">
      {/* Chat List */}
      <div className="w-1/3 border-r border-border overflow-y-auto">
        {Object.entries(chats).map(([chatId, chat]) => (
          <div 
            key={chatId}
            onClick={() => setCurrentChat(chatId)}
            className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
              currentChat === chatId ? "bg-purple-800/10" : "hover:bg-secondary/50"
            }`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={chat.friend.avatar} 
                  alt={chat.friend.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                chat.friend.status === 'online' ? 'bg-green-500' : 
                chat.friend.status === 'listening' ? 'bg-purple-500 animate-pulse' : 
                'bg-gray-400'
              }`}></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{chat.friend.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {chat.messages.length > 0 
                  ? `${chat.messages[chat.messages.length - 1].sender === "You" ? "You: " : ""}${chat.messages[chat.messages.length - 1].content}`
                  : "Start a conversation"}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-3 border-b border-border flex items-center gap-3 sticky top-0 bg-background">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={chats[currentChat].friend.avatar} 
              alt={chats[currentChat].friend.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{chats[currentChat].friend.name}</p>
            <p className="text-xs text-muted-foreground">
              {chats[currentChat].friend.status === 'online' ? 'Online' : 
               chats[currentChat].friend.status === 'listening' ? 'Listening to music' : 
               'Offline'}
            </p>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chats[currentChat].messages.length > 0 ? (
            chats[currentChat].messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] ${msg.isMe ? "order-2" : "order-1"}`}>
                  {!msg.isMe && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img 
                          src={chats[currentChat].friend.avatar} 
                          alt={msg.sender}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium">{msg.sender}</span>
                    </div>
                  )}
                  <div 
                    className={`rounded-xl p-3 ${
                      msg.isMe 
                        ? "bg-purple-800 text-white"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 text-right ${
                      msg.isMe ? "text-purple-100" : "text-muted-foreground"
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-3" />
                <p>No messages yet</p>
                <p className="text-sm">Send a message to start chatting</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <div className="p-3 border-t border-border">
          <div className="flex gap-2">
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="bg-secondary/50"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-purple-800 hover:bg-purple-700"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
