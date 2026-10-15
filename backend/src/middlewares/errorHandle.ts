import type { NextFunction, Request, Response } from 'express';
import { AppErrorCartao } from '../services/templates/errors/AppErrorCartao.js';

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof AppErrorCartao) {
        return res.status(err.status).json({ mensagem: err.message });
    }
    console.error(err); // erro inesperado: loga e não vaza detalhes
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
}

// Função para validar o número do cartão usando o algoritmo de Luhn
export function luhn(numero: string): boolean {
    let soma = 0;
    let dobrar = false;
    for (let i = numero.length - 1; i >= 0; i--) {
        let d = numero.charCodeAt(i) - 48;
        if (dobrar) {
            d *= 2;
            if (d > 9) d -= 9;
        }
        soma += d;
        dobrar = !dobrar;
    }
    return soma % 10 === 0;
}