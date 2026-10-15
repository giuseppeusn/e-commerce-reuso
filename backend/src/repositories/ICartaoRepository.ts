import type { CartaoSalvo } from '../services/DTO/CartaoDTO.js';
export interface ICartaoRepository {
    criar(dados: {
        nome: string;
        numero: string;
        banco: string;
        agencia: string;
        conta: string;
        usuario: string;
    }): Promise<CartaoSalvo>;
    buscarPorId(id: string, usuarioId: string): Promise<CartaoSalvo | null>;
}
