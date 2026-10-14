import { createContext, useContext, useState, ReactNode } from "react";

interface Usuario {
  id?: string;
  _id?: string;
  nome: string;
  email: string;
  cpf?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (usuarioData: Usuario, tokenData?: string) => void;
  logout: () => void;
  atualizarUsuario: (usuarioData: Usuario) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const savedUser = localStorage.getItem("@reuso:usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("@reuso:token");
  });

  const login = (usuarioData: Usuario, tokenData?: string) => {
    setUsuario(usuarioData);
    localStorage.setItem("@reuso:usuario", JSON.stringify(usuarioData));

    if (tokenData) {
      setToken(tokenData);
      localStorage.setItem("@reuso:token", tokenData);
    }
  };

  const atualizarUsuario = (usuarioData: Usuario) => {
    setUsuario((prev) => ({ ...prev, ...usuarioData }));
    localStorage.setItem(
      "@reuso:usuario",
      JSON.stringify({ ...usuario, ...usuarioData }),
    );
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
