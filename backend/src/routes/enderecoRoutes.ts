import express from 'express';
import enderecoController from '../controllers/EnderecoController.js';

const router = express.Router();

router.post('/', enderecoController.criar);
router.get('/', enderecoController.listarPorUsuario);
router.get('/usuario/:usuarioId', enderecoController.listarPorUsuario);
router.get('/:id', enderecoController.buscarPorId);
router.put('/:id', enderecoController.editar);
router.delete('/:id', enderecoController.excluir);

export default router;
