import type { Request, Response } from 'express';
import type { ICartaoStrategy } from '../strategies/CartaoEstrategy.js';
import type { ICartaoRepository } from '../repositories/ICartaoRepository.js';
import type { CriarCartaoDTO } from '../services/DTO/CartaoDTO.js';

import CartaoRepository from '../repositories/CartaoRepository.js';
import CartaoService from '../services/CartaoService.js';
import { AppErrorCartao } from '../services/templates/errors/AppErrorCartao.js';
import { BandeiraResolver } from '../strategies/BandeiraResolver.js';

// o controller só recebe o pedido, chama quem resolve e responde com o status certo
class CartaoController {
    constructor(
        private readonly service: ICartaoStrategy
    ) { }

    // cria o cartão (passa pelo service pra validar antes de salvar)
    public criar = async (req: Request, res: Response) => {
        try {
            const cartao = await this.service.criar(req.body);

            return res.status(201).json(cartao);
        } catch (error) {
            if (error instanceof AppErrorCartao) {
                return res.status(error.status).json({
                    mensagem: error.message
                });
            }

            return res.status(400).json({
                mensagem: 'Não foi possível criar o cartão.'
            });
        }
    };

    // lista os cartões de um usuário
    public listar = async (req: Request, res: Response) => {
        try {
            const cartoes = await this.service.listar(String(req.params.id));

            return res.status(200).json(cartoes);
        } catch (error) {
            return res.status(500).json({
                mensagem: 'Erro ao listar cartões.'
            });
        }
    };

    // busca um cartão pelo id
    public buscarPorId = async (req: Request, res: Response) => {
        try {
            const cartao = await this.service.buscarPorId(
                String(req.params.id)
            );

            if (!cartao) {
                return res.status(404).json({
                    mensagem: 'Cartão não encontrado.'
                });
            }

            return res.status(200).json(cartao);
        } catch (error) {
            return res.status(400).json({
                mensagem: 'ID inválido ou erro ao buscar cartão.'
            });
        }
    };

    // atualiza um cartão
    public atualizar = async (req: Request, res: Response) => {
        try {
            const cartao = await this.service.atualizar(
                String(req.params.id),
                req.body
            );

            if (!cartao) {
                return res.status(404).json({
                    mensagem: 'Cartão não encontrado.'
                });
            }

            return res.status(200).json(cartao);
        } catch (error) {
            return res.status(400).json({
                mensagem: 'Não foi possível atualizar o cartão.'
            });
        }
    };

    // apaga um cartão
    public deletar = async (req: Request, res: Response) => {
        try {
            const cartao = await this.service.deletar(
                String(req.params.id)
            );

            if (!cartao) {
                return res.status(404).json({
                    mensagem: 'Cartão não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Cartão removido com sucesso.'
            });
        } catch (error) {
            return res.status(400).json({
                mensagem: 'Não foi possível remover o cartão.'
            });
        }
    };
}

// aqui a gente monta tudo: o service recebe o repositório e o resolver de bandeiras
// (os dois são singleton, então é sempre a mesma instância)
const cartaoService = new CartaoService(
    CartaoRepository as unknown as ICartaoRepository,
    BandeiraResolver.getInstance()
);

// só o criar passa pelo service (precisa validar a bandeira), o resto vai direto no repositório
const cartaoStrategy: ICartaoStrategy = {
    criar: (dados) => cartaoService.criar(
        String(dados.usuario),
        dados as unknown as CriarCartaoDTO
    ),
    listar: (usuarioId) => CartaoRepository.listar(usuarioId),
    buscarPorId: (id) => CartaoRepository.buscarPorId(id),
    atualizar: (id, dados) => CartaoRepository.atualizar(id, dados),
    deletar: (id) => CartaoRepository.deletar(id),
};

export default new CartaoController(cartaoStrategy);
