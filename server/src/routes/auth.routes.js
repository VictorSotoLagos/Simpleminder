import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/paciente.controller.js";

const router = Router();

// auth/login
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
