import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import { Paciente } from "./model.paciente.js";

const pacienteSchema = new Schema(
  {
    id_paciente: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "Se debe incluir el ID del paciente"],
    },
    nombre: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "Se debe incluir el ID del paciente"],
    },

    nombreSocial: {
      type: String,
      minlength: 3, // Limitar a un mínimo de 3 caracteres
      maxlength: 100, // Limitar a un máximo de 100 caracteres
    },
    apellidoUno: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "se debe incluir el apellido"],
    },

    apellidoDos: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "Se debe incluir el apellido"],
    },

    email: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "Se debe incluir el email"],
      unique: true,
      minlength: 8, // Limitar a un mínimo de 6 caracteres
      maxlength: 100, // Limitar a un máximo de 100 caracteres
    },
    telefono: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "Se debe incluir el telefono"],
      unique: true,
      minlength: 6, // Limitar a un mínimo de 6 caracteres
      maxlength: 100, // Limitar a un máximo de 100 caracteres
    },
    run: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",

      unique: true,
      match: [
        /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}\-[0-9]{1}$/,
        "El rut debe tener el formato xx.xxx.xxx-x, con puntos y guión incluidos",
      ],
    },
    fecha_nacimiento: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "Se debe incluir la fecha"],
    },
    genero: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "se debe incluir un genero"],
    },
    estado_civil: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "se debe incluir un estado civil"],
    },
    prevision: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "se debe incluir una prevision"],
    },
    discapacidad: {
      type: Boolean,
    },
    accidenteRelevante: {
      type: String,
    },
    medicamentos: {
      type: String,
    },
    otrosPersonal: {
      /* Este campo permite agregar cualquier información adicional que no este considerada , si se repite en muchos casos se modifica el modelo */
      type: String,
    },
    educacion: {
      type: String,
      Selection: ["Basica", "Media", "Tecnica", "Universitaria", "Postgrado"],
    },
    modalidad: {
      type: String,
      Selection: ["Presencial", "Online", "Mixta"],
    },
    trabajando: {
      type: Boolean,
    },
    legalizado: {
      type: Boolean,
    },
    tipoDeTrabajo: {
      type: String,
      Selection: ["Independiente", "Dependiente", "Estudiante", "Jubilado"],
    },
    cantidadFamiliares: {
      type: Number,
    },
    comparteCama: {
      type: Boolean,
    },
    nivelEducacionPadre: {
      type: String,
      Selection: ["Basica", "Media", "Tecnica", "Universitaria", "Postgrado"],
    },
    nivelEducacionMadre: {
      type: String,
      Selection: ["Basica", "Media", "Tecnica", "Universitaria", "Postgrado"],
    },
    ocupacionPareja: {
      type: String,
    },
    ocupacionMadre: {
      type: String,
    },
    ocupacionPadre: {
      type: String,
    },
    comorbilidades: {
      type: String,
    },
    diagnosticoHipotesis: {
      type: String,
    },
    motidoConsulta: {
      type: String,
    },
    derivadoPor: {
      type: String,
    },
    derivadoHacia: {
      type: String,
    },

    password: {
      type: String,
      required: [true, "Se debe incluir una contraseña"],
      minlength: 8, // Limitar a un mínimo de 6 caracteres
      // Limitar a un máximo de 100 caracteres
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un mínimo de 8 caracteres, sin puntos ni guiones",
      ],
    },
    terapeutaAsignado: {
      type: Schema.Types.ObjectId,
      ref: "Terapeuta",
    },
  },
  { timestamps: true }
);

// Agregar campo virtual para confirmación de clave secreta
pacienteSchema
  .virtual("confirm_password")
  .get(function () {
    return this._confirmacionClaveSecreta;
  })
  .set(function (value) {
    this._confirmacionClaveSecreta = value;
  });

// Gancho de pre-validación para verificar si las claves secretas coinciden
pacienteSchema.pre("validate", function (next) {
  if (this.password !== this.confirm_password) {
    this.invalidate("confirm_password", "Las claves secretas deben coincidir");
  }
  next();
});

// Gancho de pre-guardado para hashear la clave secreta
pacienteSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Exportar el esquema
//export default mongoose.model('PerfilPaciente', pacienteSchema);
pacienteSchema.plugin(uniqueValidator, {
  message: "El {PATH} {VALUE} ya existe, por favor elija otro",
});
const Paciente = model("Paciente", pacienteSchema);
export { Paciente };
