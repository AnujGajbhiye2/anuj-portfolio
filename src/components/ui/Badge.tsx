// src/components/ui/Badge.tsx

import { type HTMLAttributes, type JSX } from "react";
import { cn } from "../../lib/cn";

// =============================================================================
// TYPES
// =============================================================================

export type BadgeVariant = "default" | "outline" | "subtle";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

// =============================================================================
// STYLES
// =============================================================================

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary-400/10 text-primary-400 border border-primary-400/50",
  outline: "bg-transparent text-text-secondary border border-surface",
  subtle: "bg-surface text-text-muted border border-transparent",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
};

// =============================================================================
// COMPONENT
// =============================================================================

export function Badge({
  className,
  variant = "default",
  size = "sm",
  ...props
}: BadgeProps): JSX.Element {
  return (
    <span
      className={cn(

        "inline-flex",
        "items-center",
        "font-mono",
        "rounded",

        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}

export default Badge;
