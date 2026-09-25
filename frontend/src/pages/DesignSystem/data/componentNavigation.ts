import type { ComponentNavigationGroup } from "../types";

export const componentNavigation: ComponentNavigationGroup[] = [
  {
    title: "Ações",
    items: [
      {
        id: "component-button",
        name: "Button",
        variations: ["variantes", "tamanhos", "formatos", "ícones", "loading"],
      },
      {
        id: "component-iconbutton",
        name: "IconButton",
        variations: ["ghost", "outline", "solid", "badge"],
      },
    ],
  },
  {
    title: "Formulário",
    items: [
      {
        id: "component-input",
        name: "Input",
        variations: ["label", "ícone", "helper", "erro", "filled/outline"],
      },
      {
        id: "component-password-input",
        name: "PasswordInput",
        variations: ["mostrar senha", "erro"],
      },
      {
        id: "component-search-input",
        name: "SearchInput",
        variations: ["limpar", "loading", "controlado"],
      },
      {
        id: "component-select",
        name: "Select",
        variations: ["placeholder", "ícone", "erro"],
      },
      {
        id: "component-textarea",
        name: "Textarea",
        variations: ["contador", "helper", "erro"],
      },
      {
        id: "component-checkbox",
        name: "Checkbox",
        variations: ["inline", "card", "indeterminate"],
      },
    ],
  },
  {
    title: "Sobreposição",
    items: [
      {
        id: "component-modal",
        name: "Modal",
        variations: ["formulário", "sucesso", "painel lateral", "tamanhos"],
      },
      {
        id: "component-confirm-dialog",
        name: "ConfirmDialog",
        variations: ["danger", "warning", "async"],
      },
    ],
  },
  {
    title: "Exibição",
    items: [
      {
        id: "component-card",
        name: "Card",
        variations: ["header", "content", "footer"],
      },
      {
        id: "component-badge",
        name: "Badge",
        variations: ["soft", "solid", "outline", "dot"],
      },
    ],
  },
];

export const componentItems = componentNavigation.flatMap((group) => group.items);

export const defaultComponentId = componentItems[0]?.id ?? "component-button";
