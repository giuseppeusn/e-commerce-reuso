import type { ICartaoRepository } from '../repositories/ICartaoRepository.js';
import type { CriarCartaoDTO, CartaoSalvo } from './DTO/CartaoDTO.js';
import { BandeiraResolver } from '../strategies/BandeiraResolver.js';
import { NotFoundError, ValidationError } from './templates/errors/AppErrorCartao.js';

export class CartaoService {
    constructor(
        private readonly repo: ICartaoRepository,
        private readonly bandeiras: BandeiraResolver
    ) { }

    public async criar(usuarioId: string, dto: CriarCartaoDTO): Promise<CartaoSalvo> {
        const numero = dto.numero.replace(/\D/g, '');

        const bandeira = this.bandeiras.resolver(numero);
        if (!bandeira.validarNumero(numero)) {
            throw new ValidationError('Número de cartão inválido.');
        }

        return this.repo.criar({
            nome: dto.nome.trim(),
            numero,
            banco: dto.banco.trim(),
            agencia: dto.agencia.trim(),
            conta: dto.conta.trim(),
            usuario: usuarioId,
        });
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<CartaoSalvo> {
        // Filtra pelo dono: ninguém lê o cartão de outro usuário.
        const cartao = await this.repo.buscarPorId(id, usuarioId);
        if (!cartao) throw new NotFoundError();
        return cartao;
    }
}

export default CartaoService;