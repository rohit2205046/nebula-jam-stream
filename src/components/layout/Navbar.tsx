
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Menu, X, Zap, Compass, Music, Share2, MessageSquare, Sun, Moon } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.menu-container') && !target.closest('.menu-button')) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? `${theme === "dark" ? "bg-[#1A1F2C]/90" : "bg-white/70"} backdrop-blur-md border-b ${theme === "dark" ? "border-[#6A1B9A]/20" : "border-purple-200"} shadow-purple-glow py-3`
          : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className={`menu-button text-foreground p-2 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/20" : "bg-purple-100/80"} backdrop-blur-md`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex items-center justify-center flex-1">
          <Link
            to="/"
            className="text-2xl font-bold purple-gradient-text animate-pulse-slow relative"
          >
            Nebula
            <span className={`absolute -inset-1 ${theme === "dark" ? "bg-[#6A1B9A]/20" : "bg-purple-200/50"} blur-xl rounded-full -z-10`}></span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleTheme}
            className={`text-foreground hover:text-[#6A1B9A] transition-colors p-2 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/10" : "bg-purple-100/80"} backdrop-blur-md`}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={`text-foreground hover:text-[#6A1B9A] transition-colors p-2 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/10" : "bg-purple-100/80"} backdrop-blur-md`}>
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Block type design */}
      <div
        className={`menu-container fixed inset-0 z-40 ${theme === "dark" ? "bg-[#1A1F2C]/95" : "bg-white/90"} backdrop-blur-lg transition-transform duration-300 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <div className="pt-24 px-6 pb-20 grid grid-cols-2 gap-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            <GlassmorphicCard 
              className="h-full p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-300" 
              variant={theme === "dark" ? "dark" : "light"}
              hoverEffect
            >
              <Zap size={28} className="text-[#6A1B9A] mb-3 animate-pulse" />
              <span className="text-lg font-medium">Home</span>
            </GlassmorphicCard>
          </Link>
          
          <Link
            to="/explore"
            onClick={() => setMenuOpen(false)}
          >
            <GlassmorphicCard 
              className="h-full p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-300" 
              variant={theme === "dark" ? "dark" : "light"}
              hoverEffect
            >
              <Compass size={28} className="text-[#6A1B9A] mb-3 animate-bounce-subtle" />
              <span className="text-lg font-medium">Explore</span>
            </GlassmorphicCard>
          </Link>
          
          <Link
            to="/library"
            onClick={() => setMenuOpen(false)}
          >
            <GlassmorphicCard 
              className="h-full p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-300" 
              variant={theme === "dark" ? "dark" : "light"}
              hoverEffect
            >
              <Music size={28} className="text-[#6A1B9A] mb-3 animate-float" />
              <span className="text-lg font-medium">Library</span>
            </GlassmorphicCard>
          </Link>
          
          <Link
            to="/referral"
            onClick={() => setMenuOpen(false)}
          >
            <GlassmorphicCard 
              className="h-full p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-all duration-300" 
              variant={theme === "dark" ? "dark" : "light"}
              hoverEffect
            >
              <Share2 size={28} className="text-[#6A1B9A] mb-3 animate-pulse" />
              <span className="text-lg font-medium">Referral</span>
            </GlassmorphicCard>
          </Link>
          
          <GlassmorphicCard 
            className="col-span-2 mt-4 p-6 flex flex-col items-center justify-center text-center hover:scale-[1.02] transition-all duration-300 bg-[#6A1B9A]/30" 
            variant={theme === "dark" ? "dark" : "light"}
            hoverEffect
          >
            <MessageSquare size={28} className="text-[#6A1B9A] mb-3 love-pulse" />
            <span className="text-lg font-medium">Chat with Friends</span>
          </GlassmorphicCard>
          
          <div className="col-span-2 mt-6">
            <AnimatedButton variant="primary" className="w-full bg-[#6A1B9A] hover:bg-[#6A1B9A]/80 py-3">
              Sign In
            </AnimatedButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
