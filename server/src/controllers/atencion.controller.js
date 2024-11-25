import { Atencion } from "../model/model.atencion.js";
import { config } from "dotenv";
import { FichaPaciente } from "../model/model.ficha_paciente.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

config();

// Definir __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const getAtenciones = async (req, res) => {
  try {
    const atencionDB = await Atencion.find();
    return res.status(200).json(atencionDB);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener lista de Atenciones",
      error: error.message,
    });
  }
};

const getAtencionesByPaciente = async (req, res) => {
  const { id_paciente } = req.params;

  try {
    const atenciones = await Atencion.find({ id_paciente });
    if (!atenciones) {
      return res
        .status(404)
        .json({ message: "No se encontraron atenciones para este paciente" });
    }
    return res.status(200).json(atenciones);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las atenciones",
      error: error.message,
    });
  }
};

const createAtencion = async (req, res) => {
  const {
    id_paciente,
    fecha,
    hora,
    introduccion,
    datosAtencion,
    diagnosticoHipotesis,
    estadoDiagnostico,
    indicaciones,
  } = req.body;

  try {
    const paciente = await FichaPaciente.findById(id_paciente);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const imagenes = req.files ? req.files.map((file) => file.path) : [];

    const nuevaAtencion = new Atencion({
      id_paciente: paciente._id,
      nombre: paciente.nombre,
      apellidoUno: paciente.apellidoUno,
      apellidoDos: paciente.apellidoDos,
      fecha,
      hora,
      introduccion,
      datosAtencion,
      diagnosticoHipotesis,
      estadoDiagnostico,
      indicaciones,
      imagenes, // Add this line
    });

    const atencionDB = await nuevaAtencion.save();

    // Agregar la referencia de la nueva atención a la ficha del paciente
    paciente.atenciones.push(atencionDB._id);
    await paciente.save();

    return res.status(200).json(atencionDB);
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear Atencion",
      error: error.message,
    });
  }
};

const updateAtencion = async (req, res) => {
  try {
    const atencionDB = await Atencion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(atencionDB);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar la Atencion",
      error: error.message,
    });
  }
};

const deleteAtencion = async (req, res) => {
  try {
    await Atencion.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Atencion eliminada" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar Atencion",
      error: error.message,
    });
  }
};

export {
  getAtenciones,
  createAtencion,
  updateAtencion,
  deleteAtencion,
  getAtencionesByPaciente,
  upload, // Add this line
};
