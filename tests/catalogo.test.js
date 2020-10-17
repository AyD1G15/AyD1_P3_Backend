const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Api de catalogo', () => {
    it('Validacion de estado esperado', async done => {
        var res = await request.get('/catalog');

        expect(res.status).toBe(200);
        done();
    });
    it('Validacion de campos de elementos', async done =>{
        var res = await request.get('/catalog');
        var items = res.body;
        if(items.length > 0){
            items.map(item => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('name');
                expect(item).toHaveProperty('image');
                expect(item).toHaveProperty('chargeRate');
                expect(item).toHaveProperty('availability');
            });
        }
        expect(res.status).toBe(200);
        done();
    });
});