import { Atencion } from "../model/model.atencion";
import { config } from "dotenv";

config();

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

const getAtencionID = async (req, res) => {
  try {
    const atencionDB = await Atencion.findOne({ _id: req.params.id });
    return res.status(200).json(atencionDB);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Id incorrecto o no existe",
      error: error.message,
    });
  }
};

const createAtencion = async (req, res) => {
  const opciones = {
    new: true,
    runValidators: true,
  };

  try {
    const atencionDB = await Atencion.create(req.body);
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
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json(atencionDB);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar Atencion",
      error: error.message,
    });
  }
};

const deleteAtencion = async (req, res) => {
  try {
    await Atencion.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: "Atencion eliminada",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar Atencion",
      error: error.message,
    });
  }
};

export {
  getAtenciones,
  getAtencionID,
  createAtencion,
  updateAtencion,
  deleteAtencion,
};
