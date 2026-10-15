import { type IEndereco } from '../../models/EnderecoModel.js';

export abstract class EnderecoOperationTemplate {
  public async execute(dadosEndereco: Partial<IEndereco>, idEndereco?: string): Promise<IEndereco> {
    this.validarDados(dadosEndereco);
    const resultado = await this.processarOperacao(dadosEndereco, idEndereco);
    return this.finalizar(resultado);
  }

  protected validarDados(dadosEndereco: Partial<IEndereco>): void {
    if (dadosEndereco.cep && !/^\d{8}$/.test(dadosEndereco.cep.replace(/\D/g, ''))) {
      throw new Error('CEP com formato inválido');
    }
  }

  protected finalizar(resultado: IEndereco): IEndereco {
    return resultado;
  }

  protected abstract processarOperacao(dadosEndereco: Partial<IEndereco>, idEndereco?: string): Promise<IEndereco>;
}
