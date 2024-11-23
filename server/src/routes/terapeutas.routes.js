import { Router } from "express";
import {
  getTerapeutas,
  getTerapeutaID,
  createTerapeuta,
  updateTerapeuta,
  patchTerapeuta,
  deleteTerapeuta,
} from "../controllers/terapeuta.controller.js";
import autenticarJWT from "../middlewares/jwt.middleware.js";

const router = Router();

router.post("/add", createTerapeuta);
router.get("/", getTerapeutas);
router.put("/:id", autenticarJWT, updateTerapeuta);
router.patch("/:id", autenticarJWT, patchTerapeuta);
router.get("/:id", autenticarJWT, getTerapeutaID);
router.delete("/:id", autenticarJWT, deleteTerapeuta);

export default router;
