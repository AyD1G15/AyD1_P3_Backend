module.exports = (app, server) => {
   require('./catalog.route')(app);
   require('./sale.route')(app);
   require('./inventory.route')(app);
   require('./tasas.route')(app);
   require('./registro.route')(app);
}