
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, Bell, Menu, X, Zap, Compass, Music, 
  Share2, MessageSquare, Sun, Moon, Crown
} from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface NewMenuProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const NewMenu = ({ theme, toggleTheme }: NewMenuProps) => {
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

  // Scroll handler with throttling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Click outside handler
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
    
    document.addEventListener('mousedown', handleClickOutside, { capture: true });
    return () => document.removeEventListener('mousedown', handleClickOutside, { capture: true });
  }, [menuOpen, showNotifications]);

  // Fix for menu getting stuck
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

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

  const menuItems = [
    { path: "/", label: "Home", icon: <Zap className="group-hover:text-[#FF10F0] transition-colors" size={18} /> },
    { path: "/explore", label: "Explore", icon: <Compass className="group-hover:text-[#FF10F0] transition-colors" size={18} /> },
    { path: "/library", label: "Library", icon: <Music className="group-hover:text-[#FF10F0] transition-colors" size={18} /> },
    { path: "/premium", label: "Premium", icon: <Crown className="group-hover:text-[#FFD700] transition-colors" size={18} /> },
    { path: "/referral", label: "Referral", icon: <Share2 className="group-hover:text-[#FF10F0] transition-colors" size={18} /> },
    { path: "/chat", label: "Chat", icon: <MessageSquare className="group-hover:text-[#FF10F0] transition-colors" size={18} /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? `${theme === "dark" ? "bg-[#1A1F2C]/90" : "bg-white/70"} backdrop-blur-md shadow-md py-3`
          : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className={`menu-button p-2 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/20" : "bg-purple-100/80"} backdrop-blur-md md:hidden`}
          onClick={() => {
            setMenuOpen(!menuOpen);
            setShowNotifications(false);
          }}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold purple-gradient-text relative"
          >
            Nebula
            <span className={`absolute -inset-1 ${theme === "dark" ? "bg-[#6A1B9A]/20" : "bg-purple-200/50"} blur-xl rounded-full -z-10`}></span>
          </Link>
        </div>

        {/* Desktop Menu - New Pill Style */}
        <div className="hidden md:flex items-center space-x-1 bg-[#6A1B9A]/10 backdrop-blur-md rounded-full px-2 py-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-[#FF10F0] text-white" 
                    : "hover:bg-[#6A1B9A]/20"
                }`}
              >
                <span>{item.icon}</span>
                <span className={`text-sm font-medium ${isActive ? "text-white" : ""}`}>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleTheme}
            className={`text-foreground hover:text-[#6A1B9A] transition-colors p-2 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/10" : "bg-purple-100/80"} backdrop-blur-md`}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="relative">
            <button 
              className={`notifications-button text-foreground hover:text-[#6A1B9A] transition-colors p-2 rounded-full ${theme === "dark" ? "bg-[#6A1B9A]/10" : "bg-purple-100/80"} backdrop-blur-md relative`}
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
              <div className="notifications-container absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-lg shadow-lg z-50 backdrop-blur-xl border border-[#6A1B9A]/20">
                <div className="bg-[#6A1B9A]/10 backdrop-blur-xl rounded-lg overflow-hidden">
                  <h3 className="text-lg font-medium py-2 px-3 border-b border-[#6A1B9A]/20">Notifications</h3>
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-[#6A1B9A]/10">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-3 py-2 cursor-pointer hover:bg-[#6A1B9A]/20 transition-colors ${!notification.read ? 'bg-[#6A1B9A]/5' : ''}`}
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
                </div>
              </div>
            )}
          </div>
          
          {/* Premium Button */}
          <div className="hidden md:block">
            <Link to="/premium">
              <AnimatedButton 
                size="sm" 
                className="bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] text-white rounded-full"
              >
                <Crown className="mr-1 h-4 w-4" /> Premium
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="menu-container fixed inset-0 z-40 md:hidden">
          <div className={`fixed inset-0 ${theme === "dark" ? "bg-[#1A1F2C]/95" : "bg-white/90"} backdrop-blur-lg transition-all duration-200`}>
            <div className="pt-24 px-6 pb-20">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? "bg-gradient-to-r from-[#6A1B9A] to-[#FF10F0] text-white" 
                          : `bg-[#6A1B9A]/10 hover:bg-[#6A1B9A]/20`
                      }`}
                    >
                      <span className="w-7 h-7 rounded-full bg-[#6A1B9A]/20 flex items-center justify-center">
                        {item.icon}
                      </span>
                      <span className="text-base font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NewMenu;
