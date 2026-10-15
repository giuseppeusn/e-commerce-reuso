import type { IBandeiraStrategy } from './IBandeiraStrategy.js';
import { EloStrategy, VisaStrategy } from './VisaStrategy.js';
import { HipercardStrategy } from './VisaStrategy.js';
import { AmexStrategy, MastercardStrategy } from './VisaStrategy.js';
import { ValidationError } from '../services/templates/errors/AppErrorCartao.js';


// singleton: só existe uma lista de estratégias na aplicação inteira.
// também é ele que escolhe qual strategy (bandeira) usar pra cada número
export class BandeiraResolver {
    private static instance: BandeiraResolver;


    // a ordem importa: elo vem antes do visa porque alguns elo começam com 4
    private readonly strategies: IBandeiraStrategy[] = [
        new EloStrategy(),
        new HipercardStrategy(),
        new AmexStrategy(),
        new MastercardStrategy(),
        new VisaStrategy(),
    ];

    private constructor() { }

    // sempre devolve a mesma instância
    public static getInstance(): BandeiraResolver {
        if (!BandeiraResolver.instance) {
            BandeiraResolver.instance = new BandeiraResolver();
        }
        return BandeiraResolver.instance;
    }

    // acha a primeira bandeira que reconhece o número
    public resolver(numero: string): IBandeiraStrategy {
        const strategy = this.strategies.find((s) => s.reconhece(numero));
        if (!strategy) throw new ValidationError('Bandeira não suportada.');
        return strategy;
    }
}
