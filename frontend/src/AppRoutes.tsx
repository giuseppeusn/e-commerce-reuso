// src/AppRoutes.tsx
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Produtos from "./pages/Home/Paginas/Produtos";
import Promocoes from "./pages/Home/Paginas/Promocoes";
import Lancamentos from "./pages/Home/Paginas/Lancamento";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/promocoes" element={<Promocoes />} />
      <Route path="/lancamentos" element={<Lancamentos />} />
    </Routes>
  );
};

export default AppRoutes;