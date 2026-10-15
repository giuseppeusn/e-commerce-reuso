import CartaoModel from '../models/CartaoModel.js';

class CartaoRepository {
  private static instance: CartaoRepository;

  private constructor() { }

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

export default CartaoRepository.getInstance();