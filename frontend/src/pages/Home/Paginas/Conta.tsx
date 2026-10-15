import { useState, useEffect } from "react";
import { User, MapPin, CreditCard, Pencil } from "lucide-react";
import { useSearchParams, useParams } from "react-router-dom";
import Navbar from "../../Componentes/NavBar";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { IconButton } from "../../../components/ui/IconButton";
import { ConfirmDialog } from "../../../components/ui/ConfirmDialog";
import { EnderecosTab } from "../../Enderecos/EnderecosTab";
import Cartoes from "../../Cartoes";

import { useAuth } from "../../../context/AuthContext";
import { API_BASE_URL } from "../../../config/api";

// Função para formatar o CPF automaticamente (000.000.000-00)
const formatCPF = (value: string) => {
  const numbersOnly = value.replace(/\D/g, "");
  return numbersOnly
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

interface ContaProps {
  initialTab?: "dados" | "enderecos" | "cartoes";
  initialView?: "lista" | "novo" | "editar";
}

const Conta = ({ initialTab, initialView }: ContaProps) => {
  // Parâmetros de rota e URL para controlar a aba ativa
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const urlTab = searchParams.get("tab") as
    | "dados"
    | "enderecos"
    | "cartoes"
    | null;

  // Estado da aba atual selecionada
  const [activeTab, setActiveTab] = useState<"dados" | "enderecos" | "cartoes">(
    initialTab || urlTab || "dados",
  );

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    } else if (urlTab) {
      setActiveTab(urlTab);
    }
  }, [initialTab, urlTab]);

  // Dados do usuário vindos do contexto de autenticação
  const { usuario, token, atualizarUsuario, logout } = useAuth();

  // Estados locais para edição dos dados
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    cpf: "",
  });

  // Estado para controlar o modal de confirmação de exclusão
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  // Estados de carregamento e mensagens de erro
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Carrega os dados do usuário assim que o componente é montado
  useEffect(() => {
    if (usuario) {
      setUserData({
        nome: usuario.nome || "",
        email: usuario.email || "",
        cpf: usuario.cpf ? formatCPF(usuario.cpf) : "",
      });
    }
  }, [usuario]);

  // Atualiza os campos do formulário conforme o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      setUserData((prev) => ({
        ...prev,
        cpf: formatCPF(value),
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Alterna entre ativar a edição e confirmar a gravação das alterações
  const handlePrimaryButtonClick = () => {
    if (isEditing) {
      handleConfirmEdit();
    } else {
      setIsEditing(true);
    }
  };

  const getUserId = () => {
    return usuario?.id || (usuario as any)?._id;
  };

  /* --- Conexão com o backend: Ação de Editar Usuário --- */
  const handleConfirmEdit = async () => {
    const userId = getUserId();

    if (!userId || !token) {
      setErrorMsg(
        "Sessão inválida ou usuário não identificado. Faça login novamente.",
      );
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    try {
      const payload = {
        ...userData,
        cpf: userData.cpf.replace(/\D/g, ""),
      };

      // Requisição PUT para atualizar dados do usuário
      const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Falha ao atualizar os dados do usuário.",
        );
      }

      const usuarioAtualizado = data.usuario || data.user || data;

      if (atualizarUsuario) {
        atualizarUsuario(usuarioAtualizado);
      }

      setIsEditing(false);
    } catch (err: any) {
      console.error("Erro ao editar conta:", err);
      setErrorMsg(err.message || "Erro inesperado ao salvar alterações.");
    } finally {
      setIsSaving(false);
    }
  };

  /* --- Conexão com o backend: Ação de Excluir Conta --- */
  const handleConfirmDelete = async () => {
    const userId = getUserId();

    if (!userId || !token) {
      setErrorMsg(
        "Sessão inválida ou usuário não identificado. Faça login novamente.",
      );
      setIsConfirmDeleteOpen(false);
      return;
    }

    setIsDeleting(true);
    setErrorMsg(null);

    try {
      // Requisição DELETE para remover o usuário
      const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Falha ao excluir a conta.");
      }

      if (logout) {
        logout();
      }
    } catch (err: any) {
      console.error("Erro ao excluir conta:", err);
      setErrorMsg(err.message || "Erro inesperado ao excluir a conta.");
    } finally {
      setIsDeleting(false);
      setIsConfirmDeleteOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-reuso-canvas p-4 md:p-8">
      {/* Barra de Navegação Superior */}
      <div className="mb-8">
        <Navbar />
      </div>

      <main className="max-w-5xl mx-auto">
        <Card className="p-6 md:p-10 border-0 shadow-reuso-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <aside className="md:col-span-4 flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-reuso-border pb-8 md:pb-0 md:pr-8">
              <div className="relative mb-6">
                <div className="size-32 rounded-full overflow-hidden border-2 border-reuso-border bg-reuso-neutral-soft flex items-center justify-center">
                  {usuario?.avatarUrl ? (
                    <img
                      src={usuario.avatarUrl}
                      alt={`Foto de perfil de ${userData.nome}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="size-16 text-reuso-muted" />
                  )}
                </div>
                <IconButton
                  icon={<Pencil />}
                  label="Alterar foto de perfil"
                  variant="outline"
                  size="sm"
                  className="absolute bottom-1 right-1 bg-reuso-surface shadow-reuso-sm"
                />
              </div>

              {/* Botões de Troca de Aba */}
              <nav className="w-full space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("dados")}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                    activeTab === "dados"
                      ? "font-bold text-reuso-text border-b-2 border-reuso-text"
                      : "font-semibold text-reuso-muted hover:text-reuso-text"
                  }`}
                >
                  <User className="size-5 shrink-0" />
                  <span>Dados pessoais</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("enderecos")}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                    activeTab === "enderecos"
                      ? "font-bold text-reuso-text border-b-2 border-reuso-text"
                      : "font-semibold text-reuso-muted hover:text-reuso-text"
                  }`}
                >
                  <MapPin className="size-5 shrink-0" />
                  <span>Endereços</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("cartoes")}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                    activeTab === "cartoes"
                      ? "font-bold text-reuso-text border-b-2 border-reuso-text"
                      : "font-semibold text-reuso-muted hover:text-reuso-text"
                  }`}
                >
                  <CreditCard className="size-5 shrink-0" />
                  <span>Cartões</span>
                </button>
              </nav>
            </aside>

            {/* Conteúdo Principal da Aba Selecionada */}
            <section className="md:col-span-8 flex flex-col items-center md:items-start md:pl-4 w-full">
              {activeTab === "enderecos" ? (
                /* Aba de Endereços */
                <EnderecosTab initialView={initialView} editId={id} />
              ) : activeTab === "cartoes" ? (
                /* Aba de Cartões */
                <Cartoes />
              ) : (
                /* Aba de Dados Pessoais */
                <>
                  <h1 className="text-xl font-bold uppercase tracking-wider text-reuso-text mb-6">
                    MEUS DADOS
                  </h1>

                  {/* Exibição de Mensagem de Erro */}
                  {errorMsg && (
                    <div className="w-full max-w-md p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  {/* Formulário: Editar Dados do Usuário */}
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-full max-w-md space-y-4"
                  >
                    <Input
                      label="Nome completo"
                      name="nome"
                      value={userData.nome}
                      onChange={handleChange}
                      disabled={!isEditing}
                      shape="pill"
                      variant="filled"
                    />

                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      shape="pill"
                      variant="filled"
                    />

                    <Input
                      label="CPF"
                      name="cpf"
                      value={userData.cpf}
                      onChange={handleChange}
                      disabled={!isEditing}
                      shape="pill"
                      variant="filled"
                      maxLength={14}
                      placeholder="000.000.000-00"
                    />

                    {/* Ações: Salvar / Editar e Excluir */}
                    <div className="pt-6 flex flex-col items-center gap-3">
                      <Button
                        type="button"
                        variant="primary"
                        shape="pill"
                        uppercase
                        size="md"
                        className="px-10 bg-[#2C3338] hover:bg-[#1E2327] text-white"
                        onClick={handlePrimaryButtonClick}
                        disabled={isSaving}
                      >
                        {isSaving
                          ? "SALVANDO..."
                          : isEditing
                            ? "SALVAR"
                            : "EDITAR"}
                      </Button>

                      <Button
                        type="button"
                        variant="link"
                        uppercase
                        className="text-xs font-semibold text-reuso-danger hover:underline tracking-wider"
                        onClick={() => setIsConfirmDeleteOpen(true)}
                      >
                        EXCLUIR MINHA CONTA
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </section>
          </div>
        </Card>
      </main>

      {/* Modal de Confirmação para Exclusão de Conta */}
      <ConfirmDialog
        open={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir sua conta?"
        description="Você tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
        confirmLabel={isDeleting ? "Excluindo..." : "Excluir"}
      />
    </div>
  );
};

export default Conta;
