
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User, Menu, X, Zap, RotateCcw, Compass, Music, BookOpen } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

const Navbar = () => {
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-purple-800/10 backdrop-blur-md border-b border-purple-500/10 shadow-purple-glow py-3"
          : "py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold purple-gradient-text animate-pulse-slow relative"
          >
            Nebula
            <span className="absolute -inset-1 bg-purple-500/20 blur-xl rounded-full -z-10"></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link text-foreground hover:text-purple-800 transition-colors flex items-center gap-2">
            <Zap size={16} className="animate-pulse-slow" />
            <span>Home</span>
          </Link>
          <Link to="/explore" className="nav-link text-foreground hover:text-purple-800 transition-colors flex items-center gap-2">
            <Compass size={16} className="animate-bounce-subtle" />
            <span>Explore</span>
          </Link>
          <Link to="/library" className="nav-link text-foreground hover:text-purple-800 transition-colors flex items-center gap-2">
            <Music size={16} className="animate-float" />
            <span>Library</span>
          </Link>
          <Link to="/reversal" className="nav-link text-foreground hover:text-purple-800 transition-colors flex items-center gap-2">
            <RotateCcw size={16} className="animate-rotate-slow" />
            <span>Reversal</span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-foreground hover:text-purple-800 transition-colors">
            <Search size={20} />
          </button>
          <button className="text-foreground hover:text-purple-800 transition-colors">
            <Bell size={20} />
          </button>
          <AnimatedButton variant="primary" size="sm" className="bg-purple-800 hover:bg-purple-700 shadow-purple-glow">
            Sign In
          </AnimatedButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-transform duration-300 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-24 px-8 flex flex-col space-y-6">
          <Link
            to="/"
            className="text-xl font-medium flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Zap size={20} className="text-purple-800" />
            <span>Home</span>
          </Link>
          <Link
            to="/explore"
            className="text-xl font-medium flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Compass size={20} className="text-purple-800" />
            <span>Explore</span>
          </Link>
          <Link
            to="/library"
            className="text-xl font-medium flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Music size={20} className="text-purple-800" />
            <span>Library</span>
          </Link>
          <Link
            to="/reversal"
            className="text-xl font-medium flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <RotateCcw size={20} className="text-purple-800" />
            <span>Reversal</span>
          </Link>
          <div className="pt-6 border-t border-purple-200">
            <AnimatedButton variant="primary" className="w-full bg-purple-800 hover:bg-purple-700">
              Sign In
            </AnimatedButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
