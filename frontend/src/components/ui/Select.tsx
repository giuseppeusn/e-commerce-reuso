import { ChevronDown } from "lucide-react";
import type { ReactNode, SelectHTMLAttributes } from "react";
import { forwardRef, useId } from "react";
import { FieldShell } from "./FieldShell";
import type { FieldShape, FieldSize, FieldVariant } from "./fieldStyles";
import { fieldControlClasses, fieldSizeClasses } from "./fieldStyles";
import { cn } from "./utils";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
  leftIcon?: ReactNode;
  size?: FieldSize;
  variant?: FieldVariant;
  shape?: FieldShape;
  containerClassName?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      className,
      containerClassName,
      label,
      helperText,
      error,
      options,
      placeholder,
      leftIcon,
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
    const selectId = id ?? generatedId;
    const messageId = error || helperText ? `${selectId}-message` : undefined;

    return (
      <FieldShell
        className={containerClassName}
        error={error}
        helperText={helperText}
        htmlFor={selectId}
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
          <select
            aria-describedby={cn(ariaDescribedBy, messageId) || undefined}
            aria-invalid={error ? true : undefined}
            className={cn(
              fieldControlClasses({ variant, shape, error: Boolean(error) }),
              fieldSizeClasses[size],
              "cursor-pointer appearance-none pr-11",
              Boolean(leftIcon) && "pl-11",
              className,
            )}
            id={selectId}
            ref={ref}
            required={required}
            {...props}
          >
            {placeholder ? (
              <option disabled value="">
                {placeholder}
              </option>
            ) : null}
            {options.map((option) => (
              <option
                disabled={option.disabled}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-reuso-muted"
          />
        </div>
      </FieldShell>
    );
  },
);

Select.displayName = "Select";

export default Select;
