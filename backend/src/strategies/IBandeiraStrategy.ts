export interface IBandeiraStrategy {
    readonly nome: string;
    reconhece(numero: string): boolean;
    validarNumero(numero: string): boolean;
}