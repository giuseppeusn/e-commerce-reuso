import mongoose, { Schema, Document } from 'mongoose';

export interface IProduto extends Document {
  nome: string;
  descricao: string;
  preco: number;
  fotos: string[];
  statusAprovacao: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
  notaMedia: number;
  fornecedorId: mongoose.Types.ObjectId;
}

const ProdutoSchema: Schema = new Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  fotos: [{ type: String }],
  statusAprovacao: { 
    type: String, 
    required: true,
    enum: ['PENDENTE', 'APROVADO', 'REJEITADO'],
    default: 'PENDENTE'
  },
  notaMedia: { type: Number, default: 0.0 },
  fornecedorId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

export default mongoose.model<IProduto>('Produto', ProdutoSchema);
