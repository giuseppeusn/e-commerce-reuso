import { X } from "lucide-react";
import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "./IconButton";
import { cn } from "./utils";

export type ModalVariant = "default" | "danger" | "success" | "warning" | "info";
type ModalSize = "sm" | "md" | "lg" | "xl";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  footerAlign?: "end" | "between" | "stretch";
  headerIcon?: ReactNode;
  variant?: ModalVariant;
  size?: ModalSize;
  /** `right` transforma o modal em painel lateral (carrinho, filtros...). */
  placement?: "center" | "right";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  hideCloseButton?: boolean;
  className?: string;
};

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const iconVariantClasses: Record<ModalVariant, string> = {
  default: "bg-reuso-primary-soft text-reuso-text",
  danger: "bg-reuso-danger-soft text-reuso-danger",
  success: "bg-reuso-success-soft text-reuso-success",
  warning: "bg-reuso-warning-soft text-reuso-warning-foreground",
  info: "bg-reuso-info-soft text-reuso-info-foreground",
};

const footerAlignClasses = {
  end: "justify-end",
  between: "justify-between",
  stretch: "[&>*]:flex-1",
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  footerAlign = "end",
  headerIcon,
  variant = "default",
  size = "md",
  placement = "center",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  hideCloseButton = false,
  className,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const isPanel = placement === "right";

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      const firstFocusable =
        dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]") ??
        dialogRef.current;
      firstFocusable?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && closeOnEsc) {
      event.stopPropagation();
      onClose();
      return;
    }

    // Mantém o foco do teclado dentro do modal
    if (event.key === "Tab" && dialogRef.current) {
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex",
        isPanel ? "justify-end" : "items-end justify-center p-4 sm:items-center",
      )}
      onKeyDown={handleKeyDown}
    >
      <div
        aria-hidden="true"
        className="animate-ds-overlay absolute inset-0 bg-reuso-overlay backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={title ? titleId : undefined}
        aria-modal="true"
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-reuso-surface text-reuso-text shadow-reuso-lg ring-1 ring-reuso-border outline-none",
          isPanel
            ? "animate-ds-panel h-full max-w-md"
            : cn(
                "animate-ds-dialog max-h-[calc(100vh-2rem)] rounded-3xl",
                sizeClasses[size],
              ),
          className,
        )}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        {title || headerIcon || !hideCloseButton ? (
          <div className="flex items-start gap-4 px-6 pb-2 pt-6">
            {headerIcon ? (
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-2xl [&_svg]:size-5",
                  iconVariantClasses[variant],
                )}
              >
                {headerIcon}
              </span>
            ) : null}
            <div className="min-w-0 flex-1 pt-0.5">
              {title ? (
                <h2
                  className="text-lg font-semibold leading-7 text-reuso-text"
                  id={titleId}
                >
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p
                  className="mt-1 text-sm leading-6 text-reuso-muted"
                  id={descriptionId}
                >
                  {description}
                </p>
              ) : null}
            </div>
            {!hideCloseButton ? (
              <IconButton
                className="-mr-2 -mt-1"
                icon={<X />}
                label="Fechar"
                onClick={onClose}
                size="sm"
              />
            ) : null}
          </div>
        ) : null}

        {children ? (
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            {children}
          </div>
        ) : null}

        {footer ? (
          <div
            className={cn(
              "flex flex-wrap items-center gap-3 border-t border-reuso-border bg-reuso-surface-subtle/60 px-6 py-4",
              footerAlignClasses[footerAlign],
            )}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
