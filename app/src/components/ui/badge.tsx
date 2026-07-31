import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  dot?: boolean;
  variant?: BadgeVariant;
}

export function Badge({
  children,
  className = "",
  dot = false,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span className={`ui-badge ui-badge--${variant} ${className}`} {...props}>
      {dot && <span className="ui-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
