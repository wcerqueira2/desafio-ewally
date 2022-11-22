import { recommendationsType, relationshipType } from "../types/relationshipTypes";
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

    recommendations = async (params: recommendationsType) => {
        await validateParams(params);
        await validateCPF(params.cpf!);
        await validateCPFNotExist(params.cpf!);

        let listRelationship: Array<any> = [];
        const relationship = await new RelationshipModel().findForCpf(params.cpf!);

        if(relationship.length > 0) {
            for await (const relation of relationship) {
                const relationshipByFriend = await new RelationshipModel().findForCpfWithNotRelation(relation.cpf2, relation.cpf1);

                if(relationshipByFriend.length > 0) {
                    for await (const relationMyfriend of relationshipByFriend) {
                        const relationExist = listRelationship.findIndex(itenRelation => itenRelation.cpf === relationMyfriend.cpf2);

                        if(relationExist >= 0) {
                            listRelationship[relationExist].relationship++;
                        } else {
                            listRelationship.push({ cpf: relationMyfriend.cpf2, relationship: 1});
                        }
                    }
                };
            }
        }

        const listOrderRelationship = listRelationship.sort((a,b) => {
            return (b.relationship < a.relationship) ? -1 : (b.relationship > a.relationship) ? 1 : 0;
        });
        
        return listOrderRelationship;
    }
}

const validateBody = async(body: relationshipType) => {
    if (!body || Object.keys(body).length === 0 ) throw { message: "Inform the fields" };
    if (!body.cpf1 ) throw { message: "Enter the CPF1 field" };
    if (!body.cpf2 ) throw { message: "Enter the CPF2 field" };
}

const validateParams = async(params: recommendationsType) => {
    if (!params || Object.keys(params).length === 0 ) throw "Inform the parameters";
    if (!params.cpf ) throw "Enter the CPF parameters";
}

const validateCPFNotExist = async(CPF: string) => {
    const peopleCpfExist = await new PersonModel().findForCpf(CPF);

    if(!peopleCpfExist) throw { message: "Some specified cpf does not exist", statusCode: 404 };
}

const validateCPF = async(CPF: string) => {
    if (CPF.length !== 11) throw { message: "Cpf field does not contain eleven digits", statusCode: 400 };
}