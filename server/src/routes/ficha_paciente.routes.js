import { Router } from "express";
import { getFichaPacientes, getFichaPacienteID, createFichaPaciente, updateFichaPaciente, deleteFichaPaciente } from "../controllers/fichapaciente.controller.js";
import autenticarJWT from "../middlewares/jwt.middleware.js";

const router = Router();

// Rutas para canciones

//RECORDAR INCLUIR VERIFICADOR DE TOKEN
router.post('/add', createFichaPaciente);          // Ruta para crear una ficha clínica
router.get('/', getFichaPacientes);                      // Ruta para obtener todas las fichas clínicas
router.put('/:id', updateFichaPaciente);  // Ruta para actualizar: ES LA MÁS IMPORTANTE, ya que es la que estaremos utilizando frecuentemente.
router.get('/:id', getFichaPacienteID);        // Ruta para actualizar un usuario por ID
router.delete('/:id', deleteFichaPaciente);  // Ruta para eliminar una ficha clínica esecífica.

export default router;
