import { Paciente } from "../model/model.paciente.js";
import { Terapeuta } from "../model/model.terapeuta.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const loginUser = async (req, res) => {
    try {
      const LLAVE_SECRETA = process.env.LLAVE_SECRETA || "llave";
      const { email, password } = req.body;
  
      let user; // Usuario encontrado (Paciente o Terapeuta)
      let userType = ""; // Tipo de usuario (Paciente o Terapeuta)
  
      console.log("email recibido:", email);
  
      // Intentamos buscar al Terapeuta primero
      user = await Terapeuta.findOne({ email });
      if (user) {
        userType = "Terapeuta";
      } else {
        // Si no encontramos al Terapeuta, buscamos al Paciente
        user = await Paciente.findOne({ email });
        if (user) {
          userType = "Paciente";
        }
      }
  
      // Si no encontramos al usuario, devolvemos error
      if (!user) {
        console.log("Usuario no encontrado");
        return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
      }
  
      // Validamos la contraseña
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("Contraseña incorrecta");
        return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
      }
  
      // Generamos datos para el token
      const datosToken = {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        tipo_usuario: userType, // Agregamos el tipo de usuario
      };
  
      const token = jwt.sign(datosToken, LLAVE_SECRETA, {expiresIn:'45m'});

      res.cookie('authToken', token, { httpOnly: true, secure: true }).json(
          {
          token, 
          datosToken,
          });

  } catch (error) {
      console.log(error);
      return res.status(500).json(error);

  }
}
  
  
  //Logout
  
const logoutUser = async (req, res) => {
    res.clearCookie('authToken').json({ mensaje: 'Sesión de terapeuta cerrada' });
}

export { loginUser, logoutUser };