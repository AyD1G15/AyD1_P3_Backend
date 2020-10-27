const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);


beforeAll(async () => {
    const mongoose = require('mongoose');
    const host = 'cluster0.1ojwk.mongodb.net';
    const username = '2learn';
    const password = 'Nq5La6e3KZhZ8jTO';
    const database = 'practica3-tests';
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useNewUrlParser', true);
    await mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`);

});

describe('Pruebas a la api de compra', () => {
    it('Validacion al no enviar datos', async done => {
        var res = await request.post('/buy');

        expect(res.status).toBe(400);
        done();
    });

    it('Validacion de usuario existente', async done => {
        var res = await request.post('/buy').send({
            userId: "5f94f8552097aa0da3febd53",
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
        done();
    });

});