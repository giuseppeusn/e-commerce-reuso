import Endereco, { type IEndereco } from '../models/EnderecoModel.js';
import { InserirEndereco } from './templates/InserirEndereco.js';
import { EditarEndereco } from './templates/EditarEndereco.js';

class EnderecoService {
  private static instance: EnderecoService;

  private constructor() { }

  public static getInstance(): EnderecoService {
    if (!EnderecoService.instance) {
      EnderecoService.instance = new EnderecoService();
    }
    return EnderecoService.instance;
  }

  async criarEndereco(dadosEndereco: Partial<IEndereco>) {
    const operacao = new InserirEndereco();
    return await operacao.execute(dadosEndereco);
  }

  async editarEndereco(idEndereco: string, dadosEndereco: Partial<IEndereco>) {
    const operacao = new EditarEndereco();
    return await operacao.execute(dadosEndereco, idEndereco);
  }

  async listarPorUsuario(usuarioId: string) {
    return await Endereco.find({ usuario: usuarioId }).sort({ createdAt: -1 });
  }

  async buscarPorId(id: string) {
    return await Endereco.findById(id);
  }

  async excluirEndereco(id: string) {
    return await Endereco.findByIdAndDelete(id);
  }
}

export default EnderecoService.getInstance();
