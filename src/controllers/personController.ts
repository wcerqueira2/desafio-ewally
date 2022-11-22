import { Request, Response } from "express";
import PersonService from "../services/personServices";

export default class PersonController {
    static async add(request: Request, response: Response) {
        const personService = new PersonService();

        try {
            const person = await personService.add(request.body);

            return response.status(200).json({message: "Successfully created person"});
        } catch (error) {
            return response.status(400).json({message: error});
        }
    }

    static async find(request: Request, response: Response) {
        const personService = new PersonService();

        try {
            const person = await personService.find(request.params);

            return response.status(200).json(person);
        } catch (error) {
            return response.status(404).json({message: error});
        }
    }
}