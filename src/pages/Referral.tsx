
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Copy, Share2, Twitter, Facebook, Link2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { toast } from "@/components/ui/use-toast";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import MusicPlayer from "@/components/layout/MusicPlayer";

const Referral = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [copied, setCopied] = useState(false);
  const referralCode = "NEBULA" + Math.floor(Math.random() * 10000);
  const referralLink = `https://nebula-music-app.com/join?code=${referralCode}`;
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Set initial theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast({
        title: "Referral link copied!",
        description: "Share it with your friends to earn rewards",
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const shareViaTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=Join%20me%20on%20Nebula%20Music%20App%20and%20experience%20music%20like%20never%20before!%20Use%20my%20referral%20code:%20${referralCode}%20${referralLink}`;
    window.open(twitterUrl, "_blank");
  };
  
  const shareViaFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    window.open(facebookUrl, "_blank");
  };
  
  const rewards = [
    { name: "1 Friend", reward: "7 days of Premium access", color: "#FF10F0" },
    { name: "3 Friends", reward: "1 month of Premium access", color: "#9C27B0" },
    { name: "5 Friends", reward: "3 months of Premium access", color: "#6A1B9A" },
    { name: "10 Friends", reward: "1 year of Premium access + exclusive themes", color: "#FF10F0" },
  ];

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-[#f5f3ff]"} text-foreground`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className={`absolute top-[10%] left-[20%] w-72 h-72 rounded-full ${theme === "dark" ? "bg-[#FF10F0]/10" : "bg-[#FF10F0]/5"} blur-[100px] animate-pulse-slow`}></div>
        <div className={`absolute bottom-[30%] right-[10%] w-80 h-80 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/15" : "bg-[#9C27B0]/10"} blur-[120px] animate-pulse-slow animate-delay-300`}></div>
        <div className={`absolute top-[40%] right-[30%] w-40 h-40 rounded-full ${theme === "dark" ? "bg-[#9C27B0]/10" : "bg-[#6A1B9A]/5"} blur-[80px] animate-pulse-slow animate-delay-500`}></div>
      </div>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="relative z-10 pt-24 pb-32 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold purple-gradient-text mb-4">Invite Friends, Earn Rewards</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Share your unique referral link with friends and earn premium rewards when they join Nebula.
            </p>
          </div>
          
          {/* Referral Link Card */}
          <GlassmorphicCard className="mb-10 p-6 border border-[#FF10F0]/20">
            <h2 className="text-xl font-medium mb-4">Your Referral Link</h2>
            <div className="flex items-center mb-6">
              <Input 
                value={referralLink} 
                readOnly 
                className="mr-2 bg-secondary/50 focus:border-[#FF10F0] focus:ring-[#FF10F0]" 
              />
              <AnimatedButton 
                onClick={copyToClipboard}
                variant="default"
                className={`min-w-24 ${copied ? 'bg-green-500' : 'bg-[#FF10F0]'} hover:bg-opacity-90 text-white transition-colors`}
              >
                {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
                {copied ? 'Copied' : 'Copy'}
              </AnimatedButton>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <AnimatedButton
                onClick={shareViaTwitter}
                variant="outline"
                className="border-[#FF10F0] text-[#FF10F0] hover:bg-[#FF10F0]/10"
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </AnimatedButton>
              
              <AnimatedButton
                onClick={shareViaFacebook}
                variant="outline"
                className="border-[#FF10F0] text-[#FF10F0] hover:bg-[#FF10F0]/10"
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </AnimatedButton>
              
              <AnimatedButton
                onClick={copyToClipboard}
                variant="outline"
                className="border-[#FF10F0] text-[#FF10F0] hover:bg-[#FF10F0]/10"
              >
                <Link2 className="mr-2 h-4 w-4" />
                Copy Link
              </AnimatedButton>
            </div>
          </GlassmorphicCard>
          
          {/* Rewards */}
          <section>
            <h2 className="text-2xl font-bold mb-6 purple-gradient-text text-center">Rewards</h2>
            <div className="grid gap-4 mb-8">
              {rewards.map((reward, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg flex items-center border border-[#FF10F0]/20 bg-transparent hover:bg-[#FF10F0]/5 transition-colors"
                  style={{ borderLeftWidth: '4px', borderLeftColor: reward.color }}
                >
                  <div className="mr-4 w-12 h-12 rounded-full bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{reward.name}</h3>
                    <p className="text-sm text-muted-foreground">{reward.reward}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <AnimatedButton 
                variant="default" 
                className="bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] text-white hover:opacity-90"
                onClick={() => {
                  navigator.share({
                    title: 'Join me on Nebula Music App',
                    text: `Use my referral code: ${referralCode}`,
                    url: referralLink,
                  }).catch(err => {
                    console.error('Error sharing:', err);
                    copyToClipboard();
                  });
                }}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Now
              </AnimatedButton>
            </div>
          </section>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Referral;
