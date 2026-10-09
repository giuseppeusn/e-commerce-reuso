import express from 'express';
import enderecoController from '../controllers/EnderecoController.js';

const router = express.Router();

router.post('/', enderecoController.criar);

export default router;
