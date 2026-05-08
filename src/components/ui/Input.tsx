import React from "react";
import { cn } from "../../utils/helpers";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider pl-1">
          {label}
        </label>
        <input
          ref={ref}
          className={cn(
            "w-full bg-transparent border border-[rgba(0,217,255,0.2)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all placeholder:text-white/20",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider pl-1">
          {label}
        </label>
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-transparent border border-[rgba(0,217,255,0.2)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all placeholder:text-white/20 min-h-[120px] resize-y",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
