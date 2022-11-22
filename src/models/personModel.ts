import { PersonType } from "../types/personTypes";
let people: Array<PersonType> = [];

export default class PersonModel {
    async create({ cpf, name} : PersonType) {
        people.push({ cpf, name });

        console.log("BASE PEOPLE: ", JSON.stringify(people));
        return people;
    }

    async findForCpf(CPF: String) {
        const peopleForCpf = people.find(person => person.cpf === CPF);

        return peopleForCpf
    }

    async findAll() {
        return people;
    }

    async clearAll() {
        people = [];

        return people;
    }
}