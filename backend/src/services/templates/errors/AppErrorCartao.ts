

//strategy pattern
export class AppErrorCartao extends Error {
    constructor(message: string, public readonly status: number) {
        super(message);
    }
}
export class ValidationError extends AppErrorCartao {
    constructor(message: string) {
        super(message, 400);
    }
}
export class NotFoundError extends AppErrorCartao {
    constructor(message = 'Cartão não encontrado.') {
        super(message, 404);
    }
}