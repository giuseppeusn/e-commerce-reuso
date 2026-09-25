import { MapPinned } from "lucide-react";
import { Select } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

const ufOptions = [
  { label: "São Paulo", value: "SP" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Paraná", value: "PR" },
];

const sizeOptions = [
  { label: "Pequeno", value: "p" },
  { label: "Médio", value: "m" },
  { label: "Grande", value: "g" },
  { label: "Extra grande (esgotado)", value: "gg", disabled: true },
];

const code = `
import { Select } from "../../components/ui";

const ufOptions = [
  { label: "São Paulo", value: "SP" },
  { label: "Rio de Janeiro", value: "RJ" },
];

<Select
  label="UF"
  leftIcon={<MapPinned />}
  options={ufOptions}
  placeholder="Selecione o estado"
  defaultValue=""
/>

<Select label="Tamanho" options={sizeOptions} defaultValue="m" size="sm" />

<Select
  label="Cor"
  options={[]}
  placeholder="Selecione"
  defaultValue=""
  error="Escolha uma cor para continuar."
/>
`;

export const SelectSection = () => (
  <ComponentDocSection
    description="Seleção nativa com o mesmo visual dos inputs. Útil para UF, tamanho e cor do produto (como na página de peça do protótipo)."
    id="component-select"
    title="Select"
    variations={["placeholder", "ícone", "desabilitado", "erro"]}
  >
    <ExampleBlock code={code} previewClassName="grid gap-4" title="Opções de produto e endereço">
      <Select
        defaultValue=""
        label="UF"
        leftIcon={<MapPinned />}
        options={ufOptions}
        placeholder="Selecione o estado"
      />
      <Select defaultValue="m" label="Tamanho" options={sizeOptions} size="sm" />
      <Select
        defaultValue=""
        error="Escolha uma cor para continuar."
        label="Cor"
        options={[]}
        placeholder="Selecione"
      />
    </ExampleBlock>
  </ComponentDocSection>
);
