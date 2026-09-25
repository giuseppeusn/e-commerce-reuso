import type { ReactNode } from "react";
import { cn } from "./utils";

type FieldShellProps = {
  children: ReactNode;
  className?: string;
  error?: ReactNode;
  helperText?: ReactNode;
  htmlFor: string;
  label?: ReactNode;
  messageId?: string;
  required?: boolean;
};

/** Estrutura padrão de label + controle + mensagem usada pelos campos. */
export const FieldShell = ({
  children,
  className,
  error,
  helperText,
  htmlFor,
  label,
  messageId,
  required,
}: FieldShellProps) => {
  const message = error ?? helperText;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label ? (
        <label
          className="pl-1 text-xs font-medium tracking-wide text-reuso-text"
          htmlFor={htmlFor}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-reuso-danger">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {message ? (
        <p
          className={cn(
            "pl-1 text-xs leading-5",
            error ? "text-reuso-danger" : "text-reuso-muted",
          )}
          id={messageId}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
};

export default FieldShell;
