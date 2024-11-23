import { Router } from "express";
import { getPacientes, getPacienteID, createPaciente, updatePaciente, patchPaciente, deletePaciente } from "../controllers/paciente.controller.js";
import autenticarJWT from "../middlewares/jwt.middleware.js";

const router = Router();

// Rutas para canciones


router.post('/add', createPaciente);          // Ruta para registrar un paciente
router.get('/', getPacientes);                      // Ruta para obtener todos los pacientes
router.put('/:id', autenticarJWT, updatePaciente);  
router.get('/:id', autenticarJWT, getPacienteID);        // Ruta para obtener un usuario por ID                                                        // Ruta para actualizar un usuario por ID
router.patch('/:id', autenticarJWT, patchPaciente);
router.delete('/:id', autenticarJWT, deletePaciente); 

export default router;
