import express from 'express';
import produtoController from '../controllers/ProdutoController.js';

const router = express.Router();

router.post('/', produtoController.criar);
router.get('/', produtoController.listar);

export default router;