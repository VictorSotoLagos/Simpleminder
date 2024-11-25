import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";

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
  tipo_usuario: {
    type: String,
    enum: ["Terapeuta", "Administrador"],
    default: "Terapeuta",
  },
  plan: {
    type: String,
    enum: ["Gratis", "Pagado", "Premium"],
    default: "Gratis",
  },
  promocion: {
    type: String,
    default: "Sin Promocion",
  },

  /*
  pacientes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Paciente", // Asegúrate de que el nombre coincida con el modelo de pacientes
    }
  ],
  */
 pacientes: [
  {
    type: String,
  }
 ],
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
  tipo_usuario: {
    type: String,
    enum: ["Terapeuta", "Administrador"],
    default: "Terapeuta",
  },
},
{ timestamps: true }
);

// Agregar campo virtual para confirmación de clave secreta
terapeutaSchema.virtual('confirm_password')
.get(function() { return this._confirmacionClaveSecreta; })
.set(function(value) { this._confirmacionClaveSecreta = value; });

// Gancho de pre-validación para verificar si las claves secretas coinciden
terapeutaSchema.pre('validate', function(next) {
if (this.password !== this.confirm_password) {
  this.invalidate('confirm_password', 'Las claves secretas deben coincidir');
}
next();
});

// Gancho de pre-guardado para hashear la clave secreta
terapeutaSchema.pre('save', async function(next) {
if (this.isModified('password')) {
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
terapeutaSchema.plugin(uniqueValidator, { message: 'El {PATH} {VALUE} ya existe, por favor elija otro' });
const Terapeuta = model("Terapeuta", terapeutaSchema);
export { Terapeuta };
