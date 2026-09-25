import { Lock } from "lucide-react";
import { PasswordInput } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

const code = `
import { PasswordInput } from "../../components/ui";

<PasswordInput label="Senha" leftIcon={<Lock />} />
<PasswordInput
  label="Confirmar senha"
  autoComplete="new-password"
  error="As senhas não conferem."
/>
`;

export const PasswordInputSection = () => (
  <ComponentDocSection
    description="Baseado no Input, com botão para alternar a visibilidade da senha."
    id="component-password-input"
    title="PasswordInput"
    variations={["mostrar senha", "ícone", "erro"]}
  >
    <ExampleBlock code={code} previewClassName="grid gap-4" title="Login e cadastro">
      <PasswordInput label="Senha" leftIcon={<Lock />} />
      <PasswordInput
        autoComplete="new-password"
        error="As senhas não conferem."
        label="Confirmar senha"
      />
    </ExampleBlock>
  </ComponentDocSection>
);
