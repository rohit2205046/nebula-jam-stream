
import React from "react";
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: "light" | "dark";
}

const GlassmorphicCard = ({
  children,
  className,
  hoverEffect = false,
  variant = "light",
  ...props
}: GlassmorphicCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl p-4 transition-all duration-300 backdrop-blur-md",
        variant === "light" ? "glass" : "glass-dark",
        hoverEffect &&
          "hover:shadow-glow hover:translate-y-[-2px] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
