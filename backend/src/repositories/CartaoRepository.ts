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
    return CartaoModel.find({ usuario: usuarioId })
      .select('-cvv')
      .lean();
  }

  public async buscarPorId(id: string) {
    return CartaoModel.findById(id)
      .select('-cvv')
      .lean();
  }

  public async atualizar(
    id: string,
    dados: Record<string, unknown>
  ) {
    return CartaoModel.findByIdAndUpdate(
      id,
      { $set: dados },
      {
        new: true,
        runValidators: true
      }
    ).select('-cvv');
  }

  public async deletar(id: string) {
    return CartaoModel.findByIdAndDelete(id)
      .select('-cvv');
  }
}

export default CartaoRepository.getInstance();