import { Usuario } from './Usuario.js';
import { Pedido } from './Pedido.js';
import { Produto } from './Produto.js';
import { AvaliacaoEComentario } from './AvaliacaoEComentario.js';

export class Cliente extends Usuario {
  private historicoPedidos: Pedido[];

  constructor(id: string, nome: string, email: string, senhaHash: string) {
    super(id, nome, email, senhaHash, 'CLIENTE');
    this.historicoPedidos = [];
  }

  public realizarPedido(pedido: Pedido): void {
    this.historicoPedidos.push(pedido);
  }

  public avaliarProduto(produto: Produto, nota: number, comentario: string): AvaliacaoEComentario {
    return new AvaliacaoEComentario(Date.now().toString(), produto, this, nota, comentario);
  }

  public getHistoricoPedidos(): Pedido[] {
    return this.historicoPedidos;
  }
}
