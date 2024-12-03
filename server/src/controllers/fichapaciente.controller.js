import { FichaPaciente } from "../model/model.ficha_paciente.js";
import {Terapeuta} from "../model/model.terapeuta.js"
import { config } from "dotenv";
import { encrypt, decrypt } from "../utils/encryptionUtils.js";

config();

const getFichaPacientes = async (req, res) => {
  try {
    const fichapacienteBD = await FichaPaciente.find();
    return res.status(200).json(fichapacienteBD);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener lista de fichas clínicas de pacientes",
      error: error.message,
    });
  }
};

const getFichaPacienteID = async (req, res) => {
  try {
    const fichapacienteBD = await FichaPaciente.findOne({
      _id: req.params.id,
    }).populate("terapeutaAsignado", "nombre apellidoUno apellidoDos");
    return res.status(200).json(fichapacienteBD);
  } catch (error) {
    ////console.log(error);
    return res.status(500).json({
      message: "Id incorrecto o no existe",
      error: error.message,
    });
  }
};


const createFichaPaciente = async (req, res) => {
  try {
    const { terapeutaAsignado, ...fichaData } = req.body;

    // Crear nueva ficha con los datos restantes
    const fichaClinicaPaciente = new FichaPaciente(fichaData);

    // Validar y asignar terapeuta si se proporciona
    if (terapeutaAsignado) {
      const terapeuta = await Terapeuta.findById(terapeutaAsignado);
      if (!terapeuta) {
        return res.status(404).json({
          message: "El terapeuta asignado no existe.",
        });
      }
      fichaClinicaPaciente.terapeutaAsignado = terapeuta._id;
    }

    // Guardar la ficha en la base de datos
    const fichaPacienteDB = await fichaClinicaPaciente.save();
    return res.status(201).json({
      message: "Ficha creada exitosamente.",
      ficha: fichaPacienteDB,
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear ficha de paciente:", error.message);
    return res.status(500).json({
      message: "Error al crear ficha de paciente.",
      error: error.message,
    });
  }
};


/*

// Configuración de clave secreta y vector de inicialización (IV)
const secretKey = crypto.createHash('sha256').update(process.env.SECRET_KEY).digest('base64').substr(0, 32);
const iv = crypto.randomBytes(16); // Generar un IV único por operación

// Función para encriptar
const encryptData = (data) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  return { encryptedData: encrypted, iv: iv.toString("hex") };
};

const createFichaPaciente = async (req, res) => {
  try {
    const { terapeutaAsignado, ...fichaData } = req.body;

    // Encriptar los datos sensibles de la ficha
    const { encryptedData, iv: ivHex } = encryptData(fichaData);
    ////console.log("Encrypted data:", encryptedData);
    // Crear nueva ficha con los datos encriptados
    const fichaClinicaPaciente = new FichaPaciente({
      dataEncriptada: encryptedData,
      iv: ivHex, // Guardar el IV para poder desencriptar después
      terapeutaAsignado: terapeutaAsignado || null,
    });

    // Validar y asignar terapeuta si se proporciona
    if (terapeutaAsignado) {
      const terapeuta = await Terapeuta.findById(terapeutaAsignado);
      if (!terapeuta) {
        return res.status(404).json({
          message: "El terapeuta asignado no existe.",
        });
      }
      fichaClinicaPaciente.terapeutaAsignado = terapeuta._id;
    }

    // Guardar en la base de datos
    await fichaClinicaPaciente.save();

    res.status(201).json({
      message: "Ficha clínica creada exitosamente.",
      fichaClinica: fichaClinicaPaciente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Hubo un error al crear la ficha clínica.",
    });
  }
};*/

const updateFichaPaciente = async (req, res) => {
  try {
    const fichaPacienteDB = await FichaPaciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(fichaPacienteDB);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar la Ficha Paciente",
      error: error.message,
    });
  }
};

const patchFichaPaciente = async (req, res) => {

  const { id } = req.params;
  const updateData = { ...req.body };
  const excludeFields = ["_id", "__v", "createdAt", "updatedAt", "fecha_nacimiento", "atenciones", "terapeutaAsignado", "nombre", "apellidoUno" ]; // Campos que no quieres encriptar
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



  try {
    const fichaPacienteDB = await FichaPaciente.findByIdAndUpdate(
      req.params.id,
      { $set: encryptedData }, // Solo actualiza los campos enviados
      { new: true }
    );
    return res.status(200).json(fichaPacienteDB);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar la Ficha Paciente",
      error: error.message,
    });
  }
};


const deleteFichaPaciente = async (req, res) => {
  try {
    await FichaPaciente.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "FichaPaciente eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar FichaPaciente",
      error: error.message,
    });
  }
};

export {
  getFichaPacientes,
  getFichaPacienteID,
  createFichaPaciente,
  updateFichaPaciente,
  deleteFichaPaciente,
  patchFichaPaciente
};
