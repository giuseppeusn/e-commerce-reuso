import { Router } from 'express';
import CartaoController from '../controllers/CartaoController.js';

const router = Router();

router.post('/', CartaoController.criar);
router.get('/:id', CartaoController.listar);
router.get('/cartoes/:id', CartaoController.buscarPorId);
router.put('/:id', CartaoController.atualizar);
router.delete('/:id', CartaoController.deletar);

export default router;