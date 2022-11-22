import { Request, Response } from "express";
import RelationshipService from "../services/relationshipServices";

export default class RelationshipController {
    static async add(request: Request, response: Response) {
        const relationshipService = new RelationshipService();

        try {
            await relationshipService.add(request.body);

            return response.status(200).json({message: "Successfully created relation"});
        } catch (error) {
            return response.status(404).json({message: error});
        }
    }

    static async clear(request: Request, response: Response) {
        const relationshipService = new RelationshipService();

        try {
            await relationshipService.clear();

            return response.status(200).json({message: "Successfully clear"});
        } catch (error) {
            return response.status(404).json({message: error});
        }
    }
}