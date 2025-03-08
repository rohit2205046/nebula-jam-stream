
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User, Menu, X } from "lucide-react";
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
          ? "bg-white/10 backdrop-blur-md border-b border-white/10 shadow-sm py-3"
          : "py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nebula-500 to-nebula-800 animate-pulse-slow"
          >
            Nebula
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link text-foreground hover:text-nebula-600 transition-colors">
            Home
          </Link>
          <Link to="/explore" className="nav-link text-foreground hover:text-nebula-600 transition-colors">
            Explore
          </Link>
          <Link to="/library" className="nav-link text-foreground hover:text-nebula-600 transition-colors">
            Library
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-foreground hover:text-nebula-600 transition-colors">
            <Search size={20} />
          </button>
          <button className="text-foreground hover:text-nebula-600 transition-colors">
            <Bell size={20} />
          </button>
          <AnimatedButton variant="primary" size="sm">
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
            className="text-xl font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="text-xl font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Explore
          </Link>
          <Link
            to="/library"
            className="text-xl font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Library
          </Link>
          <div className="pt-6 border-t border-gray-200">
            <AnimatedButton variant="primary" className="w-full">
              Sign In
            </AnimatedButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
