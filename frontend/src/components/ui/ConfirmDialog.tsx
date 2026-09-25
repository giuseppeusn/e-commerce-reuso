import { AlertTriangle, Info, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import type { ButtonVariant } from "./Button";
import { Button } from "./Button";
import { Modal } from "./Modal";

type ConfirmDialogVariant = "danger" | "warning" | "info";

export type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  /** Pode retornar uma Promise: o botão mostra loading até ela terminar. */
  onConfirm: () => void | Promise<void>;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  icon?: ReactNode;
};

const variantConfig: Record<
  ConfirmDialogVariant,
  { icon: ReactNode; button: ButtonVariant }
> = {
  danger: { icon: <Trash2 />, button: "danger" },
  warning: { icon: <AlertTriangle />, button: "primary" },
  info: { icon: <Info />, button: "primary" },
};

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "danger",
  icon,
}: ConfirmDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const config = variantConfig[variant];

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      closeOnOverlayClick={!isLoading}
      closeOnEsc={!isLoading}
      description={description}
      footer={
        <>
          <Button disabled={isLoading} onClick={onClose} variant="ghost">
            {cancelLabel}
          </Button>
          <Button
            data-autofocus
            isLoading={isLoading}
            onClick={handleConfirm}
            variant={config.button}
          >
            {confirmLabel}
          </Button>
        </>
      }
      headerIcon={icon ?? config.icon}
      onClose={onClose}
      open={open}
      size="sm"
      title={title}
      variant={variant}
    />
  );
};

export default ConfirmDialog;
