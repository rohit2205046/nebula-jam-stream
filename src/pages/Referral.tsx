
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MusicPlayer from "@/components/layout/MusicPlayer";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Check, Music, UserPlus, Users, QrCode } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Referral = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [referralCode, setReferralCode] = useState(() => {
    // Generate a unique referral code
    return `NEBULA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  });
  const [friendCodeInput, setFriendCodeInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const isMobile = useIsMobile();

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Set initial theme
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setIsCopied(true);
    
    toast({
      title: "Referral code copied!",
      description: "Share this code with your friends to listen together.",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const connectWithFriend = () => {
    if (!friendCodeInput) {
      toast({
        title: "Please enter a referral code",
        description: "Enter your friend's referral code to connect with them.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would validate the code and connect to the friend's session
    toast({
      title: "Connected!",
      description: `You're now connected to ${friendCodeInput}. Start listening together!`,
    });
    
    // Simulate activating shared listening
    const sharedEvent = new CustomEvent('activate-shared-listening', { 
      detail: { friendCode: friendCodeInput } 
    });
    window.dispatchEvent(sharedEvent);
    
    setFriendCodeInput("");
  };
  
  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-[#f5f3ff]"} text-foreground overflow-x-hidden transition-colors duration-300`}>
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className={`absolute top-[10%] left-[20%] w-72 h-72 rounded-full ${theme === "dark" ? "bg-[#FF10F0]/10" : "bg-[#FF10F0]/5"} blur-[100px] animate-pulse-slow`}></div>
        <div className={`absolute bottom-[30%] right-[10%] w-80 h-80 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/15" : "bg-[#9C27B0]/10"} blur-[120px] animate-pulse-slow animate-delay-300`}></div>
      </div>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="relative z-10 pt-24 pb-32 px-4">
        <h1 className="text-3xl font-bold mb-6 purple-gradient-text flex items-center">
          <Share2 className="mr-3 text-[#FF10F0]" />
          Referral & Shared Listening
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <GlassmorphicCard className="h-full">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <UserPlus className="mr-2 text-[#FF10F0]" /> 
              Your Referral Code
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Share this code with your friends so they can join your listening sessions and experience music together in real-time.
            </p>
            
            <div className="bg-[#6A1B9A]/20 backdrop-blur-md rounded-lg p-4 mb-6 flex items-center justify-between">
              <span className="font-mono text-lg tracking-wider">{referralCode}</span>
              <AnimatedButton
                variant="default"
                size="sm"
                onClick={copyReferralCode}
                className="bg-[#FF10F0] hover:bg-[#FF10F0]/80"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </AnimatedButton>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <AnimatedButton 
                variant="outline"
                className="flex items-center justify-center"
                onClick={() => {
                  toast({
                    title: "Sharing via QR Code",
                    description: "This would open a QR code for your friends to scan"
                  });
                }}
              >
                <QrCode size={16} className="mr-2" />
                Share QR Code
              </AnimatedButton>
              
              <AnimatedButton 
                variant="outline"
                className="flex items-center justify-center"
                onClick={() => {
                  navigator.share?.({
                    title: 'Join my Nebula music session',
                    text: `Join my music session with code: ${referralCode}`,
                    url: window.location.href,
                  }).catch(err => console.error('Error sharing:', err));
                }}
              >
                <Share2 size={16} className="mr-2" />
                Share Link
              </AnimatedButton>
            </div>
          </GlassmorphicCard>
          
          <GlassmorphicCard className="h-full">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2 text-[#FF10F0]" /> 
              Connect with Friends
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your friend's referral code to join their music session and listen together in real-time.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Friend's Referral Code</label>
                <Input 
                  value={friendCodeInput}
                  onChange={(e) => setFriendCodeInput(e.target.value)}
                  placeholder="e.g. NEBULA-ABC123"
                  className="w-full bg-[#6A1B9A]/20 backdrop-blur-md border-[#6A1B9A]/30"
                />
              </div>
              
              <AnimatedButton 
                variant="default"
                className="w-full bg-[#FF10F0] hover:bg-[#FF10F0]/80"
                onClick={connectWithFriend}
              >
                <Music size={16} className="mr-2" />
                Connect & Listen Together
              </AnimatedButton>
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#6A1B9A]/20">
              <h3 className="text-sm font-medium mb-2">How it works:</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-[#FF10F0] text-white rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">1</span>
                  <span>Enter your friend's referral code above</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-[#FF10F0] text-white rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">2</span>
                  <span>Click "Connect & Listen Together"</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-[#FF10F0] text-white rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">3</span>
                  <span>Start listening to the same music in perfect sync</span>
                </li>
              </ul>
            </div>
          </GlassmorphicCard>
        </div>
        
        <GlassmorphicCard className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Listening Sessions</h2>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
            <div className="bg-[#6A1B9A]/20 backdrop-blur-md rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Ambient Waves Session</span>
                <span className="text-xs text-[#FF10F0]">2 listeners</span>
              </div>
              <p className="text-xs text-muted-foreground">Yesterday, 8:45 PM</p>
            </div>
            
            <div className="bg-[#6A1B9A]/20 backdrop-blur-md rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Synthwave Party</span>
                <span className="text-xs text-[#FF10F0]">4 listeners</span>
              </div>
              <p className="text-xs text-muted-foreground">3 days ago</p>
            </div>
            
            <div className="bg-[#6A1B9A]/20 backdrop-blur-md rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Chill Study Vibes</span>
                <span className="text-xs text-[#FF10F0]">3 listeners</span>
              </div>
              <p className="text-xs text-muted-foreground">Last week</p>
            </div>
          </div>
        </GlassmorphicCard>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Referral;
