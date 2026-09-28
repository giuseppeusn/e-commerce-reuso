import { useState, useRef, useEffect } from "react";
import { Mail, Lock, User as UserIcon, IdCard } from "lucide-react";
import { Card, Input, PasswordInput, Button } from "../../components/ui";

type AuthMode = "login" | "register";

type AuthDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AuthDropdown = ({ isOpen, onClose }: AuthDropdownProps) => {
  const [mode, setMode] = useState<AuthMode>("login");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Efeito para fechar o dropdown se o usuário clicar fora
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

  // Se o menu não estiver aberto (isOpen === false), não renderiza nada na tela
  if (!isOpen) return null;

  const isLogin = mode === "login";

  return (
    <div ref={dropdownRef} className="absolute right-0 top-full mt-3 z-50 w-80">
      <div className="absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-l border-t border-reuso-border bg-reuso-surface z-10" />

      <Card className="relative z-0 p-5 shadow-2xl rounded-3xl">
        <h2 className="text-center font-bold text-reuso-text">
          {isLogin ? "Acesse sua conta" : "Crie sua conta"}
        </h2>

        {/* --- FORMULÁRIO 1: LOGIN --- */}
        {isLogin ? (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex flex-col gap-3"
          >
            <Input
              label="Email"
              type="email"
              placeholder="Seu e-mail"
              leftIcon={<Mail />}
              shape="pill"
              size="sm"
            />
            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              leftIcon={<Lock />}
              shape="pill"
              size="sm"
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
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex flex-col gap-2.5"
          >
            <Input
              label="Nome completo"
              placeholder="Seu nome"
              leftIcon={<UserIcon />}
              shape="pill"
              size="sm"
            />
            <Input
              label="Email"
              type="email"
              placeholder="Seu e-mail"
              leftIcon={<Mail />}
              shape="pill"
              size="sm"
            />
            <Input
              label="CPF"
              placeholder="000.000.000-00"
              leftIcon={<IdCard />}
              shape="pill"
              size="sm"
            />
            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              leftIcon={<Lock />}
              shape="pill"
              size="sm"
            />
            <PasswordInput
              label="Confirmar senha"
              placeholder="Confirme a senha"
              leftIcon={<Lock />}
              shape="pill"
              size="sm"
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
