import { Terapeuta } from "../model/model.terapeuta.js";
import { config } from "dotenv";

config();

const getTerapeutas = async (req, res) => {
  try {
    const terapeutaDB = await Terapeuta.find();
    return res.status(200).json(terapeutaDB);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener lista de Terapeutas",
      error: error.message,
    });
  }
};

const getTerapeutaID = async (req, res) => {
  try {
    const terapeutaDB = await Terapeuta.findOne({ _id: req.params.id });
    return res.status(200).json(terapeutaDB);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Id incorrecto o no existe",
      error: error.message,
    });
  }
};

const createTerapeuta = async (req, res) => {
  const opciones = {
    new: true,
    runValidators: true,
  };

  try {
    const terapeuta = new Terapeuta(req.body);
    const terapeutaDB = await terapeuta.save();
    return res.status(200).json(terapeutaDB);
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear Terapeuta",
      error: error.message,
    });
  }
};

const updateTerapeuta = async (req, res) => {
  try {
    const terapeutaDB = await Terapeuta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(terapeutaDB);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar Terapeuta",
      error: error.message,
    });
  }
};

const deleteTerapeuta = async (req, res) => {
  try {
    await Terapeuta.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Terapeuta eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar Terapeuta",
      error: error.message,
    });
  }
};

export {
  getTerapeutas,
  getTerapeutaID,
  createTerapeuta,
  updateTerapeuta,
  deleteTerapeuta,
};
