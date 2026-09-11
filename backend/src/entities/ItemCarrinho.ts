import { Produto } from './Produto.js';

export class ItemCarrinho {
  private produto: Produto;
  private quantidade: number;

  constructor(produto: Produto, quantidade: number) {
    this.produto = produto;
    this.quantidade = quantidade;
  }

  public calcularTotalItem(): number {
    return this.produto.getPreco() * this.quantidade;
  }

  public alterarQuantidade(novaQuantidade: number): void {
    if (novaQuantidade >= 0) {
      this.quantidade = novaQuantidade;
    }
  }

  public getProduto(): Produto { return this.produto; }
  public getQuantidade(): number { return this.quantidade; }
}
