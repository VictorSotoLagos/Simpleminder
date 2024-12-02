import mongoose, { model, Schema } from "mongoose";
import crypto from "crypto";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "miclaveultrasecreta1234567890abc"
const ALGORITHM = "aes-256-cbc"; // Algoritmo de encriptación

// Funciones auxiliares para encriptar y desencriptar
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
    console.log("iv es:", iv);
    console.log("iv.length es", iv.length);
    console.log("encryptedText es:", encryptedText);
    // Verificar si el IV tiene longitud correcta (16 bytes = 32 caracteres hexadecimales)
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


const atencionSchema = new Schema({
  id_paciente: {
    type: Schema.Types.ObjectId,
    ref: "Paciente",
  },
  id_terapeuta: {
    type: Schema.Types.ObjectId,
    ref: "Terapeuta",
  },
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
  imagenes: {
    type: [String],
  },
});

// Middleware para encriptar antes de guardar
/*
atencionSchema.pre("save", function (next) {
  if (this.introduccion) this.introduccion = encrypt(this.introduccion);
  if (this.datosAtencion) this.datosAtencion = encrypt(this.datosAtencion);
  if (this.indicaciones) this.indicaciones = encrypt(this.indicaciones);
  next();
});
*/

atencionSchema.pre("save", function (next) {
  const excludeFields = ["_id", "__v", "createdAt", "id_paciente", "id_terapeuta", "updatedAt", "nombre", "apellidoUno", "imagenes", "fecha", "hora"]; // Campos que no quieres encriptar

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

atencionSchema.methods.toJSON = function () {
  const obj = this.toObject();

  const excludeFields = ["_id", "__v", "createdAt", "id_paciente", "id_terapeuta", "updatedAt", "nombre", "apellidoUno", "imagenes", "fecha", "hora"]; // Campos excluidos de la desencriptación

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

// Método para desencriptar datos al acceder
/*
atencionSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.introduccion) obj.introduccion = decrypt(obj.introduccion);
  if (obj.datosAtencion) obj.datosAtencion = decrypt(obj.datosAtencion);
  if (obj.indicaciones) obj.indicaciones = decrypt(obj.indicaciones);
  return obj;
};
*/


const Atencion = model("Atencion", atencionSchema);

export { Atencion };
