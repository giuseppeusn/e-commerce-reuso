import type { Request, Response } from 'express';
import type { ICartaoStrategy } from '../strategies/CartaoEstrategy.js';
import type { ICartaoRepository } from '../repositories/ICartaoRepository.js';
import type { CriarCartaoDTO } from '../services/DTO/CartaoDTO.js';

import CartaoRepository from '../repositories/CartaoRepository.js';
import CartaoService from '../services/CartaoService.js';
import { BandeiraResolver } from '../strategies/BandeiraResolver.js';

class CartaoController {
    constructor(
        private readonly service: ICartaoStrategy
    ) { }

    public criar = async (req: Request, res: Response) => {
        try {
            const cartao = await this.service.criar(req.body);

            return res.status(201).json(cartao);
        } catch (error) {
            return res.status(400).json({
                mensagem: 'Não foi possível criar o cartão.'
            });
        }
    };

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

const cartaoService = new CartaoService(
    CartaoRepository as unknown as ICartaoRepository,
    BandeiraResolver.getInstance()
);

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