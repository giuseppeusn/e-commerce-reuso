import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

type BadgeVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";
type BadgeAppearance = "soft" | "solid" | "outline";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
  dot?: boolean;
  icon?: ReactNode;
};

const appearanceClasses: Record<BadgeAppearance, Record<BadgeVariant, string>> = {
  soft: {
    neutral: "bg-reuso-neutral-soft text-reuso-muted",
    primary: "bg-reuso-primary-soft text-reuso-text",
    secondary: "bg-reuso-secondary/15 text-reuso-secondary-hover",
    success: "bg-reuso-success-soft text-reuso-success-foreground",
    warning: "bg-reuso-warning-soft text-reuso-warning-foreground",
    danger: "bg-reuso-danger-soft text-reuso-danger-foreground",
    info: "bg-reuso-info-soft text-reuso-info-foreground",
  },
  solid: {
    neutral: "bg-reuso-neutral-strong text-reuso-neutral-strong-foreground",
    primary: "bg-reuso-primary text-reuso-primary-foreground",
    secondary: "bg-reuso-secondary text-white",
    success: "bg-reuso-success-strong text-reuso-success-strong-foreground",
    warning: "bg-reuso-warning-strong text-reuso-warning-strong-foreground",
    danger: "bg-reuso-danger-strong text-reuso-danger-strong-foreground",
    info: "bg-reuso-info-strong text-reuso-info-strong-foreground",
  },
  outline: {
    neutral: "border-reuso-border-strong text-reuso-muted",
    primary: "border-reuso-primary text-reuso-text",
    secondary: "border-reuso-secondary text-reuso-secondary-hover",
    success: "border-reuso-success text-reuso-success-foreground",
    warning: "border-reuso-warning text-reuso-warning-foreground",
    danger: "border-reuso-danger text-reuso-danger-foreground",
    info: "border-reuso-info text-reuso-info-foreground",
  },
};

export const Badge = ({
  className,
  variant = "neutral",
  appearance = "soft",
  dot = false,
  icon,
  children,
  ...props
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium [&_svg]:size-3.5",
      appearance !== "outline" && "border-transparent",
      appearanceClasses[appearance][variant],
      className,
    )}
    {...props}
  >
    {dot ? (
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
    ) : null}
    {icon}
    {children}
  </span>
);

export default Badge;
