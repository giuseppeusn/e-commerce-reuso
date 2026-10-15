// Menu suspenso para login/ cadastro ou Menu do Usuário Logado

import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Lock,
  User as UserIcon,
  IdCard,
  Heart,
  LogOut,
  Loader2,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  Input,
  PasswordInput,
  Button,
  ConfirmDialog,
} from "../../components/ui";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";

type AuthMode = "login" | "register";

type AuthDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Formatação auxiliar de CPF
const formatCPF = (value: string) => {
  const numbersOnly = value.replace(/\D/g, "");
  return numbersOnly
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const AuthDropdown = ({ isOpen, onClose }: AuthDropdownProps) => {
  const { usuario, login, logout } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isLogoutOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isLogoutOpen, onClose]);

  // Ação de confirmar Logout
  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Container do Dropdown */}
      <div
        ref={dropdownRef}
        className="absolute right-0 top-full mt-3 z-50 w-64"
      >
        <div className="absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-l border-t border-reuso-border bg-reuso-surface z-10" />

        <Card className="relative z-0 p-4 shadow-2xl rounded-2xl bg-reuso-surface">
          {/* Alterna entre usuário logado, tela de login ou tela de cadastro */}
          {usuario ? (
            <UserMenu
              usuario={usuario}
              onRequestLogout={() => setIsLogoutOpen(true)}
              onClose={onClose}
            />
          ) : mode === "login" ? (
            <LoginForm
              onSuccess={(user, token) => login(user, token)}
              onClose={onClose}
              onSwitchToRegister={() => setMode("register")}
            />
          ) : (
            <RegisterForm
              onSuccess={(user, token) => login(user, token)}
              onClose={onClose}
              onSwitchToLogin={() => setMode("login")}
            />
          )}
        </Card>
      </div>

      {/* Modal de confirmação para Sair (Logout) */}
      <ConfirmDialog
        open={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
        variant="warning"
        icon={<LogOut />}
        title="Sair da conta?"
        description="Os itens do carrinho continuarão salvos."
        confirmLabel="Sair"
      />
    </>
  );
};

/* --- SUBCOMPONENTE: MENU DO USUÁRIO LOGADO --- */
type UserMenuProps = {
  usuario: { nome: string; email: string; tipoConta?: string };
  onRequestLogout: () => void;
  onClose: () => void;
};

const UserMenu = ({ usuario, onRequestLogout, onClose }: UserMenuProps) => (
  <div className="flex flex-col gap-2 py-1 text-reuso-text">
    <div className="pb-2 border-b border-reuso-border">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm truncate">{usuario.nome}</p>
        {/* Badge para perfil ADMINISTRADOR */}
        {usuario.tipoConta === "ADMINISTRADOR" && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 px-1.5 py-0.5 rounded">
            Admin
          </span>
        )}
      </div>
      <p className="text-xs text-reuso-muted truncate">{usuario.email}</p>
    </div>

    {/* Links de navegação */}
    <Link
      to="/conta"
      onClick={onClose}
      className="flex items-center gap-3 px-2 py-2 text-sm font-medium hover:bg-reuso-canvas rounded-lg transition-colors"
    >
      <UserIcon size={18} />
      Conta
    </Link>

    <Link
      to="/enderecos"
      onClick={onClose}
      className="flex items-center gap-3 px-2 py-2 text-sm font-medium hover:bg-reuso-canvas rounded-lg transition-colors"
    >
      <MapPin size={18} />
      Endereços
    </Link>

    <Link
      to="/favoritos"
      onClick={onClose}
      className="flex items-center gap-3 px-2 py-2 text-sm font-medium hover:bg-reuso-canvas rounded-lg transition-colors"
    >
      <Heart size={18} />
      Favoritos
    </Link>

    {/* Botão para Sair */}
    <button
      type="button"
      onClick={onRequestLogout}
      className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors text-left w-full mt-1 border-t border-reuso-border pt-3"
    >
      <LogOut size={18} />
      Sair
    </button>
  </div>
);

/* --- SUBCOMPONENTE: FORMULÁRIO DE LOGIN --- */
type AuthFormProps = {
  onSuccess: (userData: any, token?: string) => void;
  onClose: () => void;
};

