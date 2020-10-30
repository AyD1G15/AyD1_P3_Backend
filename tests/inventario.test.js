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


describe('Pruebas a la api de inventario', () => {
    it('Validacion de usuario existente', async done => {
        var res = await request.get('/inventory/5f950dc9191d602c64f42b28');

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('messages');
        done();
    });

    it('Consulta correcta de inventario', async done => {
        var res = await request.get('/inventory/5f950dc9191d602c64f42b27');

        expect(res.status).toBe(200);
        done();
    });
});