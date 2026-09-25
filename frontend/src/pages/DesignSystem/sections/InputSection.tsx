import { Building2, IdCard, Mail, MapPin, UserRound } from "lucide-react";
import { Input } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

const basicCode = `
import { Input } from "../../components/ui";

<Input label="Nome completo" placeholder="Digite seu nome" />
<Input
  label="E-mail"
  type="email"
  placeholder="voce@email.com.br"
  helperText="Usaremos para enviar o status do pedido."
/>
`;

const iconsCode = `
<Input label="Razão social" leftIcon={<Building2 />} />
<Input label="E-mail" leftIcon={<Mail />} type="email" />
<Input label="CNPJ" leftIcon={<IdCard />} placeholder="00.000.000/0000-00" />
<Input label="Responsável legal" leftIcon={<UserRound />} />
`;

const statesCode = `
<Input label="CPF" required error="CPF inválido." defaultValue="123.456" />
<Input label="Cidade" disabled defaultValue="São Paulo" />
<Input label="CEP" variant="outline" leftIcon={<MapPin />} />
<Input label="Complemento" shape="rounded" size="lg" />
`;

export const InputSection = () => (
  <ComponentDocSection
    description="Campo de texto no estilo do protótipo: formato pílula, fundo sage suave, label curta acima e ícone opcional à esquerda."
    id="component-input"
    title="Input"
    variations={["label", "ícone", "helper", "erro", "filled/outline", "tamanhos"]}
  >
    <ExampleBlock
      code={basicCode}
      previewClassName="grid gap-4"
      title="Uso básico"
    >
      <Input label="Nome completo" placeholder="Digite seu nome" />
      <Input
        helperText="Usaremos para enviar o status do pedido."
        label="E-mail"
        placeholder="voce@email.com.br"
        type="email"
      />
    </ExampleBlock>

    <ExampleBlock
      code={iconsCode}
      description="Mesmo formato do formulário “Cadastre sua Empresa”."
      previewClassName="grid gap-4"
      title="Com ícone"
    >
      <Input label="Razão social" leftIcon={<Building2 />} />
      <Input label="E-mail" leftIcon={<Mail />} type="email" />
      <Input
        label="CNPJ"
        leftIcon={<IdCard />}
        placeholder="00.000.000/0000-00"
      />
      <Input label="Responsável legal" leftIcon={<UserRound />} />
    </ExampleBlock>

    <ExampleBlock
      code={statesCode}
      description="Erro, desabilitado e as variações `variant`, `shape` e `size`."
      previewClassName="grid gap-4"
      title="Estados e variações"
    >
      <Input defaultValue="123.456" error="CPF inválido." label="CPF" required />
      <Input defaultValue="São Paulo" disabled label="Cidade" />
      <Input label="CEP" leftIcon={<MapPin />} variant="outline" />
      <Input label="Complemento" shape="rounded" size="lg" />
    </ExampleBlock>
  </ComponentDocSection>
);
