import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { EnderecoCard } from './EnderecoCard';
import { NovoEnderecoCard } from './NovoEnderecoCard';
import { EnderecoForm } from './EnderecoForm';
import { DeleteEnderecoModal } from './DeleteEnderecoModal';
import type { Endereco, EnderecoInput } from '../../types/endereco';
import enderecoService from '../../services/enderecoService';
import { useAuth } from '../../context/AuthContext';

type ViewMode = 'lista' | 'novo' | 'editar';

interface EnderecosTabProps {
  initialView?: ViewMode;
  editId?: string;
}

export const EnderecosTab = ({
  initialView = 'lista',
  editId,
}: EnderecosTabProps) => {
  const { usuario } = useAuth();
  const userId = usuario?.id || (usuario as any)?._id;

  const [view, setView] = useState<ViewMode>(initialView);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [editingEndereco, setEditingEndereco] = useState<Endereco | null>(null);
  const [deletingEndereco, setDeletingEndereco] = useState<Endereco | null>(null);

  useEffect(() => {
    if (initialView) {
      setView(initialView);
    }
  }, [initialView]);

  useEffect(() => {
    if (editId && enderecos.length > 0) {
      const found = enderecos.find((e) => (e._id || e.id) === editId);
      if (found) {
        setEditingEndereco(found);
        setView('editar');
      }
    }
  }, [editId, enderecos]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const carregarEnderecos = useCallback(async () => {
    if (!userId) {
      setEnderecos([]);
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    try {
      const data = await enderecoService.listarPorUsuario(userId);
      setEnderecos(data);
    } catch (err: any) {
      console.error('Erro ao buscar endereços:', err);
      setErrorMsg(err.message || 'Não foi possível carregar os endereços.');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    carregarEnderecos();
  }, [carregarEnderecos]);

  const handleOpenEdit = (endereco: Endereco) => {
    setEditingEndereco(endereco);
    setView('editar');
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleOpenNovo = () => {
    setEditingEndereco(null);
    setView('novo');
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleVoltarLista = () => {
    setEditingEndereco(null);
    setView('lista');
    setErrorMsg(null);
  };

  const handleSalvar = async (data: EnderecoInput) => {
    if (!userId) {
      setErrorMsg('Você precisa estar logado para salvar um endereço.');
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    try {
      if (view === 'editar' && editingEndereco) {
        const id = editingEndereco._id || editingEndereco.id;
        if (!id) throw new Error('ID do endereço inválido.');

        const enderecoAtualizado = await enderecoService.editar(id, data);
        setEnderecos((prev) =>
          prev.map((item) =>
            (item._id || item.id) === id ? enderecoAtualizado : item,
          ),
        );
        setSuccessMsg('Endereço atualizado com sucesso!');
      } else {
        const payload: EnderecoInput = {
          ...data,
          usuario: userId,
        };
        const novoEndereco = await enderecoService.criar(payload);
        setEnderecos((prev) => [novoEndereco, ...prev]);
        setSuccessMsg('Endereço cadastrado com sucesso!');
      }

      setView('lista');
      setEditingEndereco(null);
    } catch (err: any) {
      console.error('Erro ao salvar endereço:', err);
      setErrorMsg(err.message || 'Falha ao processar o endereço.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleFavorito = async (endereco: Endereco) => {
    const id = endereco._id || endereco.id;
    if (!id) return;

    try {
      const novoFavorito = !endereco.favorito;
      const atualizado = await enderecoService.editar(id, {
        favorito: novoFavorito,
      });

      setEnderecos((prev) =>
        prev.map((item) => ((item._id || item.id) === id ? atualizado : item)),
      );
    } catch (err: any) {
      console.error('Erro ao alterar favorito:', err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingEndereco) return;
    const id = deletingEndereco._id || deletingEndereco.id;
    if (!id) return;

    setIsDeleting(true);
    try {
      await enderecoService.excluir(id);
      setEnderecos((prev) =>
        prev.filter((item) => (item._id || item.id) !== id),
      );
      setDeletingEndereco(null);
      setSuccessMsg('Endereço excluído com sucesso.');
    } catch (err: any) {
      console.error('Erro ao excluir endereço:', err);
      setErrorMsg(err.message || 'Erro ao excluir endereço.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Alertas globais de erro e sucesso */}
      {errorMsg && (
        <div className="w-full max-w-2xl p-3 mb-4 text-xs text-red-600 bg-red-50 rounded-lg border border-red-200 text-center">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="w-full max-w-2xl p-3 mb-4 text-xs text-green-700 bg-green-50 rounded-lg border border-green-200 text-center">
          {successMsg}
        </div>
      )}

      {/* Não logado */}
      {!userId && (
        <div className="w-full max-w-md p-6 text-center bg-[#E5E3DB] rounded-2xl my-6">
          <p className="text-sm font-semibold text-reuso-text mb-2">
            Nenhum usuário conectado
          </p>
          <p className="text-xs text-reuso-muted">
            Por favor, acesse sua conta pelo menu superior para visualizar, cadastrar e editar seus endereços.
          </p>
        </div>
      )}

      {userId && view === 'lista' && (
        <div className="w-full flex flex-col items-center">
          {/* Título: MEUS ENDEREÇOS */}
          <h1 className="text-xl font-bold uppercase tracking-wider text-reuso-text mb-6 text-center">
            MEUS ENDEREÇOS
          </h1>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12 text-reuso-muted">
              <Loader2 className="size-8 animate-spin mb-2" />
              <span className="text-xs">Carregando endereços...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              {enderecos.map((endereco) => (
                <EnderecoCard
                  key={endereco._id || endereco.id}
                  endereco={endereco}
                  onEdit={handleOpenEdit}
                  onDelete={(end) => setDeletingEndereco(end)}
                  onToggleFavorito={handleToggleFavorito}
                />
              ))}

              {/* Card de Adicionar Novo Endereço */}
              <NovoEnderecoCard onClick={handleOpenNovo} />
            </div>
          )}
        </div>
      )}

      {userId && (view === 'novo' || view === 'editar') && (
        <EnderecoForm
          mode={view}
          initialData={editingEndereco}
          onSubmit={handleSalvar}
          onCancel={handleVoltarLista}
          isSaving={isSaving}
        />
      )}

      {/* Modal de exclusão idêntico ao Figma */}
      <DeleteEnderecoModal
        isOpen={Boolean(deletingEndereco)}
        endereco={deletingEndereco}
        onClose={() => setDeletingEndereco(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default EnderecosTab;
