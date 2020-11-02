const SaleController = require('../controllers/sale.controller');

module.exports = (app) => {
    app.post("/buy", SaleController.buy);
    app.get("/history/:id", SaleController.history);
    app.get("/admin/history/:id", SaleController.allHistories);
}