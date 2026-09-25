import { LogOut } from "lucide-react";
import { useState } from "react";
import { Button, ConfirmDialog } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

type DialogExample = null | "delete" | "logout";

const deleteCode = `
import { useState } from "react";
import { Button, ConfirmDialog } from "../../components/ui";

export const ExcluirConta = () => {
  const [open, setOpen] = useState(false);

  const excluirConta = async () => {
    await api.delete("/conta"); // o botão fica em loading até terminar
  };

  return (
    <>
      <Button variant="link" className="text-reuso-danger!"
        onClick={() => setOpen(true)}>
        Excluir minha conta
      </Button>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={excluirConta}
        title="Excluir sua conta?"
        description="Você tem certeza que deseja excluir sua conta?
          Essa ação não pode ser desfeita."
        confirmLabel="Excluir"
      />
    </>
  );
};
`;

const warningCode = `
<ConfirmDialog
  open={open}
  onClose={fechar}
  onConfirm={sair}
  variant="warning"
  icon={<LogOut />}
  title="Sair da conta?"
  description="Os itens do carrinho continuarão salvos."
  confirmLabel="Sair"
/>
`;

const wait = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export const ConfirmDialogSection = () => {
  const [example, setExample] = useState<DialogExample>(null);
  const close = () => setExample(null);

  return (
    <ComponentDocSection
      description="Confirmação de ações críticas, baseada no Modal. Reproduz o fluxo “Excluir minha conta” do protótipo, com suporte a confirmação assíncrona."
      id="component-confirm-dialog"
      title="ConfirmDialog"
      variations={["danger", "warning", "info", "async"]}
    >
      <ExampleBlock
        code={deleteCode}
        description="`onConfirm` pode retornar uma Promise: o botão mostra loading e o diálogo fecha ao final."
        title="Ação destrutiva"
      >
        <Button
          className="text-reuso-danger!"
          onClick={() => setExample("delete")}
          uppercase
          variant="link"
        >
          Excluir minha conta
        </Button>
      </ExampleBlock>

      <ExampleBlock code={warningCode} title="Aviso com ícone customizado">
        <Button
          leftIcon={<LogOut />}
          onClick={() => setExample("logout")}
          variant="outline"
        >
          Sair
        </Button>
      </ExampleBlock>

      <ConfirmDialog
        confirmLabel="Excluir"
        description="Você tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
        onClose={close}
        onConfirm={() => wait(1200)}
        open={example === "delete"}
        title="Excluir sua conta?"
      />

      <ConfirmDialog
        confirmLabel="Sair"
        description="Os itens do carrinho continuarão salvos."
        icon={<LogOut />}
        onClose={close}
        onConfirm={() => undefined}
        open={example === "logout"}
        title="Sair da conta?"
        variant="warning"
      />
    </ComponentDocSection>
  );
};
