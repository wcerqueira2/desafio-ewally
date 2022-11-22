import { Request, Response } from "express";
import RelationshipService from "../services/relationshipServices";

export default class RelationshipController {
    static async add(request: Request, response: Response) {
        const relationshipService = new RelationshipService();

        try {
            await relationshipService.add(request.body);

            return response.status(200).json({message: "Successfully created relation"});
        } catch (error: any) {
            return response.status(error.statusCode).json({message: error.message});
        }
    }

    static async clear(request: Request, response: Response) {
        const relationshipService = new RelationshipService();

        try {
            await relationshipService.clear();

            return response.status(200).json({message: "Successfully clear"});
        } catch (error: any) {
            return response.status(404).json({message: error.message});
        }
    }

    static async recommendations(request: Request, response: Response) {
        const relationshipService = new RelationshipService();

        try {
            const listRecommendations = await relationshipService.recommendations(request.params);

            return response.status(200).json(listRecommendations);
        } catch (error: any) {
            return response.status(404).json({message: error.message});
        }
    }
}