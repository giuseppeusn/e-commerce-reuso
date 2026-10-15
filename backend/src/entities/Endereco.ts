import type { Usuario } from './Usuario.js';

export class Endereco {
  private id: string;
  private nome: string;
  private logradouro: string;
  private numero: string;
  private complemento: string;
  private cep: string;
  private estado: string;
  private cidade: string;
  private bairro: string;
  private usuario: Usuario;

  constructor(
    id: string,
    nome: string,
    logradouro: string,
    numero: string,
    complemento: string,
    cep: string,
    estado: string,
    cidade: string,
    bairro: string,
    usuario: Usuario
  ) {
    this.id = id;
    this.nome = nome;
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.cep = cep;
    this.estado = estado;
    this.cidade = cidade;
    this.bairro = bairro;
    this.usuario = usuario;
  }

  public getId(): string { return this.id; }
  public getNome(): string { return this.nome; }
  public getLogradouro(): string { return this.logradouro; }
  public getNumero(): string { return this.numero; }
  public getComplemento(): string { return this.complemento; }
  public getCep(): string { return this.cep; }
  public getEstado(): string { return this.estado; }
  public getCidade(): string { return this.cidade; }
  public getBairro(): string { return this.bairro; }
  public getUsuario(): Usuario { return this.usuario; }
}
