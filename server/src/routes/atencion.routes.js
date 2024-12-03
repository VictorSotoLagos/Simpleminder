import express from "express";
import multer from "multer";
import path from "path";
import slugify from "slugify";
import {
  getAtenciones,
  createAtencion,
  updateAtencion,
  deleteAtencion,
  getAtencionesByPaciente,
  getAtencionByPacienteID,
} from "../controllers/atencion.controller.js";

const router = express.Router();

// Configuración de almacenamiento para multer
//slugify funciona para eliminar caracteres raros para la base datos y puedaan ser utilizados sin problemaa
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const safeName = slugify(basename, {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
    });
    const filename = `${Date.now()}-${safeName}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Rutas de atención
router.post("/add", upload.array("imagenes", 10), createAtencion); // Permitir hasta 10 imágenes
router.put("/:id", upload.array("imagenes"), updateAtencion);

router.get("/", getAtenciones);
router.get("/:id", getAtencionByPacienteID);
router.delete("/:id", deleteAtencion);
router.get("/paciente/:id_paciente", getAtencionesByPaciente);

export default router;
