import { Atencion } from "../model/model.atencion.js";
import { config } from "dotenv";
import { FichaPaciente } from "../model/model.ficha_paciente.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { encrypt, decrypt } from "../utils/encryptionUtils.js";

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

const getAtencionByPacienteID = async (req, res) => {
  try {
    const atencionDB = await Atencion.findOne({ _id: req.params.id });
    return res.status(200).json(atencionDB);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Id de la atención incorrecto o no existe",
      error: error.message,
    });
  }
};

const createAtencion = async (req, res) => {
  const {
    id_paciente,
    id_terapeuta,
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
      id_terapeuta,
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


//ORIGINAL: PENULTIMA VERSION DE PEDRO

const updateAtencion = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    console.log("Update Data:", updateData);
    // Parsear imágenes existentes
    let existingImages = [];
    try {
      existingImages = JSON.parse(req.body.existingImages || "[]");
    } catch (e) {
      console.error("Error al parsear imágenes existentes:", e);
    }

    // Obtener rutas de nuevas imágenes
    const newImages = req.files ? req.files.map((file) => file.filename) : [];

    // Combinar imágenes
    const imagenes = [...existingImages, ...newImages];

    // Eliminar campos que no queremos actualizar directamente
    delete updateData.existingImages;
    delete updateData.imagenes;


    const excludeFields = ["_id", "__v", "createdAt", "id_paciente", "id_terapeuta", "updatedAt", "nombre", "apellidoUno", "imagenes", "fecha", "hora"];
    const encryptedData = {};

    // Iterar sobre las claves de updateData y encriptar los valores
    for (const key in updateData) {
      if (updateData.hasOwnProperty(key) && !excludeFields.includes(key)) {
        // Encriptar el valor solo si es una cadena o número
        if (typeof updateData[key] === "string" || typeof updateData[key] === "number") {
          encryptedData[key] = encrypt(updateData[key].toString()); // Encriptar y convertir a string si es necesario
        } else {
          encryptedData[key] = updateData[key]; // Si no es una cadena ni un número, lo dejamos tal cual
        }
      } else {
        // Si el campo está en la lista de exclusión, lo dejamos tal cual
        encryptedData[key] = updateData[key];
      }
    }

    console.log("Encrypted Data:", encryptedData);



    const atencionActualizada = await Atencion.findByIdAndUpdate(
      id,
      {
        ...encryptedData,
        imagenes,
      },
      { new: true }
    );

    if (!atencionActualizada) {
      return res.status(404).json({
        message: "Atención no encontrada",
      });
    }

    return res.status(200).json(atencionActualizada);
  } catch (error) {
    console.error("Error en updateAtencion:", error);
    return res.status(500).json({
      message: "Error al actualizar la atención",
      error: error.message,
    });
  }
};



//Versión integra encruptacion en actualizacion

/*
const updateAtencion = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Parsear imágenes existentes
    let existingImages = [];
    try {
      existingImages = JSON.parse(req.body.existingImages || "[]");
    } catch (e) {
      console.error("Error al parsear imágenes existentes:", e);
    }

    // Obtener rutas de nuevas imágenes subidas
    const newImages = req.files ? req.files.map((file) => file.filename) : [];

    // Combinar imágenes (nuevas y existentes)
    const imagenes = [...existingImages, ...newImages];

    // Encriptar campos sensibles antes de actualizar
    if (updateData.introduccion) {
      updateData.introduccion = encrypt(updateData.introduccion);
    }
    if (updateData.datosAtencion) {
      updateData.datosAtencion = encrypt(updateData.datosAtencion);
    }
    if (updateData.indicaciones) {
      updateData.indicaciones = encrypt(updateData.indicaciones);
    }

    // Eliminar campos no relevantes de los datos a actualizar
    delete updateData.existingImages;
    delete updateData.imagenes;

    // Actualizar la atención en la base de datos
    const atencionActualizada = await Atencion.findByIdAndUpdate(
      id,
      {
        ...updateData,
        imagenes, // Guardar la combinación de imágenes
      },
      { new: true } // Retornar la atención actualizada
    );

    if (!atencionActualizada) {
      return res.status(404).json({
        message: "Atención no encontrada",
      });
    }

    // Respuesta exitosa
    return res.status(200).json(atencionActualizada);
  } catch (error) {
    console.error("Error en updateAtencion:", error);
    return res.status(500).json({
      message: "Error al actualizar la atención",
      error: error.message,
    });
  }
};
*/

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
  getAtencionByPacienteID,
  createAtencion,
  updateAtencion,
  deleteAtencion,
  getAtencionesByPaciente,
  upload, // Add this line
};
