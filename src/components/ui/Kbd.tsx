// src/components/ui/Kbd.tsx

import { type HTMLAttributes, type JSX } from "react";
import { cn } from "../../lib/cn";

// =============================================================================
// TYPES
// =============================================================================

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md";
}

// =============================================================================
// COMPONENT
// =============================================================================

export function Kbd({
  className,
  size = "sm",
  ...props
}: KbdProps): JSX.Element {
  return (
    <kbd
      className={cn(
        "inline-flex",
        "items-center",
        "justify-center",
        "font-mono",
        "bg-surface",
        "text-muted",
        "border",
        "rounded-sm",
        "min-w-[1.5em]",
        size === "sm" ? "text-xs px-1" : "text-sm px-2 py-1",         
    

        className,
      )}
      {...props}
    />
  );
}

export default Kbd;
