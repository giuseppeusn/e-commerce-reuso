import type { IBandeiraStrategy } from './IBandeiraStrategy.js';
import { luhn } from '../middlewares/errorHandle.js';

// strategy: uma classe por bandeira, todas com a mesma interface.
// pra adicionar outra bandeira é só criar a classe e colocar na lista do BandeiraResolver

export class VisaStrategy implements IBandeiraStrategy {
    readonly nome = 'VISA';
    reconhece(n: string) {
        return /^4/.test(n);
    }
    validarNumero(n: string) {
        return [13, 16, 19].includes(n.length) && luhn(n);
    }
}

export class MastercardStrategy implements IBandeiraStrategy {
    readonly nome = 'MASTERCARD';
    reconhece(n: string) {
        return /^(5[1-5]|2(2[2-9]|[3-6]|7[01]|720))/.test(n);
    }
    validarNumero(n: string) {
        return n.length === 16 && luhn(n);
    }
}

export class EloStrategy implements IBandeiraStrategy {
    readonly nome = 'ELO';
    reconhece(n: string) {
        return /^(4011|4312|4389|4514|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(n);
    }
    validarNumero(n: string) {
        return n.length === 16 && luhn(n);
    }
}

export class HipercardStrategy implements IBandeiraStrategy {
    readonly nome = 'HIPERCARD';
    reconhece(n: string) {
        return /^(606282|3841)/.test(n);
    }
    validarNumero(n: string) {
        return [13, 16, 19].includes(n.length) && luhn(n);
    }
}

// amex tem 15 dígitos
export class AmexStrategy implements IBandeiraStrategy {
    readonly nome = 'AMEX';
    reconhece(n: string) {
        return /^3[47]/.test(n);
    }
    validarNumero(n: string) {
        return n.length === 15 && luhn(n);
    }
}
