import mongoose, { Schema, Document } from 'mongoose';

export interface ICartao extends Document {
  nome: string;
  numero: string;
  vencimento: string;
  cvv: string;
  enderecoCobranca: mongoose.Types.ObjectId;
  usuario: mongoose.Types.ObjectId;
}

const CartaoSchema: Schema = new Schema({
  nome: { type: String, required: true },
  numero: { type: String, required: true },
  vencimento: { type: String, required: true },
  cvv: { type: String, required: true },
  enderecoCobranca: { type: Schema.Types.ObjectId, ref: 'Endereco', required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

export default mongoose.model<ICartao>('Cartao', CartaoSchema);
