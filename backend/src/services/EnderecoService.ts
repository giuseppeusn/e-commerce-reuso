import Endereco, { type IEndereco } from '../models/EnderecoModel.js';
import Usuario from '../models/UsuarioModel.js';

class EnderecoService {
  async criarEndereco(dadosEndereco: Partial<IEndereco>) {
    // Procura por um usuário existente ou cria um mock
    let usuario = await Usuario.findOne({ email: 'mock@mock.com' });
    
    if (!usuario) {
      usuario = await Usuario.create({
        nome: 'Usuário Teste',
        email: 'mock@mock.com',
        senhaHash: '123456',
        tipoConta: 'CLIENTE'
      });
    }

    const novoEndereco = new Endereco({
      ...dadosEndereco,
      usuario: usuario._id
    });

    return await novoEndereco.save();
  }
}

export default new EnderecoService();
