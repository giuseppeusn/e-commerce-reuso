import crypto from "crypto";
import Usuario, { type IUsuario } from "../models/UsuarioModel.js";

class UsuarioService {
  private gerarToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  async registrar(dadosUsuario: {
    nome: string;
    email: string;
    cpf: string;
    senha: string;
  }) {
    const { nome, email, cpf, senha } = dadosUsuario;

    const usuarioExistente = await Usuario.findOne({
      $or: [{ email }, { cpf }],
    });

    if (usuarioExistente) {
      throw new Error(
        "Já existe um usuário cadastrado com este e-mail ou CPF.",
      );
    }

    const novoUsuario = new Usuario({
      nome,
      email,
      cpf,
      senhaHash: senha,
      tipoConta: "CLIENTE",
    });

    const usuarioSalvo = await novoUsuario.save();
    const token = this.gerarToken();

    return { usuario: usuarioSalvo, token };
  }

  async login(email: string, senhaTentativa: string) {
    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.senhaHash !== senhaTentativa) {
      throw new Error("Usuário ou senha inválidos.");
    }

    const token = this.gerarToken();

    return { usuario, token };
  }

  async atualizar(
    id: string,
    dadosAtualizados: { nome?: string; email?: string; cpf?: string },
  ) {
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { $set: dadosAtualizados },
      { new: true, runValidators: true },
    );

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    return usuario;
  }

  async excluir(id: string) {
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  }
}

export default new UsuarioService();
