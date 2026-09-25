import type { ReactNode, TextareaHTMLAttributes } from "react";
import { forwardRef, useId } from "react";
import { FieldShell } from "./FieldShell";
import type { FieldVariant } from "./fieldStyles";
import { fieldControlClasses } from "./fieldStyles";
import { cn } from "./utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  variant?: FieldVariant;
  resize?: "none" | "vertical";
  /** Mostra o contador de caracteres (requer `value` controlado). */
  showCount?: boolean;
  containerClassName?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      className,
      containerClassName,
      label,
      helperText,
      error,
      variant = "filled",
      resize = "vertical",
      showCount = false,
      rows = 4,
      required,
      maxLength,
      value,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const messageId = error || helperText ? `${textareaId}-message` : undefined;
    const count = typeof value === "string" ? value.length : undefined;

    return (
      <FieldShell
        className={containerClassName}
        error={error}
        helperText={helperText}
        htmlFor={textareaId}
        label={label}
        messageId={messageId}
        required={required}
      >
        <div className="relative">
          <textarea
            aria-describedby={cn(ariaDescribedBy, messageId) || undefined}
            aria-invalid={error ? true : undefined}
            className={cn(
              fieldControlClasses({
                variant,
                shape: "rounded",
                error: Boolean(error),
              }),
              "block px-4 py-3 text-sm leading-6",
              resize === "none" ? "resize-none" : "resize-y",
              showCount && "pb-7",
              className,
            )}
            id={textareaId}
            maxLength={maxLength}
            ref={ref}
            required={required}
            rows={rows}
            value={value}
            {...props}
          />
          {showCount && count !== undefined ? (
            <span className="pointer-events-none absolute bottom-2 right-4 text-2xs text-reuso-muted">
              {count}
              {maxLength ? `/${maxLength}` : null}
            </span>
          ) : null}
        </div>
      </FieldShell>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
