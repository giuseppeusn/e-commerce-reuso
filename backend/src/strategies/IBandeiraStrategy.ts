export interface IBandeiraStrategy {
    readonly nome: string;
    reconhece(numero: string): boolean;
    validarNumero(numero: string): boolean;
<<<<<<< HEAD
    validarCvv(cvv: string): boolean;
=======
>>>>>>> bfb7236ab62facf38a84eafe0ae8f6dccd31d008
}