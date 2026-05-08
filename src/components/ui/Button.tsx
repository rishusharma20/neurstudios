import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "../../utils/helpers";
import { Magnetic } from "./Magnetic";
import { motion } from "framer-motion";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  className?: string;
  magnetic?: boolean;
  href?: string;
}

export const Button = forwardRef<any, ButtonProps>(
  ({ className, variant = "primary", magnetic = true, children, href, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 text-sm overflow-hidden cursor-pointer";
    
    const variants = {
      primary: "bg-[var(--color-cyan)] text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.6)] hover:bg-[var(--color-cyan-light)] border border-transparent",
      secondary: "bg-transparent text-[var(--color-cyan)] border border-[var(--color-cyan)] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:bg-[rgba(0,217,255,0.05)]",
    };

    const Component = href ? motion.a : motion.button;

    const content = (
      <Component
        ref={ref}
        href={href}
        className={cn(baseStyles, variants[variant], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props as any}
      >
        <span className="relative z-10 font-mono tracking-wide">{children}</span>
      </Component>
    );

    if (magnetic) {
      return <Magnetic strength={0.1}>{content}</Magnetic>;
    }

    return content;
  }
);

Button.displayName = "Button";
