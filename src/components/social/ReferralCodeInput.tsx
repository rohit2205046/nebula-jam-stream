
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Music, Crown } from "lucide-react";

interface ReferralCodeInputProps {
  onCodeSubmit?: (code: string) => void;
  isPremium?: boolean;
}

const ReferralCodeInput: React.FC<ReferralCodeInputProps> = ({ 
  onCodeSubmit,
  isPremium = false
}) => {
  const [code, setCode] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast({
        title: "Empty code",
        description: "Please enter a valid referral code",
        variant: "destructive"
      });
      return;
    }
    
    if (onCodeSubmit) {
      onCodeSubmit(code);
    } else {
      // Default behavior - connect to the shared listening session
      toast({
        title: "Connected to shared session",
        description: `You're now listening with ${code}`,
      });
      
      // Dispatch event for other components to react to
      window.dispatchEvent(new CustomEvent('join-listening-session', { 
        detail: { code } 
      }));
    }
    
    setCode("");
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-2">
          {isPremium 
            ? "Enter Friend's Premium Referral Code" 
            : "Enter Friend's Referral Code"}
        </label>
        <Input 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. NEBULA-ABC123"
          className="w-full bg-[#6A1B9A]/20 backdrop-blur-md border-[#6A1B9A]/30"
        />
      </div>
      
      <AnimatedButton 
        type="submit"
        variant="primary"
        className={`w-full ${isPremium ? "bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0]" : "bg-[#FF10F0]"} hover:opacity-90`}
      >
        {isPremium ? (
          <>
            <Crown size={16} className="mr-2" />
            Join Premium Session
          </>
        ) : (
          <>
            <Music size={16} className="mr-2" />
            Listen Together
          </>
        )}
      </AnimatedButton>
    </form>
  );
};

export default ReferralCodeInput;
