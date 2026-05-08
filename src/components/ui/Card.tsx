import React from "react";
import { cn } from "../../utils/helpers";
import { motion } from "framer-motion";

interface CardProps extends React.ComponentProps<typeof motion.div> {
  className?: string;
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass p-6 md:p-8 transition-all duration-300 relative overflow-hidden group",
          hoverEffect && "hover:glass-hover",
          className
        )}
        whileHover={hoverEffect ? { y: -10 } : {}}
        {...props}
      >
        {/* Subtle inner glow effect on hover */}
        {hoverEffect && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[var(--color-cyan)]/10 to-transparent transition-opacity duration-500 pointer-events-none" />
        )}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";
