export interface Endereco {
  _id?: string;
  id?: string;
  nome: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  usuario?: string;
  favorito?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type EnderecoInput = Omit<Endereco, '_id' | 'id' | 'createdAt' | 'updatedAt'>;
