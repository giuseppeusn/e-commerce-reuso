import { Produto } from './Produto.js';
import { Usuario } from './Usuario.js';

export class AvaliacaoEComentario {
  private id: string;
  private produto: Produto;
  private usuario: Usuario;
  private nota: number;
  private comentario: string;
  private data: Date;
  private visivel: boolean;

  constructor(id: string, produto: Produto, usuario: Usuario, nota: number, comentario: string) {
    this.id = id;
    this.produto = produto;
    this.usuario = usuario;
    this.nota = Math.max(1, Math.min(5, nota));
    this.comentario = comentario;
    this.data = new Date();
    this.visivel = true;
  }

  public ocultar(): void {
    this.visivel = false;
  }

  public isVisivel(): boolean {
    return this.visivel;
  }

  public getNota(): number { return this.nota; }
  public getComentario(): string { return this.comentario; }
  public getProduto(): Produto { return this.produto; }
}
