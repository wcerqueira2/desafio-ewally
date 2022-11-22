import { relationshipType } from "../types/relationshipTypes";
import RelationshipModel from "../models/relationshipModels";
import PersonModel from "../models/personModel";

export default class RelationshipService {
    add = async (body: relationshipType) => {
        await validateBody(body);
        await validateCPFNotExist(body.cpf1);
        await validateCPFNotExist(body.cpf2);

        const relationCreated = await new RelationshipModel().create(body);

        return relationCreated;
    }
    
    clear = async () => {
        const relationship = await new RelationshipModel().clearAll();

        if(relationship.length === 0) await new PersonModel().clearAll();

        return relationship;
    }

    recommendations = async () => {

    }
}

const validateBody = async(body: relationshipType) => {
    if (!body || Object.keys(body).length === 0 ) throw { message: "Inform the fields" };
    if (!body.cpf1 ) throw { message: "Enter the CPF1 field" };
    if (!body.cpf2 ) throw { message: "Enter the CPF2 field" };
}

const validateCPFNotExist = async(CPF: string) => {
    const peopleCpfExist = await new PersonModel().findForCpf(CPF);

    if(!peopleCpfExist) throw "Some specified cpf does not exist";
}

const validateCPF = async(CPF: string) => {
    if (CPF.length !== 11) throw "Cpf field does not contain eleven digits";
}