import { AuthStrategy } from "./AuthStrategy.js";
import { type IUsuario } from "../models/UsuarioModel.js";

export class ClienteAuthStrategy extends AuthStrategy {
  // Valida se a conta pertence a um CLIENTE
  protected validarTipoConta(usuario: IUsuario): void {
    if (usuario.tipoConta !== "CLIENTE") {
      throw new Error("Acesso não permitido para este perfil.");
    }
  }

  // Monta os dados sanitizados do CLIENTE para retorno
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
