import { Plus } from 'lucide-react';

interface NovoEnderecoCardProps {
  onClick: () => void;
}

export const NovoEnderecoCard = ({ onClick }: NovoEnderecoCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center rounded-2xl bg-[#E5E3DB] p-6 min-h-[150px] cursor-pointer border border-transparent hover:border-reuso-border-strong hover:bg-[#DDDCD4] transition-all group"
      aria-label="Adicionar novo endereço"
    >
      <Plus
        size={38}
        className="text-[#4A5568] group-hover:scale-110 transition-transform mb-2 stroke-[1.5]"
      />
      <span className="text-xs font-bold uppercase tracking-wider text-[#4A5568]">
        NOVO ENDEREÇO
      </span>
    </button>
  );
};

export default NovoEnderecoCard;
