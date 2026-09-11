import type { Pedido } from './Pedido.js';

export class SolicitacaoReembolso {
  private id: string;
  private pedido: Pedido;
  private motivo: string;
  private status: 'PENDENTE' | 'APROVADA' | 'RECUSADA';

  constructor(id: string, pedido: Pedido, motivo: string) {
    this.id = id;
    this.pedido = pedido;
    this.motivo = motivo;
    this.status = 'PENDENTE';
  }

  public aprovar(): void {
    this.status = 'APROVADA';
  }

  public recusar(): void {
    this.status = 'RECUSADA';
  }

  public getStatus(): string { return this.status; }
  public getPedido(): Pedido { return this.pedido; }
}
