import { useState } from "react";
import { Checkbox } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

const inlineCode = `
import { Checkbox } from "../../components/ui";

<Checkbox label="Lembrar de mim" />
<Checkbox
  label="Receber ofertas por e-mail"
  description="No máximo 1 e-mail por semana."
  defaultChecked
/>
<Checkbox label="Indisponível" disabled />
`;

const cardCode = `
<Checkbox
  layout="card"
  label="Entrega expressa"
  description="Receba em até 2 dias úteis."
/>

// Indeterminate: "selecionar todos"
<Checkbox
  label="Selecionar todos"
  checked={todos}
  indeterminate={algunsMarcados}
  onChange={alternarTodos}
/>
`;

const ITEMS = ["Banco de Plástico", "Mesa de Madeira", "Cadeira Reciclada"];

export const CheckboxSection = () => {
  const [selected, setSelected] = useState<string[]>([ITEMS[0]]);
  const allSelected = selected.length === ITEMS.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggle = (item: string) =>
    setSelected((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    );

  return (
    <ComponentDocSection
      description="Seleção múltipla para filtros, termos de uso e itens do carrinho."
      id="component-checkbox"
      title="Checkbox"
      variations={["inline", "descrição", "card", "indeterminate"]}
    >
      <ExampleBlock code={inlineCode} previewClassName="grid gap-4" title="Inline">
        <Checkbox label="Lembrar de mim" />
        <Checkbox
          defaultChecked
          description="No máximo 1 e-mail por semana."
          label="Receber ofertas por e-mail"
        />
        <Checkbox disabled label="Indisponível" />
      </ExampleBlock>

      <ExampleBlock
        code={cardCode}
        previewClassName="grid gap-3"
        title="Card e indeterminate"
      >
        <Checkbox
          description="Receba em até 2 dias úteis."
          label="Entrega expressa"
          layout="card"
        />
        <div className="grid gap-2 rounded-2xl border border-reuso-border bg-reuso-surface p-4">
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            label="Selecionar todos"
            onChange={() => setSelected(allSelected ? [] : ITEMS)}
          />
          <div className="grid gap-2 pl-8">
            {ITEMS.map((item) => (
              <Checkbox
                checked={selected.includes(item)}
                key={item}
                label={item}
                onChange={() => toggle(item)}
              />
            ))}
          </div>
        </div>
      </ExampleBlock>
    </ComponentDocSection>
  );
};
