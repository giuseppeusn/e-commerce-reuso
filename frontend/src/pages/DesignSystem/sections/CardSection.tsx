import { Heart, ShoppingCart } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  IconButton,
} from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

const code = `
import {
  Badge, Button, Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "../../components/ui";

<Card>
  <CardHeader>
    <CardTitle>Meus dados</CardTitle>
    <CardDescription>Informações da sua conta.</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>
    <Button uppercase size="sm">Editar</Button>
  </CardFooter>
</Card>

// Card de produto
<Card className="w-60 overflow-hidden">
  <div className="relative aspect-square bg-reuso-surface-subtle">
    <Badge appearance="solid" variant="danger">-20%</Badge>
  </div>
  <CardContent className="pt-4">
    <p>Marca</p>
    <CardTitle>Banco de Plástico</CardTitle>
    <p>R$ 199,90</p>
  </CardContent>
</Card>
`;

export const CardSection = () => (
  <ComponentDocSection
    description="Container de conteúdo com header, content e footer. Base para o card de produto e para as áreas de conta (Meus dados, Endereços, Pagamentos)."
    id="component-card"
    title="Card"
    importPath="../../components/ui"
    variations={["header", "content", "footer", "produto"]}
  >
    <ExampleBlock code={code} previewClassName="items-start" title="Conta e produto">
      <Card className="w-72">
        <CardHeader>
          <CardTitle>Meus dados</CardTitle>
          <CardDescription>Informações da sua conta.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-1 text-sm text-reuso-muted">
          <span>Felipe Francisco Morais</span>
          <span>felipe@email.com.br</span>
        </CardContent>
        <CardFooter>
          <Button size="sm" uppercase>
            Editar
          </Button>
        </CardFooter>
      </Card>

      <Card className="group w-60 overflow-hidden transition-shadow hover:shadow-reuso-md">
        <div className="relative aspect-square bg-reuso-surface-subtle">
          <Badge appearance="solid" className="absolute left-3 top-3" variant="danger">
            -20%
          </Badge>
          <IconButton
            className="absolute right-3 top-3"
            icon={<Heart />}
            label="Favoritar"
            size="sm"
            variant="outline"
          />
        </div>
        <CardContent className="grid gap-1 pt-4">
          <p className="text-xs text-reuso-muted">Marca</p>
          <CardTitle>Banco de Plástico</CardTitle>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-bold text-reuso-text">R$ 199,90</p>
            <IconButton
              icon={<ShoppingCart />}
              label="Adicionar ao carrinho"
              size="sm"
              variant="solid"
            />
          </div>
        </CardContent>
      </Card>
    </ExampleBlock>
  </ComponentDocSection>
);
