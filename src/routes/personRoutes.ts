import { Router } from "express";
import PersonController from "../controllers/personController";

const personRoutes = Router();

personRoutes.post("/person", PersonController.add);
personRoutes.get("/person/:cpf", PersonController.find);

export { personRoutes };