import type { ICartaoRepository } from '../repositories/ICartaoRepository.js';
import type { CriarCartaoDTO, CartaoSalvo } from './DTO/CartaoDTO.js';
import { BandeiraResolver } from '../strategies/BandeiraResolver.js';
import { NotFoundError, ValidationError } from './templates/errors/AppErrorCartao.js';

// o service guarda as regras: antes de salvar, confere se o cartão é válido
export class CartaoService {
    constructor(
        private readonly repo: ICartaoRepository,
        private readonly bandeiras: BandeiraResolver
    ) { }

    public async criar(usuarioId: string, dto: CriarCartaoDTO): Promise<CartaoSalvo> {
        // tira espaços e traços, fica só o número
        const numero = dto.numero.replace(/\D/g, '');

        // descobre a bandeira (strategy): o service não precisa saber qual é,
        // só pede a certa pro resolver
        const bandeira = this.bandeiras.resolver(numero);

        // cada bandeira valida do jeito dela (tamanho + luhn)
        if (!bandeira.validarNumero(numero)) {
            throw new ValidationError('Número de cartão inválido.');
        }

        // tudo certo, manda salvar
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
