
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MusicPlayer from "@/components/layout/MusicPlayer";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Check, Music, UserPlus, Users, QrCode, Crown, Clock, Gift } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import ReferralCodeDisplay from "@/components/social/ReferralCodeDisplay";
import ReferralCodeInput from "@/components/social/ReferralCodeInput";

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

  // Demo plans for referral program
  const referralPlans = [
    {
      name: "Basic",
      icon: <Music className="text-[#FF10F0] h-8 w-8" />,
      benefits: ["5 Shared Sessions/month", "Basic Sound Quality", "1 Friend Invite"],
      earnedDays: 7,
      color: "from-[#FF10F0]/70 to-[#6A1B9A]/70"
    },
    {
      name: "Premium",
      icon: <Crown className="text-[#FFD700] h-8 w-8" />,
      benefits: ["Unlimited Shared Sessions", "High Sound Quality", "5 Friend Invites"],
      earnedDays: 30,
      color: "from-[#6A1B9A] to-[#FF10F0]",
      highlighted: true
    },
    {
      name: "Family",
      icon: <Users className="text-[#32CD32] h-8 w-8" />,
      benefits: ["6 Family Accounts", "Ultra Sound Quality", "10 Friend Invites"],
      earnedDays: 45,
      color: "from-[#32CD32]/70 to-[#00BFFF]/70"
    }
  ];
  
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
            
            <ReferralCodeDisplay code={referralCode} />
          </GlassmorphicCard>
          
          <GlassmorphicCard className="h-full">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2 text-[#FF10F0]" /> 
              Connect with Friends
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your friend's referral code to join their music session and listen together in real-time.
            </p>
            
            <ReferralCodeInput onCodeSubmit={connectWithFriend} />
            
            <div className="mt-6 pt-4 border-t border-[#6A1B9A]/20">
              <h3 className="text-sm font-medium mb-2">How it works:</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-[#FF10F0] text-white rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">1</span>
                  <span>Enter your friend's referral code above</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-[#FF10F0] text-white rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">2</span>
                  <span>Click "Listen Together"</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-[#FF10F0] text-white rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">3</span>
                  <span>Start listening to the same music in perfect sync</span>
                </li>
              </ul>
            </div>
          </GlassmorphicCard>
        </div>

        {/* Referral Plans Section */}
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Gift className="mr-2 text-[#FF10F0]" />
          Referral Rewards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {referralPlans.map((plan, index) => (
            <GlassmorphicCard 
              key={index} 
              className={`relative transition-all duration-300 hover:scale-105 ${plan.highlighted ? 'border-2 border-[#FF10F0]' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FF10F0] text-white text-xs px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="flex flex-col items-center p-4">
                <div className="mb-4">{plan.icon}</div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                
                <div className="w-full bg-[#6A1B9A]/10 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="mr-2 text-[#FF10F0] h-5 w-5" />
                    <span className="text-lg font-semibold">{plan.earnedDays} days free</span>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    For each friend who joins
                  </p>
                </div>
                
                <ul className="mb-4 w-full space-y-2">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <span className="inline-block w-2 h-2 bg-[#FF10F0] rounded-full mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <AnimatedButton 
                  className={`w-full bg-gradient-to-r ${plan.color} text-white`}
                  onClick={() => {
                    toast({
                      title: `${plan.name} Plan Selected`,
                      description: `Share your referral code to earn ${plan.earnedDays} days of ${plan.name} subscription.`
                    });
                  }}
                >
                  Start Referring
                </AnimatedButton>
              </div>
            </GlassmorphicCard>
          ))}
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
