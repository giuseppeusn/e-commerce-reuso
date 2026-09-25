import { Truck } from "lucide-react";
import { Badge } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

const code = `
import { Badge } from "../../components/ui";

<Badge variant="success" dot>Em estoque</Badge>
<Badge variant="warning">Últimas unidades</Badge>
<Badge variant="danger" appearance="solid">-20%</Badge>
<Badge variant="info" icon={<Truck />}>Frete grátis</Badge>
<Badge variant="primary" appearance="solid">Lançamento</Badge>
<Badge appearance="outline">Usado</Badge>
`;

export const BadgeSection = () => (
  <ComponentDocSection
    description="Etiquetas curtas de status e destaque: estoque, desconto, frete e lançamentos."
    id="component-badge"
    title="Badge"
    variations={["soft", "solid", "outline", "dot", "ícone"]}
  >
    <ExampleBlock code={code} title="Status de produto">
      <Badge dot variant="success">
        Em estoque
      </Badge>
      <Badge variant="warning">Últimas unidades</Badge>
      <Badge appearance="solid" variant="danger">
        -20%
      </Badge>
      <Badge icon={<Truck />} variant="info">
        Frete grátis
      </Badge>
      <Badge appearance="solid" variant="primary">
        Lançamento
      </Badge>
      <Badge appearance="outline">Usado</Badge>
    </ExampleBlock>
  </ComponentDocSection>
);
