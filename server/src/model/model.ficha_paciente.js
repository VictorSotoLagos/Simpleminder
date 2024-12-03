import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import crypto from "crypto";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "miclaveultrasecreta1234567890abc"
const ALGORITHM = "aes-256-cbc"; // Algoritmo de encriptación

const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // Vector de inicialización
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":::" + encrypted; // Guardar IV junto al texto encriptado
}

const decrypt = (text) => {
  if (!text || !text.includes(":::")) {
    return text; // Si no tiene el formato esperado, devolver el texto tal cual (no encriptado)
  }
  try {
    const [iv, encryptedText] = text.split(":::");

    if (iv.length !== 32) {
      throw new Error("Invalid initialization vector");
    }
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Error desencriptando texto:", error.message);
    return text; // En caso de error, devolver el texto tal cual
  }
}


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
    },
    apellidoUno: {
      type: String,
      required: [true, "Se debe incluir un apellido"],
      minlength: 3, // Limitar a un mínimo de 3 caracteres
      maxlength: 100, // Limitar a un máximo de 100 caracteres
    },
    apellidoDos: {
      type: String,
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
       // /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}\-[0-9]{1}$/,
       /^\d{1,2}(\.\d{3}){2}-[\dkK]$/,
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
    generoOtro: {
      type: String,
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
    objetivos: {
      type: String,
    },
  },
  { timestamps: true }
);



fichaPacienteSchema.pre("save", function (next) {
  const excludeFields = ["_id", "__v", "createdAt", "updatedAt", "fecha_nacimiento", "atenciones", "terapeutaAsignado", "nombre", "apellidoUno" ]; // Campos que no quieres encriptar

  for (const key of Object.keys(this.toObject())) {
    if (
      !excludeFields.includes(key) && // No está en la lista de exclusión
      this[key] !== null && this[key] !== undefined // Tiene un valor (no es null o undefined)
    ) {
      // Verificar y encriptar según el tipo
      if (typeof this[key] === "string") {
        this[key] = encrypt(this[key]); // Encriptar cadenas
      } else if (typeof this[key] === "number") {
        this[key] = encrypt(this[key].toString()); // Convertir números a cadena antes de encriptar
      } else if (this[key] instanceof Date) {
        this[key] = encrypt(this[key].toISOString()); // Convertir fechas a ISO string antes de encriptar
      }
    }
  }

  next();
});

fichaPacienteSchema.methods.toJSON = function () {
  const obj = this.toObject();
  const excludeFields = ["_id", "__v", "createdAt", "updatedAt", "fecha_nacimiento", "atenciones", "terapeutaAsignado", "nombre", "apellidoUno" ];
  
  for (const key of Object.keys(obj)) {
    if (
      typeof obj[key] === "string" &&
      obj[key].includes(":::") && // Asegurarse de que tiene el formato esperado para desencriptar
      !excludeFields.includes(key) // Asegurarse de no procesar los campos excluidos
    ) {
      try {
        // Intentamos desencriptar el valor
        const decryptedValue = decrypt(obj[key]);

        // Verificar si el valor desencriptado es un número o fecha
        if (!isNaN(decryptedValue)) {
          obj[key] = parseFloat(decryptedValue); // Convertir a número si aplica
        } else if (new Date(decryptedValue).toString() !== "Invalid Date") {
          obj[key] = new Date(decryptedValue); // Convertir a fecha si aplica
        } else {
          obj[key] = decryptedValue; // Mantener como string si no aplica
        }
      } catch (error) {
        // Loguear el error de desencriptación y dejar el valor original
        console.error(`Error desencriptando el campo '${key}':`, error.message);
        // Mantener el valor original si ocurre un error
        obj[key] = obj[key];
      }
    }
  }

  return obj;
};






// Exportar el esquema
//export default mongoose.model('PerfilPaciente', fichaPacienteSchema);
fichaPacienteSchema.plugin(uniqueValidator, {
  message: "El {PATH} {VALUE} ya existe, por favor elija otro",
});
const FichaPaciente = model("FichaPaciente", fichaPacienteSchema);

export { FichaPaciente };
