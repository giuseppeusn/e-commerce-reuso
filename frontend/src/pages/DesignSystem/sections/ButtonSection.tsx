import { ArrowRight, Heart, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

const basicCode = `
import { Button } from "../../components/ui";

export const Acoes = () => (
  <div className="flex gap-3">
    <Button>Salvar</Button>
    <Button variant="outline">Cancelar</Button>
    <Button variant="danger-soft">Excluir</Button>
  </div>
);
`;

const variantsCode = `
<Button>Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="soft">Soft</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="danger">Excluir</Button>
<Button variant="danger-soft">Excluir soft</Button>
<Button variant="success">Confirmar</Button>
<Button variant="success-soft">Sucesso soft</Button>
`;

const sizesCode = `
<Button size="xs">Extra pequeno</Button>
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>
<Button size="xl">Extra grande</Button>
`;

const shapesCode = `
<Button shape="rounded">Rounded</Button>
<Button shape="pill" uppercase>Ver agora</Button>
<Button shape="square" aria-label="Adicionar" leftIcon={<Plus />} />
<Button shape="circle" variant="outline" aria-label="Favoritar"
  leftIcon={<Heart />} />
`;

const iconsCode = `
<Button leftIcon={<ShoppingCart />}>Adicionar ao carrinho</Button>
<Button rightIcon={<ArrowRight />} variant="outline">Continuar</Button>
<Button isLoading>Salvando</Button>
<Button disabled>Indisponível</Button>
<Button fullWidth size="lg" shape="pill">Finalizar compra</Button>
`;

export const ButtonSection = () => (
  <ComponentDocSection
    description="Acionador principal da interface. Segue o grafite do protótipo para a ação principal, com variantes por intenção, tamanho, formato e estado."
    id="component-button"
    title="Button"
    variations={["variantes", "tamanhos", "formatos", "ícones", "loading"]}
  >
    <ExampleBlock
      code={basicCode}
      description="Uma ação primária por contexto; as demais em variantes neutras ou destrutivas."
      title="Uso básico"
    >
      <Button>Salvar</Button>
      <Button variant="outline">Cancelar</Button>
      <Button variant="danger-soft">Excluir</Button>
    </ExampleBlock>

    <ExampleBlock
      code={variantsCode}
      description="Use `variant` para expressar hierarquia e risco da ação."
      title="Variantes"
    >
      <Button>Primário</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="danger">Excluir</Button>
      <Button variant="danger-soft">Excluir soft</Button>
      <Button variant="success">Confirmar</Button>
      <Button variant="success-soft">Sucesso soft</Button>
    </ExampleBlock>

    <ExampleBlock code={sizesCode} title="Tamanhos">
      <Button size="xs">Extra pequeno</Button>
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
      <Button size="xl">Extra grande</Button>
    </ExampleBlock>

    <ExampleBlock
      code={shapesCode}
      description="`pill` + `uppercase` reproduz o CTA “VER AGORA” do banner. `square` e `circle` são para botões só com ícone (sempre com aria-label)."
      title="Formatos"
    >
      <Button shape="rounded">Rounded</Button>
      <Button shape="pill" uppercase>
        Ver agora
      </Button>
      <Button aria-label="Adicionar" leftIcon={<Plus />} shape="square" />
      <Button
        aria-label="Favoritar"
        leftIcon={<Heart />}
        shape="circle"
        variant="outline"
      />
      <Button
        aria-label="Remover"
        leftIcon={<Trash2 />}
        shape="circle"
        variant="danger-soft"
      />
    </ExampleBlock>

    <ExampleBlock
      code={iconsCode}
      description="`leftIcon`, `rightIcon`, `isLoading`, `disabled` e `fullWidth` cobrem os estados mais comuns de fluxo."
      title="Ícones e estados"
    >
      <Button leftIcon={<ShoppingCart />}>Adicionar ao carrinho</Button>
      <Button rightIcon={<ArrowRight />} variant="outline">
        Continuar
      </Button>
      <Button isLoading>Salvando</Button>
      <Button disabled>Indisponível</Button>
      <Button fullWidth shape="pill" size="lg">
        Finalizar compra
      </Button>
    </ExampleBlock>
  </ComponentDocSection>
);
