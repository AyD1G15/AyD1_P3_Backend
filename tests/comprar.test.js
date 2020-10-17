const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Pruebas a la api de compra', ()=> {
    it('Validacion al no enviar datos', async done => {
        var res = await request.post('/buy');

        expect(res.status).toBe(400);
    })
})