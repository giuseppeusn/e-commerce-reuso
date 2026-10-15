
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import CardPreview from "../../components/ui/CardPreview";
import { Button } from "../../components/ui";
import { ConfirmDialog, IconButton } from "../../components/ui";
import { useAuth } from '../../context/AuthContext';
import { cartaoService } from '../../services/cartaoService';
import { AdicinarEndereco } from "./AdicionarEndereco";

const Cartoes = () => {
    const [dados, setDados] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingCard, setEditingCard] = useState<any | null>(null);
    const [deletingCard, setDeletingCard] = useState<any | null>(null);
    const { usuario } = useAuth()
    const userId = usuario?.id || (usuario as any)?._id;;

    const carregarCartoes = async () => {
        if (!userId) {
            setDados([]);
            return;
        }

        const cartoes = await cartaoService.listarPorUsuario(userId);
        setDados(cartoes);
    };

    useEffect(() => {
        carregarCartoes();
    }, [userId]);

    if (isAdding) {
        return (
            <AdicinarEndereco
                initialData={editingCard ?? undefined}
                onCancel={() => {
                    setIsAdding(false);
                    setEditingCard(null);
                }}
                onSaved={() => {
                    setIsAdding(false);
                    setEditingCard(null);
                    carregarCartoes();
                }}
            />
        );
    }

    return (
        <div className="w-full">
            <div className="grid w-full grid-cols-1 gap-6 pt-8 sm:grid-cols-2 xl:grid-cols-3">
                {dados.map((cartao) => (
                    <div key={cartao._id || cartao.id} className="group relative mx-auto w-full max-w-sm">
                        <CardPreview
                            nome={cartao.nome}
                            numero={cartao.numero}
                            issuer={cartao.banco}
                        />
                        <div className="absolute inset-0 flex items-center justify-center gap-3 rounded-2xl bg-black/35 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                            <IconButton
                                icon={<Pencil />}
                                label="Editar cartão"
                                variant="solid"
                                size="md"
                                onClick={() => {
                                    setEditingCard(cartao);
                                    setIsAdding(true);
                                }}
                            />
                            <IconButton
                                icon={<Trash2 />}
                                label="Excluir cartão"
                                variant="danger"
                                size="md"
                                onClick={() => setDeletingCard(cartao)}
                            />
                        </div>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    shape="circle"
                    size="xl"
                    aria-label="Adicionar cartão"
                    className="size-20 border-2 text-4xl font-light"
                    onClick={() => setIsAdding(true)}
                >
                    <Plus strokeWidth={1.5} />
                </Button>
            </div>
            <ConfirmDialog
                open={Boolean(deletingCard)}
                onClose={() => setDeletingCard(null)}
                onConfirm={async () => {
                    const id = deletingCard?._id || deletingCard?.id;
                    if (!id) return;
                    await cartaoService.excluirCartao(id);
                    setDados((cartoes) => cartoes.filter((cartao) => (cartao._id || cartao.id) !== id));
                    setDeletingCard(null);
                }}
                title="Excluir cartão?"
                description="Essa ação não pode ser desfeita."
                confirmLabel="Excluir"
            />
        </div>
    );
};

export default Cartoes;
