import mongoose, { Schema, Document } from "mongoose";

export interface IUsuarioFeatureFlags {
  visualizacao3D?: boolean;
  [key: string]: any;
}

export interface IUsuario extends Document {
  nome: string;
  email: string;
  cpf: string;
  senhaHash: string;
  tipoConta: "CLIENTE" | "FORNECEDOR" | "ADMINISTRADOR";
  featureFlags?: IUsuarioFeatureFlags;
}

const UsuarioSchema: Schema = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
    senhaHash: { type: String, required: true },
    tipoConta: {
      type: String,
      required: true,
      enum: ["CLIENTE", "FORNECEDOR", "ADMINISTRADOR"],
      default: "CLIENTE",
    },
    featureFlags: {
      visualizacao3D: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUsuario>("Usuario", UsuarioSchema);

