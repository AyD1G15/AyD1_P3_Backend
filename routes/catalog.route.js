const catalogController = require('../controllers/catalog.controller');

module.exports = (app) => {
    app.get('/catalog', catalogController.getItems);
}