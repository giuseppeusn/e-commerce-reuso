import { AuthStrategy } from "./AuthStrategy.js";
import { type IUsuario } from "../models/UsuarioModel.js";

export class AdminAuthStrategy extends AuthStrategy {
  // Valida se a conta pertence a um ADMINISTRADOR
  protected validarTipoConta(usuario: IUsuario): void {
    if (usuario.tipoConta !== "ADMINISTRADOR") {
      throw new Error("Acesso restrito a administradores.");
    }
  }

  // Monta os dados sanitizados do ADMINISTRADOR para retorno
  protected montarPayloadUsuario(usuario: IUsuario) {
    return {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      tipoConta: usuario.tipoConta,
      featureFlags: usuario.featureFlags || { visualizacao3D: false },
    };
  }
}
