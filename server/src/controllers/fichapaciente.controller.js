import { FichaPaciente } from "../model/model.ficha_paciente.js";
import {Terapeuta} from "../model/model.terapeuta.js"
import { config } from "dotenv";

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
    console.log(error);
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
};
