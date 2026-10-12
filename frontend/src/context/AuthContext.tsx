import { createContext, useContext, useState } from "react";

interface Usuario {
  id?: string;
  nome: string;
  email: string;
  cpf?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (usuarioData: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const savedUser = localStorage.getItem("@reuso:usuario");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (usuarioData: Usuario) => {
    setUsuario(usuarioData);
    localStorage.setItem("@reuso:usuario", JSON.stringify(usuarioData));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("@reuso:usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
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
