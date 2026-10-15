import crypto from "crypto";
import Usuario, { type IUsuario } from "../models/UsuarioModel.js";
import { AuthContextStrategy } from "../strategies/AuthContextStrategy.js";

class UsuarioService {
  private gerarToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  // CADASTRO: Permanece normal (todo novo usuário entra como CLIENTE)
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

  // LOGIN: Atualizado para usar Strategy + Template Method
  async login(email: string, senhaTentativa: string) {
    // 1. Busca o usuário no banco
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      throw new Error("Usuário ou senha inválidos.");
    }

    // 2. Escolhe a Strategy baseada no tipoConta retornado do banco
    const estrategia = AuthContextStrategy.obterEstrategia(usuario.tipoConta);

    // 3. Executa o Template Method
    const resultado = await estrategia.autenticar(
      usuario,
      senhaTentativa,
      this.gerarToken.bind(this),
    );

    return resultado;
  }

  // EDIÇÃO: Permanece normal
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

  // EXCLUSÃO: Permanece normal
  async excluir(id: string) {
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  }
}

export default new UsuarioService();
