import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Pencil,
  ShoppingCart,
  Trash2,
  User,
} from "lucide-react";
import { IconButton } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

const variantsCode = `
import { IconButton } from "../../components/ui";

<IconButton icon={<ShoppingCart />} label="Carrinho" badge={3} />
<IconButton icon={<User />} label="Minha conta" />
<IconButton icon={<Heart />} label="Favoritar" variant="outline" />
<IconButton icon={<Pencil />} label="Editar" variant="soft" />
<IconButton icon={<Trash2 />} label="Excluir" variant="danger" />
`;

const carouselCode = `
<IconButton icon={<ChevronLeft />} label="Anterior"
  variant="outline" size="lg" />
<IconButton icon={<ChevronRight />} label="Próximo"
  variant="solid" size="lg" />

<IconButton icon={<Pencil />} label="Editar" size="sm" shape="rounded" />
`;

export const IconButtonSection = () => (
  <ComponentDocSection
    description="Botão compacto só com ícone: carrinho e conta na navbar, setas do carrossel e ações de linha. A prop `label` é obrigatória e vira aria-label/title."
    id="component-iconbutton"
    title="IconButton"
    variations={["ghost", "outline", "solid", "soft", "danger", "badge"]}
  >
    <ExampleBlock
      code={variantsCode}
      description="Use `badge` para contadores, como itens no carrinho."
      title="Variantes e badge"
    >
      <IconButton badge={3} icon={<ShoppingCart />} label="Carrinho" />
      <IconButton icon={<User />} label="Minha conta" />
      <IconButton icon={<Heart />} label="Favoritar" variant="outline" />
      <IconButton icon={<Pencil />} label="Editar" variant="soft" />
      <IconButton icon={<Trash2 />} label="Excluir" variant="danger" />
    </ExampleBlock>

    <ExampleBlock
      code={carouselCode}
      description="Setas do carrossel do banner e tamanhos disponíveis."
      title="Carrossel e tamanhos"
    >
      <IconButton
        icon={<ChevronLeft />}
        label="Anterior"
        size="lg"
        variant="outline"
      />
      <IconButton
        icon={<ChevronRight />}
        label="Próximo"
        size="lg"
        variant="solid"
      />
      <IconButton icon={<Pencil />} label="Editar" shape="rounded" size="sm" />
    </ExampleBlock>
  </ComponentDocSection>
);
