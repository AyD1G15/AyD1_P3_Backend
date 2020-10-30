const InventoryController = require('../controllers/inventory.controller');

module.exports = (app) => {
    app.get("/inventory/:id", InventoryController.getInventory);
}