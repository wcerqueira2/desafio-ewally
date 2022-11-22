import api from "supertest";
import app from "../src/app";

describe('Testando as rotas de person', () => {
    test('Deve validar se rota é válida', async () => { 
        const response = await api(app).post("/person").send({ cpf: "12345678905",name: "Joaozinho 2" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Successfully created person");
    })

    test('Deve validar se os caampos foram passados', async () => { 
        const response = await api(app).post("/person").send();

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Inform the fields");
    })

    test('Deve validar se o name foi passado', async () => { 
        const response = await api(app).post("/person").send({ cpf: "12345678905" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Enter the name field");
    })

    test('Deve validar se o cpf foi passado', async () => { 
        const response = await api(app).post("/person").send({ name: "test" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Enter the CPF field");
    })

    test('Deve validar se o cpf é válido', async () => { 
        const response = await api(app).post("/person").send({ cpf: "1234567890",name: "Joaozinho 2" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Cpf field does not contain eleven digits");
    })

    test('Deve validar se o cpf já existe', async () => { 
        await api(app).post("/person").send({ cpf: "12345678905",name: "Joaozinho 2" });
        const response = await api(app).post("/person").send({ cpf: "12345678905",name: "Joaozinho 2" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Cpf already exists");
    })
});