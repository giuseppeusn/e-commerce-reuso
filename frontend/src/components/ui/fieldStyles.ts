import { cn } from "./utils";

export type FieldSize = "sm" | "md" | "lg";
export type FieldVariant = "filled" | "outline";
export type FieldShape = "pill" | "rounded";

export const fieldSizeClasses: Record<FieldSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-13 px-5 text-base",
};

const variantClasses: Record<FieldVariant, string> = {
  filled:
    "border-transparent bg-reuso-surface-subtle hover:bg-reuso-primary-soft focus-visible:border-reuso-primary focus-visible:bg-reuso-surface",
  outline:
    "border-reuso-border bg-reuso-surface hover:border-reuso-border-strong focus-visible:border-reuso-primary",
};

/** Classes base compartilhadas por Input, Select e Textarea. */
export const fieldControlClasses = ({
  variant = "filled",
  shape = "pill",
  error,
}: {
  variant?: FieldVariant;
  shape?: FieldShape;
  error?: boolean;
}) =>
  cn(
    "ds-focus-ring w-full border text-reuso-text outline-none transition-all duration-200 placeholder:text-reuso-muted disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    shape === "pill" ? "rounded-full" : "rounded-xl",
    error &&
      "border-reuso-danger! bg-reuso-danger-soft/40 focus-visible:shadow-[0_0_0_3px_var(--ds-danger-light)]",
  );
