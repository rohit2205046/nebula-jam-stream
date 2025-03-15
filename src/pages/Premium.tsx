
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MusicPlayer from "@/components/layout/MusicPlayer";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Check, Crown, Star, Gem, Share2, Sparkles, Music, Zap, Users, User } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import ReferralCodeDisplay from "@/components/social/ReferralCodeDisplay";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

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

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan);
    toast({
      title: "Subscription Selected",
      description: `You've selected the ${plan} plan. Proceed to payment.`,
    });
  };

  const plans = [
    {
      name: "Individual",
      icon: <User className="w-8 h-8 text-[#FF10F0]" />,
      price: "₹59",
      period: "month",
      color: "from-[#FF10F0] to-[#9C27B0]",
      features: [
        "Ad-free listening",
        "Download songs for offline play",
        "Higher audio quality",
        "Personalized recommendations",
        "Create unlimited playlists",
        "Priority customer support",
        "Exclusive content",
        "Multi-device streaming",
        "Early access to new features"
      ],
      referralFeature: true,
      popular: true
    },
    {
      name: "Mega Family Pack",
      icon: <Users className="w-8 h-8 text-[#FFD700]" />,
      price: "₹499",
      period: "month",
      color: "from-[#4CAF50] to-[#009688]",
      features: [
        "Everything in Individual",
        "Up to 6 Premium accounts",
        "Family Mix playlist",
        "Block explicit music option",
        "Shared payment method",
        "Each account has separate logins",
        "Unlimited shared listening sessions",
        "Host group listening parties",
        "AI-powered recommendations",
        "Exclusive artist content",
        "First access to concert tickets"
      ],
      referralFeature: true
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 purple-gradient-text flex items-center justify-center">
            <Crown className="mr-3 text-[#FFD700]" />
            Premium Subscription
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Upgrade your music experience with Nebula Premium and unlock exclusive features.
          </p>
        </div>
        
        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan) => (
            <div key={plan.name} className="relative">
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-[#FF10F0] text-white px-4 py-1 rounded-full text-xs font-bold flex items-center">
                    <Sparkles size={12} className="mr-1" /> Most Popular
                  </span>
                </div>
              )}
              <GlassmorphicCard 
                className={`h-full ${plan.popular ? 'border-2 border-[#FF10F0] scale-105' : ''}`}
                hoverEffect={true}
              >
                <div className="text-center mb-4">
                  <div className="inline-block p-3 rounded-full bg-gradient-to-br mb-3">
                    {plan.icon}
                  </div>
                  <h2 className="text-xl font-bold">{plan.name}</h2>
                </div>
                
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-[#FF10F0] mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.referralFeature && (
                  <div className="bg-[#6A1B9A]/20 rounded-lg p-3 mb-6">
                    <div className="flex items-center text-[#FF10F0] mb-2">
                      <Share2 size={16} className="mr-2" />
                      <span className="text-sm font-medium">Referral System Included</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Invite friends to listen together and earn free months.
                    </p>
                  </div>
                )}
                
                <AnimatedButton 
                  variant={plan.popular ? "default" : "outline"} 
                  className={`w-full ${plan.popular ? 'bg-[#FF10F0] hover:bg-[#FF10F0]/80 text-white' : 'border-[#FF10F0] text-[#FF10F0]'}`}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {selectedPlan === plan.name ? "Selected" : "Subscribe"}
                </AnimatedButton>
              </GlassmorphicCard>
            </div>
          ))}
        </div>
        
        {/* Referral Feature Section */}
        <div className="mb-16">
          <GlassmorphicCard>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Share2 className="mr-3 text-[#FF10F0]" />
                  Premium Referral Program
                </h2>
                <p className="text-muted-foreground mb-6">
                  As a Premium subscriber, you can invite friends to join Nebula and earn rewards. 
                  Share your unique referral code and both you and your friend will receive benefits.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">How It Works</h3>
                  <ol className="space-y-3">
                    <li className="flex">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF10F0] text-white flex items-center justify-center mr-3">1</span>
                      <span>Share your unique referral code with friends</span>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF10F0] text-white flex items-center justify-center mr-3">2</span>
                      <span>When they subscribe to any Premium plan using your code</span>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF10F0] text-white flex items-center justify-center mr-3">3</span>
                      <span>You both get a free month of Premium!</span>
                    </li>
                  </ol>
                </div>
                
                <AnimatedButton 
                  onClick={() => navigate('/referral')}
                  className="bg-[#FF10F0] hover:bg-[#FF10F0]/80 text-white"
                >
                  <Share2 className="mr-2 h-5 w-5" /> Go to Referral Page
                </AnimatedButton>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <h3 className="text-lg font-medium mb-4">Your Referral Code</h3>
                  <ReferralCodeDisplay />
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        </div>
        
        {/* Premium Benefits */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Premium Benefits</h2>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
            <GlassmorphicCard>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] flex items-center justify-center">
                  <Zap className="text-white" />
                </div>
                <h3 className="text-lg font-medium mb-2">Enhanced Audio Quality</h3>
                <p className="text-muted-foreground text-sm">
                  Experience music in studio-quality audio with our premium sound encoding.
                </p>
              </div>
            </GlassmorphicCard>
            
            <GlassmorphicCard>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] flex items-center justify-center">
                  <Share2 className="text-white" />
                </div>
                <h3 className="text-lg font-medium mb-2">Shared Listening</h3>
                <p className="text-muted-foreground text-sm">
                  Listen to music together with friends in real-time, no matter where you are.
                </p>
              </div>
            </GlassmorphicCard>
            
            <GlassmorphicCard>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] flex items-center justify-center">
                  <Gem className="text-white" />
                </div>
                <h3 className="text-lg font-medium mb-2">Exclusive Content</h3>
                <p className="text-muted-foreground text-sm">
                  Get access to exclusive releases, remixes, and artist content not available elsewhere.
                </p>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Premium;
