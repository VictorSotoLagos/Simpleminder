import { Router } from "express";
import {
  getAtenciones,
  createAtencion,
  updateAtencion,
  deleteAtencion,
  getAtencionesByPaciente,
  getAtencionByPacienteID,
  upload, // Add this line
} from "../controllers/atencion.controller.js";

const router = Router();

router.post("/add", upload.array("imagenes", 10), createAtencion); // Permitir hasta 10 imágenes
router.get("/", getAtenciones); // Ruta para obtener todas las atenciones
router.get("/:id", getAtencionByPacienteID);
router.put("/:id", updateAtencion); // Ruta para actualizar una atencion por ID
router.delete("/:id", deleteAtencion);
router.get("/paciente/:id_paciente", getAtencionesByPaciente);

export default router;
