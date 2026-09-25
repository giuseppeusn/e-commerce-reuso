import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef, useId } from "react";
import { FieldShell } from "./FieldShell";
import type { FieldShape, FieldSize, FieldVariant } from "./fieldStyles";
import { fieldControlClasses, fieldSizeClasses } from "./fieldStyles";
import { cn } from "./utils";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Elemento interativo à direita (ex.: botão de mostrar senha, limpar). */
  rightElement?: ReactNode;
  size?: FieldSize;
  variant?: FieldVariant;
  shape?: FieldShape;
  containerClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      className,
      containerClassName,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      rightElement,
      size = "md",
      variant = "filled",
      shape = "pill",
      required,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = error || helperText ? `${inputId}-message` : undefined;

    return (
      <FieldShell
        className={containerClassName}
        error={error}
        helperText={helperText}
        htmlFor={inputId}
        label={label}
        messageId={messageId}
        required={required}
      >
        <div className="relative">
          {leftIcon ? (
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-reuso-muted [&_svg]:size-4">
              {leftIcon}
            </span>
          ) : null}
          <input
            aria-describedby={cn(ariaDescribedBy, messageId) || undefined}
            aria-invalid={error ? true : undefined}
            className={cn(
              fieldControlClasses({ variant, shape, error: Boolean(error) }),
              fieldSizeClasses[size],
              Boolean(leftIcon) && "pl-11",
              Boolean(rightIcon || rightElement) && "pr-11",
              className,
            )}
            id={inputId}
            ref={ref}
            required={required}
            {...props}
          />
          {rightIcon ? (
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-reuso-muted [&_svg]:size-4">
              {rightIcon}
            </span>
          ) : null}
          {rightElement ? (
            <span className="absolute inset-y-0 right-1.5 flex items-center">
              {rightElement}
            </span>
          ) : null}
        </div>
      </FieldShell>
    );
  },
);

Input.displayName = "Input";

export default Input;
