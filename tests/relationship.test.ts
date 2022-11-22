import api from "supertest";
import app from "../src/app";

describe('Testando as rotas de relationship', () => {
    test('Deve validar se rota é válida', async () => { 
        await createPerson(1);
        await createPerson(2);

        const response = await api(app).post("/relationship").send({ cpf1: "12345678901", cpf2: "12345678902" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Successfully created relation");
    })

    test('Deve validar se os campos foram informados', async () => {
        const response = await api(app).post("/relationship").send();

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Inform the fields");
    })

    test('Deve validar se o cpf1 foi informado', async () => {
        const response = await api(app).post("/relationship").send({ cpf1: "12345678901" });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Enter the CPF2 field");
    })

    test('Deve validar se o cpf2 foi informado', async () => {
        const response = await api(app).post("/relationship").send({ cpf2: "12345678901" });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Enter the CPF1 field");
    })

    test('Deve validar se cpf é válido', async () => {
        const response = await api(app).post("/relationship").send({ cpf1: "12345678903", cpf2: "12345678902" });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Some specified cpf does not exist");
    })

    test('Deve validar se os campos foram limpos', async () => {
        const response = await api(app).delete("/clean");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Successfully clear");
    })
});

const createPerson = async(num: Number) => await api(app).post("/person").send({ cpf: `1234567890${num}`,name: `Joaozinho ${num}` });