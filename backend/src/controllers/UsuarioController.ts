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

      const { usuario, token } = await usuarioService.registrar({
        nome,
        email,
        cpf,
        senha,
      });

      res.status(201).json({
        token,
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

      const { usuario, token } = await usuarioService.login(email, senha);

      res.status(200).json({
        message: "Login realizado com sucesso",
        token,
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

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { nome, email, cpf } = req.body;

      const usuarioAtualizado = await usuarioService.atualizar(id, {
        nome,
        email,
        cpf,
      });

      res.status(200).json({
        message: "Dados atualizados com sucesso",
        usuario: {
          id: usuarioAtualizado._id,
          nome: usuarioAtualizado.nome,
          email: usuarioAtualizado.email,
          cpf: usuarioAtualizado.cpf,
          tipoConta: usuarioAtualizado.tipoConta,
        },
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error.message || "Erro ao atualizar dados" });
    }
  }

  async excluir(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;

      await usuarioService.excluir(id);

      res.status(200).json({ message: "Conta excluída com sucesso" });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error.message || "Erro ao excluir conta" });
    }
  }
}

export default new UsuarioController();
