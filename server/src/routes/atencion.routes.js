import { Router } from "express";
import {
  getAtenciones,
  getAtencionID,
  createAtencion,
  updateAtencion,
  deleteAtencion,
} from "../controllers/atencion.controller.js";

const router = Router();

router.post("/add", createAtencion); // Ruta para registrar una atencion
router.get("/", getAtenciones); // Ruta para obtener todas las atenciones
router.put("/:id", updateAtencion);
router.get("/:id", getAtencionID); // Ruta para obtener una atencion por ID                                                        // Ruta para actualizar una atencion por ID
router.delete("/:id", deleteAtencion);

export default router;
