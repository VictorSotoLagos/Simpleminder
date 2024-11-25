import express from "express";
import pacientesRoutes from "./src/routes/pacientes.routes.js";
import terapeutasRoutes from "./src/routes/terapeutas.routes.js";
import fichaPacienteRoutes from "./src/routes/ficha_paciente.routes.js";
import routerAuth from "./src/routes/auth.routes.js";
import atencionRoutes from "./src/routes/atencion.routes.js";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import conectarDB from "./src/config/config.mongo.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configuración de dotenv
config();

// Definir __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear una instancia de la aplicación express
const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Crear el directorio 'uploads' si no existe
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Definir el puerto en el que el servidor escuchará las solicitudes
const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI no está definida en el archivo .env");
  process.exit(1);
}

conectarDB();

app.use("/api/pacientes", pacientesRoutes); // Usar las nuevas rutas
app.use("/api/terapeutas", terapeutasRoutes);
app.use("/api/auth", routerAuth);
app.use("/api/fichapaciente", fichaPacienteRoutes);
app.use("/api/atencion", atencionRoutes);

const server = app.listen(port, () => {
  console.log(`El servidor está activo en el puerto: ${port}`);
});

export { app, server };
