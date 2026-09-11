import { Usuario } from './Usuario.js';
import { Produto } from './Produto.js';
import { CupomDesconto } from './CupomDesconto.js';
import { AvaliacaoEComentario } from './AvaliacaoEComentario.js';

export class Administrador extends Usuario {
  private nivelAcesso: number;

  constructor(id: string, nome: string, email: string, senhaHash: string, nivelAcesso: number) {
    super(id, nome, email, senhaHash, 'ADMINISTRADOR');
    this.nivelAcesso = nivelAcesso;
  }

  public aprovarProduto(produto: Produto): void {
    produto.aprovar();
  }

  public rejeitarProduto(produto: Produto): void {
    produto.rejeitar();
  }

  public moderarComentario(avaliacao: AvaliacaoEComentario, ocultar: boolean): void {
    if (ocultar) {
      avaliacao.ocultar();
    }
  }

  public ativarCupom(cupom: CupomDesconto, ativo: boolean): void {
    cupom.setAtivo(ativo);
  }

  public getNivelAcesso(): number {
    return this.nivelAcesso;
  }
}
