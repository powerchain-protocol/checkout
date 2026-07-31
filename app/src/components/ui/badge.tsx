import type { HTMLAttributes, ReactNode } from "react";

export type BadgeTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type BadgeVariant = BadgeTone | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  variant?: BadgeVariant;
  icon?: ReactNode;
  dot?: boolean;
}

function toneFromVariant(
  tone: BadgeTone | undefined,
  variant: BadgeVariant | undefined,
): BadgeTone {
  if (tone) return tone;
  if (!variant || variant === "outline") return "neutral";
  return variant;
}

export function Badge({
  children,
  className = "",
  tone,
  variant,
  icon,
  dot = false,
  ...props
}: BadgeProps) {
  const resolvedTone = toneFromVariant(tone, variant);
  const classes = [
    "pp-badge",
    `pp-badge--${resolvedTone}`,
    variant === "outline" ? "pp-badge--outline" : "",
    dot ? "pp-badge--with-dot" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <span className={classes} {...props}>
      {dot && <span className="pp-badge__dot" aria-hidden="true" />}
      {icon && <span className="pp-badge__icon" aria-hidden="true">{icon}</span>}
      <span className="pp-badge__label">{children}</span>
    </span>
  );
}
