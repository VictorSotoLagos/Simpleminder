import { model, Schema } from "mongoose";
import { fichaPaciente } from "./model.ficha_paciente.js";

const atencionSchema = new Schema({
  id_paciente: {
    type: Schema.Types.ObjectId,
    ref: "fichaPaciente",
    required: [true, "Se debe incluir el ID del paciente"],
  },
  nombre: {
    type: Schema.Types.ObjectId,
    ref: "fichaPaciente",
    required: [true, "Se debe incluir el ID del paciente"],
  },
  apellidoUno: {
    type: Schema.Types.ObjectId,
    ref: "fichaPaciente",
    required: [true, "Se debe incluir el ID del paciente"],
  },
  apellidoDos: {
    type: Schema.Types.ObjectId,
    ref: "fichaPaciente",
    required: [true, "Se debe incluir el ID del paciente"],
  },

  fecha: {
    type: Date,
    required: [true, "Se debe incluir una fecha"],
  },
  hora: {
    type: String,
    required: [true, "Se debe incluir una hora"],
  },

  introduccion: {
    type: String,
  },
  datosAtencion: {
    type: String,
  },
  diagnosticoHipotesis: {
    type: String,
    Selection: ["Confirmado", "Hipotesis", "De alta", "Cierre de caso"],
  },
  estadoDiagnostico: {
    type: String,
  },
  indicaciones: {
    type: String,
  },
});

export const Atencion = model("Atencion", atencionSchema);
