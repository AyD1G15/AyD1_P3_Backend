const tasasController = require('../controllers/tasas.controller');

module.exports = (app) => {
    app.get('/TasaCambio', tasasController.getItems);
}