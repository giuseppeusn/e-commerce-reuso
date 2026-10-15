import { EnderecoOperationTemplate } from './EnderecoOperationTemplate.js';
import Endereco, { type IEndereco } from '../../models/EnderecoModel.js';

export class EditarEndereco extends EnderecoOperationTemplate {
  protected async processarOperacao(dadosEndereco: Partial<IEndereco>, idEndereco?: string): Promise<IEndereco> {
    if (!idEndereco) {
      throw new Error('ID do endereço é obrigatório para edição');
    }

    const enderecoAtualizado = await Endereco.findByIdAndUpdate(
      idEndereco,
      { $set: dadosEndereco },
      { new: true, runValidators: true }
    );

    if (!enderecoAtualizado) {
      throw new Error('Endereço não encontrado');
    }

    return enderecoAtualizado;
  }
}
