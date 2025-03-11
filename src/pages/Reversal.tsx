
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MusicPlayer from "@/components/layout/MusicPlayer";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { Input } from "@/components/ui/input";
import { RotateCcw, Play, Upload, Download, RefreshCcw } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

const Reversal = () => {
  const [originalText, setOriginalText] = useState("");
  const [reversedText, setReversedText] = useState("");
  
  const handleReverseText = () => {
    setReversedText(originalText.split("").reverse().join(""));
  };
  
  const handleClear = () => {
    setOriginalText("");
    setReversedText("");
  };

  const reversalExamples = [
    { original: "Nebula", reversed: "alubeN" },
    { original: "Music", reversed: "cisuM" },
    { original: "Reversal", reversed: "lasreveR" },
    { original: "Purple", reversed: "elpruP" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 purple-gradient-text">Reversal Studio</h1>
          <p className="text-muted-foreground mb-8">Transform your content with our reversing technology</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <GlassmorphicCard className="h-full" pulseEffect>
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Upload size={18} />
                Original Content
              </h2>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Enter text to reverse..."
                className="w-full h-40 p-4 rounded-md bg-background/50 border border-purple-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
              />
            </GlassmorphicCard>
            
            <GlassmorphicCard className="h-full">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Download size={18} />
                Reversed Result
              </h2>
              <div className="w-full h-40 p-4 rounded-md bg-background/50 border border-purple-200 overflow-auto">
                {reversedText || (
                  <span className="text-muted-foreground">Reversed text will appear here...</span>
                )}
              </div>
            </GlassmorphicCard>
          </div>
          
          <div className="flex justify-center gap-4 mb-12">
            <AnimatedButton 
              onClick={handleReverseText} 
              className="bg-purple-800 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reverse Text
            </AnimatedButton>
            
            <AnimatedButton 
              onClick={handleClear} 
              variant="secondary"
              className="flex items-center gap-2"
            >
              <RefreshCcw size={16} />
              Clear All
            </AnimatedButton>
          </div>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 purple-gradient-text">Examples</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {reversalExamples.map((example, index) => (
                <GlassmorphicCard 
                  key={index} 
                  className="text-center group cursor-pointer"
                  hoverEffect
                >
                  <div className="mb-2 text-lg font-medium">{example.original}</div>
                  <div className="h-0.5 w-1/2 bg-purple-500 mx-auto mb-2 group-hover:w-full transition-all duration-300"></div>
                  <div className="text-lg text-purple-800 animate-pulse-slow">{example.reversed}</div>
                </GlassmorphicCard>
              ))}
            </div>
          </section>
        </div>
      </main>
      <MusicPlayer />
    </div>
  );
};

export default Reversal;
