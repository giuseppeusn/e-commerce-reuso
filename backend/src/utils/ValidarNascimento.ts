import { ValidationError } from '../services/templates/errors/AppErrorCartao.js';

export function validarVencimento(v: string, hoje = new Date()): void {
    const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(v);
    if (!m) throw new ValidationError('Vencimento deve estar no formato MM/AA.');

    const mes = Number(m[1]);
    const ano = 2000 + Number(m[2]);
    const fimDoMes = new Date(ano, mes, 0, 23, 59, 59); // vale até o último dia do mês
    if (fimDoMes < hoje) throw new ValidationError('Cartão vencido.');
}