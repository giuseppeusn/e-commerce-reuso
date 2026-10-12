import { useState, useEffect } from "react";
import { User, MapPin, CreditCard, Pencil } from "lucide-react";
import Navbar from "../../Componentes/NavBar";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { IconButton } from "../../../components/ui/IconButton";

import { useAuth } from "../../../context/AuthContext";

const Conta = () => {
  const { usuario } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Estado com os dados do usuário (Nome, Email e CPF)
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    cpf: "",
  });

  // Atualiza o estado quando o usuário logado é carregado pelo contexto
  useEffect(() => {
    if (usuario) {
      setUserData({
        nome: usuario.nome || "",
        email: usuario.email || "",
        cpf: usuario.cpf || "",
      });
    }
  }, [usuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-reuso-canvas p-4 md:p-8">
      {/* Navbar Superior */}
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

              {/* Menu */}
              <nav className="w-full space-y-2">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-reuso-text border-b-2 border-reuso-text text-left transition-colors"
                >
                  <User className="size-5 shrink-0" />
                  <span>Dados pessoais</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-reuso-muted hover:text-reuso-text text-left transition-colors"
                >
                  <MapPin className="size-5 shrink-0" />
                  <span>Endereços</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-reuso-muted hover:text-reuso-text text-left transition-colors"
                >
                  <CreditCard className="size-5 shrink-0" />
                  <span>Pagamentos</span>
                </button>
              </nav>
            </aside>

            {/* Dados Pessoais */}
            <section className="md:col-span-8 flex flex-col items-center md:items-start md:pl-4">
              <h1 className="text-xl font-bold uppercase tracking-wider text-reuso-text mb-6">
                MEUS DADOS
              </h1>

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
                  placeholder="000.000.000-00"
                />

                {/* Botões */}
                <div className="pt-6 flex flex-col items-center gap-3">
                  <Button
                    variant="primary"
                    shape="pill"
                    uppercase
                    size="md"
                    className="px-10 bg-[#2C3338] hover:bg-[#1E2327] text-white"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "SALVAR" : "EDITAR"}
                  </Button>

                  <Button
                    variant="link"
                    uppercase
                    className="text-xs font-semibold text-reuso-danger hover:underline tracking-wider"
                  >
                    EXCLUIR MINHA CONTA
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Conta;
