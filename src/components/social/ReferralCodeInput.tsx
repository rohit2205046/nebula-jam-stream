
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Music } from "lucide-react";

interface ReferralCodeInputProps {
  onCodeSubmit?: (code: string) => void;
}

const ReferralCodeInput: React.FC<ReferralCodeInputProps> = ({ onCodeSubmit }) => {
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
        <label className="block text-sm mb-2">Enter Friend's Referral Code</label>
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
        className="w-full bg-[#FF10F0] hover:bg-[#FF10F0]/80"
      >
        <Music size={16} className="mr-2" />
        Listen Together
      </AnimatedButton>
    </form>
  );
};

export default ReferralCodeInput;
