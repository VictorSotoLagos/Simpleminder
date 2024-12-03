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
router.put("/:id", updateTerapeuta);
router.patch("/:id", patchTerapeuta);
router.get("/:id", getTerapeutaID);
router.delete("/:id", deleteTerapeuta);

export default router;
