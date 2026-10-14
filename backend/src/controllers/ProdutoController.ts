import { type Request, type Response } from 'express';
import produtoService from '../services/ProdutoService.js';

class ProdutoController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const produtoSalvo = await produtoService.criarProduto(req.body);
      res.status(201).json(produtoSalvo);
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao salvar produto', error: error.message });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const produtos = await produtoService.listarProdutos();
      res.status(200).json(produtos);
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao listar produtos', error: error.message });
    }
  }
}

export default new ProdutoController();