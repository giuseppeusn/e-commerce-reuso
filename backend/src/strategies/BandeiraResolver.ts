import type { IBandeiraStrategy } from './IBandeiraStrategy.js';
import { EloStrategy, VisaStrategy } from './VisaStrategy.js';
import { HipercardStrategy } from './VisaStrategy.js';
import { AmexStrategy, MastercardStrategy } from './VisaStrategy.js';
import { ValidationError } from '../services/templates/errors/AppErrorCartao.js';


// Singleton: só existe uma lista de estratégias na aplicação inteira.
export class BandeiraResolver {
    private static instance: BandeiraResolver;


    private readonly strategies: IBandeiraStrategy[] = [
        new EloStrategy(),
        new HipercardStrategy(),
        new AmexStrategy(),
        new MastercardStrategy(),
        new VisaStrategy(),
    ];

    private constructor() { }

    public static getInstance(): BandeiraResolver {
        if (!BandeiraResolver.instance) {
            BandeiraResolver.instance = new BandeiraResolver();
        }
        return BandeiraResolver.instance;
    }

    public resolver(numero: string): IBandeiraStrategy {
        const strategy = this.strategies.find((s) => s.reconhece(numero));
        if (!strategy) throw new ValidationError('Bandeira não suportada.');
        return strategy;
    }
}