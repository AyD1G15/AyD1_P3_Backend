module.exports = (app, server) => {
   require('./catalog.route')(app);
   require('./pago.route')(app);
   require('./registro.route')(app);
}
