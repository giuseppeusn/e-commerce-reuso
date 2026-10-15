export interface CriarCartaoDTO {
    nome: string;
    numero: string;
    banco: string;
    agencia: string;
    conta: string;
    usuario: string;
}

export interface CartaoSalvo {
    id: string;
    nome: string;
    numero: string;
    banco: string;
    agencia: string;
    conta: string;
    usuario: string;
}