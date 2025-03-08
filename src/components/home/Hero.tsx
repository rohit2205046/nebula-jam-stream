
import React from "react";
import { ArrowRight, Play } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-nebula-900/30 via-nebula-800/20 to-transparent"></div>
        <div className="absolute top-[10%] right-[10%] w-80 h-80 rounded-full bg-nebula-500/20 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[5%] w-60 h-60 rounded-full bg-nebula-600/30 blur-[80px] animate-pulse-slow animate-delay-400"></div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="flex flex-col gap-4 animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="inline-block text-foreground mb-2">Discover</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-nebula-500 to-nebula-800 animate-gradient-shift">
                Infinite Music
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl animate-slide-up animate-delay-200">
              Experience the future of music streaming with Nebula. Discover new artists, share with friends, and enjoy synchronized listening experiences.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6 md:mt-8 animate-slide-up animate-delay-300">
              <AnimatedButton 
                variant="primary" 
                size="lg" 
                className="group"
              >
                <span>Get Started</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </AnimatedButton>
              
              <AnimatedButton 
                variant="secondary" 
                size="lg" 
                className="flex items-center"
              >
                <Play size={18} className="mr-2" />
                <span>Watch Demo</span>
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
