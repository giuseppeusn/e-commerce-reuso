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

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const produtoAtualizado = await produtoService.atualizarProduto(req.params.id, req.body);
      res.status(200).json(produtoAtualizado);
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
  }

  async aprovar(req: Request, res: Response): Promise<void> {
    try {
      const produtoAprovado = await produtoService.aprovarProduto(req.params.id);
      res.status(200).json(produtoAprovado);
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao aprovar produto', error: error.message });
    }
  }

  async excluir(req: Request, res: Response): Promise<void> {
    try {
      await produtoService.excluirProduto(req.params.id);
      res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error: any) {
      res.status(500).json({ message: 'Erro ao excluir produto', error: error.message });
    }
  }
}

export default new ProdutoController();