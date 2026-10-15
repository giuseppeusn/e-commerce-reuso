import React from "react";

interface VisualizadorImagemProps {
  produto: {
    nome: string;
    fotos?: string[];
  };
}

export const VisualizadorImagem: React.FC<VisualizadorImagemProps> = ({ produto }) => {
  const fotoUrl = produto.fotos && produto.fotos.length > 0 ? produto.fotos[0] : "";

  if (!fotoUrl) {
    return (
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        Sem imagem
      </div>
    );
  }

  return (
    <div className="w-full h-48 bg-gray-100 overflow-hidden relative group">
      <img
        src={fotoUrl}
        alt={produto.nome}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLElement).style.display = "none";
        }}
      />
    </div>
  );
};

export default VisualizadorImagem;
