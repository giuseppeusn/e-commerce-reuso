import express from 'express';
import produtoController from '../controllers/ProdutoController.js';

const router = express.Router();

router.post('/', produtoController.criar);
router.get('/', produtoController.listar);
router.put('/:id', produtoController.atualizar);
router.patch('/:id/aprovar', produtoController.aprovar);
router.delete('/:id', produtoController.excluir);

export default router;