import CartaoModel from '../models/CartaoModel.js';

// o repositório é quem mexe no banco
// singleton: só existe um desses no projeto inteiro
class CartaoRepository {
  private static instance: CartaoRepository;

  // construtor privado, ninguém consegue dar "new" de fora
  private constructor() { }

  // cria a instância na primeira vez e depois reaproveita a mesma
  public static getInstance(): CartaoRepository {
    if (!CartaoRepository.instance) {
      CartaoRepository.instance = new CartaoRepository();
    }

    return CartaoRepository.instance;
  }

  public async criar(dados: Record<string, unknown>) {
    return CartaoModel.create(dados);
  }

  public async listar(usuarioId: string) {
    return CartaoModel.find({ usuario: usuarioId }).lean();
  }

  public async buscarPorId(id: string) {
    return CartaoModel.findById(id).lean();
  }

  // só deixa alterar esses campos (não dá pra trocar o dono do cartão)
  public async atualizar(
    id: string,
    dados: Record<string, unknown>
  ) {
    const { nome, numero, banco, agencia, conta } = dados;
    return CartaoModel.findByIdAndUpdate(
      id,
      { $set: { nome, numero, banco, agencia, conta } },
      {
        new: true,
        runValidators: true
      }
    );
  }

  public async deletar(id: string) {
    return CartaoModel.findByIdAndDelete(id);
  }
}

// já exporta a instância pronta
export default CartaoRepository.getInstance();
