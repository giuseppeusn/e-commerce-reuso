import { type Request, type Response } from 'express';
import enderecoService from '../services/EnderecoService.js';

class EnderecoController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const enderecoSalvo = await enderecoService.criarEndereco(req.body);
      res.status(201).json(enderecoSalvo);
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao salvar endereço', error: error.message });
    }
  }

  async editar(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      if (!id) {
        res.status(400).json({ message: 'ID do endereço é obrigatório' });
        return;
      }
      const enderecoAtualizado = await enderecoService.editarEndereco(id, req.body);
      res.status(200).json(enderecoAtualizado);
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao editar endereço', error: error.message });
    }
  }

  async listarPorUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = (req.params.usuarioId || req.query.usuario) as string;
      if (!usuarioId) {
        res.status(400).json({ message: 'ID do usuário é obrigatório' });
        return;
      }
      const enderecos = await enderecoService.listarPorUsuario(usuarioId);
      res.status(200).json(enderecos);
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao listar endereços', error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const endereco = await enderecoService.buscarPorId(id);
      if (!endereco) {
        res.status(404).json({ message: 'Endereço não encontrado' });
        return;
      }
      res.status(200).json(endereco);
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao buscar endereço', error: error.message });
    }
  }

  async excluir(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const enderecoExcluido = await enderecoService.excluirEndereco(id);
      if (!enderecoExcluido) {
        res.status(404).json({ message: 'Endereço não encontrado' });
        return;
      }
      res.status(200).json({ message: 'Endereço excluído com sucesso' });
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao excluir endereço', error: error.message });
    }
  }
}

export default new EnderecoController();
