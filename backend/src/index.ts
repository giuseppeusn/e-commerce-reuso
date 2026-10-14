import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import enderecoRoutes from "./routes/enderecoRoutes.js";
import usuarioRoutes from "./routes/UsuarioRoutes.js";
import produtoRoutes from "./routes/ProdutoRoutes.js";

dotenv.config();

connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.use("/api/enderecos", enderecoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/produtos", produtoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});
