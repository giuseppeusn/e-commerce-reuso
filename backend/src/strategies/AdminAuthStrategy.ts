import { AuthStrategy } from "./AuthStrategy.js";
import { type IUsuario } from "../models/UsuarioModel.js";

export class AdminAuthStrategy extends AuthStrategy {
  protected validarTipoConta(usuario: IUsuario): void {
    if (usuario.tipoConta !== "ADMINISTRADOR") {
      throw new Error("Acesso restrito a administradores.");
    }
  }

  protected montarPayloadUsuario(usuario: IUsuario) {
    return {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      tipoConta: usuario.tipoConta,
    };
  }
}
