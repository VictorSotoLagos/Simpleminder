import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";

const fichaPacienteSchema = new Schema(
  {
    id_paciente: {
      type: String,
    },
    nombre: {
      type: String,
      required: [true, "Se debe incluir un nombre"],
      minlength: 3, // Limitar a un mínimo de 3 caracteres
      maxlength: 100, // Limitar a un máximo de 100 caracteres
    },
    nombreSocial: {
      type: String,
      minlength: 3,  //Limitar a un mínimo de 3 caracteres
      maxlength: 100, // Limitar a un máximo de 100 caracteres
    },
    apellidoUno: {
      type: String,
      required: [true, "Se debe incluir un apellido"],
      minlength: 3, // Limitar a un mínimo de 3 caracteres
      maxlength: 100, // Limitar a un máximo de 100 caracteres
    },
    apellidoDos: {
      type: String,
      minlength: 3, // Limitar a un mínimo de 3 caracteres
      maxlength: 100, // Limitar a un máximo de 100 caracteres
    },
    email: {
      type: String,
      required: [true, "Se debe incluir un email"],
      unique: true,
      minlength: 8, // Limitar a un mínimo de 6 caracteres
      maxlength: 100, // Limitar a un máximo de 100 caracteres
    },
    telefono: {
      type: String,
      required: [true, "Se debe incluir un teléfono"],
      unique: true,
      minlength: 6, // Limitar a un mínimo de 6 caracteres
      maxlength: 100, // Limitar a un máximo de 100 caracteres
    },
    run: {
      type: String,
      required: [true, "Se debe incluir un rut"],
      unique: true,
      match: [
        /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}\-[0-9]{1}$/,
        "El rut debe tener el formato xx.xxx.xxx-x, con puntos y guión incluidos",
      ],
    },
    fecha_nacimiento: {
      type: Date,
      required: [true, "Se debe incluir una fecha de nacimiento"],
    },
    genero: {
      type: String,
      enum: ["Masculino", "Femenino", "Otro"],
      default: "Otro",
      required: [true, "Se debe incluir un genero"],
    },
    estado_civil: {
      type: String,
      enum: [
        "Soltero(a)",
        "Casado(a)",
        "Divorciado(a)",
        "Viudo(a)",
        "Separado(a)",
        "Otro",
      ],
      required: [true, "Se debe incluir un estado civil"],
      default: "Otro",
    },
    prevision: {
      type: String,
      enum: [
        "Fonasa",
        "Banmédica",
        "Colmena",
        "Consalud",
        "Cruz Blanca",
        "Nueva Masvida",
        "Vida Tres",
      ],
      required: [true, "Se debe incluir una isapre o fonasa"],
      default: "Fonasa",
    },
    discapacidad: {
      type: String,
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
      type: String,
      Selection: ["Sin información", "Si", "No"],
    },
    legalizado: {
      type: String,
      Selection: ["Sin información", "Si", "No"],
    },
    tipoDeTrabajo: {
      type: String,
      Selection: ["Independiente", "Dependiente", "Estudiante", "Jubilado"],
    },
    cantidadFamiliares: {
      type: Number,
    },
    comparteCama: {
      type: String,
      Selection: ["Sin información", "Si", "No"],
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
    motivoConsulta: {
      type: String,
    },
    derivadoPor: {
      type: String,
    },
    derivadoHacia: {
      type: String,
    },
    terapeutaAsignado: {
      type: Schema.Types.ObjectId,
      ref: "Terapeuta",
    },
    atenciones: [
      {
        type: Schema.Types.ObjectId,
        ref: "Atencion",
      },
    ],
  },
  { timestamps: true }
);

// Agregar campo virtual para confirmación de clave secreta
fichaPacienteSchema
  .virtual("confirm_password")
  .get(function () {
    return this._confirmacionClaveSecreta;
  })
  .set(function (value) {
    this._confirmacionClaveSecreta = value;
  });

// Gancho de pre-validación para verificar si las claves secretas coinciden
fichaPacienteSchema.pre("validate", function (next) {
  if (this.password !== this.confirm_password) {
    this.invalidate("confirm_password", "Las claves secretas deben coincidir");
  }
  next();
});

// Gancho de pre-guardado para hashear la clave secreta
fichaPacienteSchema.pre("save", async function (next) {
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
//export default mongoose.model('PerfilPaciente', fichaPacienteSchema);
fichaPacienteSchema.plugin(uniqueValidator, {
  message: "El {PATH} {VALUE} ya existe, por favor elija otro",
});
const FichaPaciente = model("FichaPaciente", fichaPacienteSchema);

export { FichaPaciente };