const LoginForm = ({
  onSuccess,
  onClose,
  onSwitchToRegister,
}: AuthFormProps & { onSwitchToRegister: () => void }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* --- Conexão com o backend --- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Requisição POST para logar o usuário
      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erro no login");

      const userObj = data.usuario || data.user || data;
      const token = data.token;

      onSuccess(
        {
          id: userObj.id || userObj._id,
          nome: userObj.nome || "Usuário",
          email: userObj.email || email,
          cpf: userObj.cpf || "",
          tipoConta: userObj.tipoConta,
          featureFlags: userObj.featureFlags,
        },
        token,
      );

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-3">
      <h2 className="text-center font-bold text-reuso-text text-base">
        Acesse sua conta
      </h2>

      {error && (
        <div className="p-2 text-xs text-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800 text-center">
          {error}
        </div>
      )}

      {/* Campos do Formulário de Login */}
      <Input
        label="Email"
        type="email"
        placeholder="Seu e-mail"
        leftIcon={<Mail />}
        shape="pill"
        size="sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordInput
        label="Senha"
        placeholder="Sua senha"
        leftIcon={<Lock />}
        shape="pill"
        size="sm"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="secondary"
        shape="pill"
        fullWidth
        size="sm"
        disabled={loading}
        className="mt-1 font-bold tracking-widest flex items-center justify-center"
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : "ACESSAR"}
      </Button>

      <div className="relative my-1 text-center text-xs text-reuso-muted uppercase before:absolute before:left-0 before:top-1/2 before:w-full before:border-t before:border-reuso-border before:-z-10">
        <span className="bg-reuso-surface px-2">ou</span>
      </div>

      {/* Alternar para formulário de cadastro */}
      <p className="mt-1 text-center text-xs text-reuso-muted">
        Não possui conta?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-bold text-blue-600 hover:underline"
        >
          Crie agora
        </button>
      </p>
    </form>
  );
};

/* --- SUBCOMPONENTE: FORMULÁRIO DE CADASTRO --- */
const RegisterForm = ({
  onSuccess,
  onClose,
  onSwitchToLogin,
}: AuthFormProps & { onSwitchToLogin: () => void }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCPF(e.target.value);
    setCpf(formattedCpf);
  };

  /* --- Conexão com o backend --- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const cleanCpf = cpf.replace(/\D/g, "");

      // Requisição POST para criar conta de usuário
      const response = await fetch(`${API_BASE_URL}/usuarios/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          cpf: cleanCpf,
          senha,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erro no cadastro");

      const userObj = data.usuario || data.user || data;
      const token = data.token;

      onSuccess(
        {
          id: userObj.id || userObj._id,
          nome: userObj.nome || nome,
          email: userObj.email || email,
          cpf: userObj.cpf || cleanCpf,
          tipoConta: userObj.tipoConta || "CLIENTE",
          featureFlags: userObj.featureFlags,
        },
        token,
      );

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2.5">
      <h2 className="text-center font-bold text-reuso-text text-base">
        Crie sua conta
      </h2>

      {error && (
        <div className="p-2 text-xs text-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800 text-center">
          {error}
        </div>
      )}

      {/* Campos do Formulário de Cadastro */}
      <Input
        label="Nome completo"
        placeholder="Seu nome"
        leftIcon={<UserIcon />}
        shape="pill"
        size="sm"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <Input
        label="Email"
        type="email"
        placeholder="Seu e-mail"
        leftIcon={<Mail />}
        shape="pill"
        size="sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="CPF"
        placeholder="000.000.000-00"
        leftIcon={<IdCard />}
        shape="pill"
        size="sm"
        value={cpf}
        onChange={handleCpfChange}
        maxLength={14}
        required
      />
      <PasswordInput
        label="Senha"
        placeholder="Sua senha"
        leftIcon={<Lock />}
        shape="pill"
        size="sm"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <PasswordInput
        label="Confirmar senha"
        placeholder="Confirme a senha"
        leftIcon={<Lock />}
        shape="pill"
        size="sm"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="secondary"
        shape="pill"
        fullWidth
        size="sm"
        disabled={loading}
        className="mt-1 font-bold tracking-widest flex items-center justify-center"
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : "CADASTRAR"}
      </Button>

      {/* Alternar para formulário de login */}
      <p className="mt-1 text-center text-xs text-reuso-muted">
        Já possui uma conta?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-bold text-blue-600 hover:underline"
        >
          Acesse agora
        </button>
      </p>
    </form>
  );
};
