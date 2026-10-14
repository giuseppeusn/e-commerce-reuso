import Produto, { type IProduto } from '../models/ProdutoModel.js';
import Usuario from '../models/UsuarioModel.js';

class ProdutoService {
  async criarProduto(dadosProduto: Partial<IProduto>) {
    // Procura por um fornecedor existente ou cria um mock com os campos obrigatórios (como o cpf)
    let fornecedor = await Usuario.findOne({ email: 'fornecedor@mock.com' });
    
    if (!fornecedor) {
      fornecedor = await Usuario.create({
        nome: 'Fornecedor Teste',
        email: 'fornecedor@mock.com',
        senhaHash: '123456',
        tipoConta: 'CLIENTE',
        cpf: '000.000.000-00' // Adicionado para satisfazer a validação do schema de usuário
      });
    }

    const novoProduto = new Produto({
      ...dadosProduto,
      fornecedorId: fornecedor._id
    });

    return await novoProduto.save();
  }

  async listarProdutos() {
    return await Produto.find().populate('fornecedorId', 'nome email');
  }
}

export default new ProdutoService();