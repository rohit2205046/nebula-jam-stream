
import { useState } from "react";
import { Copy, Share2, Users, MessageSquare, Music } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MusicPlayer from "@/components/layout/MusicPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FriendsList from "@/components/social/FriendsList";
import ChatSystem from "@/components/social/ChatSystem";
import { useToast } from "@/hooks/use-toast";

const Referral = () => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("NEBULA-" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [friendCode, setFriendCode] = useState("");

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Code Copied!",
      description: "Referral code has been copied to your clipboard.",
    });
  };

  const shareReferralCode = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join me on Nebula Music!",
        text: `Use my referral code ${referralCode} to join me on Nebula Music and listen together!`,
        url: window.location.origin,
      }).catch((error) => console.log("Error sharing:", error));
    } else {
      copyReferralCode();
    }
  };

  const redeemCode = () => {
    if (!friendCode.trim()) {
      toast({
        title: "Empty Code",
        description: "Please enter a valid referral code.",
        variant: "destructive",
      });
      return;
    }

    // Simulate successful code redemption
    toast({
      title: "Success!",
      description: "You can now listen to music together with your friend!",
    });
    
    // Reset the input field
    setFriendCode("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-32">
        <h1 className="text-3xl font-bold purple-gradient-text text-center mb-8">
          Referral & Connect
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Share Referral Code */}
          <GlassmorphicCard className="p-6 animate-float">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Share2 className="text-purple-800" />
              Share Your Referral Code
            </h2>
            <p className="text-muted-foreground mb-6">
              Invite friends to join you on Nebula Music. Share your unique code and listen to music together!
            </p>
            
            <div className="flex flex-col space-y-4">
              <div className="flex">
                <Input 
                  value={referralCode} 
                  readOnly 
                  className="rounded-r-none border-r-0 bg-secondary/50"
                />
                <Button 
                  onClick={copyReferralCode}
                  className="rounded-l-none bg-purple-800 hover:bg-purple-700"
                >
                  <Copy size={16} />
                </Button>
              </div>
              
              <Button 
                onClick={shareReferralCode}
                className="w-full bg-purple-800 hover:bg-purple-700"
              >
                <Share2 size={16} className="mr-2" />
                Share Code
              </Button>
            </div>
          </GlassmorphicCard>
          
          {/* Redeem Code */}
          <GlassmorphicCard className="p-6 animate-float animate-delay-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Music className="text-purple-800" />
              Listen Together
            </h2>
            <p className="text-muted-foreground mb-6">
              Enter a friend's referral code to connect and listen to music together in real-time.
            </p>
            
            <div className="flex flex-col space-y-4">
              <Input 
                value={friendCode} 
                onChange={(e) => setFriendCode(e.target.value)}
                placeholder="Enter friend's code (e.g., NEBULA-X7Y2Z9)"
                className="bg-secondary/50"
              />
              
              <Button 
                onClick={redeemCode}
                className="w-full bg-purple-800 hover:bg-purple-700"
              >
                Connect & Listen
              </Button>
            </div>
          </GlassmorphicCard>
        </div>
        
        {/* Tabs for Friends and Chat */}
        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50 p-1">
            <TabsTrigger value="friends" className="data-[state=active]:bg-purple-800 data-[state=active]:text-white">
              <Users size={16} className="mr-2" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-purple-800 data-[state=active]:text-white">
              <MessageSquare size={16} className="mr-2" />
              Chat
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="friends">
            <GlassmorphicCard className="p-6">
              <FriendsList />
            </GlassmorphicCard>
          </TabsContent>
          
          <TabsContent value="chat">
            <GlassmorphicCard className="p-6">
              <ChatSystem />
            </GlassmorphicCard>
          </TabsContent>
        </Tabs>
      </div>
      
      <MusicPlayer />
    </div>
  );
};

export default Referral;
