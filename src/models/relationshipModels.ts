import { relationshipType } from "../types/relationshipTypes";
let relations: Array<relationshipType> = [];

export default class RelationshipModel {
    async create({ cpf1, cpf2} : relationshipType) {
        relations.push({ cpf1, cpf2 });

        console.log("BASE RELATIONSHIP: ", JSON.stringify(relations));
        return relations;
    }

    async findForCpf(CPF: String) {
        const relationsForCpf = relations.filter(relation => relation.cpf1 === CPF);

        return relationsForCpf
    }

    async findForCpfWithNotRelation(CPF: String, cpfNotRelation : String) {
        const relationsForCpf = relations.filter(relation => relation.cpf1 === CPF && relation.cpf2 !== cpfNotRelation);

        return relationsForCpf
    }

    async clearAll() {
        relations = [];

        return relations;
    }
}