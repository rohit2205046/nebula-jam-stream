
import React from "react";
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: "light" | "dark";
  pulseEffect?: boolean;
}

const GlassmorphicCard = ({
  children,
  className,
  hoverEffect = false,
  variant = "light",
  pulseEffect = false,
  ...props
}: GlassmorphicCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl p-4 transition-all duration-300 backdrop-blur-md",
        variant === "light" ? "glass" : "glass-dark",
        hoverEffect &&
          "hover:shadow-purple-glow-strong hover:translate-y-[-2px] cursor-pointer",
        pulseEffect && "animate-pulse-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
