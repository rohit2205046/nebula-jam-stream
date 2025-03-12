
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Menu, X, Zap, Compass, Music, Share2, MessageSquare, Sun, Moon } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import GlassmorphicCard from "@/components/ui/GlassmorphicCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New friend request from Stellar Dreams", read: false },
    { id: 2, message: "Synthwave Collective shared a song with you", read: false },
    { id: 3, message: "New playlist recommendation available", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  // Optimized scroll handler with debounce
  useEffect(() => {
    let timeout: number;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        const isScrolled = window.scrollY > 10;
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      }, 10); // Small debounce time
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [scrolled]);

  // Improved click outside handler
  useEffect(() => {
    if (!menuOpen && !showNotifications) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (menuOpen && !target.closest('.menu-container') && !target.closest('.menu-button')) {
        setMenuOpen(false);
      }
      if (showNotifications && !target.closest('.notifications-container') && !target.closest('.notifications-button')) {
        setShowNotifications(false);
      }
    };
    
    // Use capture phase for better performance
    document.addEventListener('mousedown', handleClickOutside, { capture: true });
    return () => document.removeEventListener('mousedown', handleClickOutside, { capture: true });
  }, [menuOpen, showNotifications]);

  const handleNotificationClick = (id: number) => {
    // Mark notification as read
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    toast({
      title: "Notification opened",
      description: "You've opened a notification",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
          className={`menu-button text-foreground p-2 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/20" : "bg-purple-100/80"} backdrop-blur-md will-change-transform`}
          onClick={() => {
            setMenuOpen(!menuOpen);
            setShowNotifications(false);
          }}
          aria-label="Menu"
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
            className={`text-foreground hover:text-[#6A1B9A] transition-colors p-2 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/10" : "bg-purple-100/80"} backdrop-blur-md will-change-transform`}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="relative">
            <button 
              className={`notifications-button text-foreground hover:text-[#6A1B9A] transition-colors p-2 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/10" : "bg-purple-100/80"} backdrop-blur-md relative will-change-transform`}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setMenuOpen(false);
              }}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF10F0] text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="notifications-container absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-lg shadow-lg z-50 backdrop-blur-xl border border-[#6A1B9A]/20 will-change-transform">
                <GlassmorphicCard className="p-2">
                  <h3 className="text-lg font-medium py-2 px-3 border-b border-[#6A1B9A]/20">Notifications</h3>
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-[#6A1B9A]/10">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-3 py-2 cursor-pointer hover:bg-[#6A1B9A]/10 transition-colors ${!notification.read ? 'bg-[#6A1B9A]/5' : ''}`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {!notification.read && (
                              <span className="inline-block w-2 h-2 bg-[#FF10F0] rounded-full mr-1"></span>
                            )}
                            Just now
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="p-3 text-sm text-center text-muted-foreground">No notifications</p>
                  )}
                </GlassmorphicCard>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - with improved transition */}
      <div
        className={`menu-container fixed inset-0 z-40 ${theme === "dark" ? "bg-[#1A1F2C]/95" : "bg-white/90"} backdrop-blur-lg transition-all duration-300 transform ${
          menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } will-change-transform overflow-y-auto`}
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
              <Zap size={28} className="text-[#FF10F0] mb-3 animate-pulse" />
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
              <Compass size={28} className="text-[#FF10F0] mb-3 animate-bounce-subtle" />
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
              <Music size={28} className="text-[#FF10F0] mb-3 animate-float" />
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
              <Share2 size={28} className="text-[#FF10F0] mb-3 animate-pulse" />
              <span className="text-lg font-medium">Referral</span>
            </GlassmorphicCard>
          </Link>
          
          <Link 
            to="/chat"
            onClick={() => setMenuOpen(false)}
            className="col-span-2 mt-4"
          >
            <GlassmorphicCard 
              className="p-6 flex flex-col items-center justify-center text-center hover:scale-[1.02] transition-all duration-300 bg-[#6A1B9A]/30" 
              variant={theme === "dark" ? "dark" : "light"}
              hoverEffect
            >
              <MessageSquare size={28} className="text-[#FF10F0] mb-3 love-pulse" />
              <span className="text-lg font-medium">Chat with Friends</span>
            </GlassmorphicCard>
          </Link>
          
          <div className="col-span-2 mt-6">
            <AnimatedButton variant="primary" className="w-full bg-[#FF10F0] hover:bg-[#FF10F0]/80 py-3">
              Sign In
            </AnimatedButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
