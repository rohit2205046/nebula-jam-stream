
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
}

const AnimatedButton = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isActive = false,
  ...props
}: AnimatedButtonProps) => {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none";
  
  // Size styles
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };
  
  // Variant styles
  const variantStyles = {
    primary: `bg-nebula-600 text-white hover:bg-nebula-700 active:bg-nebula-800 ${isActive ? "shadow-glow" : ""}`,
    secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80 ${isActive ? "bg-secondary/90" : ""}`,
    ghost: `bg-transparent hover:bg-secondary ${isActive ? "bg-secondary/50" : ""}`,
    link: "bg-transparent underline-offset-4 hover:underline text-nebula-600",
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        "active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
