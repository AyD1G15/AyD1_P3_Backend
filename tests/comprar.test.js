const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Pruebas a la api de compra', () => {
    it('Validacion al no enviar datos', async done => {
        var res = await request.post('/buy');

        expect(res.status).toBe(400);
    });

    it('Validacion de usuario existente', async done => {
        var res = await request.post('/buy').send({
            userId: "10",
            creditCard: {
                number: "1234123412341234",
                name: "Test User",
                expirationDate: "10/22",
                code: "123"
            },
            items: [
                {
                    plataform: "1",
                    availability: "2",
                    quantity: 2
                }
            ]
        });

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('messages');
        
    });

})