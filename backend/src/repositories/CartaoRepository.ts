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
<<<<<<< HEAD
    return CartaoModel.find({ usuario: usuarioId })
      .select('-cvv')
      .lean();
  }

  public async buscarPorId(id: string) {
    return CartaoModel.findById(id)
      .select('-cvv')
      .lean();
=======
    return CartaoModel.find({ usuario: usuarioId }).lean();
  }

  public async buscarPorId(id: string) {
    return CartaoModel.findById(id).lean();
>>>>>>> bfb7236ab62facf38a84eafe0ae8f6dccd31d008
  }

  public async atualizar(
    id: string,
    dados: Record<string, unknown>
  ) {
<<<<<<< HEAD
    return CartaoModel.findByIdAndUpdate(
      id,
      { $set: dados },
=======
    const { nome, numero, banco, agencia, conta } = dados;
    return CartaoModel.findByIdAndUpdate(
      id,
      { $set: { nome, numero, banco, agencia, conta } },
>>>>>>> bfb7236ab62facf38a84eafe0ae8f6dccd31d008
      {
        new: true,
        runValidators: true
      }
<<<<<<< HEAD
    ).select('-cvv');
  }

  public async deletar(id: string) {
    return CartaoModel.findByIdAndDelete(id)
      .select('-cvv');
=======
    );
  }

  public async deletar(id: string) {
    return CartaoModel.findByIdAndDelete(id);
>>>>>>> bfb7236ab62facf38a84eafe0ae8f6dccd31d008
  }
}

export default CartaoRepository.getInstance();