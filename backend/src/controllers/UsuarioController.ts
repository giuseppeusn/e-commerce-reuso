import { type Request, type Response } from "express";
import usuarioService from "../services/UsuarioService.js";

class UsuarioController {
  async registrar(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, cpf, senha } = req.body;

      if (!nome || !email || !cpf || !senha) {
        res.status(400).json({ message: "Todos os campos são obrigatórios." });
        return;
      }

      const usuarioSalvo = await usuarioService.registrar({
        nome,
        email,
        cpf,
        senha,
      });

      // Retorna apenas os dados do usuário
      res.status(201).json({
        id: usuarioSalvo._id,
        nome: usuarioSalvo.nome,
        email: usuarioSalvo.email,
        cpf: usuarioSalvo.cpf,
        tipoConta: usuarioSalvo.tipoConta,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error.message || "Erro ao realizar o cadastro" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        res.status(400).json({ message: "E-mail e senha são obrigatórios." });
        return;
      }

      const usuario = await usuarioService.login(email, senha);

      res.status(200).json({
        message: "Login realizado com sucesso",
        usuario: {
          id: usuario._id,
          nome: usuario.nome,
          email: usuario.email,
          cpf: usuario.cpf,
          tipoConta: usuario.tipoConta,
        },
      });
    } catch (error: any) {
      res
        .status(401)
        .json({ message: error.message || "Falha na autenticação" });
    }
  }
}

export default new UsuarioController();
