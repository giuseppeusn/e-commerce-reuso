import { useState } from "react";
import { Textarea } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

const code = `
import { useState } from "react";
import { Textarea } from "../../components/ui";

const [obs, setObs] = useState("");

<Textarea
  label="Observações do pedido"
  placeholder="Ex.: entregar na portaria"
  maxLength={200}
  showCount
  value={obs}
  onChange={(e) => setObs(e.target.value)}
/>

<Textarea label="Descrição" error="Descreva o produto." rows={3} />
`;

export const TextareaSection = () => {
  const [notes, setNotes] = useState("");

  return (
    <ComponentDocSection
      description="Campo de texto longo com contador opcional de caracteres."
      id="component-textarea"
      title="Textarea"
      variations={["contador", "helper", "erro", "resize"]}
    >
      <ExampleBlock code={code} previewClassName="grid gap-4" title="Uso em formulário">
        <Textarea
          label="Observações do pedido"
          maxLength={200}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Ex.: entregar na portaria"
          showCount
          value={notes}
        />
        <Textarea error="Descreva o produto." label="Descrição" rows={3} />
      </ExampleBlock>
    </ComponentDocSection>
  );
};
