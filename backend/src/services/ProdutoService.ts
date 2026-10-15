import Produto, { type IProduto } from '../models/ProdutoModel.js';
import Usuario from '../models/UsuarioModel.js';


//Padrao de desconto (Strategy) estabelece um modo fixo de descontos, alterando apenas o valor da porcentagem conforme a situação


export interface EstrategiaDesconto {
  calcular(precoOriginal: number): number;
}

export class DescontoNormal implements EstrategiaDesconto {
  calcular(precoOriginal: number): number {
    return precoOriginal;
  }
}

export class DescontoPromocional implements EstrategiaDesconto {
  calcular(precoOriginal: number): number {
    return precoOriginal * 0.8; 
  }
}


// Padrão de ordem da execução do algoritimo (validar->preparDados-salvarNoBanco) classes esppecificas apenas sobrescrevem metodos especificos

export abstract class ProcessadorProdutoTemplate {
  public async processarCadastro(dados: any): Promise<any> {
    this.validarDados(dados);
    const dadosPreparados = this.prepararDadosEspecificos(dados);
    const produtoSalvo = await this.salvarNoBanco(dadosPreparados);
    return produtoSalvo;
  }

  protected validarDados(dados: any): void {
    if (!dados.nome || !dados.preco) {
      throw new Error('Nome e preço são obrigatórios.');
    }
  }

  protected abstract prepararDadosEspecificos(dados: any): any;

  protected async salvarNoBanco(dados: any): Promise<any> {
    let fornecedor = await Usuario.findOne({ email: 'fornecedor@mock.com' });
    if (!fornecedor) {
      fornecedor = await Usuario.create({
        nome: 'Fornecedor Teste',
        email: 'fornecedor@mock.com',
        senhaHash: '123456',
        tipoConta: 'CLIENTE',
        cpf: '000.000.000-00'
      });
    }

    const novoProduto = new Produto({
      ...dados,
      fornecedorId: fornecedor._id
    });

    return await novoProduto.save();
  }
}

export class ProcessadorProdutoFisico extends ProcessadorProdutoTemplate {
  protected prepararDadosEspecificos(dados: any) {
    const estrategia = dados.emPromocao ? new DescontoPromocional() : new DescontoNormal();
    const precoFinal = estrategia.calcular(Number(dados.preco));

    return {
      ...dados,
      preco: precoFinal,
      tipo: 'FISICO'
    };
  }
}



class ProdutoService {
  async criarProduto(dadosProduto: any) {
    const processador = new ProcessadorProdutoFisico();
    return await processador.processarCadastro(dadosProduto);
  }

  async listarProdutos() {
    return await Produto.find().populate('fornecedorId', 'nome email');
  }

  async atualizarProduto(id: string, dadosAtualizados: Partial<IProduto>) {
    return await Produto.findByIdAndUpdate(id, dadosAtualizados, { new: true });
  }

  async aprovarProduto(id: string) {
    return await Produto.findByIdAndUpdate(id, { statusAprovacao: 'APROVADO' }, { new: true });
  }

  async excluirProduto(id: string) {
    return await Produto.findByIdAndDelete(id);
  }
}

export default new ProdutoService();