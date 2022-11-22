import { Router } from "express";
import RelationshipController from "../controllers/relationshipController";

const relationshipRoutes = Router();

relationshipRoutes.post("/relationship", RelationshipController.add);
relationshipRoutes.delete("/clean", RelationshipController.clear);
relationshipRoutes.get("/recommendations/:cpf", RelationshipController.recommendations);

export { relationshipRoutes };