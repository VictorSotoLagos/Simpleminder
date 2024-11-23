import mongoose, { model, Schema } from "mongoose";

const atencionSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "Se debe incluir el nombre del paciente"],
  },
  apellidoUno: {
    type: String,
    required: [true, "Se debe incluir el primer apellido del paciente"],
  },
  apellidoDos: {
    type: String,
    required: [true, "Se debe incluir el segundo apellido del paciente"],
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
    enum: ["Confirmado", "Hipotesis", "De alta", "Cierre de caso"],
  },
  estadoDiagnostico: {
    type: String,
  },
  indicaciones: {
    type: String,
  },
});

const Atencion = model("Atencion", atencionSchema);

export { Atencion };
