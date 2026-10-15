import { Star, Pencil, Trash2 } from 'lucide-react';
import type { Endereco } from '../../types/endereco';
import { formatCEP } from './constants';

interface EnderecoCardProps {
  endereco: Endereco;
  onEdit: (endereco: Endereco) => void;
  onDelete: (endereco: Endereco) => void;
  onToggleFavorito?: (endereco: Endereco) => void;
}

export const EnderecoCard = ({
  endereco,
  onEdit,
  onDelete,
  onToggleFavorito,
}: EnderecoCardProps) => {
  return (
    <div className="relative flex flex-col justify-between rounded-2xl bg-[#E5E3DB] p-5 shadow-sm transition-all hover:shadow-md min-h-[150px]">
      {/* Cabeçalho do Card: Nome e Estrela de Favorito */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm text-[#1F2733] truncate">
          {endereco.nome}
        </h3>
        <button
          type="button"
          onClick={() => onToggleFavorito?.(endereco)}
          className="text-[#EAB308] hover:scale-110 transition-transform cursor-pointer"
          title={endereco.favorito ? 'Endereço favorito' : 'Marcar como favorito'}
          aria-label={endereco.favorito ? 'Endereço favorito' : 'Marcar como favorito'}
        >
          <Star
            size={18}
            className={endereco.favorito ? 'fill-[#EAB308] text-[#EAB308]' : 'text-[#EAB308]'}
          />
        </button>
      </div>

      {/* Conteúdo do Endereço */}
      <div className="my-3 space-y-0.5 text-xs text-[#2C3338]">
        <p className="font-medium">
          {endereco.logradouro}, {endereco.numero}
          {endereco.complemento ? ` - ${endereco.complemento}` : ''}
        </p>
        <p>
          {endereco.bairro}, {endereco.cidade}, {endereco.estado}
        </p>
        <p>{formatCEP(endereco.cep)}</p>
      </div>

      {/* Ações: Editar e Excluir */}
      <div className="flex items-center justify-end gap-3 pt-2 text-[#4A5568]">
        <button
          type="button"
          onClick={() => onEdit(endereco)}
          className="hover:text-[#1F2733] transition-colors cursor-pointer p-1 rounded hover:bg-black/5"
          title="Editar endereço"
          aria-label="Editar endereço"
        >
          <Pencil size={15} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(endereco)}
          className="hover:text-red-600 transition-colors cursor-pointer p-1 rounded hover:bg-black/5"
          title="Excluir endereço"
          aria-label="Excluir endereço"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default EnderecoCard;
