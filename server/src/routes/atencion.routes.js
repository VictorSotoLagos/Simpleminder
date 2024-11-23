import { Router } from "express";
import {
  getAtenciones,
  createAtencion,
  updateAtencion,
  deleteAtencion,
  getAtencionesByPaciente,
} from "../controllers/atencion.controller.js";

const router = Router();

router.post("/add", createAtencion); // Ruta para registrar una atencion
router.get("/", getAtenciones); // Ruta para obtener todas las atenciones
router.put("/:id", updateAtencion); // Ruta para actualizar una atencion por ID
router.delete("/:id", deleteAtencion);
router.get("/paciente/:id_paciente", getAtencionesByPaciente);

export default router;
