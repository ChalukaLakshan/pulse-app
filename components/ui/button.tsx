import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          size === "md" ? "h-10 px-4 text-sm" : "h-8 px-3 text-xs",
          variant === "primary" &&
            "bg-brand-500 text-white hover:bg-brand-600 shadow-sm shadow-brand-500/20",
          variant === "secondary" &&
            "bg-white text-ink border border-line hover:bg-paper",
          variant === "ghost" && "text-ink-soft hover:bg-paper hover:text-ink",
          className
        )}
        {...props}
      >
        {loading && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
