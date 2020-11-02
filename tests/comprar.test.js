const supertest = require('supertest');
const app = require('../app');
const { getItems } = require('../controllers/catalog.controller');
const request = supertest(app);

jest.mock('../services/gift.service')

const giftServices = require('../services/gift.service');

giftServices.getExchangeRate.mockResolvedValue(
    new Promise((resolve, reject) => {
        resolve([{
            total: "7"
        }])
    })
);

giftServices.getCargs.mockResolvedValue(
    new Promise((resolve, reject) => {
        resolve([
            {
                "id": "1",
                "name": "Google Play",
                "image": "https://media.karousell.com/media/photos/products/2020/5/21/rm50_goggle_play_gift_card_mal_1590040469_c1100b5a_progressive.jpg",
                "chargeRate": 1,
                "active": true,
                "availability": [
                    1,
                    2,
                    3,
                    4
                ]
            },
            {
                "id": "2",
                "name": "PlayStation",
                "image": "https://www.allkeyshop.com/blog/wp-content/uploads/PlayStationNetworkGiftCard.jpg",
                "chargeRate": 0.25,
                "active": true,
                "availability": [
                    1,
                    2,
                    3
                ]
            }
        ])
    })
);

giftServices.getValues.mockResolvedValue(
    new Promise((resolve, reject) => {
        resolve([
            {
                "id": "1",
                "total": "10"
            },
            {
                "id": "2",
                "total": "25"
            },
            {
                "id": "3",
                "total": "50"
            },
            {
                "id": "4",
                "total": "100"
            }
        ])
    })
)

// giftServices.getExchangeRate.mockImplementation(() => new Promise((resolve, reject) => {
//     resolve([{total: "7"}]);
// }));

// giftServices.getExchangeRate = jest.fn().mockReturnValue([
//     {
//         "total": "7"
//     }
// ]);

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

    it('Validacion de datos de tarjeta de credito', async done => {
        var res = await request.post('/buy').send({
            userId: "5f94f8552097aa0da3febd52",
            creditCard: {

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

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('messages');
        expect(res.body.messages).toContain("Falta el numero de la tajera de credito");
        done();
    });
    it('Verificacion de compra correcta', async done => {
        var res = await request.post('/buy').send({
            "userId": "5f950dc9191d602c64f42b27",
            "creditCard": {
                "number": "1234123412341234",
                "name": "Test User",
                "expirationDate": "10/22",
                "code": "123"
            },
            "items": [
                {
                    "plataform": "1",
                    "availability": "3",
                    "quantity": 2
                },
                {
                    "plataform": "2",
                    "availability": "1",
                    "quantity": 2
                }
            ]
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual("Se ha realizado la compra correctamente");
        done();
    });

});