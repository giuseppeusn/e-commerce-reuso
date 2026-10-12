import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Lock,
  User as UserIcon,
  IdCard,
  Heart,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, Input, PasswordInput, Button } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";

type AuthMode = "login" | "register";

type AuthDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AuthDropdown = ({ isOpen, onClose }: AuthDropdownProps) => {
  const { usuario, login, logout } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Estados para Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");

  // Estados para Registro
  const [nome, setNome] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [registerSenha, setRegisterSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isLogin = mode === "login";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, senha: loginSenha }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      const userObj = data.usuario || data.user || data;

      // Salva os dados corretos no AuthContext
      login({
        id: userObj.id || userObj._id,
        nome: userObj.nome || "Usuário",
        email: userObj.email || loginEmail,
        cpf: userObj.cpf || "",
      });

      onClose();
    } catch (err: any) {
      alert(err.message || "Erro no login");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerSenha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/usuarios/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome,
            email: registerEmail,
            cpf,
            senha: registerSenha,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Cadastro realizado com sucesso! Faça seu login.");
      setMode("login");
    } catch (err: any) {
      alert(err.message || "Erro no cadastro");
    }
  };

  return (
    <div ref={dropdownRef} className="absolute right-0 top-full mt-3 z-50 w-64">
      <div className="absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-l border-t border-reuso-border bg-reuso-surface z-10" />

      <Card className="relative z-0 p-4 shadow-2xl rounded-2xl bg-reuso-surface">
        {/* --- MENU USUÁRIO LOGADO --- */}
        {usuario ? (
          <div className="flex flex-col gap-2 py-1 text-reuso-text">
            <div className="pb-2 border-b border-reuso-border">
              <p className="font-semibold text-sm truncate">{usuario.nome}</p>
              <p className="text-xs text-reuso-muted truncate">
                {usuario.email}
              </p>
            </div>

            <Link
              to="/conta"
              onClick={onClose}
              className="flex items-center gap-3 px-2 py-2 text-sm font-medium hover:bg-reuso-canvas rounded-lg transition-colors"
            >
              <UserIcon size={18} />
              Conta
            </Link>

            <Link
              to="/favoritos"
              onClick={onClose}
              className="flex items-center gap-3 px-2 py-2 text-sm font-medium hover:bg-reuso-canvas rounded-lg transition-colors"
            >
              <Heart size={18} />
              Favoritos
            </Link>

            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors text-left w-full mt-1 border-t border-reuso-border pt-3"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        ) : isLogin ? (
          /* --- FORMULÁRIO 1: LOGIN --- */
          <form onSubmit={handleLogin} className="mt-2 flex flex-col gap-3">
            <h2 className="text-center font-bold text-reuso-text text-base">
              Acesse sua conta
            </h2>
            <Input
              label="Email"
              type="email"
              placeholder="Seu e-mail"
              leftIcon={<Mail />}
              shape="pill"
              size="sm"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              leftIcon={<Lock />}
              shape="pill"
              size="sm"
              value={loginSenha}
              onChange={(e) => setLoginSenha(e.target.value)}
            />

            <Button
              type="submit"
              variant="secondary"
              shape="pill"
              fullWidth
              size="sm"
              className="mt-1 font-bold tracking-widest"
            >
              ACESSAR
            </Button>

            <div className="relative my-1 text-center text-xs text-reuso-muted uppercase before:absolute before:left-0 before:top-1/2 before:w-full before:border-t before:border-reuso-border before:-z-10">
              <span className="bg-reuso-surface px-2">ou</span>
            </div>

            <p className="mt-1 text-center text-xs text-reuso-muted">
              Não possui conta?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="font-bold text-blue-600 hover:underline"
              >
                Crie agora
              </button>
            </p>
          </form>
        ) : (
          /* --- FORMULÁRIO 2: CADASTRO --- */
          <form
            onSubmit={handleRegister}
            className="mt-2 flex flex-col gap-2.5"
          >
            <h2 className="text-center font-bold text-reuso-text text-base">
              Crie sua conta
            </h2>
            <Input
              label="Nome completo"
              placeholder="Seu nome"
              leftIcon={<UserIcon />}
              shape="pill"
              size="sm"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Seu e-mail"
              leftIcon={<Mail />}
              shape="pill"
              size="sm"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <Input
              label="CPF"
              placeholder="000.000.000-00"
              leftIcon={<IdCard />}
              shape="pill"
              size="sm"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              leftIcon={<Lock />}
              shape="pill"
              size="sm"
              value={registerSenha}
              onChange={(e) => setRegisterSenha(e.target.value)}
            />
            <PasswordInput
              label="Confirmar senha"
              placeholder="Confirme a senha"
              leftIcon={<Lock />}
              shape="pill"
              size="sm"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />

            <Button
              type="submit"
              variant="secondary"
              shape="pill"
              fullWidth
              size="sm"
              className="mt-1 font-bold tracking-widest"
            >
              CADASTRAR
            </Button>

            <p className="mt-1 text-center text-xs text-reuso-muted">
              Já possui uma conta?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-bold text-blue-600 hover:underline"
              >
                Acesse agora
              </button>
            </p>
          </form>
        )}
      </Card>
    </div>
  );
};
