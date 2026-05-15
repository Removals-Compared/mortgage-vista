import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-base text-brand-ink placeholder:text-brand-soft transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:border-brand-gold",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-brand-error",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
