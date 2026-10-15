import type { Endereco } from './Endereco.js';
import type { Cartao } from './Cartao.js';

export abstract class Usuario {
  protected id: string;
  protected nome: string;
  protected email: string;
  protected senhaHash: string;
  protected tipoConta: 'CLIENTE' | 'FORNECEDOR' | 'ADMINISTRADOR';
  protected enderecos: Endereco[];
  protected cartoes: Cartao[];
  protected featureFlags: { visualizacao3D?: boolean; [key: string]: any };

  constructor(id: string, nome: string, email: string, senhaHash: string, tipoConta: 'CLIENTE' | 'FORNECEDOR' | 'ADMINISTRADOR', featureFlags: { visualizacao3D?: boolean; [key: string]: any } = {}) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senhaHash = senhaHash;
    this.tipoConta = tipoConta;
    this.enderecos = [];
    this.cartoes = [];
    this.featureFlags = featureFlags;
  }

  public adicionarEndereco(endereco: Endereco): void {
    this.enderecos.push(endereco);
  }

  public adicionarCartao(cartao: Cartao): void {
    this.cartoes.push(cartao);
  }

  public autenticar(senhaTentativa: string): boolean {
    return this.senhaHash === senhaTentativa;
  }

  public atualizarPerfil(nome: string, email: string): void {
    this.nome = nome;
    this.email = email;
  }

  public getId(): string { return this.id; }
  public getNome(): string { return this.nome; }
  public getEmail(): string { return this.email; }
  public getTipoConta(): string { return this.tipoConta; }
  public getEnderecos(): Endereco[] { return this.enderecos; }
  public getCartoes(): Cartao[] { return this.cartoes; }
  public getFeatureFlags(): { visualizacao3D?: boolean; [key: string]: any } { return this.featureFlags; }
  public setFeatureFlag(flag: string, value: any): void { this.featureFlags[flag] = value; }
}
