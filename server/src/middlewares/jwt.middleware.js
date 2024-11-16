import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const LLAVE_SECRETA = process.env.LLAVE_SECRETA || 'clave_secreta_super_secreta';

// Middleware de autenticación
const autenticarJWT = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(403).json({ mensaje: 'Acceso denegado: No se proporcionó un token' });
  }

  jwt.verify(token, LLAVE_SECRETA, (err, payload) => {
    console.log("The payload is:", payload);
    if (err) {
      return res.status(403).json({ mensaje: 'Acceso denegado: Token inválido' });
    }

    req.usuario = payload.id; // Agregar la información del usuario a la solicitud
    console.log("payload id is:", payload._id);
    req.nombre_usuario = payload.nombre;
    req.apellido_usuario = payload.apellido;
    req.email_usuario = payload.email;
    req.tipo_usuario = payload.tipo;
    next(); // Continuar al siguiente middleware o ruta
  });
};

export default autenticarJWT;