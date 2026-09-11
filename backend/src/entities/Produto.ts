export class Produto {
  private id: string;
  private nome: string;
  private descricao: string;
  private preco: number;
  private fotos: string[];
  private statusAprovacao: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
  private notaMedia: number;
  private fornecedorId: string;

  constructor(id: string, nome: string, descricao: string, preco: number, fornecedorId: string, fotos: string[] = []) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.fotos = fotos;
    this.fornecedorId = fornecedorId;
    this.statusAprovacao = 'PENDENTE';
    this.notaMedia = 0.0;
  }

  public atualizarNotaMedia(novaNota: number): void {
    this.notaMedia = novaNota;
  }

  public aprovar(): void {
    this.statusAprovacao = 'APROVADO';
  }

  public rejeitar(): void {
    this.statusAprovacao = 'REJEITADO';
  }

  public getId(): string { return this.id; }
  public getNome(): string { return this.nome; }
  public getPreco(): number { return this.preco; }
  public getStatusAprovacao(): string { return this.statusAprovacao; }
  public getNotaMedia(): number { return this.notaMedia; }
}
