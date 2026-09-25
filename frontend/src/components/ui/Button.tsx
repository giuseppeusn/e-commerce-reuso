import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "./utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "soft"
  | "link"
  | "danger"
  | "danger-soft"
  | "success"
  | "success-soft";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonShape = "rounded" | "pill" | "square" | "circle";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  uppercase?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-reuso-primary text-reuso-primary-foreground shadow-reuso-sm hover:-translate-y-px hover:bg-reuso-primary-hover hover:shadow-reuso-md",
  secondary:
    "border-transparent bg-reuso-secondary text-white shadow-reuso-sm hover:-translate-y-px hover:bg-reuso-secondary-hover hover:shadow-reuso-md",
  outline:
    "border-reuso-border-strong bg-reuso-surface text-reuso-text hover:border-reuso-primary hover:bg-reuso-surface-subtle",
  ghost:
    "border-transparent bg-transparent text-reuso-text hover:bg-reuso-neutral-soft",
  soft: "border-transparent bg-reuso-primary-soft text-reuso-text hover:bg-reuso-border",
  link: "h-auto! border-transparent bg-transparent px-0! text-reuso-text underline-offset-4 hover:underline",
  danger:
    "border-transparent bg-reuso-danger text-reuso-danger-strong-foreground shadow-reuso-sm hover:-translate-y-px hover:bg-reuso-danger-strong hover:shadow-reuso-md",
  "danger-soft":
    "border-transparent bg-reuso-danger-soft text-reuso-danger-foreground hover:bg-reuso-danger-light",
  success:
    "border-transparent bg-reuso-success text-reuso-success-strong-foreground shadow-reuso-sm hover:-translate-y-px hover:bg-reuso-success-strong hover:shadow-reuso-md",
  "success-soft":
    "border-transparent bg-reuso-success-soft text-reuso-success-foreground hover:brightness-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-7 px-3 text-xs",
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-base",
};

const squareSizeClasses: Record<ButtonSize, string> = {
  xs: "size-7 text-xs",
  sm: "size-9 text-sm",
  md: "size-11 text-sm",
  lg: "size-12 text-base",
  xl: "size-14 text-base",
};

const shapeClasses: Record<ButtonShape, string> = {
  rounded: "rounded-xl",
  pill: "rounded-full",
  square: "rounded-xl",
  circle: "rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      shape = "rounded",
      fullWidth = false,
      uppercase = false,
      isLoading = false,
      loadingLabel = "Carregando",
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isIconOnly = shape === "square" || shape === "circle";

    return (
      <button
        aria-busy={isLoading || undefined}
        className={cn(
          "ds-focus-ring inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap border font-semibold transition-all duration-200 ease-out active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.15em] [&_svg]:shrink-0",
          variantClasses[variant],
          isIconOnly ? cn("p-0", squareSizeClasses[size]) : sizeClasses[size],
          shapeClasses[shape],
          uppercase && "uppercase tracking-wider",
          fullWidth && "w-full",
          className,
        )}
        disabled={disabled || isLoading}
        ref={ref}
        type={type}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            />
            <span className="sr-only">{loadingLabel}</span>
          </>
        ) : (
          leftIcon
        )}
        {children ? <span>{children}</span> : null}
        {!isLoading ? rightIcon : null}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
