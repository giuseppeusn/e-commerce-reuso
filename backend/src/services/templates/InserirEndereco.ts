import { EnderecoOperationTemplate } from './EnderecoOperationTemplate.js';
import Endereco, { type IEndereco } from '../../models/EnderecoModel.js';

export class InserirEndereco extends EnderecoOperationTemplate {
  protected async processarOperacao(dadosEndereco: Partial<IEndereco>): Promise<IEndereco> {
    if (!dadosEndereco.usuario) {
      throw new Error('O ID do usuário é obrigatório para cadastrar um endereço');
    }

    const novoEndereco = new Endereco(dadosEndereco);
    return await novoEndereco.save();
  }
}
