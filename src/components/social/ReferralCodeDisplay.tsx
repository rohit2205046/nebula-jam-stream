
import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Copy, Check, QrCode, Share2 } from "lucide-react";

interface ReferralCodeDisplayProps {
  code?: string;
}

const ReferralCodeDisplay: React.FC<ReferralCodeDisplayProps> = ({ code: propCode }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [code, setCode] = useState(() => propCode || `NEBULA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
  
  // Update local code if prop changes
  useEffect(() => {
    if (propCode) {
      setCode(propCode);
    }
  }, [propCode]);
  
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    
    toast({
      title: "Referral code copied!",
      description: "Share this code with your friends to listen together.",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      <div className="bg-[#6A1B9A]/20 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
        <span className="font-mono text-lg tracking-wider">{code}</span>
        <AnimatedButton
          variant="primary"
          size="sm"
          onClick={copyCode}
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
          QR Code
        </AnimatedButton>
        
        <AnimatedButton 
          variant="outline"
          className="flex items-center justify-center"
          onClick={() => {
            navigator.share?.({
              title: 'Join my Nebula music session',
              text: `Join my music session with code: ${code}`,
              url: window.location.href,
            }).catch(err => console.error('Error sharing:', err));
          }}
        >
          <Share2 size={16} className="mr-2" />
          Share
        </AnimatedButton>
      </div>
    </div>
  );
};

export default ReferralCodeDisplay;
