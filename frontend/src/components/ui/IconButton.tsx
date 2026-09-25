import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "./utils";

type IconButtonVariant = "solid" | "outline" | "ghost" | "soft" | "danger";
type IconButtonSize = "sm" | "md" | "lg";

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  icon: ReactNode;
  /** Texto acessível obrigatório: vira `aria-label` e `title`. */
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  shape?: "circle" | "rounded";
  badge?: ReactNode;
};

const variantClasses: Record<IconButtonVariant, string> = {
  solid:
    "border-transparent bg-reuso-primary text-reuso-primary-foreground shadow-reuso-sm hover:bg-reuso-primary-hover",
  outline:
    "border-reuso-border-strong bg-reuso-surface text-reuso-text hover:border-reuso-primary hover:bg-reuso-surface-subtle",
  ghost:
    "border-transparent bg-transparent text-reuso-text hover:bg-reuso-neutral-soft",
  soft: "border-transparent bg-reuso-primary-soft text-reuso-text hover:bg-reuso-border",
  danger:
    "border-transparent bg-reuso-danger-soft text-reuso-danger-foreground hover:bg-reuso-danger-light",
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "size-8 [&_svg]:size-4",
  md: "size-10 [&_svg]:size-5",
  lg: "size-12 [&_svg]:size-6",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon,
      label,
      variant = "ghost",
      size = "md",
      shape = "circle",
      badge,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      aria-label={label}
      className={cn(
        "ds-focus-ring relative inline-flex shrink-0 cursor-pointer items-center justify-center border transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        shape === "circle" ? "rounded-full" : "rounded-xl",
        className,
      )}
      ref={ref}
      title={label}
      type={type}
      {...props}
    >
      {icon}
      {badge !== undefined && badge !== null ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-reuso-danger px-1 text-2xs font-bold text-white ring-2 ring-reuso-surface">
          {badge}
        </span>
      ) : null}
    </button>
  ),
);

IconButton.displayName = "IconButton";

export default IconButton;
