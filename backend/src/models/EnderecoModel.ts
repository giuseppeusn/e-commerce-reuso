import mongoose, { Schema, Document } from 'mongoose';

export interface IEndereco extends Document {
  nome: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  usuario: mongoose.Types.ObjectId;
}

const EnderecoSchema: Schema = new Schema({
  nome: { type: String, required: true },
  logradouro: { type: String, required: true },
  numero: { type: String, required: true },
  complemento: { type: String },
  cep: { type: String, required: true },
  estado: { type: String, required: true },
  cidade: { type: String, required: true },
  bairro: { type: String, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

export default mongoose.model<IEndereco>('Endereco', EnderecoSchema);
