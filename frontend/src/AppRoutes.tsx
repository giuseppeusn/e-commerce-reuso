// src/AppRoutes.tsx
import { type ReactElement } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Produtos from "./pages/Home/Paginas/Produtos";
import Promocoes from "./pages/Home/Paginas/Promocoes";
import Lancamentos from "./pages/Home/Paginas/Lancamento";
import Conta from "./pages/Home/Paginas/Conta";
import DesignSystem from "./pages/DesignSystem";
import { useAuth } from "./context/AuthContext";
import Usuarios from "./pages/Home/Paginas/Usuarios";

// Componente para proteger rotas exclusivas do Administrador
const AdminRoute = ({ children }: { children: ReactElement }) => {
  const { usuario } = useAuth();

  // Se não estiver logado ou não for ADMINISTRADOR, redireciona para a Home
  if (!usuario || usuario.tipoConta !== "ADMINISTRADOR") {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/promocoes" element={<Promocoes />} />
      <Route path="/cartoes" element={<Conta initialTab="cartoes" />} />
      <Route path="/lancamentos" element={<Lancamentos />} />
      <Route path="/conta" element={<Conta />} />
      <Route path="/enderecos" element={<Conta initialTab="enderecos" />} />
      <Route
        path="/enderecos/novo"
        element={<Conta initialTab="enderecos" initialView="novo" />}
      />
      <Route
        path="/enderecos/editar/:id"
        element={<Conta initialTab="enderecos" initialView="editar" />}
      />
      <Route path="/design-system" element={<DesignSystem />} />

      {/* Rota Protegida do Administrador */}
      <Route
        path="/admin/usuarios"
        element={
          <AdminRoute>
            <Usuarios />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
