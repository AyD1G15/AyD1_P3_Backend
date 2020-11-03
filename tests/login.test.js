const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const { eliminarUsuario } = require('../controllers/registro.controller');

var usuario;

beforeAll(async () => {
    const mongoose = require('mongoose');
    const host = 'cluster0.1ojwk.mongodb.net';
    const username = '2learn';
    const password = 'Nq5La6e3KZhZ8jTO';
    const database = 'tests';
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useNewUrlParser', true);
    await mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`);

});

describe("Pruebas de login de usuario", () => {
    it("Se prueba que la respuesta tenga la propiedad mensaje", async done => {
        var res = await request.post("/login");

        expect(res.body).toHaveProperty('errors');
        done();
    });

    it("Se prueba que se envio un objeto vacio", async done => {
        var res = await request.post("/login");

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "correo":
                    expect(errors[i].msg).toEqual('El correo o nombre de usuario es obligatorio');
                    break;
                case "password":
                    expect(errors[i].msg).toEqual('La contraseña es obligatoria');
                    break;

                default:
                    break;
            }
        }

        done();
    });

    it("Se valida que se enviaron campos vacios", async done => {
        var res = await request.post("/login")
            .field("correo", "")
            .field("password", "");

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "correo":
                    expect(errors[i].msg).toEqual('El correo o nombre de usuario es obligatorio');
                    break;
                case "password":
                    expect(errors[i].msg).toEqual('La contraseña es obligatoria');
                    break;
                case "nombre":
                    expect(errors[i].msg).toEqual('El nombre es obligatorio');
                    break;
                case "apellido":
                    expect(errors[i].msg).toEqual('El apellido es obligatorio');
                    break;
                case "username":
                    expect(errors[i].msg).toEqual('El nombre de usuario es obligatorio');
                    break;
                default:
                    break;
            }
        }

        done();
    });

    it("Se valida que no se envio correo electronico o nombre de usuario", async done => {
        var res = await request.post("/login")
            .field("correo", "")
            .field("password", "abcd1234");

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "correo":
                    expect(errors[i].msg).toEqual('El correo o nombre de usuario es obligatorio');
                    break;
                case "password":
                    expect(errors[i].msg).toEqual('La contraseña es obligatoria');
                    break;

                default:
                    break;
            }
        }

        done();
    });

    it("Se valida que no se envio password", async done => {
        var res = await request.post("/login")
            .field("correo", "prueba@gmail.com")
            .field("password", "");
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "correo":
                    expect(errors[i].msg).toEqual('El correo o nombre de usuario es obligatorio');
                    break;
                case "password":
                    expect(errors[i].msg).toEqual('La contraseña es obligatoria');
                    break;
                
                default:
                    break;
            }
        }

        done();
    });

    

    

    it("Se valida que se realizo login correctamente con correo", async done => {
        var res = await request.post("/login")
            .send({
                "correo": "pruebas@gmail.com",
                "password": "abcd1234"});
        usuario = res.body._id;

        expect(res.status).toEqual(200);
    

        done();
    });

    it("Se valida que se realizo login correctamente con username", async done => {
        var res = await request.post("/login")
            .send({
                "correo": "testp3",
                "password": "abcd1234"});
        usuario = res.body._id;

        expect(res.status).toEqual(200);
    

        done();
    });

    it("Se realiza login con usuario que no existe", async done => {
        var res = await request.post("/login")
            .send({
                "correo": "testp3r5555@gmail.com",
                "password": "abcd1234"});
        usuario = res.body._id;

        expect(res.status).toEqual(404);
    

        done();
    });

    

    
});

// afterAll(async () => {
//     await eliminarUsuario(usuario);
// });