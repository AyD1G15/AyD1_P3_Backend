const SaleController = require('../controllers/sale.controller');

module.exports = (app) => {
    app.post("/buy", SaleController.buy);
}