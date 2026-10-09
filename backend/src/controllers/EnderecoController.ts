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
}

export default new EnderecoController();
