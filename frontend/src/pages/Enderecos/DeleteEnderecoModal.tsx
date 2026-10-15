import { X } from 'lucide-react';
import type { Endereco } from '../../types/endereco';

interface DeleteEnderecoModalProps {
  isOpen: boolean;
  endereco: Endereco | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const DeleteEnderecoModal = ({
  isOpen,
  endereco,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteEnderecoModalProps) => {
  if (!isOpen || !endereco) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#EBE9E2] p-8 shadow-2xl text-center border border-reuso-border">
        {/* Botão de Fechar no canto superior direito */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1 text-reuso-muted hover:text-reuso-text rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        {/* Mensagem de Confirmação */}
        <h3 className="text-sm md:text-base font-semibold text-[#1F2733] mt-2 mb-8 leading-snug">
          Você tem certeza que deseja excluir esse endereço?
        </h3>

        {/* Botões de Ação */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-full bg-[#B3261E] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#962019] transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? 'EXCLUINDO...' : 'EXCLUIR'}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-full bg-[#E5E3DB] px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#1F2733] hover:bg-[#DDDCD4] transition-all cursor-pointer"
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEnderecoModal;
