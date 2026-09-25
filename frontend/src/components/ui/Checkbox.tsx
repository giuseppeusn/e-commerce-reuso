import { Check, Minus } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";
import { cn } from "./utils";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  description?: ReactNode;
  indeterminate?: boolean;
  /** `card` deixa toda a área clicável com borda, bom para opções de frete/pagamento. */
  layout?: "inline" | "card";
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      className,
      label,
      description,
      indeterminate = false,
      layout = "inline",
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label
        className={cn(
          "flex items-start gap-3",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          layout === "card" &&
            "rounded-2xl border border-reuso-border bg-reuso-surface p-4 transition-colors hover:border-reuso-border-strong has-checked:border-reuso-primary has-checked:bg-reuso-surface-subtle",
          className,
        )}
        htmlFor={checkboxId}
      >
        <span className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
          <input
            className="peer ds-focus-ring size-5 cursor-[inherit] appearance-none rounded-md border-2 border-reuso-border-strong bg-reuso-surface transition-colors checked:border-reuso-primary checked:bg-reuso-primary indeterminate:border-reuso-primary indeterminate:bg-reuso-primary"
            disabled={disabled}
            id={checkboxId}
            ref={innerRef}
            type="checkbox"
            {...props}
          />
          <Check
            aria-hidden="true"
            className="pointer-events-none absolute size-3.5 scale-50 text-reuso-primary-foreground opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:opacity-0!"
            strokeWidth={3}
          />
          <Minus
            aria-hidden="true"
            className="pointer-events-none absolute size-3.5 text-reuso-primary-foreground opacity-0 peer-indeterminate:opacity-100"
            strokeWidth={3}
          />
        </span>
        {label || description ? (
          <span className="flex flex-col gap-0.5">
            {label ? (
              <span className="text-sm font-medium text-reuso-text">{label}</span>
            ) : null}
            {description ? (
              <span className="text-xs leading-5 text-reuso-muted">
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
