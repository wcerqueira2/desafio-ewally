import { Router } from "express";
import RelationshipController from "../controllers/relationshipController";

const relationshipRoutes = Router();

relationshipRoutes.post("/relationship", RelationshipController.add);
relationshipRoutes.delete("/clean", RelationshipController.clear);

export { relationshipRoutes };