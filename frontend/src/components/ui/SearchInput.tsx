import { Search, X } from "lucide-react";
import type { ChangeEvent } from "react";
import { forwardRef, useState } from "react";
import { IconButton } from "./IconButton";
import type { InputProps } from "./Input";
import { Input } from "./Input";

export type SearchInputProps = Omit<
  InputProps,
  "type" | "leftIcon" | "rightElement" | "value" | "defaultValue"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  isLoading?: boolean;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      defaultValue = "",
      onChange,
      onValueChange,
      onClear,
      isLoading = false,
      placeholder = "Buscar produtos...",
      variant = "outline",
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value ?? internalValue;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) setInternalValue(event.target.value);
      onChange?.(event);
      onValueChange?.(event.target.value);
    };

    const handleClear = () => {
      if (value === undefined) setInternalValue("");
      onValueChange?.("");
      onClear?.();
    };

    return (
      <Input
        {...props}
        leftIcon={<Search />}
        onChange={handleChange}
        placeholder={placeholder}
        ref={ref}
        rightElement={
          isLoading ? (
            <span
              aria-label="Buscando"
              className="mr-2.5 size-4 animate-spin rounded-full border-2 border-reuso-muted border-r-transparent"
              role="status"
            />
          ) : currentValue ? (
            <IconButton
              icon={<X />}
              label="Limpar busca"
              onClick={handleClear}
              size="sm"
            />
          ) : null
        }
        type="search"
        value={currentValue}
        variant={variant}
      />
    );
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
