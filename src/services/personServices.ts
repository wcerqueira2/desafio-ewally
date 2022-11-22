import { PersonType, PersonTypeParameter } from "../types/personTypes";
import PersonModel from "../models/personModel";

export default class PersonService {
    add = async (body: PersonType) => {
        await validateBody(body);
        await validateCPF(body.cpf);
        await validateCPFExist(body.cpf);

        const personCreated = await new PersonModel().create(body);

        return personCreated;
    }

    find = async (params: PersonTypeParameter) => {
        await validateParams(params);
        await validateCPF(params.cpf!);

        const person = await new PersonModel().findForCpf(params.cpf!);

        if(!person) throw "Person does not exist";

        return person;
    }
}

const validateBody = async(body: PersonType) => {
    if (!body || Object.keys(body).length === 0 ) throw "Inform the fields";
    if (!body.cpf ) throw "Enter the CPF field";
    if (!body.name ) throw "Enter the name field";
}

const validateParams = async(params: PersonTypeParameter) => {
    if (!params || Object.keys(params).length === 0 ) throw "Inform the parameters";
    if (!params.cpf ) throw "Enter the CPF parameters";
}

const validateCPF = async(CPF: string) => {
    if (CPF.length !== 11) throw "Cpf field does not contain eleven digits";
}

const validateCPFExist = async(CPF: string) => {
    const peopleCpfExist = await new PersonModel().findForCpf(CPF);

    if(peopleCpfExist) throw "Cpf already exists";
}