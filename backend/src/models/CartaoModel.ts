import mongoose, { Schema, Document } from 'mongoose';

export interface ICartao extends Document {
  nome: string;
  numero: string;
  banco: string;
  agencia: string;
  conta: string;
  usuario: mongoose.Types.ObjectId;
}

// como o cartão fica salvo no mongo (usuario = id do dono)
const CartaoSchema: Schema = new Schema({
  nome: { type: String, required: true },
  numero: { type: String, required: true },
  banco: { type: String, required: true },
  agencia: { type: String, required: true },
  conta: { type: String, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

export default mongoose.model<ICartao>('Cartao', CartaoSchema);
