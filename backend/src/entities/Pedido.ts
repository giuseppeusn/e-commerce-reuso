import { Cliente } from './Cliente.js';
import { ItemCarrinho } from './ItemCarrinho.js';
import { Pagamento } from './Pagamento.js';

export class Pedido {
  private id: string;
  private data: Date;
  private valorTotal: number;
  private statusEntrega: 'PROCESSANDO' | 'ENVIADO' | 'ENTREGUE' | 'CANCELADO';
  private itens: ItemCarrinho[];
  private cliente: Cliente;
  private pagamento: Pagamento;

  constructor(id: string, cliente: Cliente, itens: ItemCarrinho[], valorTotal: number, pagamento: Pagamento) {
    this.id = id;
    this.cliente = cliente;
    this.itens = itens;
    this.valorTotal = valorTotal;
    this.pagamento = pagamento;
    this.data = new Date();
    this.statusEntrega = 'PROCESSANDO';
  }

  public atualizarStatusEntrega(novoStatus: 'PROCESSANDO' | 'ENVIADO' | 'ENTREGUE' | 'CANCELADO'): void {
    this.statusEntrega = novoStatus;
  }

  public finalizarPedido(): boolean {
    if (this.pagamento.getStatus() === 'APROVADO') {
      this.statusEntrega = 'ENVIADO'; // Exemplo de regra
      return true;
    }
    return false;
  }

  // Getters
  public getId(): string { return this.id; }
  public getValorTotal(): number { return this.valorTotal; }
  public getStatusEntrega(): string { return this.statusEntrega; }
  public getPagamento(): Pagamento { return this.pagamento; }
}
