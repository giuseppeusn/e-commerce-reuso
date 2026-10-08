import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuario extends Document {
  nome: string;
  email: string;
  senhaHash: string;
  tipoConta: 'CLIENTE' | 'FORNECEDOR' | 'ADMINISTRADOR';
}

const UsuarioSchema: Schema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senhaHash: { type: String, required: true },
  tipoConta: { 
    type: String, 
    required: true,
    enum: ['CLIENTE', 'FORNECEDOR', 'ADMINISTRADOR'],
    default: 'CLIENTE'
  }
}, { timestamps: true });

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);
