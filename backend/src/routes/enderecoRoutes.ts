import express, { type Request, type Response } from 'express';
import Endereco from '../models/EnderecoModel.js';
import Usuario from '../models/UsuarioModel.js';

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, logradouro, numero, complemento, cep, estado, cidade, bairro } = req.body;

    // Procura por um usuário existente ou cria um mock
    let usuario = await Usuario.findOne({ email: 'mock@mock.com' });
    
    if (!usuario) {
      usuario = await Usuario.create({
        nome: 'Usuário Teste',
        email: 'mock@mock.com',
        senhaHash: '123456',
        tipoConta: 'CLIENTE'
      });
    }

    const novoEndereco = new Endereco({
      nome,
      logradouro,
      numero,
      complemento,
      cep,
      estado,
      cidade,
      bairro,
      usuario: usuario._id
    });

    const enderecoSalvo = await novoEndereco.save();

    res.status(201).json(enderecoSalvo);
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao salvar endereço', error: error.message });
  }
});

export default router;
