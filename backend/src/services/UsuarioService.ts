import crypto from "crypto";
import Usuario, { type IUsuario } from "../models/UsuarioModel.js";
import { AuthContextStrategy } from "../strategies/AuthContextStrategy.js";

class UsuarioService {
  // Gera um token aleatório simples
  private gerarToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  /* --- adastrar Novo Usuário --- */
  async registrar(dadosUsuario: {
    nome: string;
    email: string;
    cpf: string;
    senha: string;
  }) {
    const { nome, email, cpf, senha } = dadosUsuario;

    // Verifica se já existe o e-mail ou CPF cadastrado
    const usuarioExistente = await Usuario.findOne({
      $or: [{ email }, { cpf }],
    });

    if (usuarioExistente) {
      throw new Error(
        "Já existe um usuário cadastrado com este e-mail ou CPF.",
      );
    }

    // Criar Usuario
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

  /* --- Ação: Autenticar / Fazer Login --- */
  async login(email: string, senhaTentativa: string) {
    // Busca o usuário no banco de dados
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      throw new Error("Usuário ou senha inválidos.");
    }

    //Seleciona a Strategy apropriada
    const estrategia = AuthContextStrategy.obterEstrategia(usuario.tipoConta);

    // Executa a validação e autenticação completa
    const resultado = await estrategia.autenticar(
      usuario,
      senhaTentativa,
      this.gerarToken.bind(this),
    );

    return resultado;
  }

  /* --- Ação: Atualizar Usuário --- */
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

  /* --- Ação: Excluir Usuário --- */
  async excluir(id: string) {
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  }

  /* --- Ação: Buscar Usuário por ID --- */
  async buscarPorId(id: string) {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  }
}

export default new UsuarioService();

