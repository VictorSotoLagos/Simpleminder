import { Router } from "express";
import {
  getTerapeutas,
  getTerapeutaID,
  createTerapeuta,
  updateTerapeuta,
  deleteTerapeuta,
} from "../controllers/terapeuta.controller.js";

const router = Router();

router.post("/add", createTerapeuta);
router.get("/", getTerapeutas);
router.put("/:id", updateTerapeuta);
router.get("/:id", getTerapeutaID);
router.delete("/:id", deleteTerapeuta);

export default router;
