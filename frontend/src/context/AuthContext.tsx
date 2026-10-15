// Gerencia o estado global de autenticação (dados do usuário e token de acesso)

import { createContext, useContext, useState, type ReactNode } from "react";

export interface Usuario {
  id?: string;
  _id?: string;
  nome: string;
  email: string;
  cpf?: string;
  avatarUrl?: string;
  tipoConta?: "CLIENTE" | "FORNECEDOR" | "ADMINISTRADOR";
}

// Métodos expostos pelo contexto de autenticação
interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (usuarioData: Usuario, tokenData?: string) => void;
  logout: () => void;
  atualizarUsuario: (usuarioData: Usuario) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider que envolve a aplicação para compartilhar o estado de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa estado lendo o usuário salvo no navegador
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const savedUser = localStorage.getItem("@reuso:usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Inicializa estado lendo o token salvo no navegador
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("@reuso:token");
  });

  // Salva a sessão do usuário no login
  const login = (usuarioData: Usuario, tokenData?: string) => {
    setUsuario(usuarioData);
    localStorage.setItem("@reuso:usuario", JSON.stringify(usuarioData));

    if (tokenData) {
      setToken(tokenData);
      localStorage.setItem("@reuso:token", tokenData);
    }
  };

  // Atualiza os dados locais do usuário sem deslogar
  const atualizarUsuario = (usuarioData: Usuario) => {
    setUsuario((prev) => ({ ...prev, ...usuarioData }));
    localStorage.setItem(
      "@reuso:usuario",
      JSON.stringify({ ...usuario, ...usuarioData }),
    );
  };

  // Encerra a sessão e limpa os dados salvos
  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("@reuso:usuario");
    localStorage.removeItem("@reuso:token");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, token, login, logout, atualizarUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Acesso ao AuthContext facilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
