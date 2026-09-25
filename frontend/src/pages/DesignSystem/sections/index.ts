import type { DesignSystemSection } from "../types";
import { BadgeSection } from "./BadgeSection";
import { ButtonSection } from "./ButtonSection";
import { CardSection } from "./CardSection";
import { CheckboxSection } from "./CheckboxSection";
import { ConfirmDialogSection } from "./ConfirmDialogSection";
import { IconButtonSection } from "./IconButtonSection";
import { InputSection } from "./InputSection";
import { ModalSection } from "./ModalSection";
import { PasswordInputSection } from "./PasswordInputSection";
import { SearchInputSection } from "./SearchInputSection";
import { SelectSection } from "./SelectSection";
import { TextareaSection } from "./TextareaSection";

export const designSystemSections: DesignSystemSection[] = [
  { id: "component-button", Component: ButtonSection },
  { id: "component-iconbutton", Component: IconButtonSection },
  { id: "component-input", Component: InputSection },
  { id: "component-password-input", Component: PasswordInputSection },
  { id: "component-search-input", Component: SearchInputSection },
  { id: "component-select", Component: SelectSection },
  { id: "component-textarea", Component: TextareaSection },
  { id: "component-checkbox", Component: CheckboxSection },
  { id: "component-modal", Component: ModalSection },
  { id: "component-confirm-dialog", Component: ConfirmDialogSection },
  { id: "component-card", Component: CardSection },
  { id: "component-badge", Component: BadgeSection },
];
