import { ItemCarrinho } from './ItemCarrinho.js';
import type { Cliente } from './Cliente.js';
import { CupomDesconto } from './CupomDesconto.js';

export class CarrinhoDeCompras {
  private itens: ItemCarrinho[];
  private subtotal: number;
  private cliente: Cliente;
  private cupomAplicado: CupomDesconto | null;

  constructor(cliente: Cliente) {
    this.cliente = cliente;
    this.itens = [];
    this.subtotal = 0;
    this.cupomAplicado = null;
  }

  public adicionarItem(item: ItemCarrinho): void {
    this.itens.push(item);
    this.calcularSubtotal();
  }

  public removerItem(produtoId: string): void {
    this.itens = this.itens.filter(item => item.getProduto().getId() !== produtoId);
    this.calcularSubtotal();
  }

  public calcularSubtotal(): number {
    this.subtotal = this.itens.reduce((acc, item) => acc + item.calcularTotalItem(), 0);
    return this.subtotal;
  }

  public aplicarCupom(cupom: CupomDesconto): boolean {
    if (cupom.validarCupom(this.subtotal)) {
      this.cupomAplicado = cupom;
      return true;
    }
    return false;
  }

  public calcularTotalFinal(): number {
    if (this.cupomAplicado) {
      const desconto = this.cupomAplicado.calcularDesconto(this.subtotal);
      return this.subtotal - desconto;
    }
    return this.subtotal;
  }

  public getItens(): ItemCarrinho[] { return this.itens; }
}
