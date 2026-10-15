import express from "express";
import usuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

router.post("/register", usuarioController.registrar);
router.post("/login", usuarioController.login);
router.get("/:id", usuarioController.obterPorId);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.excluir);

export default router;
