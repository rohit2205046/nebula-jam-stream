
import React from "react";
import { SignIn } from "@clerk/clerk-react";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import ShootingStars from "@/components/ui/ShootingStars";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ShootingStars />
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold purple-gradient-text mb-2">Nebula Jam Stream</h1>
          <p className="text-gray-400">Sign in to continue your musical journey</p>
        </div>
        
        <GlassmorphicCard className="p-6">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] hover:from-[#7B1FA2] hover:to-[#FF46FB] text-white rounded-md px-4 py-2",
                card: "bg-transparent shadow-none",
                headerTitle: "text-white text-xl",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton: "bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white",
                socialButtonsBlockButtonText: "text-white",
                formFieldInput: "bg-[#2A2A2A] text-white border-[#444] rounded-md",
                formFieldLabel: "text-gray-300",
                footer: "hidden",
              }
            }}
            signUpUrl="/auth"
            redirectUrl="/"
          />
        </GlassmorphicCard>
        
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Nebula Jam Stream. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
