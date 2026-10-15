// strategy: o que toda bandeira precisa saber fazer
export interface IBandeiraStrategy {
    readonly nome: string;
    reconhece(numero: string): boolean;     // o número é dessa bandeira?
    validarNumero(numero: string): boolean; // o número é válido?
}
