import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const terapeutaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "Se debe incluir un nombre"],
    minlength: 3,
    maxlength: 100,
  },
  apellidoUno: {
    type: String,
    required: [true, "Se debe incluir un apellido"],
    minlength: 3,
    maxlength: 100,
  },
  apellidoDos: {
    type: String,
    required: [true, "Se debe incluir un apellido"],
    minlength: 3,
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, "Se debe incluir un email"],
    unique: true,
    minlength: 8,
    maxlength: 100,
  },
  telefono: {
    type: String,
    required: [true, "Se debe incluir un whatsapp"],
    unique: true,
    minlength: 6,
    maxlength: 100,
  },
  run: {
    type: String,
    required: [true, "Se debe incluir un run"],
    unique: true,
    match: [
      /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}\-[0-9]{1}$/,
      "El run debe tener el formato xx.xxx.xxx-x, donde x son números",
    ],
  },
  fecha_nacimiento: {
    type: Date,
    required: [true, "Se debe incluir una fecha de nacimiento"],
  },
  genero: {
    type: String,
    enum: ["Masculino", "Femenino", "Otro"],
    required: [true, "Se debe incluir un genero"],
  },
  validado: {
    type: Boolean,
    default: true,
  },
});

terapeutaSchema.plugin(uniqueValidator, {
  message: "Error, esperaba {PATH} único.",
});

const Terapeuta = model("Terapeuta", terapeutaSchema);

export { Terapeuta };
