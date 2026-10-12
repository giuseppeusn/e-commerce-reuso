import Usuario, { type IUsuario } from "../models/UsuarioModel.js";

class UsuarioService {
  async registrar(dadosUsuario: {
    nome: string;
    email: string;
    cpf: string;
    senha: string;
  }) {
    const { nome, email, cpf, senha } = dadosUsuario;

    // 1. Verifica se já existe um usuário com o mesmo e-mail ou CPF
    const usuarioExistente = await Usuario.findOne({
      $or: [{ email }, { cpf }],
    });

    if (usuarioExistente) {
      throw new Error(
        "Já existe um usuário cadastrado com este e-mail ou CPF.",
      );
    }

    // 2. Cria o novo usuário
    const novoUsuario = new Usuario({
      nome,
      email,
      cpf,
      senhaHash: senha,
      tipoConta: "CLIENTE",
    });

    return await novoUsuario.save();
  }

  async login(email: string, senhaTentativa: string) {
    // 1. Busca o usuário pelo e-mail
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      throw new Error("Usuário ou senha inválidos.");
    }

    if (usuario.senhaHash !== senhaTentativa) {
      throw new Error("Usuário ou senha inválidos.");
    }

    return usuario;
  }
}

export default new UsuarioService();
