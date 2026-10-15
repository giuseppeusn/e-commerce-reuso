/**
 * Descrição: Classe abstrata base (Template Method) que define o fluxo genérico
 * de autenticação
 */

import { type IUsuario } from "../models/UsuarioModel.js";

export abstract class AuthStrategy {
  // Fluxo principal de autenticação
  public async autenticar(
    usuario: IUsuario,
    senhaTentativa: string,
    gerarTokenFn: () => string,
  ) {
    this.validarTipoConta(usuario);
    this.validarSenha(usuario, senhaTentativa);
    const token = gerarTokenFn();

    // Monta os dados de retorno do usuário
    const payloadUsuario = this.montarPayloadUsuario(usuario);

    return { usuario: payloadUsuario, token };
  }

  // Validação da senha enviada
  protected validarSenha(usuario: IUsuario, senhaTentativa: string): void {
    if (usuario.senhaHash !== senhaTentativa) {
      throw new Error("Usuário ou senha inválidos.");
    }
  }

  // Métodos abstratos implementados em cada estratégia concreta
  protected abstract validarTipoConta(usuario: IUsuario): void;
  protected abstract montarPayloadUsuario(usuario: IUsuario): any;
}
