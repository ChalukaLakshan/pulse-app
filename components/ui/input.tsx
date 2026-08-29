import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-faint",
          "transition-shadow duration-150 focus:border-brand-500",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium text-ink mb-1.5 inline-block", className)}
      {...props}
    />
  );
}
