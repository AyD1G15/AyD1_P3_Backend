module.exports = (app, server) => {
   require('./catalog.route')(app);
   require('./registro.route')(app);
}