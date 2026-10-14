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
}

export default new EnderecoController();
