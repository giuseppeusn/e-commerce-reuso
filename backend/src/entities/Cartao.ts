import type { Usuario } from './Usuario.js';
import type { Endereco } from './Endereco.js';

export class Cartao {
  private id: string;
  private nome: string;
  private numero: string;
  private vencimento: string;
  private cvv: string;
  private enderecoCobranca: Endereco;
  private usuario: Usuario;

  constructor(
    id: string,
    nome: string,
    numero: string,
    vencimento: string,
    cvv: string,
    enderecoCobranca: Endereco,
    usuario: Usuario
  ) {
    this.id = id;
    this.nome = nome;
    this.numero = numero;
    this.vencimento = vencimento;
    this.cvv = cvv;
    this.enderecoCobranca = enderecoCobranca;
    this.usuario = usuario;
  }

  public getId(): string { return this.id; }
  public getNome(): string { return this.nome; }
  public getNumero(): string { return this.numero; }
  public getVencimento(): string { return this.vencimento; }
  public getCvv(): string { return this.cvv; }
  public getEnderecoCobranca(): Endereco { return this.enderecoCobranca; }
  public getUsuario(): Usuario { return this.usuario; }
}
