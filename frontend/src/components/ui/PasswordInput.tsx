import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import { IconButton } from "./IconButton";
import type { InputProps } from "./Input";
import { Input } from "./Input";

export type PasswordInputProps = Omit<InputProps, "type" | "rightElement">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <Input
        autoComplete="current-password"
        {...props}
        ref={ref}
        rightElement={
          <IconButton
            icon={visible ? <EyeOff /> : <Eye />}
            label={visible ? "Ocultar senha" : "Mostrar senha"}
            onClick={() => setVisible((current) => !current)}
            size="sm"
          />
        }
        type={visible ? "text" : "password"}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
