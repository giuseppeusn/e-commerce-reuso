import { Router } from 'express';
import CartaoController from '../controllers/CartaoController.js';

// a requisição entra por aqui (vinda do index.ts) e é mandada pro controller
const router = Router();

router.post('/', CartaoController.criar);                 // cadastra
router.get('/:id', CartaoController.listar);              // lista os cartões do usuário (o id é do usuário)
router.get('/cartoes/:id', CartaoController.buscarPorId); // busca um cartão
router.put('/:id', CartaoController.atualizar);           // edita
router.delete('/:id', CartaoController.deletar);          // apaga

export default router;
