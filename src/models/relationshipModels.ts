import { relationshipType } from "../types/relationshipTypes";
let relations: Array<relationshipType> = [];

export default class RelationshipModel {
    async create({ cpf1, cpf2} : relationshipType) {
        relations.push({ cpf1, cpf2 });

        console.log("BASE RELATIONSHIP: ", JSON.stringify(relations));
        return relations;
    }

    async clearAll() {
        relations = [];

        return relations;
    }
}