// src/AppRoutes.tsx
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Produtos from "./pages/Home/Paginas/Produtos";
import Promocoes from "./pages/Home/Paginas/Promocoes";
import Lancamentos from "./pages/Home/Paginas/Lancamento";
import Conta from "./pages/Home/Paginas/Conta";
import DesignSystem from "./pages/DesignSystem";
import Cartoes from "./pages/Cartoes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/promocoes" element={<Promocoes />} />
      <Route path="/cartoes" element={<Cartoes />} />
      <Route path="/lancamentos" element={<Lancamentos />} />
      <Route path="/conta" element={<Conta />} />
      <Route path="/design-system" element={<DesignSystem />} />
    </Routes>
  );
};

export default AppRoutes;
