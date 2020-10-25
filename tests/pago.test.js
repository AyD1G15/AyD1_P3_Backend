const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const { eliminarPago } = require('../controllers/pago.controller');

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

describe("Pruebas de registro de pago", () => {
    it("Se prueba que la respuesta tenga la propiedad mensaje", async done => {
        var res = await request.post("/pago");

        expect(res.body).toHaveProperty('errors');
        done();
    });

    it("Se prueba que se envio un objeto vacio", async done => {
        var res = await request.post("/pago");

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "username":
                    expect(['El nombre de usuario es obligatorio']).toContain(errors[i].msg);
                    break;
                case "numeroTarjeta":
                    expect(errors[i].msg).toEqual('El numero de tarjeta es obligatorio');
                    break;
                case "nombreTarjeta":
                    expect(errors[i].msg).toEqual('El nombre de tarjeta es obligatorio');
                    break;
                case "fechaExprira":
                    expect(errors[i].msg).toEqual('La fecha de expiracion es obligatoria');
                    break;
                case "moneda":
                    expect(errors[i].msg).toEqual('La moneda es obligatoria');
                    break;
                case "codigoVerificacion":
                    expect(errors[i].msg).toEqual('El codigo de verificacion es obligatorio');
                    break;
                case "monto":
                    expect(errors[i].msg).toEqual('El monto es obligatorio');
                    break;
                default:
                    break;
            }
        }

        done();
    });

    it("Se valida que se enviaron campos vacios", async done => {
        var res = await request.post("/pago")
            .field("username", "")
            .field("numeroTarjeta", "")
            .field("nombreTarjeta", "")
            .field("fechaExpira", "")
            .field("codigoVerificacion", "")
            .field("monto", "")
            .field("moneda", "");

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "username":
                    expect(['El nombre de usuario es obligatorio']).toContain(errors[i].msg);
                    break;
                case "numeroTarjeta":
                    expect(errors[i].msg).toEqual('El numero de tarjeta es obligatorio');
                    break;
                case "nombreTarjeta":
                    expect(errors[i].msg).toEqual('El nombre de tarjeta es obligatorio');
                    break;
                case "fechaExprira":
                    expect(errors[i].msg).toEqual('La fecha de expiracion es obligatoria');
                    break;
                case "moneda":
                    expect(errors[i].msg).toEqual('La moneda es obligatoria');
                    break;
                case "codigoVerificacion":
                    expect(errors[i].msg).toEqual('El codigo de verificacion es obligatorio');
                    break;
                case "monto":
                    expect(errors[i].msg).toEqual('El monto es obligatorio');
                    break;
                default:
                    break;
            }
        }

        done();
    });

    it("Se valida que no se envio username", async done => {
        var res = await request.post("/pago")
            .field("username", "")
            .field("numeroTarjeta", "")
            .field("nombreTarjeta", "")
            .field("fechaExpira", "")
            .field("codigoVerificacion", "")
            .field("monto", "")
            .field("moneda", "");

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "username":
                    expect(['El nombre de usuario es obligatorio']).toContain(errors[i].msg);
                    break;
                case "numeroTarjeta":
                    expect(errors[i].msg).toEqual('El numero de tarjeta es obligatorio');
                    break;
                case "nombreTarjeta":
                    expect(errors[i].msg).toEqual('El nombre de tarjeta es obligatorio');
                    break;
                case "fechaExprira":
                    expect(errors[i].msg).toEqual('La fecha de expiracion es obligatoria');
                    break;
                case "moneda":
                    expect(errors[i].msg).toEqual('La moneda es obligatoria');
                    break;
                case "codigoVerificacion":
                    expect(errors[i].msg).toEqual('El codigo de verificacion es obligatorio');
                    break;
                case "monto":
                    expect(errors[i].msg).toEqual('El monto es obligatorio');
                    break;
                default:
                    break;
            }
        }

        done();
    });

    it("Se valida que no se envio numero de tarjeta", async done => {
        var res = await request.post("/pago")
            .field("username", "")
            .field("numeroTarjeta", "")
            .field("nombreTarjeta", "")
            .field("fechaExpira", "")
            .field("codigoVerificacion", "")
            .field("monto", "")
            .field("moneda", "");
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "username":
                    expect(['El nombre de usuario es obligatorio']).toContain(errors[i].msg);
                    break;
                case "numeroTarjeta":
                    expect(errors[i].msg).toEqual('El numero de tarjeta es obligatorio');
                    break;
                case "nombreTarjeta":
                    expect(errors[i].msg).toEqual('El nombre de tarjeta es obligatorio');
                    break;
                case "fechaExprira":
                    expect(errors[i].msg).toEqual('La fecha de expiracion es obligatoria');
                    break;
                case "moneda":
                    expect(errors[i].msg).toEqual('La moneda es obligatoria');
                    break;
                case "codigoVerificacion":
                    expect(errors[i].msg).toEqual('El codigo de verificacion es obligatorio');
                    break;
                case "monto":
                    expect(errors[i].msg).toEqual('El monto es obligatorio');
                    break;
                default:
                    break;
            }
        }

        done();
    });

    it("Se valida que no se envio nombre de tarjeta", async done => {
        var res = await request.post("/pago")
            .field("username", "")
            .field("numeroTarjeta", "")
            .field("nombreTarjeta", "")
            .field("fechaExpira", "")
            .field("codigoVerificacion", "")
            .field("monto", "")
            .field("moneda", "");

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "username":
                    expect(['El nombre de usuario es obligatorio']).toContain(errors[i].msg);
                    break;
                case "numeroTarjeta":
                    expect(errors[i].msg).toEqual('El numero de tarjeta es obligatorio');
                    break;
                case "nombreTarjeta":
                    expect(errors[i].msg).toEqual('El nombre de tarjeta es obligatorio');
                    break;
                case "fechaExprira":
                    expect(errors[i].msg).toEqual('La fecha de expiracion es obligatoria');
                    break;
                case "moneda":
                    expect(errors[i].msg).toEqual('La moneda es obligatoria');
                    break;
                case "codigoVerificacion":
                    expect(errors[i].msg).toEqual('El codigo de verificacion es obligatorio');
                    break;
                case "monto":
                    expect(errors[i].msg).toEqual('El monto es obligatorio');
                    break;
                default:
                    break;
            }
        }

        done();
    });

    it("Se valida que no se envio fecha expiracion", async done => {
        var res = await request.post("/pago")
            .field("username", "")
            .field("numeroTarjeta", "")
            .field("nombreTarjeta", "")
            .field("fechaExpira", "")
            .field("codigoVerificacion", "")
            .field("monto", "")
            .field("moneda", "");

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "username":
                    expect(['El nombre de usuario es obligatorio']).toContain(errors[i].msg);
                    break;
                case "numeroTarjeta":
                    expect(errors[i].msg).toEqual('El numero de tarjeta es obligatorio');
                    break;
                case "nombreTarjeta":
                    expect(errors[i].msg).toEqual('El nombre de tarjeta es obligatorio');
                    break;
                case "fechaExprira":
                    expect(errors[i].msg).toEqual('La fecha de expiracion es obligatoria');
                    break;
                case "moneda":
                    expect(errors[i].msg).toEqual('La moneda es obligatoria');
                    break;
                case "codigoVerificacion":
                    expect(errors[i].msg).toEqual('El codigo de verificacion es obligatorio');
                    break;
                case "monto":
                    expect(errors[i].msg).toEqual('El monto es obligatorio');
                    break;
                default:
                    break;
            }
        }

        done();
    });

    it("Se valida que no se envio codigo de verificacion", async done => {
        var res = await request.post("/pago")
            .field("username", "")
            .field("numeroTarjeta", "")
            .field("nombreTarjeta", "")
            .field("fechaExpira", "")
            .field("codigoVerificacion", "")
            .field("monto", "")
            .field("moneda", "");

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        const { errors } = res.body;
        const noErrors = res.body.errors.length;
        for (var i = 0; i < noErrors; i++) {

            switch (errors[i].param) {
                case "username":
                    expect(['El nombre de usuario es obligatorio']).toContain(errors[i].msg);
                    break;
                case "numeroTarjeta":
                    expect(errors[i].msg).toEqual('El numero de tarjeta es obligatorio');
                    break;
                case "nombreTarjeta":
                    expect(errors[i].msg).toEqual('El nombre de tarjeta es obligatorio');
                    break;
                case "fechaExprira":
                    expect(errors[i].msg).toEqual('La fecha de expiracion es obligatoria');
                    break;
                case "moneda":
                    expect(errors[i].msg).toEqual('La moneda es obligatoria');
                    break;
                case "codigoVerificacion":
                    expect(errors[i].msg).toEqual('El codigo de verificacion es obligatorio');
                    break;
                case "monto":
                    expect(errors[i].msg).toEqual('El monto es obligatorio');
                    break;
                default:
                    break;
            }
        }

        done();
    });

    it("Se valida que se registro correctamente el pago", async done => {
        var res = await request.post("/pago")
            .send({
                "username": "testp3",
                "numeroTarjeta": "2342342355324234",
                "nombreTarjeta": "Tarjeta Prueba",
                "fechaExpira": "0923",
                "codigoVerificacion": "1456",
                "monto": "700",
                "moneda": "Q"
            });
            

        pago = res.body._id;

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('mensaje');
        expect(res.body.mensaje).toEqual('Pago registrado correctamente');

        done();
    });




});

afterAll(async () => {
    await eliminarPago(pago);
});