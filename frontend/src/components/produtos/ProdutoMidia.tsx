import React from "react";
import { useAuth } from "../../context/AuthContext";
import VisualizadorImagem from "./VisualizadorImagem";
import Visualizador3D from "./Visualizador3D";

export interface ProdutoMidiaProps {
  produto: {
    nome: string;
    fotos?: string[];
  };
}

/**
 * PONTO DE VARIAÇÃO (Desenvolvimento Orientado a Reuso / Linha de Produtos de Software):
 * 
 * - Ponto de Variação: Exibição de Mídia do Produto (Imagem 2D ou Modelo 3D Interativo)
 * - Variante 1 (Padrão): VisualizadorImagem (renderização 2D clássica)
 * - Variante 2 (Opcional/Variabilidade): Visualizador3D (renderização 3D interativa em Three.js)
 * - Condição de Seleção: Feature flag no banco de dados para clientes específicos (usuario.featureFlags.visualizacao3D)
 */
export const ProdutoMidia: React.FC<ProdutoMidiaProps> = ({ produto }) => {
  const { usuario } = useAuth();

  // Variabilidade decidida pelo feature flag do cliente no banco
  const habilitar3D = Boolean(usuario?.featureFlags?.visualizacao3D);

  if (habilitar3D) {
    return <Visualizador3D produto={produto} />;
  }

  return <VisualizadorImagem produto={produto} />;
};

export default ProdutoMidia;
