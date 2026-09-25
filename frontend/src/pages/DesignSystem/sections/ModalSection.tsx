import { Building2, CheckCircle2, IdCard, Mail, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Badge, Button, Input, Modal } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

type ModalExample = null | "form" | "success" | "cart";

const formCode = `
import { useState } from "react";
import { Button, Input, Modal } from "../../components/ui";

export const CadastroEmpresa = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Cadastre sua empresa</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        headerIcon={<Building2 />}
        title="Cadastre sua empresa"
        description="Preencha os dados para vender no atacado."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setOpen(false)}>Cadastrar</Button>
          </>
        }
      >
        <div className="grid gap-4">
          <Input label="Razão social" leftIcon={<Building2 />} />
          <Input label="E-mail" leftIcon={<Mail />} type="email" />
          <Input label="CNPJ" leftIcon={<IdCard />} />
        </div>
      </Modal>
    </>
  );
};
`;

const successCode = `
<Modal
  open={open}
  onClose={fechar}
  size="sm"
  variant="success"
  headerIcon={<CheckCircle2 />}
  title="Pedido confirmado!"
  description="Enviamos os detalhes para o seu e-mail."
  footerAlign="stretch"
  footer={<Button variant="success" onClick={fechar}>Continuar comprando</Button>}
/>
`;

const panelCode = `
<Modal
  open={open}
  onClose={fechar}
  placement="right"
  headerIcon={<ShoppingCart />}
  title="Seu carrinho"
  description="2 itens"
  footerAlign="stretch"
  footer={<Button size="lg" shape="pill">Finalizar compra</Button>}
>
  {/* itens do carrinho */}
</Modal>
`;

const CART_ITEMS = [
  { name: "Banco de Plástico", price: "R$ 199,90" },
  { name: "Mesa de Madeira", price: "R$ 459,90" },
];

export const ModalSection = () => {
  const [example, setExample] = useState<ModalExample>(null);
  const close = () => setExample(null);

  return (
    <ComponentDocSection
      description="Diálogo com fundo desfocado, cantos arredondados e animação de entrada. Fecha com Esc, clique fora ou no X, mantém o foco dentro e devolve ao botão de origem."
      id="component-modal"
      title="Modal"
      variations={["formulário", "sucesso", "painel lateral", "tamanhos", "acessível"]}
    >
      <ExampleBlock
        code={formCode}
        description="Ícone no cabeçalho, conteúdo livre e rodapé com ações."
        title="Com formulário"
      >
        <Button leftIcon={<Building2 />} onClick={() => setExample("form")}>
          Cadastre sua empresa
        </Button>
      </ExampleBlock>

      <ExampleBlock
        code={successCode}
        description={'`variant` muda a cor do ícone; `footerAlign="stretch"` estica os botões.'}
        title="Feedback de sucesso"
      >
        <Button onClick={() => setExample("success")} variant="success">
          Finalizar pedido
        </Button>
      </ExampleBlock>

      <ExampleBlock
        code={panelCode}
        description={'`placement="right"` vira um painel lateral, ideal para carrinho e filtros.'}
        title="Painel lateral"
      >
        <Button
          leftIcon={<ShoppingCart />}
          onClick={() => setExample("cart")}
          variant="outline"
        >
          Abrir carrinho
        </Button>
      </ExampleBlock>

      <Modal
        description="Preencha os dados para vender no atacado."
        footer={
          <>
            <Button onClick={close} variant="ghost">
              Cancelar
            </Button>
            <Button onClick={close}>Cadastrar</Button>
          </>
        }
        headerIcon={<Building2 />}
        onClose={close}
        open={example === "form"}
        title="Cadastre sua empresa"
      >
        <div className="grid gap-4">
          <Input label="Razão social" leftIcon={<Building2 />} />
          <Input label="E-mail" leftIcon={<Mail />} type="email" />
          <Input label="CNPJ" leftIcon={<IdCard />} />
        </div>
      </Modal>

      <Modal
        description="Enviamos os detalhes para o seu e-mail."
        footer={
          <Button onClick={close} variant="success">
            Continuar comprando
          </Button>
        }
        footerAlign="stretch"
        headerIcon={<CheckCircle2 />}
        onClose={close}
        open={example === "success"}
        size="sm"
        title="Pedido confirmado!"
        variant="success"
      />

      <Modal
        description={`${CART_ITEMS.length} itens`}
        footer={
          <Button onClick={close} shape="pill" size="lg">
            Finalizar compra
          </Button>
        }
        footerAlign="stretch"
        headerIcon={<ShoppingCart />}
        onClose={close}
        open={example === "cart"}
        placement="right"
        title="Seu carrinho"
      >
        <ul className="grid gap-3">
          {CART_ITEMS.map((item) => (
            <li
              className="flex items-center gap-4 rounded-2xl border border-reuso-border p-3"
              key={item.name}
            >
              <span className="size-14 shrink-0 rounded-xl bg-reuso-surface-subtle" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-reuso-text">
                  {item.name}
                </p>
                <Badge className="mt-1" dot variant="success">
                  Em estoque
                </Badge>
              </div>
              <span className="text-sm font-semibold text-reuso-text">
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      </Modal>
    </ComponentDocSection>
  );
};
