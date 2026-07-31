import type { HTMLAttributes, ReactNode } from "react";

type CardTone = "default" | "muted" | "success" | "warning" | "danger";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  tone?: CardTone;
  interactive?: boolean;
}

export function Card({
  children,
  className = "",
  tone = "default",
  interactive = false,
  ...props
}: CardProps) {
  return (
    <section
      className={`ui-card ui-card--${tone} ${interactive ? "ui-card--interactive" : ""} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ui-card__header ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={`ui-card__title ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function CardDescription({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`ui-card__description ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ui-card__content ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`ui-card__footer ${className}`} {...props}>
      {children}
    </div>
  );
}
